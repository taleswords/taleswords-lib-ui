<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import type { UiFileUploadProps } from '../types'

const ACCEPTED_TYPES = 'image/jpeg,image/png,image/gif,image/webp'

const props = withDefaults(defineProps<UiFileUploadProps>(), {
    modelValue: () => [],
    multiple: false,
    maxFileSize: 0,
    maxFiles: 0,
    accept: ACCEPTED_TYPES,
})

const emit = defineEmits<{
    'update:modelValue': [files: File[]]
}>()

const isDragOver = ref(false)
const error = ref('')
const fileInput = ref<HTMLInputElement | null>(null)
const previewUrls = ref<Map<File, string>>(new Map())

const acceptedTypesList = computed(() =>
    props.accept.split(',').map(t => t.trim())
)

const hintText = computed(() => {
    const parts: string[] = []
    if (props.maxFileSize > 0) {
        parts.push(`Max ${formatSize(props.maxFileSize)} per file`)
    }
    if (props.maxFiles > 0) {
        parts.push(`Up to ${props.maxFiles} file${props.maxFiles > 1 ? 's' : ''}`)
    }
    return parts.join(' \u00B7 ')
})

function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function getPreviewUrl(file: File): string {
    if (!previewUrls.value.has(file)) {
        const url = URL.createObjectURL(file)
        previewUrls.value.set(file, url)
    }
    return previewUrls.value.get(file)!
}

function revokeUrl(file: File) {
    const url = previewUrls.value.get(file)
    if (url) {
        URL.revokeObjectURL(url)
        previewUrls.value.delete(file)
    }
}

function validateFiles(newFiles: File[]): File[] {
    error.value = ''
    const valid: File[] = []

    for (const file of newFiles) {
        if (!acceptedTypesList.value.includes(file.type)) {
            error.value = `"${file.name}" is not a supported image type`
            continue
        }
        if (props.maxFileSize > 0 && file.size > props.maxFileSize) {
            error.value = `"${file.name}" exceeds max size of ${formatSize(props.maxFileSize)}`
            continue
        }
        valid.push(file)
    }

    return valid
}

function addFiles(incoming: File[]) {
    const validated = validateFiles(incoming)
    if (validated.length === 0) return

    let updated: File[]
    if (props.multiple) {
        updated = [...props.modelValue, ...validated]
        if (props.maxFiles > 0 && updated.length > props.maxFiles) {
            error.value = `Maximum ${props.maxFiles} file${props.maxFiles > 1 ? 's' : ''} allowed`
            updated = updated.slice(0, props.maxFiles)
        }
    } else {
        // Single mode: replace with last selected
        props.modelValue.forEach(f => revokeUrl(f))
        updated = [validated[validated.length - 1]]
    }

    emit('update:modelValue', updated)
}

function removeFile(file: File) {
    revokeUrl(file)
    const updated = props.modelValue.filter(f => f !== file)
    emit('update:modelValue', updated)
    if (updated.length === 0) {
        error.value = ''
    }
}

function handleDrop(e: DragEvent) {
    isDragOver.value = false
    const files = Array.from(e.dataTransfer?.files ?? [])
    if (files.length > 0) addFiles(files)
}

function handleFileInput(e: Event) {
    const target = e.target as HTMLInputElement
    const files = Array.from(target.files ?? [])
    if (files.length > 0) addFiles(files)
    target.value = ''
}

function openFilePicker() {
    fileInput.value?.click()
}

onUnmounted(() => {
    previewUrls.value.forEach(url => URL.revokeObjectURL(url))
    previewUrls.value.clear()
})
</script>

<template>
    <div class="ui-file-upload">
        <div
            class="ui-file-upload__dropzone"
            :class="{ 'ui-file-upload__dropzone--dragover': isDragOver }"
            @dragenter.prevent="isDragOver = true"
            @dragover.prevent="isDragOver = true"
            @dragleave.prevent="isDragOver = false"
            @drop.prevent="handleDrop"
            @click="openFilePicker"
        >
            <i class="icon-picture ui-file-upload__icon" />
            <p class="ui-file-upload__label">Drag images here or click to browse</p>
            <p v-if="hintText" class="ui-file-upload__hint">{{ hintText }}</p>
            <input
                ref="fileInput"
                type="file"
                class="ui-file-upload__input"
                :accept="props.accept"
                :multiple="props.multiple"
                @click.stop
                @change="handleFileInput"
            />
        </div>

        <div v-if="props.modelValue.length > 0" class="ui-file-upload__previews">
            <div
                v-for="(file, idx) in props.modelValue"
                :key="idx"
                class="ui-file-upload__preview-item"
            >
                <img
                    :src="getPreviewUrl(file)"
                    :alt="file.name"
                    class="ui-file-upload__thumbnail"
                />
                <button
                    class="ui-file-upload__remove"
                    type="button"
                    @click="removeFile(file)"
                >
                    <i class="icon-cancel" />
                </button>
                <span class="ui-file-upload__filename">{{ file.name }}</span>
            </div>
        </div>

        <p v-if="error" class="ui-file-upload__error">{{ error }}</p>
    </div>
</template>

<style scoped>
.ui-file-upload {
    width: 100%;
}

.ui-file-upload__dropzone {
    border: 2px dashed var(--ui-file-upload-border);
    border-radius: 8px;
    padding: 2rem 1.5rem;
    text-align: center;
    cursor: pointer;
    background-color: var(--ui-file-upload-bg);
    transition: border-color 0.2s, background-color 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
}

.ui-file-upload__dropzone:hover,
.ui-file-upload__dropzone--dragover {
    border-color: var(--ui-file-upload-border-hover);
    background-color: var(--ui-file-upload-bg-hover);
}

.ui-file-upload__icon {
    font-size: 2.5rem;
    color: var(--ui-file-upload-icon-color);
    margin-bottom: 0.25rem;
}

.ui-file-upload__label {
    margin: 0;
    color: var(--ui-text-color);
    font-size: 0.9375rem;
}

.ui-file-upload__hint {
    margin: 0;
    font-size: 0.8125rem;
    color: var(--ui-file-upload-hint-color);
}

.ui-file-upload__input {
    display: none;
}

.ui-file-upload__previews {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 0.75rem;
    margin-top: 0.75rem;
}

.ui-file-upload__preview-item {
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    background-color: var(--ui-file-upload-preview-bg);
}

.ui-file-upload__thumbnail {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    display: block;
}

.ui-file-upload__remove {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: none;
    background-color: var(--ui-file-upload-remove-bg);
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    padding: 0;
    transition: background-color 0.2s;
}

.ui-file-upload__remove:hover {
    background-color: var(--ui-button-danger-hover);
}

.ui-file-upload__filename {
    display: block;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    color: var(--ui-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.ui-file-upload__error {
    margin: 0.5rem 0 0;
    font-size: 0.8125rem;
    color: var(--ui-error-text-color);
}
</style>

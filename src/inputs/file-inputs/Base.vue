<script setup lang="ts">
import { ref, computed } from 'vue'
import { uid } from '../../utils/uid'

export interface FileInputBaseProps {
    accept?: string
    multiple?: boolean
    isDisabled?: boolean
    label?: string
}

const props = withDefaults(defineProps<FileInputBaseProps>(), {
    multiple: false,
    isDisabled: false,
    label: 'Select files',
})

const emit = defineEmits<{
    'files-selected': [files: File[]]
}>()

const inputId = uid('file-input')
const inputRef = ref<HTMLInputElement | null>(null)

const triggerClasses = computed(() => [
    'file-input__trigger',
    { 'is-disabled': props.isDisabled },
])

function onChange(event: Event): void {
    const target = event.target as HTMLInputElement
    const files = target.files
    if (files && files.length > 0) {
        emit('files-selected', Array.from(files))
    }
    target.value = ''
}

function activate(): void {
    if (props.isDisabled) return
    inputRef.value?.click()
}

function onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        activate()
    }
}
</script>

<template>
    <div class="file-input" data-testid="file-input-base">
        <input
            :id="inputId"
            ref="inputRef"
            type="file"
            class="file-input__native"
            :accept="props.accept"
            :multiple="props.multiple"
            :disabled="props.isDisabled"
            :aria-label="props.label"
            tabindex="-1"
            @change="onChange"
        />
        <button
            type="button"
            :class="triggerClasses"
            :disabled="props.isDisabled || undefined"
            :aria-controls="inputId"
            @click="activate"
            @keydown="onKeydown"
        >
            <span class="material-symbols-rounded file-input__icon" aria-hidden="true">upload_file</span>
            <span class="file-input__label">{{ props.label }}</span>
        </button>
    </div>
</template>

<style scoped>
.file-input {
    display: inline-flex;
}

.file-input__native {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

.file-input__trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: calc(0.5em * var(--density-scale));
    font-family: var(--button-font);
    font-weight: var(--button-weight);
    font-size: var(--button-size);
    line-height: var(--button-leading);
    padding-block: calc(0.625rem * var(--density-scale));
    padding-inline: calc(1em * var(--density-scale));
    min-width: 8em;
    border-radius: var(--button-border-radius);
    border: 1px dashed var(--file-upload-border);
    background-color: var(--file-upload-bg);
    color: var(--general-text-color);
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;
}

.file-input__trigger:hover:not(:disabled):not(.is-disabled) {
    border-color: var(--file-upload-border-hover);
    background-color: var(--file-upload-bg-hover);
}

.file-input__trigger:focus-visible {
    outline: none;
    border-color: var(--general-focus-ring);
    box-shadow: 0 0 0 2px var(--general-focus-ring);
}

.file-input__trigger.is-disabled {
    pointer-events: none;
    cursor: default;
    opacity: 0.5;
}

.file-input__icon {
    font-size: 1.25em;
    line-height: 1;
    color: var(--file-upload-icon-color);
}

.file-input__label {
    white-space: nowrap;
}
</style>

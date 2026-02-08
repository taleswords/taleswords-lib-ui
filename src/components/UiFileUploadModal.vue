<script setup lang="ts">
import { ref, computed } from 'vue'
import UiModal from './UiModal.vue'
import UiFileUpload from './UiFileUpload.vue'
import type { UiFileUploadModalProps } from '../types'

const props = withDefaults(defineProps<UiFileUploadModalProps>(), {
    title: 'Upload Images',
    multiple: false,
    maxFileSize: 0,
    maxFiles: 0,
    confirmText: 'Upload',
    cancelText: 'Cancel',
})

const emit = defineEmits<{
    confirm: [files: File[]]
    cancel: []
    close: []
}>()

const files = ref<File[]>([])

const noFiles = computed(() => files.value.length === 0)

function handleConfirm() {
    emit('confirm', files.value)
}

function handleCancel() {
    emit('cancel')
}

function handleClose() {
    emit('close')
}
</script>

<template>
    <UiModal
        :title="props.title"
        :confirm-text="props.confirmText"
        :cancel-text="props.cancelText"
        :confirm-disabled="noFiles"
        no-scrolls
        @confirm="handleConfirm"
        @cancel="handleCancel"
        @close="handleClose"
    >
        <UiFileUpload
            v-model="files"
            :multiple="props.multiple"
            :max-file-size="props.maxFileSize"
            :max-files="props.maxFiles"
        />
    </UiModal>
</template>

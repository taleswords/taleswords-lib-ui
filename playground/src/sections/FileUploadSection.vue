<script setup lang="ts">
import { ref } from 'vue'
import { UiCard, UiButton, UiFileUpload, UiFileUploadModal } from '@lib'

const uploadFiles = ref<File[]>([])
const uploadMultiple = ref(true)

const showUploadModal = ref(false)
const uploadedFromModal = ref<string[]>([])

function handleModalConfirm(files: File[]) {
    uploadedFromModal.value = files.map(f => f.name)
    showUploadModal.value = false
}
</script>

<template>
    <!-- UiFileUpload -->
    <UiCard variant="outlined">
        <h2>UiFileUpload</h2>
        <UiCard row>
            <label><input type="checkbox" v-model="uploadMultiple" /> Multiple</label>
            <UiButton size="small" variant="default" @click="uploadFiles = []">Clear files</UiButton>
        </UiCard>
        <UiFileUpload
            v-model="uploadFiles"
            :multiple="uploadMultiple"
            :max-file-size="5 * 1024 * 1024"
            :max-files="6"
        />
        <p>Selected files: {{ uploadFiles.length }}</p>
    </UiCard>

    <!-- UiFileUploadModal -->
    <UiCard variant="outlined">
        <h2>UiFileUploadModal</h2>
        <UiButton variant="primary" @click="showUploadModal = true">Open Upload Modal</UiButton>
        <UiFileUploadModal
            v-if="showUploadModal"
            title="Upload Images"
            multiple
            :max-file-size="5 * 1024 * 1024"
            :max-files="4"
            @confirm="handleModalConfirm"
            @cancel="showUploadModal = false"
            @close="showUploadModal = false"
        />
        <p v-if="uploadedFromModal.length">Confirmed: {{ uploadedFromModal.join(', ') }}</p>
    </UiCard>
</template>

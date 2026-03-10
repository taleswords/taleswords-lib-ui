<script setup lang="ts">
import { ref } from 'vue'
import { FileInputBase } from '@lib'
import Section from '../components/Section.vue'
import Case from '../components/Case.vue'
import { definePlaygroundPage } from '../composables/usePageContract'

definePlaygroundPage({ sections: ['Variants', 'States', 'Accessibility'], isInteractive: true })

const selectedFiles = ref<File[]>([])
const multipleFiles = ref<File[]>([])

function onFilesSelected(files: File[]): void {
    selectedFiles.value = files
}

function onMultipleSelected(files: File[]): void {
    multipleFiles.value = files
}
</script>

<template>
    <Section title="Variants">
        <Case title="Single File" layout="columns">
            <FileInputBase @files-selected="onFilesSelected" />
            <p v-if="selectedFiles.length" class="file-list">
                Selected: {{ selectedFiles.map(f => f.name).join(', ') }}
            </p>
        </Case>
        <Case title="Multiple Files" layout="columns">
            <FileInputBase multiple label="Select multiple" @files-selected="onMultipleSelected" />
            <p v-if="multipleFiles.length" class="file-list">
                Selected: {{ multipleFiles.map(f => f.name).join(', ') }}
            </p>
        </Case>
        <Case title="Accept Filter" layout="columns">
            <FileInputBase accept="image/*" label="Select image" />
            <FileInputBase accept=".pdf,.doc,.docx" label="Select document" />
        </Case>
    </Section>

    <Section title="States">
        <Case title="Disabled" layout="columns">
            <FileInputBase is-disabled label="Disabled" />
        </Case>
    </Section>

    <Section title="Accessibility">
        <Case title="Keyboard Navigation" layout="columns">
            <p>Tab to focus the trigger button. Press Enter or Space to open the file dialog. Disabled state prevents activation.</p>
        </Case>
    </Section>
</template>

<style scoped>
.file-list {
    margin: 0;
    font-size: var(--text-sm);
    color: var(--form-field-description-color);
}
</style>

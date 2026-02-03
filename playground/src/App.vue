<script setup lang="ts">
import { ref } from 'vue'
import { UiButton } from '@lib'
import type { UiButtonProps } from '@lib'

const disabled = ref(false)
const variant = ref<UiButtonProps['variant']>('default')
</script>

<template>
    <main class="playground">
        <h1>UI Library Playground</h1>

        <section class="controls">
            <label>
                <input type="checkbox" v-model="disabled" />
                Disabled
            </label>
            <select v-model="variant">
                <option value="default">Default</option>
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="danger">Danger</option>
            </select>
        </section>

        <section class="preview">
            <h2>Interactive Preview</h2>
            <UiButton :disabled="disabled" :variant="variant">
                Click me
            </UiButton>
        </section>

        <section class="showcase">
            <h2>All Variants</h2>
            <div class="button-row">
                <UiButton variant="default">Default</UiButton>
                <UiButton variant="primary">Primary</UiButton>
                <UiButton variant="secondary">Secondary</UiButton>
                <UiButton variant="danger">Danger</UiButton>
            </div>

            <h3>Disabled States</h3>
            <div class="button-row">
                <UiButton variant="default" disabled>Default</UiButton>
                <UiButton variant="primary" disabled>Primary</UiButton>
                <UiButton variant="secondary" disabled>Secondary</UiButton>
                <UiButton variant="danger" disabled>Danger</UiButton>
            </div>
        </section>
    </main>
</template>

<style scoped>
.playground {
    padding: 2rem;
    font-family: system-ui, sans-serif;
    max-width: 800px;
    margin: 0 auto;
}

h1 {
    margin-bottom: 2rem;
    color: #333;
}

h2 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #555;
}

h3 {
    font-size: 1rem;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #666;
}

.controls {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    align-items: center;
    padding: 1rem;
    background: #f9fafb;
    border-radius: 0.5rem;
}

.preview,
.showcase {
    padding: 2rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
}

.button-row {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { UiButton, UiCard } from '@lib'
import type { UiButtonProps } from '@lib'

const btnDisabled = ref(false)
const btnVariant = ref<UiButtonProps['variant']>('default')
</script>

<template>
    <UiCard variant="outlined">
        <h2>UiButton</h2>
        <UiCard row>
            <label><input type="checkbox" v-model="btnDisabled" /> Disabled</label>
            <select v-model="btnVariant">
                <option value="default">Default</option>
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="danger">Danger</option>
            </select>
            <UiButton :disabled="btnDisabled" :variant="btnVariant">Click me</UiButton>
        </UiCard>
        <h3>All Variants</h3>
        <div class="row">
            <UiButton variant="default">Default</UiButton>
            <UiButton variant="primary">Primary</UiButton>
            <UiButton variant="secondary">Secondary</UiButton>
            <UiButton variant="danger">Danger</UiButton>
        </div>
        <h3>Small Size</h3>
        <div class="row">
            <UiButton variant="default" size="small">Default</UiButton>
            <UiButton variant="primary" size="small">Primary</UiButton>
            <UiButton variant="secondary" size="small">Secondary</UiButton>
            <UiButton variant="danger" size="small">Danger</UiButton>
        </div>
        <h3>Disabled</h3>
        <div class="row">
            <UiButton variant="default" disabled>Default</UiButton>
            <UiButton variant="primary" disabled>Primary</UiButton>
            <UiButton variant="secondary" disabled>Secondary</UiButton>
            <UiButton variant="danger" disabled>Danger</UiButton>
        </div>
        <h3>With Icons</h3>
        <div class="row">
            <UiButton variant="primary" icon="plus">Add Item</UiButton>
            <UiButton variant="default" icon="cog">Settings</UiButton>
            <UiButton variant="danger" icon="trash-empty">Delete</UiButton>
            <UiButton variant="default" icon="right" icon-position="right">Next</UiButton>
        </div>
        <h3>Icon Only</h3>
        <div class="row">
            <UiButton variant="default" icon="search" />
            <UiButton variant="primary" icon="plus" />
            <UiButton variant="danger" icon="trash-empty" />
            <UiButton variant="default" icon="cog" size="small" />
        </div>
        <h3>Ghost Variants</h3>
        <div class="row">
            <UiButton variant="ghost">Ghost</UiButton>
            <UiButton variant="ghost-primary">Ghost Primary</UiButton>
            <UiButton variant="ghost-danger">Ghost Danger</UiButton>
        </div>
        <div class="row">
            <UiButton variant="ghost" icon="cog" />
            <UiButton variant="ghost-primary" icon="plus">Add</UiButton>
            <UiButton variant="ghost-danger" icon="trash-empty">Remove</UiButton>
        </div>
    </UiCard>
</template>

<style scoped>
.row {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: center;
}
</style>

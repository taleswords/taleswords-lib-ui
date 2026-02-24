<script setup lang="ts">
import { ref } from 'vue'
import {
    UiButton,
    UiCard,
    UiModal,
    UiPopover,
    UiTooltip,
    UiDropdownMenu,
} from '@lib'

// Modal
const showModal = ref(false)
const modalError = ref('')
const modalWarning = ref('')

// Popover
const showPopover = ref(false)
const popoverType = ref<'success' | 'error'>('success')
const popoverMessage = ref('Action completed successfully!')

// Dropdown
const lastAction = ref('')
</script>

<template>
    <!-- UiTooltip -->
    <UiCard variant="outlined">
        <h2>UiTooltip</h2>
        <div class="row">
            <UiTooltip text="Top tooltip" position="top">
                <UiButton variant="default" size="small">Top</UiButton>
            </UiTooltip>
            <UiTooltip text="Bottom tooltip" position="bottom">
                <UiButton variant="default" size="small">Bottom</UiButton>
            </UiTooltip>
            <UiTooltip text="Left tooltip" position="left">
                <UiButton variant="default" size="small">Left</UiButton>
            </UiTooltip>
            <UiTooltip text="Right tooltip" position="right">
                <UiButton variant="default" size="small">Right</UiButton>
            </UiTooltip>
        </div>
    </UiCard>

    <!-- UiDropdownMenu -->
    <UiCard variant="outlined">
        <h2>UiDropdownMenu</h2>
        <div class="row">
            <UiDropdownMenu
                :items="[
                    { label: 'Edit', action: 'edit' },
                    { label: 'Duplicate', action: 'duplicate' },
                    { label: 'Archive', action: 'archive', disabled: true },
                    { label: 'Delete', action: 'delete', variant: 'danger' },
                ]"
                @action="lastAction = $event"
            >
                <UiButton variant="default" size="small">Actions</UiButton>
            </UiDropdownMenu>
            <UiDropdownMenu
                align="right"
                :items="[
                    { label: 'Profile', action: 'profile' },
                    { label: 'Settings', action: 'settings' },
                    { label: 'Logout', action: 'logout', variant: 'danger' },
                ]"
                @action="lastAction = $event"
            >
                <UiButton variant="primary" size="small">Right-aligned</UiButton>
            </UiDropdownMenu>
        </div>
        <p v-if="lastAction">Last action: {{ lastAction }}</p>
    </UiCard>

    <!-- UiModal -->
    <UiCard variant="outlined">
        <h2>UiModal</h2>
        <UiCard row>
            <UiButton variant="primary" @click="showModal = true">Open Modal</UiButton>
            <label><input type="checkbox" v-model="modalError" true-value="Something went wrong!" false-value="" /> Show Error</label>
            <label><input type="checkbox" v-model="modalWarning" true-value="Please be careful" false-value="" /> Show Warning</label>
        </UiCard>
        <UiModal
            v-if="showModal"
            title="Example Modal"
            confirm-text="Save"
            :error-text="modalError"
            :warning-text="modalWarning"
            info-text="This is informational"
            @close="showModal = false"
            @confirm="showModal = false"
            @cancel="showModal = false"
        >
            <p>This is the modal body content. You can put forms and other content here.</p>
        </UiModal>
    </UiCard>

    <!-- UiPopover -->
    <UiCard variant="outlined">
        <h2>UiPopover</h2>
        <UiCard row>
            <UiButton variant="primary" @click="popoverType = 'success'; popoverMessage = 'Action completed successfully!'; showPopover = true">
                Show Success
            </UiButton>
            <UiButton variant="danger" @click="popoverType = 'error'; popoverMessage = 'Something went wrong!'; showPopover = true">
                Show Error
            </UiButton>
        </UiCard>
        <UiPopover
            v-if="showPopover"
            :message="popoverMessage"
            :type="popoverType"
            :duration="3000"
            @close="showPopover = false"
        />
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

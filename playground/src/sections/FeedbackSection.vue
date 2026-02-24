<script setup lang="ts">
import { ref } from 'vue'
import { UiCard, UiAlert, UiButton, UiLoader } from '@lib'

const showDismissibleAlert = ref(true)
</script>

<template>
    <!-- UiAlert -->
    <UiCard variant="outlined">
        <h2>UiAlert</h2>
        <UiAlert type="info" message="This is an informational alert." />
        <UiAlert type="success" message="Operation completed successfully!" />
        <UiAlert type="warning" message="Please review the changes before continuing." />
        <UiAlert type="error" message="An error occurred while processing your request." />
        <UiAlert
            v-if="showDismissibleAlert"
            type="info"
            message="This alert can be dismissed."
            dismissible
            @dismiss="showDismissibleAlert = false"
        >
            <p style="margin: 0.5em 0 0; font-size: 0.875em;">Additional details can go in the slot.</p>
        </UiAlert>
        <UiButton
            v-if="!showDismissibleAlert"
            size="small"
            @click="showDismissibleAlert = true"
        >Show Dismissible Alert</UiButton>
    </UiCard>

    <!-- UiLoader -->
    <UiCard variant="outlined">
        <h2>UiLoader</h2>
        <div class="row">
            <UiLoader size="small" />
            <UiLoader size="medium" />
            <UiLoader size="large" />
            <UiLoader variant="dots" size="small" />
            <UiLoader variant="dots" size="medium" />
            <UiLoader variant="dots" size="large" />
        </div>
        <UiLoader size="medium" label="Loading data..." />
        <div style="position: relative; height: 100px; border: 1px dashed var(--ui-card-border-color); border-radius: 6px;">
            <UiLoader overlay label="Loading..." />
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

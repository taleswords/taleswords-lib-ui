<script setup lang="ts">
import { ref } from 'vue'
import { CardBase, ButtonBase } from '@lib'

const isLoading = ref(false)
</script>

<template>
    <div class="page" data-testid="page-cards">
        <h1>Cards</h1>

        <CardBase title="Basic Card" description="A card with title and description">
            <p>This is the card content area. You can put any content here.</p>
        </CardBase>

        <CardBase title="Card with Actions">
            <p>This card has action buttons in the header.</p>
            <template #actions>
                <ButtonBase variant="ghost" size="small" label="Edit" />
                <ButtonBase variant="primary" size="small" label="Save" />
            </template>
        </CardBase>

        <CardBase>
            <template #header>
                <div class="custom-card-header">
                    <h3>Custom Header Slot</h3>
                    <span class="custom-card-header__badge">New</span>
                </div>
            </template>
            <p>This card uses a custom header slot instead of the title prop.</p>
        </CardBase>

        <CardBase title="Loading Card" :is-loading="isLoading">
            <p>Toggle the loading state to see the overlay.</p>
            <template #actions>
                <ButtonBase
                    size="small"
                    :variant="isLoading ? 'danger' : 'secondary'"
                    :label="isLoading ? 'Stop' : 'Load'"
                    @click="isLoading = !isLoading"
                />
            </template>
        </CardBase>
    </div>
</template>

<style scoped>
.custom-card-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
}

.custom-card-header h3 {
    margin: 0;
    font-size: 1rem;
}

.custom-card-header__badge {
    font-size: 0.6875rem;
    font-weight: 600;
    padding: 0.125rem 0.5rem;
    border-radius: 1rem;
    background: var(--button-primary-bg);
    color: var(--button-primary-text);
}
</style>

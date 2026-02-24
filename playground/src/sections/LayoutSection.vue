<script setup lang="ts">
import { UiCard, UiActionsHeader, UiButton } from '@lib'
</script>

<template>
    <!-- UiCard -->
    <UiCard variant="outlined">
        <h2>UiCard</h2>
        <div class="row">
            <UiCard>Default</UiCard>
            <UiCard variant="elevated">Elevated</UiCard>
            <UiCard variant="outlined">Outlined</UiCard>
        </div>
    </UiCard>

    <!-- UiActionsHeader -->
    <UiCard variant="outlined">
        <h2>UiActionsHeader</h2>
        <p>When UiActionsHeader is first child in a card, it becomes flush with the card edges:</p>
        <UiCard>
            <UiActionsHeader title="Users List">
                <UiButton variant="primary" size="small" icon="plus">Add User</UiButton>
            </UiActionsHeader>
            <p>Card content goes here...</p>
        </UiCard>
        <UiCard>
            <UiActionsHeader title="Settings">
                <UiButton variant="ghost" size="small" icon="cog" />
            </UiActionsHeader>
            <p>More content...</p>
        </UiCard>
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

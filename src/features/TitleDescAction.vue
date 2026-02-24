<script setup lang="ts">
export interface TitleDescActionProps {
    title?: string
    description?: string
    testId?: string
}

defineSlots<{
    default?: () => unknown
    action?: () => unknown
}>()

withDefaults(defineProps<TitleDescActionProps>(), {
    testId: 'title-desc-action',
})
</script>

<template>
    <div class="title-desc-action" :data-testid="testId">
        <div class="title-desc-action__row">
            <div class="title-desc-action__title">
                <slot>
                    <h2 v-if="title" class="title-desc-action__heading">{{ title }}</h2>
                </slot>
            </div>
            <div v-if="$slots.action" class="title-desc-action__actions">
                <slot name="action" />
            </div>
        </div>
        <p v-if="description" class="title-desc-action__description">{{ description }}</p>
    </div>
</template>

<style scoped>
.title-desc-action__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}

.title-desc-action__title {
    min-width: 0;
}

.title-desc-action__heading {
    font-family: var(--font-heading);
    font-size: 1.5em;
    font-weight: 600;
    color: var(--general-text-color);
    margin: 0;
}

.title-desc-action__actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
}

.title-desc-action__description {
    margin: 0.25rem 0 0;
    font-family: var(--font-ui);
    font-size: 0.875em;
    color: var(--form-field-description-color);
}
</style>

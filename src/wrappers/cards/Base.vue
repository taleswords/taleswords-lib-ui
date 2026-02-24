<script setup lang="ts">
import TitleDescAction from '../../features/TitleDescAction.vue'
import LoaderBase from '../../info/loaders/Base.vue'

export interface CardBaseProps {
    title?: string
    description?: string
    isLoading?: boolean
    testId?: string
}

defineSlots<{
    header?: () => unknown
    default?: () => unknown
    actions?: () => unknown
}>()

withDefaults(defineProps<CardBaseProps>(), {
    isLoading: false,
    testId: 'card-base',
})
</script>

<template>
    <div class="card-base" :data-testid="testId">
        <slot name="header">
            <TitleDescAction
                v-if="title || $slots.actions"
                :title="title"
                :description="description"
                class="card-base__header"
            >
                <template v-if="$slots.actions" #action>
                    <slot name="actions" />
                </template>
            </TitleDescAction>
        </slot>

        <div class="card-base__content">
            <slot />
        </div>

        <LoaderBase v-if="isLoading" :is-overlay="true" label="Loading" />
    </div>
</template>

<style scoped>
.card-base {
    position: relative;
    background: var(--general-card-bg);
    border: 1px solid var(--general-card-border);
    border-radius: var(--button-border-radius);
    box-shadow: var(--general-card-shadow);
    overflow: hidden;
}

.card-base__header {
    padding: 1rem 1.25rem 0;
}

.card-base__content {
    padding: 1rem 1.25rem;
}
</style>

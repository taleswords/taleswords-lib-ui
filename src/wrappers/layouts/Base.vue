<script setup lang="ts">
import TitleDescAction from '../../features/TitleDescAction.vue'
import LoaderBase from '../../info/loaders/Base.vue'

export interface LayoutBaseProps {
    title?: string
    description?: string
    isLoading?: boolean
    testId?: string
}

defineSlots<{
    breadcrumbs?: () => unknown
    actions?: () => unknown
    default?: () => unknown
}>()

withDefaults(defineProps<LayoutBaseProps>(), {
    isLoading: false,
    testId: 'layout-base',
})
</script>

<template>
    <div class="layout-base" :data-testid="testId">
        <div v-if="$slots.breadcrumbs" class="layout-base__breadcrumbs">
            <slot name="breadcrumbs" />
        </div>

        <TitleDescAction
            v-if="title || $slots.actions"
            :title="title"
            :description="description"
            class="layout-base__header"
        >
            <template v-if="$slots.actions" #action>
                <slot name="actions" />
            </template>
        </TitleDescAction>

        <div class="layout-base__content">
            <slot />
        </div>

        <LoaderBase v-if="isLoading" :is-overlay="true" label="Loading" />
    </div>
</template>

<style scoped>
.layout-base {
    position: relative;
    min-height: 200px;
}

.layout-base__breadcrumbs {
    margin-bottom: 0.75rem;
}

.layout-base__header {
    margin-bottom: 1.5rem;
}

.layout-base__content {
    /* content flows naturally */
}
</style>

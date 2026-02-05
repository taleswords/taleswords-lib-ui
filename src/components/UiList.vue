<script setup lang="ts">
import type { UiListProps } from '../types'

const props = withDefaults(defineProps<UiListProps>(), {
    maxHeight: 'none',
})
</script>

<template>
    <div
        class="ui-list"
        role="list"
        :style="{ maxHeight: props.maxHeight }"
    >
        <div class="ui-list__items">
            <slot />
        </div>
        <div v-if="$slots.footer" class="ui-list__footer">
            <slot name="footer" />
        </div>
    </div>
</template>

<style scoped>
.ui-list {
    display: flex;
    flex-direction: column;
    background-color: var(--ui-card-bg);
    border: 1px solid var(--ui-card-border-color);
    border-radius: 6px;
    overflow: hidden;
}

.ui-list__items {
    flex: 1;
    overflow-y: auto;
}

.ui-list__items > :deep(:last-child) {
    border-bottom: none;
}

.ui-list__footer {
    border-top: 1px solid var(--ui-card-border-color);
    padding: 0.5em;
    background-color: var(--ui-body-bg);
}
</style>

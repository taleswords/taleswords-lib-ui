<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import type { UiPathListProps, UiPathItem } from '../types'

const props = withDefaults(defineProps<UiPathListProps>(), {
    maxHeight: '300px',
})

const emit = defineEmits<{
    select: [item: UiPathItem, index: number]
}>()

const containerRef = ref<HTMLElement | null>(null)

function handleSelect(item: UiPathItem, index: number) {
    emit('select', item, index)
}

function isSelected(item: UiPathItem) {
    return props.selectedId !== undefined && item.id === props.selectedId
}

function isLast(index: number) {
    return index === props.items.length - 1
}

// Auto-scroll to bottom when items change
watch(() => props.items.length, async () => {
    await nextTick()
    if (containerRef.value) {
        containerRef.value.scrollTop = containerRef.value.scrollHeight
    }
})
</script>

<template>
    <div
        ref="containerRef"
        class="ui-path-list"
        :style="{ maxHeight: props.maxHeight }"
        role="navigation"
        aria-label="Path navigation"
    >
        <button
            v-for="(item, index) in props.items"
            :key="item.id"
            class="ui-path-list__item"
            :class="{
                'ui-path-list__item--selected': isSelected(item),
                'ui-path-list__item--current': isLast(index),
            }"
            @click="handleSelect(item, index)"
        >
            <span class="ui-path-list__connector">
                <span v-if="index > 0" class="ui-path-list__line" />
                <span class="ui-path-list__dot" />
            </span>
            <span class="ui-path-list__label">{{ item.label }}</span>
        </button>
    </div>
</template>

<style scoped>
.ui-path-list {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    background-color: var(--ui-card-bg);
    border: 1px solid var(--ui-card-border-color);
    border-radius: 6px;
    padding: 0.5em 0;
}

.ui-path-list__item {
    display: flex;
    align-items: center;
    gap: 0.75em;
    padding: 0.5em 1em;
    border: none;
    background: transparent;
    color: var(--ui-text-color);
    text-align: left;
    cursor: pointer;
    transition: background-color 0.15s;
    font-family: inherit;
    font-size: 0.875em;
    min-width: 0;
}

.ui-path-list__item:hover {
    background-color: var(--ui-button-default-hover-bg);
}

.ui-path-list__item--selected {
    background-color: var(--ui-input-focus-border-color);
    color: white;
}

.ui-path-list__item--selected:hover {
    background-color: var(--ui-link-color);
}

.ui-path-list__item--current {
    font-weight: 600;
}

.ui-path-list__connector {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 12px;
    flex-shrink: 0;
    position: relative;
}

.ui-path-list__line {
    position: absolute;
    bottom: 50%;
    width: 2px;
    height: 24px;
    background-color: var(--ui-card-border-color);
}

.ui-path-list__item--selected .ui-path-list__line {
    background-color: rgba(255, 255, 255, 0.4);
}

.ui-path-list__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--ui-secondary-btn);
    flex-shrink: 0;
    position: relative;
    z-index: 1;
}

.ui-path-list__item--current .ui-path-list__dot {
    background-color: var(--ui-primary-btn);
    width: 10px;
    height: 10px;
}

.ui-path-list__item--selected .ui-path-list__dot {
    background-color: white;
}

.ui-path-list__label {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.ui-path-list__item:focus-visible {
    outline: 2px solid var(--ui-input-focus-border-color);
    outline-offset: -2px;
}
</style>

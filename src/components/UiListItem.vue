<script setup lang="ts">
import type { UiListItemProps } from '../types'

const props = withDefaults(defineProps<UiListItemProps>(), {
    hasChildren: false,
    selected: false,
    active: false,
    disabled: false,
})

const emit = defineEmits<{
    click: [event: MouseEvent]
    dblclick: [event: MouseEvent]
    expand: []
}>()

function handleClick(e: MouseEvent) {
    if (props.disabled) return
    emit('click', e)
}

function handleDblClick(e: MouseEvent) {
    if (props.disabled) return
    emit('dblclick', e)
}

function handleKeydown() {
    if (props.disabled) return
    emit('click', new MouseEvent('click'))
}

function handleExpand(e: MouseEvent) {
    e.stopPropagation()
    if (props.disabled) return
    emit('expand')
}
</script>

<template>
    <div
        class="ui-list-item"
        :class="{
            'ui-list-item--selected': props.selected,
            'ui-list-item--active': props.active,
            'ui-list-item--disabled': props.disabled,
            'ui-list-item--has-children': props.hasChildren,
        }"
        role="listitem"
        :tabindex="props.disabled ? -1 : 0"
        @click="handleClick"
        @dblclick="handleDblClick"
        @keydown.enter="handleKeydown"
        @keydown.space.prevent="handleKeydown"
    >
        <button
            v-if="props.hasChildren"
            class="ui-list-item__expand"
            :disabled="props.disabled"
            @click="handleExpand"
        >
            <i class="icon-right" />
        </button>
        <div class="ui-list-item__content">
            <slot />
        </div>
        <div v-if="$slots.actions" class="ui-list-item__actions" @click.stop>
            <slot name="actions" />
        </div>
    </div>
</template>

<style scoped>
.ui-list-item {
    display: flex;
    align-items: center;
    gap: 0.5em;
    padding: 0.75em 1em;
    background-color: var(--ui-card-bg);
    border-bottom: 1px solid var(--ui-card-border-color);
    cursor: pointer;
    transition: background-color 0.15s, border-color 0.15s;
    user-select: none;
}

.ui-list-item:hover:not(.ui-list-item--disabled) {
    background-color: var(--ui-button-default-hover-bg);
}

.ui-list-item--selected {
    background-color: var(--ui-input-focus-border-color);
    color: white;
}

.ui-list-item--selected:hover:not(.ui-list-item--disabled) {
    background-color: var(--ui-link-color);
}

.ui-list-item--active {
    border-left: 3px solid var(--ui-primary-btn);
    padding-left: calc(1em - 3px);
}

.ui-list-item--disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.ui-list-item__expand {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    min-width: 24px;
    padding: 0;
    border: none;
    border-radius: 4px;
    background: transparent;
    color: inherit;
    cursor: pointer;
    transition: background-color 0.15s, transform 0.15s;
}

.ui-list-item__expand:hover:not(:disabled) {
    background-color: rgba(0, 0, 0, 0.1);
}

.ui-list-item--selected .ui-list-item__expand:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.2);
}

.ui-list-item__expand i {
    font-size: 0.875em;
    transition: transform 0.15s;
}

.ui-list-item__expand i::before {
    margin: 0;
    width: auto;
}

.ui-list-item__content {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.ui-list-item__actions {
    display: flex;
    gap: 0.25em;
    opacity: 0;
    transition: opacity 0.15s;
}

.ui-list-item:hover .ui-list-item__actions,
.ui-list-item--selected .ui-list-item__actions,
.ui-list-item:focus-within .ui-list-item__actions {
    opacity: 1;
}

.ui-list-item:focus-visible {
    outline: 2px solid var(--ui-input-focus-border-color);
    outline-offset: -2px;
}
</style>

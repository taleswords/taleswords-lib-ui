<script setup lang="ts">
import type { UiButtonProps } from '../types'

const props = withDefaults(defineProps<UiButtonProps>(), {
    variant: 'default',
    size: 'medium',
    disabled: false,
})
</script>

<template>
    <button
        class="ui-button"
        :class="[`ui-button--${props.variant}`, `ui-button--${props.size}`]"
        :disabled="props.disabled"
    >
        <slot />
    </button>
</template>

<style scoped>
.ui-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: "Raleway", system-ui, sans-serif;
    font-weight: 500;
    font-size: 1em;
    padding-block: 12px;
    padding-inline: 1em;
    min-width: 8em;
    border-radius: 6px;
    border: 1px solid transparent;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s, opacity 0.3s, border-color 0.3s;
}

.ui-button:disabled {
    pointer-events: none;
    opacity: 0.65;
}

.ui-button:focus-visible {
    outline: 2px solid var(--ui-input-focus-border-color);
    outline-offset: 2px;
}

.ui-button--small {
    padding-block: 6px;
    padding-inline: 0.75em;
    font-size: 0.875em;
    min-width: 6em;
}

/* Default variant */
.ui-button--default {
    background-color: var(--ui-button-default);
    border: 1px solid var(--ui-button-default-border);
    color: var(--ui-button-default-text);
}

.ui-button--default:hover:not(:disabled) {
    background-color: var(--ui-button-default-hover-bg);
    border-color: var(--ui-button-default-hover-border);
}

/* Primary variant */
.ui-button--primary {
    background-color: var(--ui-primary-btn);
    color: var(--ui-text-color);
}

.ui-button--primary:hover:not(:disabled) {
    background-color: var(--ui-primary-btn-hover);
    box-shadow: var(--ui-primary-btn-hover-shadow);
}

/* Secondary variant */
.ui-button--secondary {
    background-color: var(--ui-secondary-btn);
    color: var(--ui-text-color);
}

.ui-button--secondary:hover:not(:disabled) {
    background-color: var(--ui-secondary-btn-hover);
    box-shadow: var(--ui-primary-btn-hover-shadow);
}

/* Danger variant */
.ui-button--danger {
    background-color: var(--ui-button-danger);
    color: var(--ui-button-danger-text);
}

.ui-button--danger:hover:not(:disabled) {
    background-color: var(--ui-button-danger-hover);
    box-shadow: var(--ui-button-danger-hover-shadow);
}

@media only screen and (min-width: 840px) {
    .ui-button {
        padding-block: 8px;
    }
}
</style>

<script setup lang="ts">
import type { UiButtonProps } from '../types'

const props = withDefaults(defineProps<UiButtonProps>(), {
    variant: 'default',
    size: 'medium',
    disabled: false,
    iconPosition: 'left',
})
</script>

<template>
    <button
        class="ui-button"
        :class="[
            `ui-button--${props.variant}`,
            `ui-button--${props.size}`,
            { 'ui-button--icon-only': props.icon && !$slots.default },
        ]"
        :disabled="props.disabled"
    >
        <i
            v-if="props.icon && props.iconPosition === 'left'"
            class="ui-button__icon ui-button__icon--left"
            :class="`icon-${props.icon}`"
        />
        <slot />
        <i
            v-if="props.icon && props.iconPosition === 'right'"
            class="ui-button__icon ui-button__icon--right"
            :class="`icon-${props.icon}`"
        />
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

/* Ghost variant (neutral) */
.ui-button--ghost {
    background-color: transparent;
    border-color: transparent;
    color: var(--ui-text-color);
}

.ui-button--ghost:hover:not(:disabled) {
    background-color: var(--ui-button-default-hover-bg);
}

/* Ghost primary variant */
.ui-button--ghost-primary {
    background-color: transparent;
    border-color: transparent;
    color: var(--ui-link-color);
}

.ui-button--ghost-primary:hover:not(:disabled) {
    background-color: rgba(69, 123, 157, 0.1);
    color: var(--ui-link-hover);
}

/* Ghost danger variant */
.ui-button--ghost-danger {
    background-color: transparent;
    border-color: transparent;
    color: var(--ui-error-text-color);
}

.ui-button--ghost-danger:hover:not(:disabled) {
    background-color: rgba(230, 57, 70, 0.1);
    color: var(--ui-button-danger-hover);
}

.ui-button__icon {
    line-height: 1;
}

.ui-button__icon::before {
    margin: 0;
    width: auto;
}

.ui-button__icon--left {
    margin-right: 0.5em;
}

.ui-button__icon--right {
    margin-left: 0.5em;
}

.ui-button--icon-only {
    min-width: auto;
    padding-inline: 0.75em;
}

.ui-button--icon-only .ui-button__icon {
    margin: 0;
}

@media only screen and (min-width: 840px) {
    .ui-button {
        padding-block: 8px;
    }
}
</style>

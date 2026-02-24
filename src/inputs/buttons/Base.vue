<script setup lang="ts">
import { computed } from 'vue'
import { resolveNavigationTag, resolveNavigationAttrs, type NavigationProps } from '../../utils/navigation'

export type ButtonVariant = 'default' | 'primary' | 'secondary' | 'danger' | 'ghost' | 'ghost-primary' | 'ghost-danger'
export type ButtonSize = 'small' | 'medium'

export interface ButtonBaseProps extends NavigationProps {
    variant?: ButtonVariant
    size?: ButtonSize
    icon?: string
    iconPosition?: 'left' | 'right'
    isDisabled?: boolean
    label?: string
}

const props = withDefaults(defineProps<ButtonBaseProps>(), {
    variant: 'default',
    size: 'medium',
    iconPosition: 'left',
    isDisabled: false,
})

defineEmits<{ click: [event: MouseEvent] }>()

const tag = computed(() => resolveNavigationTag(props))
const navAttrs = computed(() => resolveNavigationAttrs(props))

const isIconOnly = computed(() => !!props.icon && !props.label)
</script>

<template>
    <component
        :is="tag"
        class="button"
        :class="[
            `button--${props.variant}`,
            `button--${props.size}`,
            { 'button--icon-only': isIconOnly, 'is-disabled': props.isDisabled },
        ]"
        v-bind="navAttrs"
        :disabled="tag === 'button' ? props.isDisabled || undefined : undefined"
        :aria-disabled="tag !== 'button' && props.isDisabled ? 'true' : undefined"
        data-testid="button-base"
        @click="$emit('click', $event)"
    >
        <span
            v-if="props.icon && props.iconPosition === 'left'"
            class="material-symbols-rounded button__icon button__icon--left"
            aria-hidden="true"
        >{{ props.icon }}</span>
        <span v-if="props.label" class="button__label">{{ props.label }}</span>
        <slot v-else />
        <span
            v-if="props.icon && props.iconPosition === 'right'"
            class="material-symbols-rounded button__icon button__icon--right"
            aria-hidden="true"
        >{{ props.icon }}</span>
    </component>
</template>

<style scoped>
.button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: var(--button-font);
    font-weight: var(--button-weight);
    font-size: var(--button-size);
    line-height: var(--button-leading);
    padding-block: 10px;
    padding-inline: 1em;
    min-width: 8em;
    border-radius: var(--button-border-radius);
    border: 1px solid transparent;
    cursor: pointer;
    text-decoration: none;
    transition: var(--button-transition);
}

.button.is-disabled {
    pointer-events: none;
    cursor: default;
}

.button:focus-visible {
    outline: none;
    border-color: var(--general-focus-ring);
    box-shadow: 0 0 0 2px var(--general-focus-ring);
}

/* Sizes */
.button--small {
    padding-block: 6px;
    padding-inline: 0.75em;
    font-size: var(--button-size-sm);
    min-width: 6em;
}

/* Default variant */
.button--default {
    background-color: var(--button-default-bg);
    border-color: var(--button-default-border);
    color: var(--button-default-text);
}

.button--default:hover:not(:disabled):not(.is-disabled) {
    background-color: var(--button-default-bg-hover);
    border-color: var(--button-default-border-hover);
}

.button--default.is-disabled {
    background-color: var(--button-default-bg-disabled);
    color: var(--button-default-text-disabled);
    border-color: var(--button-default-border-disabled);
}

/* Primary variant */
.button--primary {
    background-color: var(--button-primary-bg);
    color: var(--button-primary-text);
}

.button--primary:hover:not(:disabled):not(.is-disabled) {
    background-color: var(--button-primary-bg-hover);
    box-shadow: var(--button-primary-shadow-hover);
}

.button--primary.is-disabled {
    background-color: var(--button-primary-bg-disabled);
    color: var(--button-primary-text-disabled);
}

/* Secondary variant */
.button--secondary {
    background-color: var(--button-secondary-bg);
    color: var(--button-secondary-text);
}

.button--secondary:hover:not(:disabled):not(.is-disabled) {
    background-color: var(--button-secondary-bg-hover);
    box-shadow: var(--button-secondary-shadow-hover);
}

.button--secondary.is-disabled {
    background-color: var(--button-secondary-bg-disabled);
    color: var(--button-secondary-text-disabled);
}

/* Danger variant */
.button--danger {
    background-color: var(--button-danger-bg);
    color: var(--button-danger-text);
}

.button--danger:hover:not(:disabled):not(.is-disabled) {
    background-color: var(--button-danger-bg-hover);
    box-shadow: var(--button-danger-shadow-hover);
}

.button--danger.is-disabled {
    background-color: var(--button-danger-bg-disabled);
    color: var(--button-danger-text-disabled);
}

/* Ghost variant */
.button--ghost {
    background-color: var(--button-ghost-bg);
    color: var(--button-ghost-text);
    border-color: transparent;
}

.button--ghost:hover:not(:disabled):not(.is-disabled) {
    background-color: var(--button-ghost-bg-hover);
}

.button--ghost.is-disabled {
    color: var(--button-ghost-text-disabled);
}

/* Ghost primary variant */
.button--ghost-primary {
    background-color: transparent;
    color: var(--button-ghost-primary-text);
    border-color: transparent;
}

.button--ghost-primary:hover:not(:disabled):not(.is-disabled) {
    background-color: var(--button-ghost-primary-bg-hover);
    color: var(--button-ghost-primary-text-hover);
}

.button--ghost-primary.is-disabled {
    color: var(--button-ghost-primary-text-disabled);
}

/* Ghost danger variant */
.button--ghost-danger {
    background-color: transparent;
    color: var(--button-ghost-danger-text);
    border-color: transparent;
}

.button--ghost-danger:hover:not(:disabled):not(.is-disabled) {
    background-color: var(--button-ghost-danger-bg-hover);
    color: var(--button-ghost-danger-text-hover);
}

.button--ghost-danger.is-disabled {
    color: var(--button-ghost-danger-text-disabled);
}

/* Icon */
.button__icon {
    line-height: 1;
    font-size: 1.25em;
}

.button__icon--left {
    margin-right: 0.5em;
}

.button__icon--right {
    margin-left: 0.5em;
}

/* Icon only */
.button--icon-only {
    min-width: auto;
    padding-inline: 0.75em;
}

.button--icon-only .button__icon {
    margin: 0;
}
</style>

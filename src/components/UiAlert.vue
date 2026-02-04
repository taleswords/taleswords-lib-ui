<script setup lang="ts">
import type { UiAlertProps } from '../types'

const props = withDefaults(defineProps<UiAlertProps>(), {
    type: 'info',
    dismissible: false,
})

const emit = defineEmits<{ dismiss: [] }>()
</script>

<template>
    <div
        class="ui-alert"
        :class="[`ui-alert--${props.type}`]"
        role="alert"
    >
        <span class="ui-alert__icon">
            <template v-if="props.type === 'info'">&#9432;</template>
            <template v-else-if="props.type === 'success'">&#10004;</template>
            <template v-else>&#9888;</template>
        </span>
        <div class="ui-alert__body">
            <p class="ui-alert__message">{{ props.message }}</p>
            <slot />
        </div>
        <button
            v-if="props.dismissible"
            class="ui-alert__dismiss"
            aria-label="Dismiss alert"
            @click="emit('dismiss')"
        >&times;</button>
    </div>
</template>

<style scoped>
.ui-alert {
    display: flex;
    align-items: start;
    gap: 0.75em;
    padding: 1em;
    border: 1px solid;
    border-radius: 6px;
}

.ui-alert__icon {
    font-size: 1.25em;
    line-height: 1;
    flex-shrink: 0;
}

.ui-alert__body {
    flex: 1;
    min-width: 0;
}

.ui-alert__message {
    margin: 0;
}

.ui-alert__dismiss {
    background: none;
    border: none;
    font-size: 1.25em;
    cursor: pointer;
    padding: 0;
    line-height: 1;
    opacity: 0.7;
    transition: opacity 0.2s;
    color: inherit;
}

.ui-alert__dismiss:hover {
    opacity: 1;
}

/* Info */
.ui-alert--info {
    background-color: var(--ui-alert-info-bg);
    border-color: var(--ui-alert-info-border);
    color: var(--ui-alert-info-text);
}

.ui-alert--info .ui-alert__icon {
    color: var(--ui-alert-info-icon);
}

/* Success */
.ui-alert--success {
    background-color: var(--ui-alert-success-bg);
    border-color: var(--ui-alert-success-border);
    color: var(--ui-alert-success-text);
}

.ui-alert--success .ui-alert__icon {
    color: var(--ui-alert-success-icon);
}

/* Warning */
.ui-alert--warning {
    background-color: var(--ui-alert-warning-bg);
    border-color: var(--ui-alert-warning-border);
    color: var(--ui-alert-warning-text);
}

.ui-alert--warning .ui-alert__icon {
    color: var(--ui-alert-warning-icon);
}

/* Error */
.ui-alert--error {
    background-color: var(--ui-alert-error-bg);
    border-color: var(--ui-alert-error-border);
    color: var(--ui-alert-error-text);
}

.ui-alert--error .ui-alert__icon {
    color: var(--ui-alert-error-icon);
}
</style>

<script setup lang="ts">
import type { UiLoaderProps } from '../types'

const props = withDefaults(defineProps<UiLoaderProps>(), {
    size: 'medium',
    variant: 'spinner',
    overlay: false,
})
</script>

<template>
    <div
        class="ui-loader"
        :class="{
            'ui-loader--overlay': props.overlay,
            [`ui-loader--${props.size}`]: true,
        }"
        role="status"
        aria-live="polite"
        :aria-label="props.label || 'Loading'"
    >
        <div v-if="props.variant === 'spinner'" class="ui-loader__spinner" />
        <div v-else class="ui-loader__dots">
            <span class="ui-loader__dot" />
            <span class="ui-loader__dot" />
            <span class="ui-loader__dot" />
        </div>
        <span v-if="props.label" class="ui-loader__label">{{ props.label }}</span>
    </div>
</template>

<style scoped>
.ui-loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75em;
}

.ui-loader--overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--ui-loader-overlay-bg);
    z-index: 10;
}

/* Sizes */
.ui-loader--small .ui-loader__spinner {
    width: 16px;
    height: 16px;
    border-width: 2px;
}

.ui-loader--medium .ui-loader__spinner {
    width: 32px;
    height: 32px;
    border-width: 3px;
}

.ui-loader--large .ui-loader__spinner {
    width: 48px;
    height: 48px;
    border-width: 4px;
}

/* Spinner */
.ui-loader__spinner {
    border-style: solid;
    border-color: var(--ui-loader-secondary-color);
    border-top-color: var(--ui-loader-color);
    border-radius: 50%;
    animation: ui-loader-spin 0.8s linear infinite;
    box-sizing: border-box;
}

@keyframes ui-loader-spin {
    to { transform: rotate(360deg); }
}

/* Dots */
.ui-loader__dots {
    display: flex;
    gap: 0.375em;
    align-items: center;
}

.ui-loader--small .ui-loader__dot {
    width: 5px;
    height: 5px;
}

.ui-loader--medium .ui-loader__dot {
    width: 10px;
    height: 10px;
}

.ui-loader--large .ui-loader__dot {
    width: 14px;
    height: 14px;
}

.ui-loader__dot {
    border-radius: 50%;
    background-color: var(--ui-loader-color);
    animation: ui-loader-bounce 1.2s ease-in-out infinite;
}

.ui-loader__dot:nth-child(2) {
    animation-delay: 0.15s;
}

.ui-loader__dot:nth-child(3) {
    animation-delay: 0.3s;
}

@keyframes ui-loader-bounce {
    0%, 80%, 100% { transform: scale(0.5); opacity: 0.5; }
    40% { transform: scale(1); opacity: 1; }
}

.ui-loader__label {
    font-family: "Raleway", system-ui, sans-serif;
    font-size: 0.875em;
    color: var(--ui-loader-label-color);
}
</style>

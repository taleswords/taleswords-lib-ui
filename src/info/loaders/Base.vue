<script setup lang="ts">
import LoaderIcon from './Icon.vue'
import type { LoaderIconSize } from './Icon.vue'

export type LoaderVariant = 'spinner' | 'dots'

export interface LoaderBaseProps {
    size?: LoaderIconSize
    variant?: LoaderVariant
    label?: string
    isOverlay?: boolean
}

withDefaults(defineProps<LoaderBaseProps>(), {
    size: 'medium',
    variant: 'spinner',
    isOverlay: false,
})
</script>

<template>
    <div
        class="loader"
        :class="{
            'loader--overlay': isOverlay,
            [`loader--${size}`]: true,
        }"
        role="status"
        aria-live="polite"
        :aria-label="label || 'Loading'"
        data-testid="loader-base"
    >
        <LoaderIcon v-if="variant === 'spinner'" :size="size" />
        <div v-else class="loader__dots">
            <span class="loader__dot" />
            <span class="loader__dot" />
            <span class="loader__dot" />
        </div>
        <span v-if="label" class="loader__label">{{ label }}</span>
    </div>
</template>

<style scoped>
.loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75em;
}

.loader--overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--loader-overlay-bg);
    z-index: 10;
}

/* Dots */
.loader__dots {
    display: flex;
    gap: 0.375em;
    align-items: center;
}

.loader__dot {
    border-radius: 50%;
    background-color: var(--loader-color);
    animation: loader-bounce 1.2s ease-in-out infinite;
}

.loader--small .loader__dot {
    width: 5px;
    height: 5px;
}

.loader--medium .loader__dot {
    width: 10px;
    height: 10px;
}

.loader--large .loader__dot {
    width: 14px;
    height: 14px;
}

.loader__dot:nth-child(2) {
    animation-delay: 0.15s;
}

.loader__dot:nth-child(3) {
    animation-delay: 0.3s;
}

@keyframes loader-bounce {
    0%, 80%, 100% {
        transform: scale(0.5);
        opacity: 0.5;
    }
    40% {
        transform: scale(1);
        opacity: 1;
    }
}

.loader__label {
    font-family: var(--font-heading);
    font-size: 0.875em;
    color: var(--loader-label-color);
}
</style>

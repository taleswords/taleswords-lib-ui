<script setup lang="ts">
export type LoaderIconSize = 'small' | 'medium' | 'large'

export interface LoaderIconProps {
    size?: LoaderIconSize
}

withDefaults(defineProps<LoaderIconProps>(), {
    size: 'medium',
})
</script>

<template>
    <div
        class="loader-icon"
        :class="[`loader-icon--${size}`]"
        role="img"
        aria-hidden="true"
        data-testid="loader-icon"
    />
</template>

<style scoped>
.loader-icon {
    border-style: solid;
    border-color: var(--loader-secondary-color);
    border-top-color: var(--loader-color);
    border-radius: 50%;
    animation: loader-icon-spin 0.8s linear infinite;
    box-sizing: border-box;
}

.loader-icon--small {
    width: 16px;
    height: 16px;
    border-width: 2px;
}

.loader-icon--medium {
    width: 32px;
    height: 32px;
    border-width: 3px;
}

.loader-icon--large {
    width: 48px;
    height: 48px;
    border-width: 4px;
}

@keyframes loader-icon-spin {
    to {
        transform: rotate(360deg);
    }
}
</style>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import type { UiPopoverProps } from '../types'

const props = withDefaults(defineProps<UiPopoverProps>(), {
    type: 'success',
    duration: 3000,
})

const emit = defineEmits<{ close: [] }>()

let timer: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
    timer = setTimeout(() => {
        emit('close')
    }, props.duration)
})

onUnmounted(() => {
    if (timer) clearTimeout(timer)
})
</script>

<template>
    <div
        class="ui-popover"
        :class="[`ui-popover--${props.type}`]"
        role="alert"
        aria-live="assertive"
    >
        <span v-if="props.type === 'success'" class="ui-popover__type-icon">&#10004;</span>
        <span v-if="props.type === 'error'" class="ui-popover__type-icon">&#10006;</span>
        <span class="ui-popover__message">{{ props.message }}</span>
        <button
            class="ui-popover__x-button"
            aria-label="Close popover"
            @click="emit('close')"
        >&times;</button>
    </div>
</template>

<style scoped>
.ui-popover {
    padding: 0.5em 0.5em 0.5em 1em;
    border-radius: 6px;
    font-weight: 600;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    position: fixed;
    bottom: 3em;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    opacity: 0;
    animation: ui-popover-slide-up 0.4s forwards;
    display: flex;
    gap: 0.5em;
    align-items: center;
    z-index: 999;
    width: 90%;
    max-width: 400px;
    box-sizing: border-box;
}

@keyframes ui-popover-slide-up {
    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
}

.ui-popover__message {
    flex: 1;
    padding-top: 0.25em;
}

.ui-popover__type-icon {
    font-size: 24px;
    width: 34px;
    text-align: center;
}

.ui-popover--success {
    background-color: var(--ui-success-text-color);
    color: var(--ui-body-bg);
}

.ui-popover--error {
    background-color: var(--ui-error-text-color);
    color: var(--ui-body-bg);
}

.ui-popover__x-button {
    cursor: pointer;
    display: flex;
    width: 44px;
    height: 44px;
    min-width: 44px;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    font-size: 1.25em;
    color: var(--ui-body-bg);
    transition: opacity 0.3s;
}

.ui-popover__x-button:hover {
    opacity: 0.5;
}

@media (max-width: 540px) {
    .ui-popover {
        bottom: 2em;
        width: 95%;
    }
}

@media (min-width: 840px) {
    .ui-popover {
        max-width: 50vw;
    }
}
</style>

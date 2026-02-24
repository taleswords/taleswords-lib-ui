<script setup lang="ts">
import { useToast } from '../../utils/useToast'
import ToastBase from './Base.vue'

export interface ToastAreaProps {
    testId?: string
}

withDefaults(defineProps<ToastAreaProps>(), {
    testId: 'toast-area',
})

const { toasts, removeToast, pauseTimer, resumeTimer } = useToast()
</script>

<template>
    <Teleport to="body">
        <div
            class="toast-area"
            aria-live="polite"
            :data-testid="testId"
        >
            <TransitionGroup name="toast">
                <ToastBase
                    v-for="toast in toasts"
                    :key="toast.id"
                    :id="toast.id"
                    :variant="toast.variant"
                    :message="toast.message"
                    :is-dismissible="toast.isDismissible"
                    @dismiss="removeToast"
                    @mouseenter="pauseTimer(toast.id)"
                    @mouseleave="resumeTimer(toast.id)"
                />
            </TransitionGroup>
        </div>
    </Teleport>
</template>

<style scoped>
.toast-area {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 200;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    pointer-events: none;
}

.toast-area > :deep(*) {
    pointer-events: auto;
}

.toast-enter-active,
.toast-leave-active {
    transition: all 0.3s ease;
}

.toast-enter-from {
    opacity: 0;
    transform: translateX(100%);
}

.toast-leave-to {
    opacity: 0;
    transform: translateX(100%);
}

.toast-move {
    transition: transform 0.3s ease;
}
</style>

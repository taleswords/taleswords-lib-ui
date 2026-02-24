<script setup lang="ts">
import type { ToastVariant } from '../../utils/useToast'

// ── Types ──────────────────────────────────────────

export interface ToastBaseProps {
    id: number
    variant?: ToastVariant
    message: string
    isDismissible?: boolean
    testId?: string
}

// ── Props / Emits ──────────────────────────────────

withDefaults(defineProps<ToastBaseProps>(), {
    variant: 'info',
    isDismissible: true,
    testId: 'toast-base',
})

const emit = defineEmits<{
    dismiss: [id: number]
}>()
</script>

<template>
    <div
        class="toast"
        :class="[`toast--${variant}`]"
        role="alert"
        :data-testid="testId"
    >
        <span class="toast__message">{{ message }}</span>
        <button
            v-if="isDismissible"
            class="toast__dismiss"
            type="button"
            aria-label="Dismiss notification"
            @click="emit('dismiss', id)"
        >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
        </button>
    </div>
</template>

<style scoped>
.toast {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: var(--button-border-radius);
    border-left: 4px solid;
    box-shadow: var(--toast-shadow);
    min-width: 280px;
    max-width: 420px;
    font-family: var(--font-ui);
    font-size: 0.875rem;
}

.toast--info {
    background: var(--alert-info-bg);
    border-color: var(--alert-info-border);
    color: var(--alert-info-text);
}

.toast--success {
    background: var(--alert-success-bg);
    border-color: var(--alert-success-border);
    color: var(--alert-success-text);
}

.toast--warning {
    background: var(--alert-warning-bg);
    border-color: var(--alert-warning-border);
    color: var(--alert-warning-text);
}

.toast--error {
    background: var(--alert-error-bg);
    border-color: var(--alert-error-border);
    color: var(--alert-error-text);
}

.toast__message {
    flex: 1;
    line-height: 1.4;
}

.toast__dismiss {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.125rem;
    color: inherit;
    opacity: 0.7;
    background: none;
    border: none;
    cursor: pointer;
    border-radius: 2px;
    transition: opacity 0.2s;
}

.toast__dismiss:hover {
    opacity: 1;
}
</style>

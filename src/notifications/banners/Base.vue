<script setup lang="ts">
import type { BannerVariant } from '../../utils/useBanner'

// ── Types ──────────────────────────────────────────

export interface BannerBaseProps {
    id: number
    variant?: BannerVariant
    message: string
    isDismissible?: boolean
    hasDontShowAgain?: boolean
    testId?: string
}

// ── Props / Emits ──────────────────────────────────

withDefaults(defineProps<BannerBaseProps>(), {
    variant: 'info',
    isDismissible: true,
    hasDontShowAgain: false,
    testId: 'banner-base',
})

const emit = defineEmits<{
    dismiss: [id: number]
    'dont-show-again': [id: number]
}>()
</script>

<template>
    <div
        class="banner"
        :class="[`banner--${variant}`]"
        role="alert"
        :data-testid="testId"
    >
        <span class="banner__message">{{ message }}</span>
        <div class="banner__actions">
            <button
                v-if="hasDontShowAgain"
                class="banner__action-btn"
                type="button"
                @click="emit('dont-show-again', id)"
            >Don't show again</button>
            <button
                v-if="isDismissible"
                class="banner__dismiss"
                type="button"
                aria-label="Dismiss banner"
                @click="emit('dismiss', id)"
            >
                <span class="material-symbols-rounded" aria-hidden="true">close</span>
            </button>
        </div>
    </div>
</template>

<style scoped>
.banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-lg);
    padding: var(--space-md) var(--space-lg);
    border-radius: var(--button-border-radius);
    border-left: 4px solid;
    font-family: var(--banner-font);
    font-size: var(--banner-size);
}

.banner--info {
    background: var(--alert-info-bg);
    border-color: var(--alert-info-border);
    color: var(--alert-info-text);
}

.banner--success {
    background: var(--alert-success-bg);
    border-color: var(--alert-success-border);
    color: var(--alert-success-text);
}

.banner--warning {
    background: var(--alert-warning-bg);
    border-color: var(--alert-warning-border);
    color: var(--alert-warning-text);
}

.banner--error {
    background: var(--alert-error-bg);
    border-color: var(--alert-error-border);
    color: var(--alert-error-text);
}

.banner__message {
    flex: 1;
    line-height: 1.4;
}

.banner__actions {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    flex-shrink: 0;
}

.banner__action-btn {
    font-family: var(--banner-font);
    font-size: var(--banner-action-size);
    font-weight: var(--banner-action-weight);
    color: inherit;
    background: none;
    border: none;
    cursor: pointer;
    text-decoration: underline;
    padding: 0;
    opacity: 0.8;
    transition: opacity 0.2s;
}

.banner__action-btn:hover {
    opacity: 1;
}

.banner__dismiss {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: calc(0.125rem * var(--density-scale));
    color: inherit;
    opacity: 0.7;
    background: none;
    border: none;
    cursor: pointer;
    border-radius: 2px;
    transition: opacity 0.2s;
}

.banner__dismiss:hover {
    opacity: 1;
}
</style>

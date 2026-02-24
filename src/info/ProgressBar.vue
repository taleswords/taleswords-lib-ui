<script setup lang="ts">
import { computed } from 'vue'

export type ProgressVariant = 'default' | 'success' | 'danger' | 'warning'

export interface ProgressBarProps {
    value: number
    max?: number
    variant?: ProgressVariant
    showLabel?: boolean
    ariaLabel?: string
}

const props = withDefaults(defineProps<ProgressBarProps>(), {
    max: 100,
    variant: 'default',
    showLabel: false,
})

const percentage = computed(() => {
    if (props.max <= 0) return 0
    return Math.min(100, Math.max(0, (props.value / props.max) * 100))
})

const fillStyle = computed(() => ({
    width: `${percentage.value}%`,
}))
</script>

<template>
    <div
        class="progress"
        :class="[`progress--${props.variant}`]"
        role="progressbar"
        :aria-valuenow="props.value"
        :aria-valuemin="0"
        :aria-valuemax="props.max"
        :aria-label="props.ariaLabel || 'Progress'"
        data-testid="progress-bar"
    >
        <div class="progress__track">
            <div class="progress__fill" :style="fillStyle" />
        </div>
        <span v-if="props.showLabel" class="progress__label">
            {{ Math.round(percentage) }}%
        </span>
    </div>
</template>

<style scoped>
.progress {
    display: flex;
    align-items: center;
    gap: 0.75em;
    width: 100%;
}

.progress__track {
    flex: 1;
    height: 8px;
    background-color: var(--progress-bg);
    border-radius: var(--progress-border-radius);
    overflow: hidden;
}

.progress__fill {
    height: 100%;
    border-radius: var(--progress-border-radius);
    transition: width 0.3s ease;
}

.progress--default .progress__fill {
    background-color: var(--progress-fill-bg);
}

.progress--success .progress__fill {
    background-color: var(--progress-fill-success);
}

.progress--danger .progress__fill {
    background-color: var(--progress-fill-danger);
}

.progress--warning .progress__fill {
    background-color: var(--progress-fill-warning);
}

.progress__label {
    font-family: var(--font-ui);
    font-size: 0.8125em;
    font-weight: 600;
    color: var(--progress-text-color);
    white-space: nowrap;
    min-width: 3em;
    text-align: right;
}
</style>

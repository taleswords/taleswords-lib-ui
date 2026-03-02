<script setup lang="ts">
import { computed } from 'vue'

export interface DisplayFieldBaseProps {
    label: string
    value?: string | number | null
    inline?: boolean
    isMuted?: boolean
    truncate?: boolean
}

const props = withDefaults(defineProps<DisplayFieldBaseProps>(), {
    inline: false,
    isMuted: false,
    truncate: false,
})

const displayValue = computed(() =>
    props.value != null ? String(props.value) : '\u2014',
)
</script>

<template>
    <div
        class="display-field"
        :class="{ 'display-field--inline': props.inline }"
        data-testid="display-field-base"
    >
        <span class="display-field__label">{{ props.label }}</span>
        <span
            class="display-field__value"
            :class="{
                'display-field__value--muted': props.isMuted,
                'display-field__value--truncate': props.truncate,
            }"
        >
            <slot>{{ displayValue }}</slot>
        </span>
    </div>
</template>

<style scoped>
.display-field {
    display: flex;
    flex-direction: column;
    gap: 0.25em;
}

.display-field--inline {
    flex-direction: row;
    align-items: baseline;
    gap: 0.5em;
}

.display-field__label {
    font-family: var(--display-field-label-font);
    font-size: var(--display-field-label-size);
    font-weight: var(--display-field-label-weight);
    color: var(--display-field-label-color);
    line-height: var(--leading-normal);
}

.display-field--inline .display-field__label {
    flex-shrink: 0;
}

.display-field__value {
    font-family: var(--display-field-value-font);
    font-size: var(--display-field-value-size);
    color: var(--display-field-value-color);
    line-height: var(--leading-normal);
}

.display-field__value--muted {
    color: var(--display-field-muted-color);
}

.display-field__value--truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>

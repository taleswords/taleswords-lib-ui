<script setup lang="ts">
import { uid } from '../utils/uid'

export interface RadioProps {
    modelValue?: string
    value: string
    name: string
    label?: string
    isDisabled?: boolean
    hasError?: boolean
}

const props = withDefaults(defineProps<RadioProps>(), {
    isDisabled: false,
    hasError: false,
})

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

const inputId = uid('radio')

function onChange(): void {
    emit('update:modelValue', props.value)
}
</script>

<template>
    <label
        class="radio"
        :class="{
            'radio--checked': props.modelValue === props.value,
            'radio--error': props.hasError,
            'is-disabled': props.isDisabled,
        }"
        :for="inputId"
        data-testid="radio"
    >
        <input
            :id="inputId"
            type="radio"
            class="radio__native"
            :name="props.name"
            :value="props.value"
            :checked="props.modelValue === props.value"
            :disabled="props.isDisabled"
            :aria-invalid="props.hasError || undefined"
            @change="onChange"
        />
        <span class="radio__indicator" />
        <span v-if="props.label" class="radio__label">{{ props.label }}</span>
    </label>
</template>

<style scoped>
.radio {
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
    cursor: pointer;
    user-select: none;
}

.radio.is-disabled {
    cursor: not-allowed;
    opacity: 0.65;
}

.radio__native {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    pointer-events: none;
}

.radio__indicator {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.25em;
    height: 1.25em;
    border: 2px solid var(--radio-border);
    border-radius: 50%;
    background-color: transparent;
    transition: border-color 0.2s;
    flex-shrink: 0;
}

.radio__indicator::after {
    content: '';
    display: block;
    width: 0.5em;
    height: 0.5em;
    border-radius: 50%;
    background-color: var(--radio-accent);
    transform: scale(0);
    transition: transform 0.2s;
}

.radio--checked .radio__indicator {
    border-color: var(--radio-border-checked);
}

.radio--checked .radio__indicator::after {
    transform: scale(1);
}

.radio--error .radio__indicator {
    border-color: var(--radio-border-error);
}

.radio.is-disabled .radio__indicator {
    background-color: var(--radio-bg-disabled);
    border-color: var(--radio-border-disabled);
}

.radio__native:focus-visible + .radio__indicator {
    outline: none;
    border-color: var(--general-focus-ring);
    box-shadow: 0 0 0 2px var(--general-focus-ring);
}

.radio:hover:not(.is-disabled) .radio__indicator {
    border-color: var(--radio-border-hover);
}

.radio__label {
    font-family: var(--font-heading);
    font-weight: 500;
    color: var(--form-field-label-color);
}
</style>

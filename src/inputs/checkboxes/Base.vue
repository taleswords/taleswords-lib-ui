<script setup lang="ts">
import { uid } from '../../utils/uid'
import CheckboxInput from './Input.vue'

export interface CheckboxBaseProps {
    modelValue?: boolean
    label?: string
    isDisabled?: boolean
    hasError?: boolean
}

const props = withDefaults(defineProps<CheckboxBaseProps>(), {
    modelValue: false,
    isDisabled: false,
    hasError: false,
})

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
}>()

const inputId = uid('checkbox')

function onChange(event: Event): void {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.checked)
}
</script>

<template>
    <label
        class="checkbox"
        :class="{
            'checkbox--error': props.hasError,
            'is-disabled': props.isDisabled,
        }"
        :for="inputId"
        data-testid="checkbox-base"
    >
        <input
            :id="inputId"
            type="checkbox"
            class="checkbox__native"
            :checked="props.modelValue"
            :disabled="props.isDisabled"
            :aria-invalid="props.hasError || undefined"
            @change="onChange"
        />
        <CheckboxInput
            :is-checked="props.modelValue"
            :is-disabled="props.isDisabled"
            :has-error="props.hasError"
        />
        <span v-if="props.label" class="checkbox__label">{{ props.label }}</span>
    </label>
</template>

<style scoped>
.checkbox {
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
    cursor: pointer;
    user-select: none;
}

.checkbox.is-disabled {
    cursor: not-allowed;
    opacity: 0.65;
}

.checkbox__native {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    pointer-events: none;
}

.checkbox__native:focus-visible + .checkbox-input {
    outline: none;
    border-color: var(--general-focus-ring);
    box-shadow: 0 0 0 2px var(--general-focus-ring);
}

.checkbox__label {
    font-family: var(--font-heading);
    font-weight: 500;
    color: var(--form-field-label-color);
}
</style>

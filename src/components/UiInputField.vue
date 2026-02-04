<script setup lang="ts">
import { computed } from 'vue'
import type { UiInputFieldProps } from '../types'

const props = withDefaults(defineProps<UiInputFieldProps>(), {
    type: 'text',
    required: false,
    disabled: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const inputId = computed(() => `ui-input-${Math.random().toString(36).slice(2, 9)}`)
</script>

<template>
    <div class="ui-input-field">
        <label
            v-if="props.label"
            :for="inputId"
            class="ui-input-field__label"
            :class="{ 'ui-input-field__label--required': props.required }"
        >{{ props.label }}</label>
        <input
            :id="inputId"
            class="ui-input-field__input"
            :class="{ 'ui-input-field__input--error': props.error }"
            :type="props.type"
            :value="props.modelValue"
            :placeholder="props.placeholder"
            :required="props.required"
            :disabled="props.disabled"
            :autocomplete="props.autocomplete"
            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
        <span v-if="props.error" class="ui-input-field__error">{{ props.error }}</span>
    </div>
</template>

<style scoped>
.ui-input-field {
    width: 100%;
    margin-bottom: 2em;
    position: relative;
}

@media only screen and (min-width: 540px) {
    .ui-input-field {
        margin-bottom: 1em;
    }
}

.ui-input-field__label {
    display: block;
    margin-bottom: 0.5em;
    font-family: "Raleway", system-ui, sans-serif;
    font-weight: 500;
    color: var(--ui-input-label-color);
    transition: color 0.3s;
}

.ui-input-field:focus-within .ui-input-field__label {
    color: var(--ui-input-label-focus);
}

.ui-input-field__label--required::after {
    content: ' *';
    color: var(--ui-input-label-required-star-color);
}

.ui-input-field__input {
    width: 100%;
    padding: 12px 1em;
    font-family: 'Source Sans Pro', system-ui, sans-serif;
    font-size: 1em;
    color: var(--ui-input-text-color);
    background-color: var(--ui-input-bg);
    border: 1px solid var(--ui-input-border-color);
    border-radius: 6px;
    box-sizing: border-box;
    transition: border-color 0.3s, box-shadow 0.3s;
}

.ui-input-field__input::placeholder {
    color: var(--ui-input-placeholder-color);
}

.ui-input-field__input:focus {
    outline: none;
    border-color: var(--ui-input-focus-border-color);
    box-shadow: var(--ui-input-focus-shadow);
}

.ui-input-field__input:disabled {
    background-color: var(--ui-input-disabled-bg);
    border-color: var(--ui-input-disabled-border-color);
    opacity: 0.65;
    cursor: not-allowed;
}

.ui-input-field__input--error {
    border-color: var(--ui-input-error-border-color);
}

.ui-input-field__input--error:focus {
    border-color: var(--ui-input-error-focus-border-color);
}

.ui-input-field__error {
    display: block;
    margin-top: 0.5em;
    font-size: 0.875em;
    color: var(--ui-error-text-color);
}

@media only screen and (min-width: 840px) {
    .ui-input-field__input {
        padding: 8px 1em;
    }
}
</style>

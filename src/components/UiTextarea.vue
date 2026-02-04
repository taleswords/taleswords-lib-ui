<script setup lang="ts">
import { computed } from 'vue'
import type { UiTextareaProps } from '../types'

const props = withDefaults(defineProps<UiTextareaProps>(), {
    required: false,
    disabled: false,
    rows: 4,
    showCounter: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const inputId = computed(() => `ui-textarea-${Math.random().toString(36).slice(2, 9)}`)
const errorId = computed(() => `${inputId.value}-error`)
const isOverLimit = computed(() => props.maxLength != null && props.modelValue.length > props.maxLength)
</script>

<template>
    <div class="ui-textarea">
        <label
            v-if="props.label"
            :for="inputId"
            class="ui-textarea__label"
            :class="{ 'ui-textarea__label--required': props.required }"
        >{{ props.label }}</label>
        <textarea
            :id="inputId"
            class="ui-textarea__input"
            :class="{ 'ui-textarea__input--error': props.error }"
            :value="props.modelValue"
            :placeholder="props.placeholder"
            :required="props.required"
            :disabled="props.disabled"
            :rows="props.rows"
            :aria-invalid="props.error ? true : undefined"
            :aria-describedby="props.error ? errorId : undefined"
            @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
        />
        <div class="ui-textarea__footer">
            <span
                v-if="props.error"
                :id="errorId"
                class="ui-textarea__error"
            >{{ props.error }}</span>
            <span v-else />
            <span
                v-if="props.showCounter && props.maxLength != null"
                class="ui-textarea__counter"
                :class="{ 'ui-textarea__counter--over': isOverLimit }"
            >{{ props.modelValue.length }}/{{ props.maxLength }}</span>
        </div>
    </div>
</template>

<style scoped>
.ui-textarea {
    width: 100%;
    margin-bottom: 2em;
    position: relative;
}

@media only screen and (min-width: 540px) {
    .ui-textarea {
        margin-bottom: 1em;
    }
}

.ui-textarea__label {
    display: block;
    margin-bottom: 0.5em;
    font-family: "Raleway", system-ui, sans-serif;
    font-weight: 500;
    color: var(--ui-input-label-color);
    transition: color 0.3s;
}

.ui-textarea:focus-within .ui-textarea__label {
    color: var(--ui-input-label-focus);
}

.ui-textarea__label--required::after {
    content: ' *';
    color: var(--ui-input-label-required-star-color);
}

.ui-textarea__input {
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
    resize: vertical;
}

.ui-textarea__input::placeholder {
    color: var(--ui-input-placeholder-color);
}

.ui-textarea__input:focus {
    outline: none;
    border-color: var(--ui-input-focus-border-color);
    box-shadow: var(--ui-input-focus-shadow);
}

.ui-textarea__input:disabled {
    background-color: var(--ui-input-disabled-bg);
    border-color: var(--ui-input-disabled-border-color);
    opacity: 0.65;
    cursor: not-allowed;
}

.ui-textarea__input--error {
    border-color: var(--ui-input-error-border-color);
}

.ui-textarea__input--error:focus {
    border-color: var(--ui-input-error-focus-border-color);
}

.ui-textarea__footer {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1em;
    min-height: 1.5em;
}

.ui-textarea__error {
    display: block;
    margin-top: 0.5em;
    font-size: 0.875em;
    color: var(--ui-error-text-color);
}

.ui-textarea__counter {
    margin-top: 0.5em;
    font-size: 0.875em;
    color: var(--ui-textarea-counter-color);
    white-space: nowrap;
}

.ui-textarea__counter--over {
    color: var(--ui-textarea-counter-over-color);
}

@media only screen and (min-width: 840px) {
    .ui-textarea__input {
        padding: 8px 1em;
    }
}
</style>

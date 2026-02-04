<script setup lang="ts">
import type { UiCheckboxFieldProps } from '../types'

const props = withDefaults(defineProps<UiCheckboxFieldProps>(), {
    disabled: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()
</script>

<template>
    <div class="ui-checkbox-field">
        <label
            class="ui-checkbox-field__label"
            :class="{
                'ui-checkbox-field__label--error': props.error,
                'ui-checkbox-field__label--disabled': props.disabled,
            }"
        >
            <p class="ui-checkbox-field__fix-line">
                <input
                    type="checkbox"
                    class="ui-checkbox-field__input"
                    :checked="props.modelValue"
                    :disabled="props.disabled"
                    @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
                />
            </p>
            <span>{{ props.label }}</span>
        </label>
        <span v-if="props.error" class="ui-checkbox-field__error">{{ props.error }}</span>
    </div>
</template>

<style scoped>
.ui-checkbox-field {
    width: 100%;
    margin-bottom: 2em;
}

@media only screen and (min-width: 540px) {
    .ui-checkbox-field {
        margin-bottom: 1em;
    }
}

.ui-checkbox-field__fix-line {
    margin: 0;
}

.ui-checkbox-field__label {
    display: flex;
    align-items: start;
    gap: 1em;
    border: 1px solid var(--ui-input-border-color);
    padding: 1em;
    margin: 0;
    box-sizing: border-box;
    border-radius: 6px;
    transition: border-color 0.3s;
    cursor: pointer;
}

.ui-checkbox-field__label:hover {
    border-color: var(--ui-input-focus-border-color);
}

.ui-checkbox-field__label--error,
.ui-checkbox-field__label--error:hover {
    border-color: var(--ui-input-error-border-color);
}

.ui-checkbox-field__label--disabled {
    opacity: 0.65;
    cursor: not-allowed;
}

.ui-checkbox-field__input {
    accent-color: var(--ui-input-checkbox-checked-accent);
    cursor: pointer;
}

.ui-checkbox-field__input:disabled {
    cursor: not-allowed;
}

.ui-checkbox-field__error {
    display: block;
    margin-top: 0.5em;
    font-size: 0.875em;
    color: var(--ui-error-text-color);
}
</style>

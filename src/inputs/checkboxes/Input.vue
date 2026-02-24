<script setup lang="ts">
export interface CheckboxInputProps {
    isChecked?: boolean
    isDisabled?: boolean
    hasError?: boolean
}

withDefaults(defineProps<CheckboxInputProps>(), {
    isChecked: false,
    isDisabled: false,
    hasError: false,
})
</script>

<template>
    <span
        class="checkbox-input"
        :class="{
            'checkbox-input--checked': isChecked,
            'checkbox-input--error': hasError,
            'is-disabled': isDisabled,
        }"
        aria-hidden="true"
        data-testid="checkbox-input"
    >
        <span v-if="isChecked" class="material-symbols-rounded checkbox-input__check" aria-hidden="true">check</span>
    </span>
</template>

<style scoped>
.checkbox-input {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.25em;
    height: 1.25em;
    border: 2px solid var(--checkbox-border);
    border-radius: 4px;
    background-color: transparent;
    transition: border-color 0.2s, background-color 0.2s;
    flex-shrink: 0;
}

.checkbox-input--checked {
    background-color: var(--checkbox-accent);
    border-color: var(--checkbox-border-checked);
}

.checkbox-input--error {
    border-color: var(--checkbox-border-error);
}

.checkbox-input.is-disabled {
    background-color: var(--checkbox-bg-disabled);
    border-color: var(--checkbox-border-disabled);
    cursor: not-allowed;
}

.checkbox-input__check {
    font-size: 0.875em;
    line-height: 1;
    color: var(--general-text-color);
}
</style>

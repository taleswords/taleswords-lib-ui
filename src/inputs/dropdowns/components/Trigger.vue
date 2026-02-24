<script setup lang="ts">
export interface DropdownTriggerProps {
    selectedLabel: string
    placeholder: string
    isOpen: boolean
    isDisabled: boolean
    hasError: boolean
}

withDefaults(defineProps<DropdownTriggerProps>(), {
    selectedLabel: '',
    placeholder: 'Select...',
    isOpen: false,
    isDisabled: false,
    hasError: false,
})

defineEmits<{
    toggle: []
}>()
</script>

<template>
    <button
        type="button"
        class="dropdown-trigger"
        :class="{
            'dropdown-trigger--open': isOpen,
            'dropdown-trigger--error': hasError,
            'is-disabled': isDisabled,
        }"
        :disabled="isDisabled"
        aria-haspopup="listbox"
        :aria-expanded="isOpen"
        @click="$emit('toggle')"
    >
        <span
            class="dropdown-trigger__label"
            :class="{ 'dropdown-trigger__label--placeholder': !selectedLabel }"
        >
            {{ selectedLabel || placeholder }}
        </span>
        <span
            class="material-symbols-rounded dropdown-trigger__icon"
            aria-hidden="true"
        >{{ isOpen ? 'expand_less' : 'expand_more' }}</span>
    </button>
</template>

<style scoped>
.dropdown-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px 1em;
    font-family: var(--font-ui);
    font-size: 1em;
    color: var(--textbox-text);
    background-color: var(--textbox-bg);
    border: 1px solid var(--textbox-border);
    border-radius: var(--textbox-border-radius);
    cursor: pointer;
    transition: border-color 0.3s, box-shadow 0.3s;
    text-align: left;
    gap: 0.5em;
}

.dropdown-trigger:focus-visible {
    outline: none;
    border-color: var(--general-focus-ring);
    box-shadow: 0 0 0 2px var(--general-focus-ring);
}

.dropdown-trigger--open {
    border-color: var(--textbox-border-focus);
    box-shadow: var(--textbox-shadow-focus);
}

.dropdown-trigger--error {
    border-color: var(--textbox-border-error);
}

.dropdown-trigger.is-disabled {
    background-color: var(--textbox-bg-disabled);
    border-color: var(--textbox-border-disabled);
    color: var(--textbox-text-disabled);
    cursor: not-allowed;
    pointer-events: none;
}

.dropdown-trigger__label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.dropdown-trigger__label--placeholder {
    color: var(--textbox-placeholder);
}

.dropdown-trigger__icon {
    flex-shrink: 0;
    font-size: 1.25em;
    color: var(--textbox-placeholder);
}
</style>

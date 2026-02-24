<script setup lang="ts">
export interface DropdownFooterProps {
    hasApplyButton: boolean
    hasClearButton: boolean
    applyLabel?: string
    clearLabel?: string
}

withDefaults(defineProps<DropdownFooterProps>(), {
    hasApplyButton: false,
    hasClearButton: false,
    applyLabel: 'Apply',
    clearLabel: 'Clear',
})

defineEmits<{
    apply: []
    clear: []
}>()
</script>

<template>
    <div
        v-if="hasApplyButton || hasClearButton"
        class="dropdown-footer"
    >
        <button
            v-if="hasClearButton"
            type="button"
            class="dropdown-footer__btn dropdown-footer__btn--clear"
            @click="$emit('clear')"
        >
            {{ clearLabel }}
        </button>
        <button
            v-if="hasApplyButton"
            type="button"
            class="dropdown-footer__btn dropdown-footer__btn--apply"
            @click="$emit('apply')"
        >
            {{ applyLabel }}
        </button>
    </div>
</template>

<style scoped>
.dropdown-footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.5em;
    padding: 0.5em;
    border-top: 1px solid var(--dropdown-border);
}

.dropdown-footer__btn {
    font-family: var(--label-font);
    font-weight: var(--label-weight);
    font-size: var(--description-size);
    padding: 0.375em 0.75em;
    border-radius: var(--button-border-radius);
    border: 1px solid transparent;
    cursor: pointer;
    transition: background-color 0.2s;
}

.dropdown-footer__btn--apply {
    background-color: var(--button-primary-bg);
    color: var(--button-primary-text);
}

.dropdown-footer__btn--apply:hover {
    background-color: var(--button-primary-bg-hover);
}

.dropdown-footer__btn--clear {
    background-color: transparent;
    color: var(--button-ghost-text);
}

.dropdown-footer__btn--clear:hover {
    background-color: var(--button-ghost-bg-hover);
}
</style>

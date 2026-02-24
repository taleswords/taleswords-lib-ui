<script setup lang="ts">
export interface ModalHeaderProps {
    title: string
    hasCloseButton?: boolean
}

withDefaults(defineProps<ModalHeaderProps>(), {
    hasCloseButton: true,
})

defineEmits<{
    close: []
}>()
</script>

<template>
    <div class="modal-header">
        <h2 class="modal-header__title">{{ title }}</h2>
        <button
            v-if="hasCloseButton"
            type="button"
            class="modal-header__close icon-cancel"
            aria-label="Close"
            @click="$emit('close')"
        />
    </div>
</template>

<style scoped>
.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1em 1.25em;
    border-bottom: 1px solid var(--general-card-border);
    flex-shrink: 0;
}

.modal-header__title {
    margin: 0;
    font-family: var(--font-heading);
    font-size: 1.125em;
    font-weight: 600;
    color: var(--general-text-color);
    line-height: 1.3;
}

.modal-header__close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.25em;
    font-size: 1.125em;
    color: var(--general-text-color);
    border-radius: var(--button-border-radius);
    transition: background-color 0.2s;
}

.modal-header__close:hover {
    background-color: var(--button-ghost-bg-hover);
}

.modal-header__close:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--general-focus-ring);
}

.modal-header__close::before {
    margin: 0;
    width: auto;
}
</style>

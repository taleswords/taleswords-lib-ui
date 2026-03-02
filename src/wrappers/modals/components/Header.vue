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
            class="modal-header__close"
            aria-label="Close"
            @click="$emit('close')"
        >
            <span class="material-symbols-rounded" aria-hidden="true">close</span>
        </button>
    </div>
</template>

<style scoped>
.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: calc(1em * var(--density-scale)) calc(1.25em * var(--density-scale));
    border-bottom: 1px solid var(--general-card-border);
    flex-shrink: 0;
}

.modal-header__title {
    margin: 0;
    font-family: var(--modal-title-font);
    font-size: var(--modal-title-size);
    font-weight: var(--modal-title-weight);
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
    padding: calc(0.25em * var(--density-scale));
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

.modal-header__close .material-symbols-rounded {
    font-size: 1.25em;
}
</style>

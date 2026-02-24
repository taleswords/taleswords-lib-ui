<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    hashId: string
}>()

const fullUrl = computed(() => {
    const pathname = window.location.pathname
    return `${window.location.origin}${pathname}#${props.hashId}`
})

function copyHashUrl(): void {
    navigator.clipboard.writeText(fullUrl.value)
}
</script>

<template>
    <button
        title="Copy link"
        class="button-hash"
        @click.stop="copyHashUrl"
    >
        <span class="material-symbols-rounded">tag</span>
    </button>
</template>

<style scoped>
.button-hash {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    border: none;
    background: transparent;
    color: var(--form-field-description-color);
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.15s ease;
    opacity: 0;
    margin-left: 0.5rem;
    padding: 0;
}

.button-hash .material-symbols-rounded {
    font-size: 1rem;
}

.button-hash:hover {
    background-color: var(--general-hover-bg);
    color: var(--button-ghost-primary-text);
}

:global(.playground-section:hover .button-hash),
:global(.playground-case:hover > .playground-case__title > .button-hash) {
    opacity: 1;
}
</style>

<script setup lang="ts">
</script>

<template>
    <div class="modal-body">
        <slot />
    </div>
</template>

<style scoped>
.modal-body {
    padding: 1.25em;
    overflow-y: auto;
    flex: 1;
    color: var(--general-text-color);
    font-family: var(--font-ui);
}
</style>

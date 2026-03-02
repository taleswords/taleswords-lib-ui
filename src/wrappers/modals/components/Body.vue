<script setup lang="ts">
</script>

<template>
    <div class="modal-body">
        <slot />
    </div>
</template>

<style scoped>
.modal-body {
    padding: calc(1.25em * var(--density-scale));
    overflow-y: auto;
    flex: 1;
    color: var(--general-text-color);
    font-family: var(--modal-body-font);
}
</style>

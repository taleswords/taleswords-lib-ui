<script setup lang="ts">
</script>

<template>
    <div class="modal-footer">
        <slot />
    </div>
</template>

<style scoped>
.modal-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: calc(0.5em * var(--density-scale));
    padding: calc(0.75em * var(--density-scale)) calc(1.25em * var(--density-scale));
    border-top: 1px solid var(--general-card-border);
    flex-shrink: 0;
}
</style>

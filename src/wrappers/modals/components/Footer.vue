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
    gap: 0.5em;
    padding: 0.75em 1.25em;
    border-top: 1px solid var(--general-card-border);
    flex-shrink: 0;
}
</style>

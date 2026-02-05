<script setup lang="ts">
import type { UiActionsHeaderProps } from '../types'

const props = defineProps<UiActionsHeaderProps>()
</script>

<template>
    <div class="ui-actions-header">
        <h5 class="ui-actions-header__title">{{ props.title }}</h5>
        <slot />
    </div>
</template>

<style scoped>
.ui-actions-header {
    display: flex;
    gap: 1em;
    align-items: center;
    background-color: var(--ui-body-bg);
}

.ui-actions-header__title {
    flex: 1;
    margin: 0;
}
</style>

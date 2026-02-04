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
    padding-block: 1em;
    padding-inline: 1em;
    border: 1px solid var(--ui-card-border-color);
    margin-bottom: 1em;
    align-items: center;
}

.ui-actions-header__title {
    flex: 1;
    margin: 0;
    margin-block: -0.5em;
}
</style>

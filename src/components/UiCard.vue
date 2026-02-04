<script setup lang="ts">
import type { UiCardProps } from '../types'

const props = withDefaults(defineProps<UiCardProps>(), {
    variant: 'default',
    noPadding: false,
    row: false,
})
</script>

<template>
    <div
        class="ui-card"
        :class="[
            `ui-card--${props.variant}`,
            { 'ui-card--no-padding': props.noPadding },
            { 'ui-card--row': props.row },
        ]"
    >
        <slot />
    </div>
</template>

<style scoped>
.ui-card {
    border: 1px solid var(--ui-card-border-color);
    border-radius: 6px;
    padding: 1em;
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.ui-card--default {
    background-color: var(--ui-card-bg);
}

.ui-card--elevated {
    background-color: var(--ui-card-bg);
    box-shadow: var(--ui-card-shadow);
}

.ui-card--outlined {
    background-color: transparent;
}

.ui-card--row {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
}

.ui-card--no-padding {
    padding: 0;
}
</style>

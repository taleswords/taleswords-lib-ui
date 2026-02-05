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

/* Contextual spacing for nested components */

/* Headers as first child - remove top margin */
.ui-card > :deep(h1:first-child),
.ui-card > :deep(h2:first-child),
.ui-card > :deep(h3:first-child),
.ui-card > :deep(h4:first-child),
.ui-card > :deep(h5:first-child) {
    margin-top: 0;
}

/* UiActionsHeader as first child - flush to edges */
.ui-card > :deep(.ui-actions-header:first-child) {
    margin: -1em -1em 0 -1em;
    padding: 1em;
    border-bottom: 1px solid var(--ui-card-border-color);
    border-radius: 5px 5px 0 0;
}

/* UiList inside card - flush sides */
.ui-card > :deep(.ui-list) {
    margin-inline: -1em;
    border-left: none;
    border-right: none;
    border-radius: 0;
}

/* UiList as first child - also flush top */
.ui-card > :deep(.ui-list:first-child) {
    margin-top: -1em;
    border-top: none;
    border-radius: 0;
}

/* UiList as last child - also flush bottom */
.ui-card > :deep(.ui-list:last-child) {
    margin-bottom: -1em;
    border-bottom: none;
    border-radius: 0;
}

/* UiTabs inside card - flush sides for tab bar */
.ui-card > :deep(.ui-tabs) {
    margin-inline: -1em;
}

.ui-card > :deep(.ui-tabs .ui-tabs__list) {
    padding-inline: 1em;
}

.ui-card > :deep(.ui-tabs .ui-tabs__panel) {
    padding-inline: 1em;
}

/* UiAlert inside card - keep spacing but fit width */
.ui-card > :deep(.ui-alert) {
    /* Alert keeps its own padding */
}
</style>

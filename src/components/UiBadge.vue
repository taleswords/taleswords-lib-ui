<script setup lang="ts">
import type { UiBadgeProps } from '../types'

const props = defineProps<UiBadgeProps>()
const emit = defineEmits<{ click: [event: MouseEvent] }>()
</script>

<template>
    <span
        class="ui-badge"
        :class="[`ui-badge--${props.value}`]"
        @click="emit('click', $event)"
    >{{ props.value }}</span>
</template>

<style scoped>
.ui-badge {
    display: inline-block;
    padding-inline: 0.5em;
    font-family: 'Source Sans Pro', system-ui, sans-serif;
    font-weight: 600;
    font-size: 1em;
    border-radius: 6px;
    text-transform: uppercase;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
}

.ui-badge--visitor {
    background-color: var(--ui-badge-visitor-bg);
    color: var(--ui-badge-visitor-text);
}
.ui-badge--guest {
    background-color: var(--ui-badge-guest-bg);
    color: var(--ui-badge-guest-text);
}
.ui-badge--guest-editor {
    background-color: var(--ui-badge-guest-editor-bg);
    color: var(--ui-badge-guest-editor-text);
}
.ui-badge--reviewer {
    background-color: var(--ui-badge-reviewer-bg);
    color: var(--ui-badge-reviewer-text);
}
.ui-badge--editor {
    background-color: var(--ui-badge-editor-bg);
    color: var(--ui-badge-editor-text);
}
.ui-badge--manager {
    background-color: var(--ui-badge-manager-bg);
    color: var(--ui-badge-manager-text);
}
.ui-badge--admin {
    background-color: var(--ui-badge-admin-bg);
    color: var(--ui-badge-admin-text);
}
.ui-badge--owner {
    background-color: var(--ui-badge-admin-bg);
    color: var(--ui-badge-admin-text);
}
.ui-badge--public {
    background-color: var(--ui-badge-public-bg);
    color: var(--ui-badge-public-text);
}
.ui-badge--private {
    background-color: var(--ui-badge-private-bg);
    color: var(--ui-badge-private-text);
}
.ui-badge--pending {
    background-color: var(--ui-badge-pending-bg);
    color: var(--ui-badge-pending-text);
}
.ui-badge--declined {
    background-color: var(--ui-badge-declined-bg);
    color: var(--ui-badge-declined-text);
}
.ui-badge--accepted {
    background-color: var(--ui-badge-accepted-bg);
    color: var(--ui-badge-accepted-text);
}
</style>

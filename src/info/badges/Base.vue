<script setup lang="ts">
export type BadgeVariant =
    | 'visitor' | 'guest' | 'guest-editor'
    | 'reviewer' | 'editor' | 'manager'
    | 'admin' | 'owner' | 'public' | 'private'
    | 'pending' | 'declined' | 'accepted'

export interface BadgeBaseProps {
    variant: BadgeVariant
    label?: string
}

const props = defineProps<BadgeBaseProps>()
</script>

<template>
    <span
        class="badge"
        :class="[`badge--${props.variant}`]"
        data-testid="badge-base"
    >{{ props.label ?? props.variant }}</span>
</template>

<style scoped>
.badge {
    display: inline-block;
    padding-inline: 0.5em;
    padding-block: 0.125em;
    font-family: var(--badge-font);
    font-weight: var(--badge-weight);
    font-size: var(--badge-size);
    border-radius: var(--badge-border-radius);
    text-transform: uppercase;
    text-align: center;
    white-space: nowrap;
    line-height: 1.4;
}

.badge--visitor {
    background-color: var(--badge-visitor-bg);
    color: var(--badge-visitor-text);
}

.badge--guest {
    background-color: var(--badge-guest-bg);
    color: var(--badge-guest-text);
}

.badge--guest-editor {
    background-color: var(--badge-guest-editor-bg);
    color: var(--badge-guest-editor-text);
}

.badge--reviewer {
    background-color: var(--badge-reviewer-bg);
    color: var(--badge-reviewer-text);
}

.badge--editor {
    background-color: var(--badge-editor-bg);
    color: var(--badge-editor-text);
}

.badge--manager {
    background-color: var(--badge-manager-bg);
    color: var(--badge-manager-text);
}

.badge--admin {
    background-color: var(--badge-admin-bg);
    color: var(--badge-admin-text);
}

.badge--owner {
    background-color: var(--badge-admin-bg);
    color: var(--badge-admin-text);
}

.badge--public {
    background-color: var(--badge-public-bg);
    color: var(--badge-public-text);
}

.badge--private {
    background-color: var(--badge-private-bg);
    color: var(--badge-private-text);
}

.badge--pending {
    background-color: var(--badge-pending-bg);
    color: var(--badge-pending-text);
}

.badge--declined {
    background-color: var(--badge-declined-bg);
    color: var(--badge-declined-text);
}

.badge--accepted {
    background-color: var(--badge-accepted-bg);
    color: var(--badge-accepted-text);
}
</style>

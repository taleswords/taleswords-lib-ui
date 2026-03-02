<script setup lang="ts">
// ── Types ──────────────────────────────────────────

export type BadgeRoleVariant =
    | 'visitor' | 'guest' | 'guest-editor'
    | 'reviewer' | 'editor' | 'manager'
    | 'admin' | 'owner' | 'public' | 'private'
    | 'pending' | 'declined' | 'accepted'

export type BadgeSemanticVariant =
    | 'neutral' | 'info' | 'success' | 'warning' | 'danger'

export type BadgeVariant = BadgeRoleVariant | BadgeSemanticVariant

export type BadgeSize = 'sm' | 'md'

export interface BadgeBaseProps {
    variant: BadgeVariant
    label?: string
    size?: BadgeSize
    testId?: string
}

// ── Props ──────────────────────────────────────────

const props = withDefaults(defineProps<BadgeBaseProps>(), {
    size: 'md',
    testId: 'badge-base',
})
</script>

<template>
    <span
        class="badge"
        :class="[`badge--${props.variant}`, { 'badge--sm': props.size === 'sm' }]"
        :data-testid="testId"
    >{{ props.label ?? props.variant }}</span>
</template>

<style scoped>
.badge {
    display: inline-block;
    padding-inline: calc(0.5em * var(--density-scale));
    padding-block: calc(0.125em * var(--density-scale));
    font-family: var(--badge-font);
    font-weight: var(--badge-weight);
    font-size: var(--badge-size);
    border-radius: var(--badge-border-radius);
    text-transform: uppercase;
    text-align: center;
    white-space: nowrap;
    line-height: 1.4;
}

.badge--sm {
    font-size: var(--badge-size-sm);
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

.badge--neutral {
    background-color: var(--badge-neutral-bg);
    color: var(--badge-neutral-text);
}

.badge--info {
    background-color: var(--badge-info-bg);
    color: var(--badge-info-text);
}

.badge--success {
    background-color: var(--badge-success-bg);
    color: var(--badge-success-text);
}

.badge--warning {
    background-color: var(--badge-warning-bg);
    color: var(--badge-warning-text);
}

.badge--danger {
    background-color: var(--badge-danger-bg);
    color: var(--badge-danger-text);
}
</style>

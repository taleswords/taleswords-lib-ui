<script setup lang="ts">
import { resolveNavigationTag, resolveNavigationAttrs } from '../utils/navigation'

// ── Types ──────────────────────────────────────────

export interface NavItem {
    id: string
    label: string
    icon?: string
    to?: string | Record<string, unknown>
    href?: string
    isDisabled?: boolean
}

export interface NavigationButtonsProps {
    items: NavItem[]
    activeId?: string
    testId?: string
}

// ── Props / Emits ──────────────────────────────────

withDefaults(defineProps<NavigationButtonsProps>(), {
    testId: 'navigation-buttons',
})

const emit = defineEmits<{
    'item-clicked': [item: NavItem]
}>()

// ── Methods ────────────────────────────────────────

function handleClick(item: NavItem): void {
    if (!item.isDisabled) {
        emit('item-clicked', item)
    }
}
</script>

<template>
    <nav :data-testid="testId">
        <ul class="nav-buttons">
            <li v-for="item in items" :key="item.id">
                <component
                    :is="resolveNavigationTag(item)"
                    v-bind="resolveNavigationAttrs(item)"
                    class="nav-buttons__item"
                    :class="{
                        'nav-buttons__item--active': item.id === activeId,
                        'nav-buttons__item--disabled': item.isDisabled,
                    }"
                    :disabled="item.isDisabled || undefined"
                    :aria-current="item.id === activeId ? 'page' : undefined"
                    @click="handleClick(item)"
                >
                    <span v-if="item.icon" class="material-symbols-rounded nav-buttons__icon" aria-hidden="true">{{ item.icon }}</span>
                    <span>{{ item.label }}</span>
                </component>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
.nav-buttons {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 0.125rem;
}

.nav-buttons__item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-family: var(--nav-btn-font);
    font-size: var(--nav-btn-size);
    font-weight: var(--nav-btn-weight);
    color: var(--nav-btn-color);
    background: none;
    border: none;
    border-radius: var(--button-border-radius);
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.2s, color 0.2s;
}

.nav-buttons__item:hover:not(.nav-buttons__item--disabled) {
    background: var(--nav-btn-hover-bg);
}

.nav-buttons__item--active {
    background: var(--nav-btn-active-bg);
    color: var(--nav-btn-active-color);
}

.nav-buttons__item--active:hover {
    background: var(--nav-btn-active-bg);
}

.nav-buttons__item--disabled {
    color: var(--nav-btn-disabled-color);
    cursor: not-allowed;
    pointer-events: none;
}

.nav-buttons__item--disabled .nav-buttons__icon {
    color: var(--nav-btn-disabled-icon-color);
}

.nav-buttons__icon {
    font-size: 1.125em;
    color: var(--nav-btn-icon-color);
}

.nav-buttons__item--active .nav-buttons__icon {
    color: var(--nav-btn-active-color);
}
</style>

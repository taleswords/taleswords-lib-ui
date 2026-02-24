<script setup lang="ts">
import { resolveNavigationTag, resolveNavigationAttrs } from '../utils/navigation'

// ── Types ──────────────────────────────────────────

export interface BreadcrumbItem {
    label: string
    to?: string | Record<string, unknown>
    href?: string
}

export interface BreadcrumbsProps {
    items: BreadcrumbItem[]
    testId?: string
}

// ── Props / Emits ──────────────────────────────────

withDefaults(defineProps<BreadcrumbsProps>(), {
    testId: 'breadcrumbs',
})

const emit = defineEmits<{
    'item-clicked': [item: BreadcrumbItem, index: number]
}>()

// ── Helpers ────────────────────────────────────────

function handleClick(item: BreadcrumbItem, index: number): void {
    emit('item-clicked', item, index)
}
</script>

<template>
    <nav :aria-label="'Breadcrumb'" :data-testid="testId">
        <ol class="breadcrumbs">
            <li
                v-for="(item, index) in items"
                :key="index"
                class="breadcrumbs__item"
            >
                <span
                    v-if="index > 0"
                    class="breadcrumbs__separator"
                    aria-hidden="true"
                >/</span>

                <span
                    v-if="index === items.length - 1"
                    class="breadcrumbs__current"
                    aria-current="page"
                >{{ item.label }}</span>

                <component
                    v-else
                    :is="resolveNavigationTag(item)"
                    v-bind="resolveNavigationAttrs(item)"
                    class="breadcrumbs__link"
                    @click="handleClick(item, index)"
                >{{ item.label }}</component>
            </li>
        </ol>
    </nav>
</template>

<style scoped>
.breadcrumbs {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0;
    font-family: var(--breadcrumb-font);
    font-size: var(--breadcrumb-size);
    gap: 0.25rem;
}

.breadcrumbs__item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.breadcrumbs__separator {
    color: var(--form-field-description-color);
    user-select: none;
}

.breadcrumbs__link {
    color: var(--link-color);
    text-decoration: none;
    transition: color 0.2s;
}

.breadcrumbs__link:hover {
    text-decoration: underline;
}

.breadcrumbs__current {
    color: var(--general-text-color);
    font-weight: var(--breadcrumb-weight-active);
}
</style>

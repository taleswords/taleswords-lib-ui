<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { navCategories } from '../router'

const router = useRouter()
const isExpanded = ref(false)
let hoverTimeout: ReturnType<typeof setTimeout> | null = null

const currentPath = computed(() => router.currentRoute.value.path)

function navigateTo(path: string): void {
    router.push(path)
}

function expandNav(): void {
    if (hoverTimeout) clearTimeout(hoverTimeout)
    isExpanded.value = true
}

function collapseNav(): void {
    hoverTimeout = setTimeout(() => {
        isExpanded.value = false
    }, 50)
}

onBeforeUnmount(() => {
    if (hoverTimeout) clearTimeout(hoverTimeout)
})
</script>

<template>
    <div
        class="sidebar-left"
        :class="{ 'sidebar-left--expanded': isExpanded }"
        @mouseenter="expandNav"
        @mouseleave="collapseNav"
    >
        <div class="sidebar-left__panel">
            <div class="sidebar-left__header">
                <span v-if="isExpanded" class="sidebar-left__title">lib-ui</span>
                <span v-else class="material-symbols-rounded sidebar-left__expand-icon">
                    chevron_right
                </span>
            </div>

            <div class="sidebar-left__items">
                <template v-for="category in navCategories" :key="category.label">
                    <div v-if="isExpanded" class="sidebar-left__category">
                        {{ category.label }}
                    </div>
                    <button
                        v-for="item in category.items"
                        :key="item.id"
                        class="sidebar-left__item"
                        :class="{ 'sidebar-left__item--active': currentPath === item.path }"
                        @click="navigateTo(item.path)"
                    >
                        <span class="material-symbols-rounded sidebar-left__icon">
                            {{ item.icon }}
                        </span>
                        <span v-if="isExpanded" class="sidebar-left__label">{{ item.label }}</span>
                    </button>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
.sidebar-left {
    position: fixed;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    z-index: 100;
    width: 52px;
    transition: width 0.15s ease;
}

.sidebar-left--expanded {
    width: 220px;
}

.sidebar-left__panel {
    display: flex;
    flex-direction: column;
    background-color: var(--general-card-bg);
    border-radius: 0 12px 12px 0;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    border: 1px solid var(--general-card-border);
    border-left: none;
    max-height: 80vh;
    overflow: hidden;
}

.sidebar-left__header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem;
    border-bottom: 1px solid var(--general-card-border);
    min-height: 48px;
}

.sidebar-left__title {
    font-weight: 700;
    font-size: 0.875rem;
    color: var(--form-field-label-color);
    font-family: var(--font-ui);
}

.sidebar-left__expand-icon {
    font-size: 1.25rem;
    color: var(--form-field-description-color);
}

.sidebar-left__items {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0;
    overflow-y: auto;
    gap: 1px;
}

.sidebar-left__category {
    padding: 0.5rem 0.75rem 0.25rem;
    font-size: 0.625rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--form-field-description-color);
    font-family: var(--font-ui);
}

.sidebar-left__item {
    display: flex;
    align-items: center;
    height: 2.25rem;
    padding: 0.375rem 0.75rem;
    gap: 0.75rem;
    border: none;
    background: none;
    cursor: pointer;
    text-align: left;
    color: var(--form-field-description-color);
    transition: all 0.15s ease;
    border-radius: 4px;
    margin: 0 0.375rem;
    font-family: var(--font-ui);
}

.sidebar-left__item:hover {
    background-color: var(--general-hover-bg);
    color: var(--form-field-label-color);
}

.sidebar-left__item--active {
    background-color: var(--general-hover-bg);
    color: var(--form-field-label-color);
    font-weight: 500;
}

.sidebar-left__icon {
    font-size: 1.125rem;
    flex-shrink: 0;
}

.sidebar-left__label {
    font-size: 0.8125rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>

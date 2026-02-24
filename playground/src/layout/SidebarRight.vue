<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { Switch as SwitchBase } from '@lib'
import PanelSections from './PanelSections.vue'
import { usePlaygroundControls } from '../composables/usePlaygroundControls'

const { isDark, isLoading, toggleTheme, setLoading } = usePlaygroundControls()

const isExpanded = ref(false)
let hoverTimeout: ReturnType<typeof setTimeout> | null = null

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
        class="sidebar-right"
        :class="{ 'sidebar-right--expanded': isExpanded }"
        @mouseenter="expandNav"
        @mouseleave="collapseNav"
    >
        <!-- Collapsed state -->
        <div v-if="!isExpanded" class="sidebar-right__panel sidebar-right__panel--collapsed">
            <span class="material-symbols-rounded sidebar-right__expand-icon">
                chevron_left
            </span>
        </div>

        <!-- Expanded state -->
        <template v-else>
            <div class="sidebar-right__panels">
                <!-- Sections TOC -->
                <div class="sidebar-right__panel">
                    <PanelSections />
                </div>

                <!-- Theme Controls -->
                <div class="sidebar-right__panel">
                    <div class="sidebar-right__header">Theme Controls</div>
                    <div class="sidebar-right__controls">
                        <div class="sidebar-right__control">
                            <div class="sidebar-right__control-label">
                                <span class="material-symbols-rounded">
                                    {{ isDark ? 'dark_mode' : 'light_mode' }}
                                </span>
                                <span>{{ isDark ? 'Dark' : 'Light' }} Mode</span>
                            </div>
                            <SwitchBase
                                :model-value="isDark"
                                @update:model-value="toggleTheme"
                            />
                        </div>

                        <div class="sidebar-right__control">
                            <div class="sidebar-right__control-label">
                                <span
                                    class="material-symbols-rounded"
                                    :class="{ 'sidebar-right__icon--spinning': isLoading }"
                                >sync</span>
                                <span>Loading</span>
                            </div>
                            <SwitchBase
                                :model-value="isLoading"
                                @update:model-value="setLoading"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<style scoped>
.sidebar-right {
    position: fixed;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
    display: flex;
    align-items: center;
    width: 52px;
    transition: width 0.15s ease;
}

.sidebar-right--expanded {
    width: 280px;
}

.sidebar-right__panels {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.sidebar-right__panel {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 0.75rem;
    background-color: var(--general-card-bg);
    border-radius: 12px 0 0 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    border: 1px solid var(--general-card-border);
    border-right: none;
    min-width: 260px;
    max-width: 280px;
    overflow: hidden;
}

.sidebar-right__panel--collapsed {
    min-width: auto;
    max-width: none;
    width: 44px;
    padding: 0.75rem 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
}

.sidebar-right__expand-icon {
    font-size: 1.25rem;
    color: var(--form-field-description-color);
}

.sidebar-right__header {
    display: flex;
    align-items: center;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--general-card-border);
    font-weight: 600;
    color: var(--form-field-label-color);
    font-size: 0.875rem;
    font-family: var(--font-ui);
}

.sidebar-right__controls {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.sidebar-right__control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.25rem 0;
}

.sidebar-right__control-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8125rem;
    color: var(--form-field-label-color);
    font-family: var(--font-ui);
}

.sidebar-right__control-label .material-symbols-rounded {
    font-size: 1.125rem;
    color: var(--form-field-description-color);
}

.sidebar-right__icon--spinning {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
</style>

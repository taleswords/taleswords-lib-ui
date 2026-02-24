<script setup lang="ts">
import { ref, computed, type Component } from 'vue'
import { UiButton, UiList, UiListItem } from '@lib'

import TypographySection from './sections/TypographySection.vue'
import ButtonsSection from './sections/ButtonsSection.vue'
import BadgesSection from './sections/BadgesSection.vue'
import FormControlsSection from './sections/FormControlsSection.vue'
import NavigationSection from './sections/NavigationSection.vue'
import LayoutSection from './sections/LayoutSection.vue'
import OverlaysSection from './sections/OverlaysSection.vue'
import FeedbackSection from './sections/FeedbackSection.vue'
import ListsSection from './sections/ListsSection.vue'
import FileUploadSection from './sections/FileUploadSection.vue'

interface NavItem {
    key: string
    label: string
    icon: string
    component: Component
}

const sections: NavItem[] = [
    { key: 'typography', label: 'Typography & Icons', icon: 'edit', component: TypographySection },
    { key: 'buttons', label: 'Buttons', icon: 'dot-circled', component: ButtonsSection },
    { key: 'badges', label: 'Badges & Avatars', icon: 'diamond', component: BadgesSection },
    { key: 'forms', label: 'Form Controls', icon: 'ok-squared', component: FormControlsSection },
    { key: 'navigation', label: 'Navigation', icon: 'right', component: NavigationSection },
    { key: 'layout', label: 'Layout', icon: 'cubes', component: LayoutSection },
    { key: 'overlays', label: 'Overlays', icon: 'chat', component: OverlaysSection },
    { key: 'feedback', label: 'Feedback', icon: 'info-circled', component: FeedbackSection },
    { key: 'lists', label: 'Lists', icon: 'level-down', component: ListsSection },
    { key: 'uploads', label: 'File Upload', icon: 'file-image', component: FileUploadSection },
]

const activeSection = ref(sections[0].key)

const activeComponent = computed(() => {
    return sections.find(s => s.key === activeSection.value)?.component ?? TypographySection
})

// Dark theme
const isDark = ref(false)
function toggleTheme() {
    isDark.value = !isDark.value
    document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : '')
}
</script>

<template>
    <div class="playground-layout">
        <aside class="playground-sidebar">
            <div class="playground-sidebar__header">
                <h2>UI Library</h2>
                <UiButton variant="ghost" size="small" :icon="isDark ? 'toggle-on' : 'toggle-off'" @click="toggleTheme">
                    {{ isDark ? 'Dark' : 'Light' }}
                </UiButton>
            </div>
            <UiList>
                <UiListItem
                    v-for="section in sections"
                    :key="section.key"
                    :selected="activeSection === section.key"
                    @click="activeSection = section.key"
                >
                    <i :class="`icon-${section.icon}`" />
                    {{ section.label }}
                </UiListItem>
            </UiList>
        </aside>

        <main class="playground-content">
            <KeepAlive>
                <component :is="activeComponent" :key="activeSection" />
            </KeepAlive>
        </main>
    </div>
</template>

<style scoped>
.playground-layout {
    display: flex;
    min-height: 100vh;
}

.playground-sidebar {
    width: 240px;
    flex-shrink: 0;
    border-right: 1px solid var(--ui-card-border-color);
    padding: 1rem 0;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

.playground-sidebar__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem 1rem;
    border-bottom: 1px solid var(--ui-card-border-color);
    margin-bottom: 0.5rem;
}

.playground-sidebar__header h2 {
    margin: 0;
    font-size: 1.125rem;
}

.playground-sidebar :deep(.ui-list-item) {
    gap: 0.5rem;
}

.playground-sidebar :deep(.ui-list-item i) {
    width: 1.25em;
    text-align: center;
    opacity: 0.6;
}

.playground-sidebar :deep(.ui-list-item.selected i) {
    opacity: 1;
}

.playground-content {
    flex: 1;
    min-width: 0;
    padding: 2rem;
    padding-bottom: 6rem;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}
</style>

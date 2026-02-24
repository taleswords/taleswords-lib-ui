<script setup lang="ts">
import { ref, computed, type Component } from 'vue'
import { NavigationButtons, ButtonBase, ToastArea } from '@lib'

import ButtonsPage from './pages/ButtonsPage.vue'
import TextboxesPage from './pages/TextboxesPage.vue'
import CheckboxesRadiosPage from './pages/CheckboxesRadiosPage.vue'
import SwitchesPage from './pages/SwitchesPage.vue'
import DropdownsPage from './pages/DropdownsPage.vue'
import BadgesPage from './pages/BadgesPage.vue'
import LoadersPage from './pages/LoadersPage.vue'
import ProgressPage from './pages/ProgressPage.vue'
import FormsPage from './pages/FormsPage.vue'
import TablesPage from './pages/TablesPage.vue'
import ListsPage from './pages/ListsPage.vue'
import ModalsPage from './pages/ModalsPage.vue'
import CardsPage from './pages/CardsPage.vue'
import LayoutsPage from './pages/LayoutsPage.vue'
import TabsPage from './pages/TabsPage.vue'
import AccordionsPage from './pages/AccordionsPage.vue'
import BreadcrumbsPage from './pages/BreadcrumbsPage.vue'
import PaginationPage from './pages/PaginationPage.vue'
import NavigationButtonsPage from './pages/NavigationButtonsPage.vue'
import RowExpandablePage from './pages/RowExpandablePage.vue'
import NotificationsPage from './pages/NotificationsPage.vue'

interface PageEntry {
    id: string
    label: string
    component: Component
}

interface CategoryGroup {
    label: string
    pages: PageEntry[]
}

const categories: CategoryGroup[] = [
    {
        label: 'Inputs',
        pages: [
            { id: 'buttons', label: 'Buttons', component: ButtonsPage },
            { id: 'textboxes', label: 'Textboxes', component: TextboxesPage },
            { id: 'checkboxes-radios', label: 'Checkboxes & Radios', component: CheckboxesRadiosPage },
            { id: 'switches', label: 'Switches', component: SwitchesPage },
            { id: 'dropdowns', label: 'Dropdowns', component: DropdownsPage },
        ],
    },
    {
        label: 'Info',
        pages: [
            { id: 'badges', label: 'Badges', component: BadgesPage },
            { id: 'loaders', label: 'Loaders', component: LoadersPage },
            { id: 'progress', label: 'Progress', component: ProgressPage },
        ],
    },
    {
        label: 'Forms',
        pages: [
            { id: 'forms', label: 'Form Fields', component: FormsPage },
        ],
    },
    {
        label: 'Data',
        pages: [
            { id: 'tables', label: 'Tables', component: TablesPage },
            { id: 'lists', label: 'Lists', component: ListsPage },
        ],
    },
    {
        label: 'Wrappers',
        pages: [
            { id: 'modals', label: 'Modals', component: ModalsPage },
            { id: 'cards', label: 'Cards', component: CardsPage },
            { id: 'layouts', label: 'Layouts', component: LayoutsPage },
            { id: 'tabs', label: 'Tabs', component: TabsPage },
            { id: 'accordions', label: 'Accordions', component: AccordionsPage },
        ],
    },
    {
        label: 'Navigation',
        pages: [
            { id: 'breadcrumbs', label: 'Breadcrumbs', component: BreadcrumbsPage },
            { id: 'pagination', label: 'Pagination', component: PaginationPage },
            { id: 'nav-buttons', label: 'Nav Buttons', component: NavigationButtonsPage },
        ],
    },
    {
        label: 'Features',
        pages: [
            { id: 'row-expandable', label: 'Row Expandable', component: RowExpandablePage },
        ],
    },
    {
        label: 'Notifications',
        pages: [
            { id: 'notifications', label: 'Toasts & Banners', component: NotificationsPage },
        ],
    },
]

const allPages = categories.flatMap(c => c.pages)
const activePageId = ref(allPages[0].id)

const activePage = computed(() => {
    return allPages.find(p => p.id === activePageId.value)?.component ?? ButtonsPage
})

const isDark = ref(false)
function toggleTheme(): void {
    isDark.value = !isDark.value
    document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : '')
}
</script>

<template>
    <div class="playground-layout">
        <aside class="playground-sidebar">
            <div class="playground-sidebar__header">
                <h2>lib-ui</h2>
                <ButtonBase
                    variant="ghost"
                    size="small"
                    :label="isDark ? 'Dark' : 'Light'"
                    @click="toggleTheme"
                />
            </div>

            <nav class="playground-sidebar__nav">
                <div v-for="category in categories" :key="category.label" class="playground-sidebar__group">
                    <span class="playground-sidebar__category">{{ category.label }}</span>
                    <NavigationButtons
                        :items="category.pages.map(p => ({ id: p.id, label: p.label }))"
                        :active-id="activePageId"
                        @item-clicked="(item) => activePageId = item.id"
                    />
                </div>
            </nav>
        </aside>

        <main class="playground-content">
            <KeepAlive>
                <component :is="activePage" :key="activePageId" />
            </KeepAlive>
        </main>

        <ToastArea />
    </div>
</template>

<style scoped>
.playground-layout {
    display: flex;
    min-height: 100vh;
}

.playground-sidebar {
    width: 220px;
    flex-shrink: 0;
    border-right: 1px solid var(--general-card-border);
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    background: var(--general-card-bg);
}

.playground-sidebar__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--general-card-border);
}

.playground-sidebar__header h2 {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    font-family: var(--font-heading);
}

.playground-sidebar__nav {
    padding: 0.5rem 0;
}

.playground-sidebar__group {
    margin-bottom: 0.25rem;
}

.playground-sidebar__category {
    display: block;
    padding: 0.5rem 1rem 0.25rem;
    font-size: 0.6875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--form-field-description-color);
    font-family: var(--font-ui);
}

.playground-content {
    flex: 1;
    min-width: 0;
    padding: 2rem;
    padding-bottom: 6rem;
    max-width: 960px;
}

.playground-content :deep(.page) {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}
</style>

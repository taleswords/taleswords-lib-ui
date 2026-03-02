import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

export interface NavItem {
    id: string
    label: string
    path: string
    icon: string
}

export interface NavCategory {
    label: string
    items: NavItem[]
}

export const navCategories: NavCategory[] = [
    {
        label: 'Inputs',
        items: [
            { id: 'buttons', label: 'Buttons', path: '/lib/buttons', icon: 'touch_app' },
            { id: 'textboxes', label: 'Textboxes', path: '/lib/textboxes', icon: 'text_fields' },
            { id: 'checkboxes-radios', label: 'Checkboxes & Radios', path: '/lib/checkboxes-radios', icon: 'check_box' },
            { id: 'switches', label: 'Switches', path: '/lib/switches', icon: 'toggle_on' },
            { id: 'dropdowns', label: 'Dropdowns', path: '/lib/dropdowns', icon: 'arrow_drop_down_circle' },
        ],
    },
    {
        label: 'Info',
        items: [
            { id: 'badges', label: 'Badges', path: '/lib/badges', icon: 'verified' },
            { id: 'loaders', label: 'Loaders', path: '/lib/loaders', icon: 'sync' },
            { id: 'progress', label: 'Progress', path: '/lib/progress', icon: 'trending_up' },
            { id: 'tooltips', label: 'Tooltips', path: '/lib/tooltips', icon: 'chat_bubble' },
            { id: 'display-fields', label: 'Display Fields', path: '/lib/display-fields', icon: 'label' },
        ],
    },
    {
        label: 'Forms',
        items: [
            { id: 'forms', label: 'Form Fields', path: '/lib/forms', icon: 'assignment' },
        ],
    },
    {
        label: 'Data',
        items: [
            { id: 'tables', label: 'Tables', path: '/lib/tables', icon: 'table_chart' },
            { id: 'lists', label: 'Lists', path: '/lib/lists', icon: 'list' },
        ],
    },
    {
        label: 'Wrappers',
        items: [
            { id: 'modals', label: 'Modals', path: '/lib/modals', icon: 'web_asset' },
            { id: 'cards', label: 'Cards', path: '/lib/cards', icon: 'dashboard' },
            { id: 'layouts', label: 'Layouts', path: '/lib/layouts', icon: 'view_quilt' },
            { id: 'tabs', label: 'Tabs', path: '/lib/tabs', icon: 'tab' },
            { id: 'accordions', label: 'Accordions', path: '/lib/accordions', icon: 'expand_more' },
        ],
    },
    {
        label: 'Navigation',
        items: [
            { id: 'breadcrumbs', label: 'Breadcrumbs', path: '/lib/breadcrumbs', icon: 'chevron_right' },
            { id: 'pagination', label: 'Pagination', path: '/lib/pagination', icon: 'more_horiz' },
            { id: 'nav-buttons', label: 'Nav Buttons', path: '/lib/nav-buttons', icon: 'menu' },
        ],
    },
    {
        label: 'Features',
        items: [
            { id: 'row-expandable', label: 'Row Expandable', path: '/lib/row-expandable', icon: 'unfold_more' },
        ],
    },
    {
        label: 'Notifications',
        items: [
            { id: 'notifications', label: 'Toasts & Banners', path: '/lib/notifications', icon: 'notifications' },
        ],
    },
]

const pageFileMap: Record<string, string> = {
    'buttons': 'ButtonsPage.vue',
    'textboxes': 'TextboxesPage.vue',
    'checkboxes-radios': 'CheckboxesRadiosPage.vue',
    'switches': 'SwitchesPage.vue',
    'dropdowns': 'DropdownsPage.vue',
    'badges': 'BadgesPage.vue',
    'loaders': 'LoadersPage.vue',
    'progress': 'ProgressPage.vue',
    'forms': 'FormsPage.vue',
    'tables': 'TablesPage.vue',
    'lists': 'ListsPage.vue',
    'modals': 'ModalsPage.vue',
    'cards': 'CardsPage.vue',
    'layouts': 'LayoutsPage.vue',
    'tabs': 'TabsPage.vue',
    'accordions': 'AccordionsPage.vue',
    'breadcrumbs': 'BreadcrumbsPage.vue',
    'pagination': 'PaginationPage.vue',
    'nav-buttons': 'NavigationButtonsPage.vue',
    'row-expandable': 'RowExpandablePage.vue',
    'notifications': 'NotificationsPage.vue',
    'tooltips': 'TooltipsPage.vue',
    'display-fields': 'DisplayFieldsPage.vue',
}

const pageRoutes: RouteRecordRaw[] = navCategories.flatMap(cat =>
    cat.items.map(item => ({
        path: item.path,
        name: item.id,
        component: () => import(`../pages/${pageFileMap[item.id]}`),
    }))
)

const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/lib/buttons' },
    ...pageRoutes,
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

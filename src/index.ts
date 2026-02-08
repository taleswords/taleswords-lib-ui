/// <reference path="./globals.d.ts" />
import '@fontsource/source-sans-pro'
import '@fontsource-variable/lora'
import '@fontsource-variable/raleway'
import type { App, Plugin } from 'vue'
import UiButton from './components/UiButton.vue'
import UiBadge from './components/UiBadge.vue'
import UiModal from './components/UiModal.vue'
import UiPopover from './components/UiPopover.vue'
import UiInputField from './components/UiInputField.vue'
import UiCheckboxField from './components/UiCheckboxField.vue'
import UiInputSelect from './components/UiInputSelect.vue'
import UiUserIcon from './components/UiUserIcon.vue'
import UiBreadcrumbs from './components/UiBreadcrumbs.vue'
import UiActionsHeader from './components/UiActionsHeader.vue'
import UiCard from './components/UiCard.vue'
import UiTextarea from './components/UiTextarea.vue'
import UiTabs from './components/UiTabs.vue'
import UiTooltip from './components/UiTooltip.vue'
import UiLoader from './components/UiLoader.vue'
import UiPagination from './components/UiPagination.vue'
import UiDropdownMenu from './components/UiDropdownMenu.vue'
import UiAlert from './components/UiAlert.vue'
import UiIcon from './components/UiIcon.vue'
import UiToggle from './components/UiToggle.vue'
import UiList from './components/UiList.vue'
import UiListItem from './components/UiListItem.vue'
import UiPathList from './components/UiPathList.vue'
import UiFileUpload from './components/UiFileUpload.vue'
import UiFileUploadModal from './components/UiFileUploadModal.vue'

import './styles/variables.css'
import './styles/base.css'
import './styles/icons.css'

// Named exports for tree-shaking
export {
    UiButton,
    UiBadge,
    UiModal,
    UiPopover,
    UiInputField,
    UiCheckboxField,
    UiInputSelect,
    UiUserIcon,
    UiBreadcrumbs,
    UiActionsHeader,
    UiCard,
    UiTextarea,
    UiTabs,
    UiTooltip,
    UiLoader,
    UiPagination,
    UiDropdownMenu,
    UiAlert,
    UiIcon,
    UiToggle,
    UiList,
    UiListItem,
    UiPathList,
    UiFileUpload,
    UiFileUploadModal,
}

// Color utilities
export { stringToColor, getTextColorForBackground } from './utils/color'

// Re-export types
export * from './types'

// Plugin for Vue app.use()
export const LibUiPlugin: Plugin = {
    install(app: App) {
        app.component('UiButton', UiButton)
        app.component('UiBadge', UiBadge)
        app.component('UiModal', UiModal)
        app.component('UiPopover', UiPopover)
        app.component('UiInputField', UiInputField)
        app.component('UiCheckboxField', UiCheckboxField)
        app.component('UiInputSelect', UiInputSelect)
        app.component('UiUserIcon', UiUserIcon)
        app.component('UiBreadcrumbs', UiBreadcrumbs)
        app.component('UiActionsHeader', UiActionsHeader)
        app.component('UiCard', UiCard)
        app.component('UiTextarea', UiTextarea)
        app.component('UiTabs', UiTabs)
        app.component('UiTooltip', UiTooltip)
        app.component('UiLoader', UiLoader)
        app.component('UiPagination', UiPagination)
        app.component('UiDropdownMenu', UiDropdownMenu)
        app.component('UiAlert', UiAlert)
        app.component('UiIcon', UiIcon)
        app.component('UiToggle', UiToggle)
        app.component('UiList', UiList)
        app.component('UiListItem', UiListItem)
        app.component('UiPathList', UiPathList)
        app.component('UiFileUpload', UiFileUpload)
        app.component('UiFileUploadModal', UiFileUploadModal)
    }
}

// Default export is the plugin
export default LibUiPlugin

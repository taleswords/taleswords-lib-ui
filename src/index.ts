import '@fontsource/source-sans-pro'
import '@fontsource-variable/lora'
import '@fontsource-variable/raleway'
import type { App, Plugin } from 'vue'
import UiButton from './components/UiButton.vue'

import './styles/variables.css'
import './styles/base.css'

// Named exports for tree-shaking
export { UiButton }

// Re-export types
export * from './types'

// Plugin for Vue app.use()
export const LibUiPlugin: Plugin = {
    install(app: App) {
        app.component('UiButton', UiButton)
    }
}

// Default export is the plugin
export default LibUiPlugin

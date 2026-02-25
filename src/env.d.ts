/// <reference types="vite/client" />

declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent
    export default component
}

declare module '*.css' {
    const content: string
    export default content
}

declare module '@fontsource/*' {}
declare module '@fontsource-variable/*' {}
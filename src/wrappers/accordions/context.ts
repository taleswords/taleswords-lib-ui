import type { InjectionKey, Ref } from 'vue'

export interface AccordionContext {
    expandedIds: Readonly<Ref<Set<string>>>
    allowMultiple: boolean
    toggle: (id: string) => void
}

export const AccordionKey: InjectionKey<AccordionContext> = Symbol('AccordionContext')

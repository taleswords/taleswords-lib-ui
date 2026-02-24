import { ref, type InjectionKey, type Ref } from 'vue'
import type { PlaygroundPageMeta } from './usePageContract'

export interface SectionEntry {
    id: string
    title: string
    order: number
    cases: CaseEntry[]
}

export interface CaseEntry {
    id: string
    title: string
    sectionId: string
    order: number
}

export interface SectionRegistry {
    sections: Ref<SectionEntry[]>
    registerSection(entry: Omit<SectionEntry, 'cases'>): void
    registerCase(entry: CaseEntry): void
    unregisterSection(id: string): void
    unregisterCase(id: string): void
    clear(): void
    setPageMeta(meta: PlaygroundPageMeta): void
}

export const SECTION_REGISTRY_KEY: InjectionKey<SectionRegistry> = Symbol('section-registry')

let orderCounter = 0

export function createSectionRegistry(): SectionRegistry {
    const sections = ref<SectionEntry[]>([])

    function registerSection(entry: Omit<SectionEntry, 'cases'>): void {
        const existing = sections.value.find(s => s.id === entry.id)
        if (existing) return

        sections.value = [
            ...sections.value,
            { ...entry, order: orderCounter++, cases: [] },
        ]
    }

    function registerCase(entry: CaseEntry): void {
        sections.value = sections.value.map(section => {
            if (section.id !== entry.sectionId) return section
            if (section.cases.some(c => c.id === entry.id)) return section
            return {
                ...section,
                cases: [...section.cases, { ...entry, order: orderCounter++ }],
            }
        })
    }

    function unregisterSection(id: string): void {
        sections.value = sections.value.filter(s => s.id !== id)
    }

    function unregisterCase(id: string): void {
        sections.value = sections.value.map(section => ({
            ...section,
            cases: section.cases.filter(c => c.id !== id),
        }))
    }

    function clear(): void {
        sections.value = []
        orderCounter = 0
    }

    function setPageMeta(_meta: PlaygroundPageMeta): void {
        // Page meta is stored for future use (e.g. validation overlays)
        // The actual section data comes from Section/Case registration
    }

    return { sections, registerSection, registerCase, unregisterSection, unregisterCase, clear, setPageMeta }
}

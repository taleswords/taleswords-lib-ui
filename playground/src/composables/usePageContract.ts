import { inject, onMounted } from 'vue'
import { SECTION_REGISTRY_KEY } from './useSectionRegistry'

/**
 * Canonical section order for playground pages.
 * Every section title used in a page MUST appear in this list.
 * Sections must appear in this order (gaps are allowed).
 */
export const SECTION_ORDER = [
    'Variants',
    'Sizes',
    'States',
    'Composition',
    'Density',
    'Accessibility',
] as const

export type SectionId = (typeof SECTION_ORDER)[number]

export interface PlaygroundPageMeta {
    /** Ordered list of sections this page declares */
    sections: SectionId[]
    /** If true, an 'Accessibility' section is required */
    isInteractive?: boolean
}

/**
 * Declares and validates a playground page contract.
 *
 * In dev mode:
 * - Warns if sections are out of canonical order
 * - Warns if an interactive page is missing an Accessibility section
 * - Registers declared sections with the section registry (for TOC)
 */
export function definePlaygroundPage(meta: PlaygroundPageMeta): void {
    if (import.meta.env.DEV) {
        validateSectionOrder(meta.sections)
        validateAccessibility(meta)
    }

    const registry = inject(SECTION_REGISTRY_KEY, null)
    if (registry) {
        onMounted(() => {
            registry.setPageMeta(meta)
        })
    }
}

function validateSectionOrder(sections: SectionId[]): void {
    const indices = sections.map(s => SECTION_ORDER.indexOf(s))

    for (let i = 1; i < indices.length; i++) {
        if (indices[i] === -1) {
            console.warn(
                `[Playground Contract] Unknown section "${sections[i]}". ` +
                `Allowed sections: ${SECTION_ORDER.join(', ')}`,
            )
            continue
        }
        if (indices[i] <= indices[i - 1]) {
            console.warn(
                `[Playground Contract] Section "${sections[i]}" must come after "${sections[i - 1]}". ` +
                `Canonical order: ${SECTION_ORDER.join(' → ')}`,
            )
        }
    }
}

function validateAccessibility(meta: PlaygroundPageMeta): void {
    if (meta.isInteractive && !meta.sections.includes('Accessibility')) {
        console.warn(
            '[Playground Contract] Interactive page is missing an "Accessibility" section.',
        )
    }
}

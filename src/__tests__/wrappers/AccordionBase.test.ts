import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import AccordionBase from '../../wrappers/accordions/Base.vue'
import AccordionItem from '../../wrappers/accordions/components/Item.vue'

function createAccordion(props = {}) {
    return mount(AccordionBase, {
        props: { ...props },
        global: {
            components: { AccordionItem },
        },
        slots: {
            default: `
                <AccordionItem id="a" title="Section A">Content A</AccordionItem>
                <AccordionItem id="b" title="Section B">Content B</AccordionItem>
                <AccordionItem id="c" title="Section C" :is-disabled="true">Content C</AccordionItem>
            `,
        },
    })
}

describe('AccordionBase', () => {
    it('renders data-testid', () => {
        const wrapper = createAccordion()
        expect(wrapper.attributes('data-testid')).toBe('accordion-base')
    })

    it('renders all items', () => {
        const wrapper = createAccordion()
        const triggers = wrapper.findAll('button[aria-expanded]')
        expect(triggers).toHaveLength(3)
    })

    it('all items collapsed by default', () => {
        const wrapper = createAccordion()
        const triggers = wrapper.findAll('button[aria-expanded]')
        triggers.forEach((t) => {
            expect(t.attributes('aria-expanded')).toBe('false')
        })
    })

    it('expands on click', async () => {
        const wrapper = createAccordion()
        const triggers = wrapper.findAll('button[aria-expanded]')
        await triggers[0].trigger('click')
        expect(triggers[0].attributes('aria-expanded')).toBe('true')
    })

    it('collapses on second click', async () => {
        const wrapper = createAccordion()
        const triggers = wrapper.findAll('button[aria-expanded]')
        await triggers[0].trigger('click')
        await triggers[0].trigger('click')
        expect(triggers[0].attributes('aria-expanded')).toBe('false')
    })

    it('single mode: only one expanded at a time', async () => {
        const wrapper = createAccordion()
        const triggers = wrapper.findAll('button[aria-expanded]')
        await triggers[0].trigger('click')
        await triggers[1].trigger('click')
        expect(triggers[0].attributes('aria-expanded')).toBe('false')
        expect(triggers[1].attributes('aria-expanded')).toBe('true')
    })

    it('allowMultiple: allows multiple expanded', async () => {
        const wrapper = createAccordion({ allowMultiple: true })
        const triggers = wrapper.findAll('button[aria-expanded]')
        await triggers[0].trigger('click')
        await triggers[1].trigger('click')
        expect(triggers[0].attributes('aria-expanded')).toBe('true')
        expect(triggers[1].attributes('aria-expanded')).toBe('true')
    })

    it('disabled item does not toggle', async () => {
        const wrapper = createAccordion()
        const triggers = wrapper.findAll('button[aria-expanded]')
        await triggers[2].trigger('click')
        expect(triggers[2].attributes('aria-expanded')).toBe('false')
    })

    it('trigger has aria-controls pointing to panel', () => {
        const wrapper = createAccordion()
        const trigger = wrapper.findAll('button[aria-expanded]')[0]
        const panelId = trigger.attributes('aria-controls')
        expect(panelId).toBeTruthy()
        expect(wrapper.find(`#${panelId}`).exists()).toBe(true)
    })

    it('panel has role region and aria-labelledby', () => {
        const wrapper = createAccordion()
        const panels = wrapper.findAll('[role="region"]')
        expect(panels).toHaveLength(3)
        panels.forEach((panel) => {
            expect(panel.attributes('aria-labelledby')).toBeTruthy()
        })
    })

    it('collapseAll exposed method works', async () => {
        const wrapper = createAccordion({ allowMultiple: true })
        const triggers = wrapper.findAll('button[aria-expanded]')
        await triggers[0].trigger('click')
        await triggers[1].trigger('click')

        ;(wrapper.vm as unknown as { collapseAll: () => void }).collapseAll()
        await wrapper.vm.$nextTick()

        const updatedTriggers = wrapper.findAll('button[aria-expanded]')
        updatedTriggers.forEach((t) => {
            expect(t.attributes('aria-expanded')).toBe('false')
        })
    })

    it('has no accessibility violations', async () => {
        const wrapper = createAccordion()
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })

    describe('trigger slots', () => {
        function createWithSlots(slotContent: string) {
            return mount(AccordionBase, {
                global: { components: { AccordionItem } },
                slots: {
                    default: slotContent,
                },
            })
        }

        it('renders trigger-suffix slot content inside trigger button', () => {
            const wrapper = createWithSlots(`
                <AccordionItem id="s1" title="Section">
                    <template #trigger-suffix><span class="test-suffix">3</span></template>
                    Content
                </AccordionItem>
            `)
            const trigger = wrapper.find('button[aria-expanded]')
            expect(trigger.find('.test-suffix').exists()).toBe(true)
            expect(trigger.find('.test-suffix').text()).toBe('3')
        })

        it('renders trigger-prefix slot content inside trigger button', () => {
            const wrapper = createWithSlots(`
                <AccordionItem id="p1" title="Section">
                    <template #trigger-prefix><span class="test-prefix">icon</span></template>
                    Content
                </AccordionItem>
            `)
            const trigger = wrapper.find('button[aria-expanded]')
            expect(trigger.find('.test-prefix').exists()).toBe(true)
            expect(trigger.find('.test-prefix').text()).toBe('icon')
        })

        it('does not render wrapper spans when slots are unused', () => {
            const wrapper = createAccordion()
            expect(wrapper.find('.accordion-item__trigger-prefix').exists()).toBe(false)
            expect(wrapper.find('.accordion-item__trigger-suffix').exists()).toBe(false)
        })

        it('slot content does not interfere with expand/collapse', async () => {
            const wrapper = createWithSlots(`
                <AccordionItem id="t1" title="Section">
                    <template #trigger-suffix><span>badge</span></template>
                    Content
                </AccordionItem>
            `)
            const trigger = wrapper.find('button[aria-expanded]')
            expect(trigger.attributes('aria-expanded')).toBe('false')
            await trigger.trigger('click')
            expect(trigger.attributes('aria-expanded')).toBe('true')
        })

        it('slot content does not interfere with disabled state', async () => {
            const wrapper = createWithSlots(`
                <AccordionItem id="d1" title="Disabled" is-disabled>
                    <template #trigger-suffix><span>badge</span></template>
                    Content
                </AccordionItem>
            `)
            const trigger = wrapper.find('button[aria-expanded]')
            await trigger.trigger('click')
            expect(trigger.attributes('aria-expanded')).toBe('false')
        })

        it('has no accessibility violations with trigger slots populated', async () => {
            const wrapper = createWithSlots(`
                <AccordionItem id="a1" title="Section A">
                    <template #trigger-prefix><span aria-hidden="true">★</span></template>
                    <template #trigger-suffix><span>3</span></template>
                    Content A
                </AccordionItem>
                <AccordionItem id="a2" title="Section B">Content B</AccordionItem>
            `)
            const results = await axe(wrapper.element)
            expect(results).toHaveNoViolations()
        })
    })

    describe('defaultExpanded', () => {
        it('all items collapsed when defaultExpanded is undefined', () => {
            const wrapper = createAccordion()
            const triggers = wrapper.findAll('button[aria-expanded]')
            triggers.forEach((t) => {
                expect(t.attributes('aria-expanded')).toBe('false')
            })
        })

        it('expands specific IDs from defaultExpanded array', () => {
            const wrapper = createAccordion({ defaultExpanded: ['a', 'b'] })
            const triggers = wrapper.findAll('button[aria-expanded]')
            expect(triggers[0].attributes('aria-expanded')).toBe('true')
            expect(triggers[1].attributes('aria-expanded')).toBe('true')
            expect(triggers[2].attributes('aria-expanded')).toBe('false')
        })

        it('expands all items when defaultExpanded is "all"', () => {
            const wrapper = createAccordion({ defaultExpanded: 'all' })
            const triggers = wrapper.findAll('button[aria-expanded]')
            triggers.forEach((t) => {
                expect(t.attributes('aria-expanded')).toBe('true')
            })
        })

        it('runtime toggle still works after defaultExpanded', async () => {
            const wrapper = createAccordion({
                defaultExpanded: ['a'],
                allowMultiple: true,
            })
            const triggers = wrapper.findAll('button[aria-expanded]')
            expect(triggers[0].attributes('aria-expanded')).toBe('true')

            await triggers[0].trigger('click')
            expect(triggers[0].attributes('aria-expanded')).toBe('false')

            await triggers[1].trigger('click')
            expect(triggers[1].attributes('aria-expanded')).toBe('true')
        })

        it('runtime toggle works after defaultExpanded "all"', async () => {
            const wrapper = createAccordion({
                defaultExpanded: 'all',
                allowMultiple: true,
            })
            const triggers = wrapper.findAll('button[aria-expanded]')

            await triggers[0].trigger('click')
            expect(triggers[0].attributes('aria-expanded')).toBe('false')
            expect(triggers[1].attributes('aria-expanded')).toBe('true')
        })
    })
})

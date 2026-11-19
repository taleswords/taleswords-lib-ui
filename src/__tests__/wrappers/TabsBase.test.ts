import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { axe } from '../axeHelper'
import TabsBase from '../../wrappers/tabs/Base.vue'
import type { TabItem } from '../../wrappers/tabs/Base.vue'

const tabs: TabItem[] = [
    { id: 'one', label: 'Tab One' },
    { id: 'two', label: 'Tab Two' },
    { id: 'three', label: 'Tab Three' },
]

describe('TabsBase', () => {
    it('renders data-testid', () => {
        const wrapper = mount(TabsBase, { props: { modelValue: 'one', tabs } })
        expect(wrapper.attributes('data-testid')).toBe('tabs-base')
    })

    it('renders all tabs', () => {
        const wrapper = mount(TabsBase, { props: { modelValue: 'one', tabs } })
        const buttons = wrapper.findAll('[role="tab"]')
        expect(buttons).toHaveLength(3)
        expect(buttons[0].text()).toBe('Tab One')
        expect(buttons[1].text()).toBe('Tab Two')
    })

    it('has tablist role', () => {
        const wrapper = mount(TabsBase, { props: { modelValue: 'one', tabs } })
        expect(wrapper.find('[role="tablist"]').exists()).toBe(true)
    })

    it('sets aria-selected on active tab', () => {
        const wrapper = mount(TabsBase, { props: { modelValue: 'two', tabs } })
        const buttons = wrapper.findAll('[role="tab"]')
        expect(buttons[0].attributes('aria-selected')).toBe('false')
        expect(buttons[1].attributes('aria-selected')).toBe('true')
    })

    it('has tabpanel role', () => {
        const wrapper = mount(TabsBase, { props: { modelValue: 'one', tabs } })
        expect(wrapper.find('[role="tabpanel"]').exists()).toBe(true)
    })

    it('emits update:modelValue on tab click', async () => {
        const wrapper = mount(TabsBase, { props: { modelValue: 'one', tabs } })
        await wrapper.findAll('[role="tab"]')[1].trigger('click')
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['two'])
    })

    it('does not emit when clicking disabled tab', async () => {
        const tabsWithDisabled: TabItem[] = [
            { id: 'a', label: 'A' },
            { id: 'b', label: 'B', isDisabled: true },
        ]
        const wrapper = mount(TabsBase, {
            props: { modelValue: 'a', tabs: tabsWithDisabled },
        })
        await wrapper.findAll('[role="tab"]')[1].trigger('click')
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('navigates with ArrowRight', async () => {
        const wrapper = mount(TabsBase, { props: { modelValue: 'one', tabs } })
        await wrapper.find('[role="tablist"]').trigger('keydown', { key: 'ArrowRight' })
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['two'])
    })

    it('navigates with ArrowLeft (wraps)', async () => {
        const wrapper = mount(TabsBase, { props: { modelValue: 'one', tabs } })
        await wrapper.find('[role="tablist"]').trigger('keydown', { key: 'ArrowLeft' })
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['three'])
    })

    it('navigates with Home key', async () => {
        const wrapper = mount(TabsBase, { props: { modelValue: 'three', tabs } })
        await wrapper.find('[role="tablist"]').trigger('keydown', { key: 'Home' })
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['one'])
    })

    it('navigates with End key', async () => {
        const wrapper = mount(TabsBase, { props: { modelValue: 'one', tabs } })
        await wrapper.find('[role="tablist"]').trigger('keydown', { key: 'End' })
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['three'])
    })

    it('uses roving tabindex', () => {
        const wrapper = mount(TabsBase, { props: { modelValue: 'two', tabs } })
        const buttons = wrapper.findAll('[role="tab"]')
        expect(buttons[0].attributes('tabindex')).toBe('-1')
        expect(buttons[1].attributes('tabindex')).toBe('0')
        expect(buttons[2].attributes('tabindex')).toBe('-1')
    })

    it('renders indicator element', () => {
        const wrapper = mount(TabsBase, { props: { modelValue: 'one', tabs } })
        expect(wrapper.find('.tabs-base__indicator').exists()).toBe(true)
    })

    it('renders scoped slot with activeTab', () => {
        const wrapper = mount(TabsBase, {
            props: { modelValue: 'two', tabs },
            slots: { default: '<template #default="{ activeTab }"><span class="active">{{ activeTab }}</span></template>' },
        })
        expect(wrapper.find('.active').text()).toBe('two')
    })

    it('sets aria-controls on tabs and aria-labelledby on panel', () => {
        const wrapper = mount(TabsBase, { props: { modelValue: 'one', tabs } })
        const tab = wrapper.findAll('[role="tab"]')[0]
        const panel = wrapper.find('[role="tabpanel"]')
        expect(tab.attributes('aria-controls')).toBe(panel.attributes('id'))
        expect(panel.attributes('aria-labelledby')).toBe(tab.attributes('id'))
    })

    it('has no accessibility violations', async () => {
        const wrapper = mount(TabsBase, {
            props: { modelValue: 'one', tabs },
            slots: { default: '<p>Content</p>' },
        })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })

    // ── Overflow (2.7.0): the row scrolls and shows it ──

    function stubScroll(list: Element, metrics: { scrollLeft: number; clientWidth: number; scrollWidth: number }): void {
        for (const [key, value] of Object.entries(metrics)) {
            Object.defineProperty(list, key, { configurable: true, value })
        }
    }

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('renders no edge when the row fits', async () => {
        const wrapper = mount(TabsBase, { props: { modelValue: 'one', tabs } })
        await flushPromises()
        expect(wrapper.find('.tabs-base__edge').exists()).toBe(false)
    })

    it('renders the end edge alone when tabs lie beyond the end', async () => {
        const wrapper = mount(TabsBase, { props: { modelValue: 'one', tabs } })
        const list = wrapper.find('[role="tablist"]')
        stubScroll(list.element, { scrollLeft: 0, clientWidth: 300, scrollWidth: 380 })
        await list.trigger('scroll')
        expect(wrapper.find('[data-testid="tabs-edge-end"]').exists()).toBe(true)
        expect(wrapper.find('[data-testid="tabs-edge-start"]').exists()).toBe(false)
    })

    it('renders the start edge alone when the row is scrolled to its end', async () => {
        const wrapper = mount(TabsBase, { props: { modelValue: 'one', tabs } })
        const list = wrapper.find('[role="tablist"]')
        stubScroll(list.element, { scrollLeft: 80, clientWidth: 300, scrollWidth: 380 })
        await list.trigger('scroll')
        expect(wrapper.find('[data-testid="tabs-edge-start"]').exists()).toBe(true)
        expect(wrapper.find('[data-testid="tabs-edge-end"]').exists()).toBe(false)
    })

    it('keeps the edges out of the tab order and the accessibility tree', async () => {
        const wrapper = mount(TabsBase, { props: { modelValue: 'one', tabs } })
        const list = wrapper.find('[role="tablist"]')
        stubScroll(list.element, { scrollLeft: 40, clientWidth: 300, scrollWidth: 380 })
        await list.trigger('scroll')
        const edges = wrapper.findAll('.tabs-base__edge')
        expect(edges).toHaveLength(2)
        for (const edge of edges) {
            expect(edge.attributes('tabindex')).toBe('-1')
            expect(edge.attributes('aria-hidden')).toBe('true')
            expect(edge.attributes('type')).toBe('button')
        }
        expect(wrapper.findAll('[role="tablist"] > .tabs-base__edge')).toHaveLength(0)
    })

    it('scrolls the row when an edge is pressed', async () => {
        const wrapper = mount(TabsBase, { props: { modelValue: 'one', tabs } })
        const list = wrapper.find('[role="tablist"]')
        stubScroll(list.element, { scrollLeft: 0, clientWidth: 300, scrollWidth: 380 })
        const scrollBy = vi.fn()
        Object.defineProperty(list.element, 'scrollBy', { configurable: true, value: scrollBy })
        await list.trigger('scroll')
        await wrapper.find('[data-testid="tabs-edge-end"]').trigger('click')
        expect(scrollBy).toHaveBeenCalledTimes(1)
        expect(scrollBy.mock.calls[0][0].left).toBeGreaterThan(0)
    })

    it('scrolls the selected tab into view on mount and when the selection changes', async () => {
        const scrollIntoView = vi.fn()
        Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', { configurable: true, writable: true, value: scrollIntoView })
        try {
            const wrapper = mount(TabsBase, { props: { modelValue: 'three', tabs }, attachTo: document.body })
            await flushPromises()
            expect(scrollIntoView).toHaveBeenCalledTimes(1)
            expect(scrollIntoView.mock.contexts[0]).toBe(wrapper.find('[data-tab-id="three"]').element)
            expect(scrollIntoView.mock.calls[0][0]).toEqual({ block: 'nearest', inline: 'nearest' })

            await wrapper.setProps({ modelValue: 'one' })
            await flushPromises()
            expect(scrollIntoView).toHaveBeenCalledTimes(2)
            expect(scrollIntoView.mock.contexts[1]).toBe(wrapper.find('[data-tab-id="one"]').element)
            wrapper.unmount()
        } finally {
            delete (HTMLElement.prototype as { scrollIntoView?: unknown }).scrollIntoView
        }
    })

    it('has no accessibility violations with both edges shown', async () => {
        const wrapper = mount(TabsBase, {
            props: { modelValue: 'one', tabs },
            slots: { default: '<p>Content</p>' },
        })
        const list = wrapper.find('[role="tablist"]')
        stubScroll(list.element, { scrollLeft: 40, clientWidth: 300, scrollWidth: 380 })
        await list.trigger('scroll')
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
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
})

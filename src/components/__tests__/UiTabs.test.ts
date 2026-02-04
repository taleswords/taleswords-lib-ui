import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiTabs from '../UiTabs.vue'

const items = [
    { key: 'tab1', label: 'Tab 1' },
    { key: 'tab2', label: 'Tab 2' },
    { key: 'tab3', label: 'Tab 3', disabled: true },
]

describe('UiTabs', () => {
    it('renders all tabs', () => {
        const wrapper = mount(UiTabs, { props: { items, modelValue: 'tab1' } })
        const tabs = wrapper.findAll('[role="tab"]')
        expect(tabs).toHaveLength(3)
    })

    it('marks active tab with aria-selected', () => {
        const wrapper = mount(UiTabs, { props: { items, modelValue: 'tab2' } })
        const tabs = wrapper.findAll('[role="tab"]')
        expect(tabs[1].attributes('aria-selected')).toBe('true')
        expect(tabs[0].attributes('aria-selected')).toBe('false')
    })

    it('has tablist role', () => {
        const wrapper = mount(UiTabs, { props: { items, modelValue: 'tab1' } })
        expect(wrapper.find('[role="tablist"]').exists()).toBe(true)
    })

    it('has tabpanel role', () => {
        const wrapper = mount(UiTabs, { props: { items, modelValue: 'tab1' } })
        expect(wrapper.find('[role="tabpanel"]').exists()).toBe(true)
    })

    it('tabpanel has aria-labelledby', () => {
        const wrapper = mount(UiTabs, { props: { items, modelValue: 'tab1' } })
        const panel = wrapper.find('[role="tabpanel"]')
        expect(panel.attributes('aria-labelledby')).toBe('tab-tab1')
    })

    it('emits update:modelValue on tab click', async () => {
        const wrapper = mount(UiTabs, { props: { items, modelValue: 'tab1' } })
        const tabs = wrapper.findAll('[role="tab"]')
        await tabs[1].trigger('click')
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['tab2'])
    })

    it('does not emit on disabled tab click', async () => {
        const wrapper = mount(UiTabs, { props: { items, modelValue: 'tab1' } })
        const tabs = wrapper.findAll('[role="tab"]')
        await tabs[2].trigger('click')
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('disabled tab has disabled attribute', () => {
        const wrapper = mount(UiTabs, { props: { items, modelValue: 'tab1' } })
        const tabs = wrapper.findAll('[role="tab"]')
        expect((tabs[2].element as HTMLButtonElement).disabled).toBe(true)
    })

    it('renders slot content', () => {
        const wrapper = mount(UiTabs, {
            props: { items, modelValue: 'tab1' },
            slots: { default: '<p>Panel content</p>' },
        })
        expect(wrapper.find('[role="tabpanel"]').html()).toContain('Panel content')
    })

    it('active tab has tabindex 0, others -1', () => {
        const wrapper = mount(UiTabs, { props: { items, modelValue: 'tab1' } })
        const tabs = wrapper.findAll('[role="tab"]')
        expect(tabs[0].attributes('tabindex')).toBe('0')
        expect(tabs[1].attributes('tabindex')).toBe('-1')
    })

    it('navigates with ArrowRight', async () => {
        const wrapper = mount(UiTabs, { props: { items, modelValue: 'tab1' } })
        await wrapper.find('[role="tablist"]').trigger('keydown', { key: 'ArrowRight' })
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['tab2'])
    })

    it('navigates with ArrowLeft wrapping around', async () => {
        const wrapper = mount(UiTabs, { props: { items, modelValue: 'tab1' } })
        await wrapper.find('[role="tablist"]').trigger('keydown', { key: 'ArrowLeft' })
        // Should wrap to last enabled tab (tab2, since tab3 is disabled)
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['tab2'])
    })
})

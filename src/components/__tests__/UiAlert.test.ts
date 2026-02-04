import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiAlert from '../UiAlert.vue'

describe('UiAlert', () => {
    it('renders message', () => {
        const wrapper = mount(UiAlert, { props: { message: 'Hello' } })
        expect(wrapper.find('.ui-alert__message').text()).toBe('Hello')
    })

    it('defaults to info type', () => {
        const wrapper = mount(UiAlert, { props: { message: 'Info' } })
        expect(wrapper.classes()).toContain('ui-alert--info')
    })

    it('renders all types', () => {
        for (const type of ['info', 'success', 'warning', 'error'] as const) {
            const wrapper = mount(UiAlert, { props: { message: 'Test', type } })
            expect(wrapper.classes()).toContain(`ui-alert--${type}`)
        }
    })

    it('has role="alert"', () => {
        const wrapper = mount(UiAlert, { props: { message: 'Test' } })
        expect(wrapper.attributes('role')).toBe('alert')
    })

    it('renders icon', () => {
        const wrapper = mount(UiAlert, { props: { message: 'Test' } })
        expect(wrapper.find('.ui-alert__icon').exists()).toBe(true)
    })

    it('shows dismiss button when dismissible', () => {
        const wrapper = mount(UiAlert, { props: { message: 'Test', dismissible: true } })
        const btn = wrapper.find('.ui-alert__dismiss')
        expect(btn.exists()).toBe(true)
        expect(btn.attributes('aria-label')).toBe('Dismiss alert')
    })

    it('does not show dismiss button by default', () => {
        const wrapper = mount(UiAlert, { props: { message: 'Test' } })
        expect(wrapper.find('.ui-alert__dismiss').exists()).toBe(false)
    })

    it('emits dismiss on button click', async () => {
        const wrapper = mount(UiAlert, { props: { message: 'Test', dismissible: true } })
        await wrapper.find('.ui-alert__dismiss').trigger('click')
        expect(wrapper.emitted('dismiss')).toHaveLength(1)
    })

    it('renders slot content', () => {
        const wrapper = mount(UiAlert, {
            props: { message: 'Main' },
            slots: { default: '<p>Extra info</p>' },
        })
        expect(wrapper.html()).toContain('Extra info')
    })
})

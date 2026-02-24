import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import ToastBase from '../../notifications/toasts/Base.vue'

describe('ToastBase', () => {
    it('renders data-testid', () => {
        const wrapper = mount(ToastBase, {
            props: { id: 1, message: 'Hello' },
        })
        expect(wrapper.attributes('data-testid')).toBe('toast-base')
    })

    it('has role alert', () => {
        const wrapper = mount(ToastBase, {
            props: { id: 1, message: 'Test' },
        })
        expect(wrapper.attributes('role')).toBe('alert')
    })

    it('renders message', () => {
        const wrapper = mount(ToastBase, {
            props: { id: 1, message: 'Something happened' },
        })
        expect(wrapper.find('.toast__message').text()).toBe('Something happened')
    })

    it('defaults to info variant', () => {
        const wrapper = mount(ToastBase, {
            props: { id: 1, message: 'Info' },
        })
        expect(wrapper.classes()).toContain('toast--info')
    })

    it('applies variant class', () => {
        const wrapper = mount(ToastBase, {
            props: { id: 1, message: 'Error', variant: 'error' },
        })
        expect(wrapper.classes()).toContain('toast--error')
    })

    it('renders dismiss button by default', () => {
        const wrapper = mount(ToastBase, {
            props: { id: 1, message: 'Test' },
        })
        const dismiss = wrapper.find('.toast__dismiss')
        expect(dismiss.exists()).toBe(true)
        expect(dismiss.attributes('aria-label')).toBe('Dismiss notification')
    })

    it('hides dismiss button when isDismissible is false', () => {
        const wrapper = mount(ToastBase, {
            props: { id: 1, message: 'Test', isDismissible: false },
        })
        expect(wrapper.find('.toast__dismiss').exists()).toBe(false)
    })

    it('emits dismiss with id on dismiss click', async () => {
        const wrapper = mount(ToastBase, {
            props: { id: 42, message: 'Test' },
        })
        await wrapper.find('.toast__dismiss').trigger('click')
        expect(wrapper.emitted('dismiss')?.[0]).toEqual([42])
    })

    it('has no accessibility violations', async () => {
        const wrapper = mount(ToastBase, {
            props: { id: 1, message: 'Accessible toast', variant: 'success' },
        })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
})

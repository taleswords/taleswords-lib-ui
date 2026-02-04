import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import UiPopover from '../UiPopover.vue'

describe('UiPopover', () => {
    it('renders message', () => {
        const wrapper = mount(UiPopover, { props: { message: 'Done!' } })
        expect(wrapper.text()).toContain('Done!')
    })

    it('renders success type by default', () => {
        const wrapper = mount(UiPopover, { props: { message: 'OK' } })
        expect(wrapper.classes()).toContain('ui-popover--success')
    })

    it('renders error type', () => {
        const wrapper = mount(UiPopover, { props: { message: 'Fail', type: 'error' } })
        expect(wrapper.classes()).toContain('ui-popover--error')
    })

    it('has role="alert"', () => {
        const wrapper = mount(UiPopover, { props: { message: 'OK' } })
        expect(wrapper.attributes('role')).toBe('alert')
    })

    it('has aria-live="assertive"', () => {
        const wrapper = mount(UiPopover, { props: { message: 'OK' } })
        expect(wrapper.attributes('aria-live')).toBe('assertive')
    })

    it('emits close on X button click', async () => {
        const wrapper = mount(UiPopover, { props: { message: 'OK' } })
        await wrapper.find('.ui-popover__x-button').trigger('click')
        expect(wrapper.emitted('close')).toHaveLength(1)
    })

    it('auto-closes after duration', async () => {
        vi.useFakeTimers()
        const wrapper = mount(UiPopover, { props: { message: 'OK', duration: 1000 } })
        vi.advanceTimersByTime(1000)
        expect(wrapper.emitted('close')).toHaveLength(1)
        vi.useRealTimers()
    })

    it('shows success icon for success type', () => {
        const wrapper = mount(UiPopover, { props: { message: 'OK', type: 'success' } })
        expect(wrapper.find('.ui-popover__type-icon').exists()).toBe(true)
    })

    it('shows error icon for error type', () => {
        const wrapper = mount(UiPopover, { props: { message: 'Fail', type: 'error' } })
        expect(wrapper.find('.ui-popover__type-icon').exists()).toBe(true)
    })
})

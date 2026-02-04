import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiButton from '../UiButton.vue'

describe('UiButton', () => {
    it('renders with default props', () => {
        const wrapper = mount(UiButton, { slots: { default: 'Click' } })
        expect(wrapper.text()).toBe('Click')
        expect(wrapper.classes()).toContain('ui-button--default')
        expect(wrapper.classes()).toContain('ui-button--medium')
    })

    it('renders all variant classes', () => {
        for (const variant of ['default', 'primary', 'secondary', 'danger'] as const) {
            const wrapper = mount(UiButton, { props: { variant }, slots: { default: 'Btn' } })
            expect(wrapper.classes()).toContain(`ui-button--${variant}`)
        }
    })

    it('renders small size', () => {
        const wrapper = mount(UiButton, { props: { size: 'small' }, slots: { default: 'Btn' } })
        expect(wrapper.classes()).toContain('ui-button--small')
    })

    it('is disabled when prop is set', () => {
        const wrapper = mount(UiButton, { props: { disabled: true }, slots: { default: 'Btn' } })
        expect((wrapper.element as HTMLButtonElement).disabled).toBe(true)
    })

    it('renders slot content', () => {
        const wrapper = mount(UiButton, { slots: { default: '<span>Icon</span> Save' } })
        expect(wrapper.html()).toContain('Icon')
        expect(wrapper.text()).toContain('Save')
    })
})

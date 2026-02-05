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

    it('renders ghost variant classes', () => {
        for (const variant of ['ghost', 'ghost-primary', 'ghost-danger'] as const) {
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

    it('renders icon on left by default', () => {
        const wrapper = mount(UiButton, {
            props: { icon: 'plus' },
            slots: { default: 'Add' }
        })
        const icon = wrapper.find('.ui-button__icon')
        expect(icon.exists()).toBe(true)
        expect(icon.classes()).toContain('icon-plus')
        expect(icon.classes()).toContain('ui-button__icon--left')
    })

    it('renders icon on right when specified', () => {
        const wrapper = mount(UiButton, {
            props: { icon: 'right', iconPosition: 'right' },
            slots: { default: 'Next' }
        })
        const icon = wrapper.find('.ui-button__icon')
        expect(icon.classes()).toContain('ui-button__icon--right')
    })

    it('renders icon-only button without slot content', () => {
        const wrapper = mount(UiButton, { props: { icon: 'search' } })
        expect(wrapper.classes()).toContain('ui-button--icon-only')
        expect(wrapper.find('.icon-search').exists()).toBe(true)
    })

    it('does not render icon when not provided', () => {
        const wrapper = mount(UiButton, { slots: { default: 'No Icon' } })
        expect(wrapper.find('.ui-button__icon').exists()).toBe(false)
    })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiLoader from '../UiLoader.vue'

describe('UiLoader', () => {
    it('renders with default props', () => {
        const wrapper = mount(UiLoader)
        expect(wrapper.find('.ui-loader__spinner').exists()).toBe(true)
        expect(wrapper.classes()).toContain('ui-loader--medium')
    })

    it('renders spinner variant', () => {
        const wrapper = mount(UiLoader, { props: { variant: 'spinner' } })
        expect(wrapper.find('.ui-loader__spinner').exists()).toBe(true)
    })

    it('renders dots variant', () => {
        const wrapper = mount(UiLoader, { props: { variant: 'dots' } })
        expect(wrapper.find('.ui-loader__dots').exists()).toBe(true)
        expect(wrapper.findAll('.ui-loader__dot')).toHaveLength(3)
    })

    it('renders all sizes', () => {
        for (const size of ['small', 'medium', 'large'] as const) {
            const wrapper = mount(UiLoader, { props: { size } })
            expect(wrapper.classes()).toContain(`ui-loader--${size}`)
        }
    })

    it('renders overlay mode', () => {
        const wrapper = mount(UiLoader, { props: { overlay: true } })
        expect(wrapper.classes()).toContain('ui-loader--overlay')
    })

    it('renders label', () => {
        const wrapper = mount(UiLoader, { props: { label: 'Loading data...' } })
        expect(wrapper.find('.ui-loader__label').text()).toBe('Loading data...')
    })

    it('has role="status"', () => {
        const wrapper = mount(UiLoader)
        expect(wrapper.attributes('role')).toBe('status')
    })

    it('has aria-live="polite"', () => {
        const wrapper = mount(UiLoader)
        expect(wrapper.attributes('aria-live')).toBe('polite')
    })

    it('has default aria-label when no label', () => {
        const wrapper = mount(UiLoader)
        expect(wrapper.attributes('aria-label')).toBe('Loading')
    })

    it('uses label as aria-label when provided', () => {
        const wrapper = mount(UiLoader, { props: { label: 'Saving' } })
        expect(wrapper.attributes('aria-label')).toBe('Saving')
    })
})

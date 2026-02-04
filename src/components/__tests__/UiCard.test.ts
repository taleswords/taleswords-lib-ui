import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiCard from '../UiCard.vue'

describe('UiCard', () => {
    it('renders with default variant', () => {
        const wrapper = mount(UiCard, { slots: { default: 'Content' } })
        expect(wrapper.text()).toBe('Content')
        expect(wrapper.classes()).toContain('ui-card--default')
    })

    it('renders elevated variant', () => {
        const wrapper = mount(UiCard, { props: { variant: 'elevated' } })
        expect(wrapper.classes()).toContain('ui-card--elevated')
    })

    it('renders outlined variant', () => {
        const wrapper = mount(UiCard, { props: { variant: 'outlined' } })
        expect(wrapper.classes()).toContain('ui-card--outlined')
    })

    it('applies no-padding class', () => {
        const wrapper = mount(UiCard, { props: { noPadding: true } })
        expect(wrapper.classes()).toContain('ui-card--no-padding')
    })

    it('applies row class', () => {
        const wrapper = mount(UiCard, { props: { row: true } })
        expect(wrapper.classes()).toContain('ui-card--row')
    })

    it('renders slot content', () => {
        const wrapper = mount(UiCard, { slots: { default: '<p>Hello</p>' } })
        expect(wrapper.html()).toContain('<p>Hello</p>')
    })
})

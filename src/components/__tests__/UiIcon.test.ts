import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiIcon from '../UiIcon.vue'

describe('UiIcon', () => {
    it('renders with icon class', () => {
        const wrapper = mount(UiIcon, { props: { name: 'search' } })
        expect(wrapper.classes()).toContain('icon-search')
        expect(wrapper.classes()).toContain('ui-icon')
    })

    it('renders with default medium size', () => {
        const wrapper = mount(UiIcon, { props: { name: 'plus' } })
        expect(wrapper.classes()).toContain('ui-icon--medium')
    })

    it('renders all size variants', () => {
        for (const size of ['small', 'medium', 'large'] as const) {
            const wrapper = mount(UiIcon, { props: { name: 'cog', size } })
            expect(wrapper.classes()).toContain(`ui-icon--${size}`)
        }
    })

    it('has aria-hidden attribute', () => {
        const wrapper = mount(UiIcon, { props: { name: 'edit' } })
        expect(wrapper.attributes('aria-hidden')).toBe('true')
    })

    it('renders different icon names', () => {
        const icons = ['cancel', 'ok', 'trash-empty', 'users'] as const
        for (const name of icons) {
            const wrapper = mount(UiIcon, { props: { name } })
            expect(wrapper.classes()).toContain(`icon-${name}`)
        }
    })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import BadgeBase from '../../info/badges/Base.vue'

describe('BadgeBase', () => {
    it('renders data-testid', () => {
        const wrapper = mount(BadgeBase, { props: { variant: 'admin' } })
        expect(wrapper.attributes('data-testid')).toBe('badge-base')
    })

    it('renders as a span', () => {
        const wrapper = mount(BadgeBase, { props: { variant: 'admin' } })
        expect(wrapper.element.tagName).toBe('SPAN')
    })

    it('applies variant class', () => {
        const wrapper = mount(BadgeBase, { props: { variant: 'admin' } })
        expect(wrapper.classes()).toContain('badge--admin')
    })

    it('displays variant as text when no label provided', () => {
        const wrapper = mount(BadgeBase, { props: { variant: 'editor' } })
        expect(wrapper.text()).toBe('editor')
    })

    it('displays label when provided', () => {
        const wrapper = mount(BadgeBase, { props: { variant: 'admin', label: 'Administrator' } })
        expect(wrapper.text()).toBe('Administrator')
    })

    it('renders all variants', () => {
        const variants = [
            'visitor', 'guest', 'guest-editor', 'reviewer', 'editor',
            'manager', 'admin', 'owner', 'public', 'private',
            'pending', 'declined', 'accepted',
        ] as const

        variants.forEach((variant) => {
            const wrapper = mount(BadgeBase, { props: { variant } })
            expect(wrapper.classes()).toContain(`badge--${variant}`)
        })
    })

    it('has no accessibility violations', async () => {
        const wrapper = mount(BadgeBase, { props: { variant: 'admin', label: 'Admin' } })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
})

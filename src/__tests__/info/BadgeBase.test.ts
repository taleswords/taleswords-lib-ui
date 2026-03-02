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

    it('renders all role variants', () => {
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

    it('renders all semantic variants', () => {
        const variants = ['neutral', 'info', 'success', 'warning', 'danger'] as const

        variants.forEach((variant) => {
            const wrapper = mount(BadgeBase, { props: { variant } })
            expect(wrapper.classes()).toContain(`badge--${variant}`)
        })
    })

    it('defaults to md size', () => {
        const wrapper = mount(BadgeBase, { props: { variant: 'info' } })
        expect(wrapper.classes()).not.toContain('badge--sm')
    })

    it('applies sm size class', () => {
        const wrapper = mount(BadgeBase, { props: { variant: 'info', size: 'sm' } })
        expect(wrapper.classes()).toContain('badge--sm')
    })

    it('does not apply sm class for md size', () => {
        const wrapper = mount(BadgeBase, { props: { variant: 'info', size: 'md' } })
        expect(wrapper.classes()).not.toContain('badge--sm')
    })

    it('supports custom testId', () => {
        const wrapper = mount(BadgeBase, { props: { variant: 'success', testId: 'my-badge' } })
        expect(wrapper.attributes('data-testid')).toBe('my-badge')
    })

    it('has no accessibility violations', async () => {
        const wrapper = mount(BadgeBase, { props: { variant: 'admin', label: 'Admin' } })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })

    it('has no accessibility violations for semantic variant', async () => {
        const wrapper = mount(BadgeBase, { props: { variant: 'success', label: 'Active' } })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
})

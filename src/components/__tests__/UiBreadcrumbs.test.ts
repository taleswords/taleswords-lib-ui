import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiBreadcrumbs from '../UiBreadcrumbs.vue'

describe('UiBreadcrumbs', () => {
    const items = [
        { label: 'Home', href: '/' },
        { label: 'Projects', href: '/projects' },
        { label: 'Current' },
    ]

    it('renders all items', () => {
        const wrapper = mount(UiBreadcrumbs, { props: { items } })
        expect(wrapper.findAll('.ui-breadcrumbs__item')).toHaveLength(3)
    })

    it('renders links for non-last items with href', () => {
        const wrapper = mount(UiBreadcrumbs, { props: { items } })
        const links = wrapper.findAll('.ui-breadcrumbs__link')
        expect(links).toHaveLength(2)
    })

    it('renders last item as text', () => {
        const wrapper = mount(UiBreadcrumbs, { props: { items } })
        const current = wrapper.findAll('.ui-breadcrumbs__current')
        expect(current[current.length - 1].text()).toContain('Current')
    })

    it('has nav with aria-label', () => {
        const wrapper = mount(UiBreadcrumbs, { props: { items } })
        expect(wrapper.find('nav').attributes('aria-label')).toBe('Breadcrumb')
    })

    it('has aria-current="page" on last item', () => {
        const wrapper = mount(UiBreadcrumbs, { props: { items } })
        const allSpans = wrapper.findAll('.ui-breadcrumbs__current')
        const lastSpan = allSpans[allSpans.length - 1]
        expect(lastSpan.attributes('aria-current')).toBe('page')
    })

    it('does not set aria-current on non-last items', () => {
        const wrapper = mount(UiBreadcrumbs, { props: { items } })
        const links = wrapper.findAll('.ui-breadcrumbs__link')
        for (const link of links) {
            expect(link.attributes('aria-current')).toBeUndefined()
        }
    })
})

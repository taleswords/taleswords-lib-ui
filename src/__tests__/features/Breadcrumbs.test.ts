import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import Breadcrumbs from '../../features/Breadcrumbs.vue'
import type { BreadcrumbItem } from '../../features/Breadcrumbs.vue'

const items: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Current' },
]

describe('Breadcrumbs', () => {
    it('renders data-testid', () => {
        const wrapper = mount(Breadcrumbs, { props: { items } })
        expect(wrapper.attributes('data-testid')).toBe('breadcrumbs')
    })

    it('renders nav with aria-label Breadcrumb', () => {
        const wrapper = mount(Breadcrumbs, { props: { items } })
        const nav = wrapper.find('nav')
        expect(nav.exists()).toBe(true)
        expect(nav.attributes('aria-label')).toBe('Breadcrumb')
    })

    it('renders ordered list', () => {
        const wrapper = mount(Breadcrumbs, { props: { items } })
        expect(wrapper.find('ol').exists()).toBe(true)
    })

    it('renders all items', () => {
        const wrapper = mount(Breadcrumbs, { props: { items } })
        const lis = wrapper.findAll('li')
        expect(lis).toHaveLength(3)
    })

    it('renders links for non-last items', () => {
        const wrapper = mount(Breadcrumbs, { props: { items } })
        const links = wrapper.findAll('a')
        expect(links).toHaveLength(2)
        expect(links[0].text()).toBe('Home')
        expect(links[0].attributes('href')).toBe('/')
    })

    it('renders last item as span with aria-current="page"', () => {
        const wrapper = mount(Breadcrumbs, { props: { items } })
        const current = wrapper.find('[aria-current="page"]')
        expect(current.exists()).toBe(true)
        expect(current.text()).toBe('Current')
        expect(current.element.tagName).toBe('SPAN')
    })

    it('renders separators between items', () => {
        const wrapper = mount(Breadcrumbs, { props: { items } })
        const separators = wrapper.findAll('.breadcrumbs__separator')
        expect(separators).toHaveLength(2)
        expect(separators[0].attributes('aria-hidden')).toBe('true')
    })

    it('emits item-clicked on link click', async () => {
        const wrapper = mount(Breadcrumbs, { props: { items } })
        await wrapper.findAll('a')[0].trigger('click')
        expect(wrapper.emitted('item-clicked')?.[0]).toEqual([items[0], 0])
    })

    it('handles single item (no separators)', () => {
        const wrapper = mount(Breadcrumbs, {
            props: { items: [{ label: 'Only' }] },
        })
        expect(wrapper.findAll('.breadcrumbs__separator')).toHaveLength(0)
        expect(wrapper.find('[aria-current="page"]').text()).toBe('Only')
    })

    it('has no accessibility violations', async () => {
        const wrapper = mount(Breadcrumbs, { props: { items } })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
})

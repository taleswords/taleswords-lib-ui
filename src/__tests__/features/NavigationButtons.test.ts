import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import NavigationButtons from '../../features/NavigationButtons.vue'
import type { NavItem } from '../../features/NavigationButtons.vue'

const items: NavItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'settings', label: 'Settings', isDisabled: true },
]

describe('NavigationButtons', () => {
    it('renders data-testid', () => {
        const wrapper = mount(NavigationButtons, { props: { items } })
        expect(wrapper.attributes('data-testid')).toBe('navigation-buttons')
    })

    it('renders nav element', () => {
        const wrapper = mount(NavigationButtons, { props: { items } })
        expect(wrapper.find('nav').exists()).toBe(true)
    })

    it('renders all items', () => {
        const wrapper = mount(NavigationButtons, { props: { items } })
        const btns = wrapper.findAll('.nav-buttons__item')
        expect(btns).toHaveLength(3)
    })

    it('renders button for items without href/to', () => {
        const wrapper = mount(NavigationButtons, { props: { items } })
        const btns = wrapper.findAll('.nav-buttons__item')
        expect(btns[0].element.tagName).toBe('BUTTON')
    })

    it('renders anchor for items with href', () => {
        const wrapper = mount(NavigationButtons, { props: { items } })
        const btns = wrapper.findAll('.nav-buttons__item')
        expect(btns[1].element.tagName).toBe('A')
        expect(btns[1].attributes('href')).toBe('/about')
    })

    it('marks active item with aria-current', () => {
        const wrapper = mount(NavigationButtons, {
            props: { items, activeId: 'home' },
        })
        const active = wrapper.find('[aria-current="page"]')
        expect(active.exists()).toBe(true)
        expect(active.text()).toBe('Home')
    })

    it('applies active class', () => {
        const wrapper = mount(NavigationButtons, {
            props: { items, activeId: 'home' },
        })
        expect(wrapper.find('.nav-buttons__item--active').exists()).toBe(true)
    })

    it('applies disabled class', () => {
        const wrapper = mount(NavigationButtons, { props: { items } })
        expect(wrapper.find('.nav-buttons__item--disabled').exists()).toBe(true)
    })

    it('emits item-clicked on click', async () => {
        const wrapper = mount(NavigationButtons, { props: { items } })
        await wrapper.findAll('.nav-buttons__item')[0].trigger('click')
        expect(wrapper.emitted('item-clicked')?.[0]).toEqual([items[0]])
    })

    it('does not emit for disabled items', async () => {
        const wrapper = mount(NavigationButtons, { props: { items } })
        await wrapper.findAll('.nav-buttons__item')[2].trigger('click')
        expect(wrapper.emitted('item-clicked')).toBeUndefined()
    })

    it('renders icon when provided', () => {
        const itemsWithIcon: NavItem[] = [
            { id: 'x', label: 'X', icon: 'home' },
        ]
        const wrapper = mount(NavigationButtons, { props: { items: itemsWithIcon } })
        const icon = wrapper.find('.nav-buttons__icon')
        expect(icon.exists()).toBe(true)
        expect(icon.classes()).toContain('material-symbols-rounded')
        expect(icon.text()).toBe('home')
        expect(icon.attributes('aria-hidden')).toBe('true')
    })

    it('has no accessibility violations', async () => {
        const wrapper = mount(NavigationButtons, {
            props: { items, activeId: 'home' },
        })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
})

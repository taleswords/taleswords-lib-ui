import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import LayoutBase from '../../wrappers/layouts/Base.vue'

describe('LayoutBase', () => {
    it('renders data-testid', () => {
        const wrapper = mount(LayoutBase)
        expect(wrapper.attributes('data-testid')).toBe('layout-base')
    })

    it('renders title', () => {
        const wrapper = mount(LayoutBase, { props: { title: 'Page Title' } })
        expect(wrapper.text()).toContain('Page Title')
    })

    it('renders description', () => {
        const wrapper = mount(LayoutBase, {
            props: { title: 'T', description: 'Page description' },
        })
        expect(wrapper.text()).toContain('Page description')
    })

    it('renders breadcrumbs slot', () => {
        const wrapper = mount(LayoutBase, {
            slots: { breadcrumbs: '<nav>Crumbs</nav>' },
        })
        expect(wrapper.find('.layout-base__breadcrumbs').text()).toBe('Crumbs')
    })

    it('does not render breadcrumbs area when slot is empty', () => {
        const wrapper = mount(LayoutBase)
        expect(wrapper.find('.layout-base__breadcrumbs').exists()).toBe(false)
    })

    it('renders actions slot', () => {
        const wrapper = mount(LayoutBase, {
            props: { title: 'T' },
            slots: { actions: '<button>Create</button>' },
        })
        expect(wrapper.find('button').text()).toBe('Create')
    })

    it('renders default slot content', () => {
        const wrapper = mount(LayoutBase, {
            slots: { default: '<div class="page">Page</div>' },
        })
        expect(wrapper.find('.page').text()).toBe('Page')
    })

    it('shows loader overlay when isLoading', () => {
        const wrapper = mount(LayoutBase, { props: { isLoading: true } })
        expect(wrapper.find('[data-testid="loader-base"]').exists()).toBe(true)
    })

    it('has no accessibility violations', async () => {
        const wrapper = mount(LayoutBase, {
            props: { title: 'Layout' },
            slots: { default: '<p>Content</p>' },
        })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
})

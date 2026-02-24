import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import CardBase from '../../wrappers/cards/Base.vue'

describe('CardBase', () => {
    it('renders data-testid', () => {
        const wrapper = mount(CardBase)
        expect(wrapper.attributes('data-testid')).toBe('card-base')
    })

    it('renders custom testId', () => {
        const wrapper = mount(CardBase, { props: { testId: 'my-card' } })
        expect(wrapper.attributes('data-testid')).toBe('my-card')
    })

    it('renders title via TitleDescAction', () => {
        const wrapper = mount(CardBase, { props: { title: 'Card Title' } })
        expect(wrapper.text()).toContain('Card Title')
    })

    it('renders description', () => {
        const wrapper = mount(CardBase, {
            props: { title: 'T', description: 'Card Desc' },
        })
        expect(wrapper.text()).toContain('Card Desc')
    })

    it('renders default slot content', () => {
        const wrapper = mount(CardBase, {
            slots: { default: '<p>Body content</p>' },
        })
        expect(wrapper.find('.card-base__content').text()).toBe('Body content')
    })

    it('renders header slot overriding default header', () => {
        const wrapper = mount(CardBase, {
            props: { title: 'Ignored' },
            slots: { header: '<div class="custom-hdr">Custom</div>' },
        })
        expect(wrapper.find('.custom-hdr').exists()).toBe(true)
    })

    it('renders actions slot', () => {
        const wrapper = mount(CardBase, {
            props: { title: 'T' },
            slots: { actions: '<button>Action</button>' },
        })
        expect(wrapper.find('button').text()).toBe('Action')
    })

    it('shows loader overlay when isLoading', () => {
        const wrapper = mount(CardBase, { props: { isLoading: true } })
        expect(wrapper.find('[data-testid="loader-base"]').exists()).toBe(true)
    })

    it('hides loader overlay by default', () => {
        const wrapper = mount(CardBase)
        expect(wrapper.find('[data-testid="loader-base"]').exists()).toBe(false)
    })

    it('has no accessibility violations', async () => {
        const wrapper = mount(CardBase, {
            props: { title: 'Accessible Card' },
            slots: { default: '<p>Content</p>' },
        })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
})

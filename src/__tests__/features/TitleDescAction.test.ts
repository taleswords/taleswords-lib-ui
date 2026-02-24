import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import TitleDescAction from '../../features/TitleDescAction.vue'

describe('TitleDescAction', () => {
    it('renders data-testid', () => {
        const wrapper = mount(TitleDescAction)
        expect(wrapper.attributes('data-testid')).toBe('title-desc-action')
    })

    it('renders custom testId', () => {
        const wrapper = mount(TitleDescAction, { props: { testId: 'custom' } })
        expect(wrapper.attributes('data-testid')).toBe('custom')
    })

    it('renders title as heading', () => {
        const wrapper = mount(TitleDescAction, { props: { title: 'My Title' } })
        expect(wrapper.find('.title-desc-action__heading').text()).toBe('My Title')
    })

    it('renders description when provided', () => {
        const wrapper = mount(TitleDescAction, {
            props: { title: 'Title', description: 'Some description' },
        })
        expect(wrapper.find('.title-desc-action__description').text()).toBe('Some description')
    })

    it('does not render description when not provided', () => {
        const wrapper = mount(TitleDescAction, { props: { title: 'Title' } })
        expect(wrapper.find('.title-desc-action__description').exists()).toBe(false)
    })

    it('renders default slot in place of title', () => {
        const wrapper = mount(TitleDescAction, {
            slots: { default: '<span class="custom">Custom Title</span>' },
        })
        expect(wrapper.find('.custom').text()).toBe('Custom Title')
        expect(wrapper.find('.title-desc-action__heading').exists()).toBe(false)
    })

    it('renders action slot', () => {
        const wrapper = mount(TitleDescAction, {
            props: { title: 'Title' },
            slots: { action: '<button>Do</button>' },
        })
        expect(wrapper.find('.title-desc-action__actions button').text()).toBe('Do')
    })

    it('does not render actions area when no action slot', () => {
        const wrapper = mount(TitleDescAction, { props: { title: 'Title' } })
        expect(wrapper.find('.title-desc-action__actions').exists()).toBe(false)
    })

    it('has no accessibility violations', async () => {
        const wrapper = mount(TitleDescAction, {
            props: { title: 'Page Title', description: 'Description text' },
        })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
})

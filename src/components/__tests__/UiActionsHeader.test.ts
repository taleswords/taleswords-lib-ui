import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiActionsHeader from '../UiActionsHeader.vue'

describe('UiActionsHeader', () => {
    it('renders title', () => {
        const wrapper = mount(UiActionsHeader, { props: { title: 'Section' } })
        expect(wrapper.find('h5').text()).toBe('Section')
    })

    it('renders slot content', () => {
        const wrapper = mount(UiActionsHeader, {
            props: { title: 'Section' },
            slots: { default: '<button>Action</button>' },
        })
        expect(wrapper.find('button').text()).toBe('Action')
    })

    it('has correct structure', () => {
        const wrapper = mount(UiActionsHeader, { props: { title: 'Test' } })
        expect(wrapper.find('.ui-actions-header').exists()).toBe(true)
        expect(wrapper.find('.ui-actions-header__title').exists()).toBe(true)
    })
})

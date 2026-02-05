import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiList from '../UiList.vue'

describe('UiList', () => {
    it('renders with list role', () => {
        const wrapper = mount(UiList)
        expect(wrapper.attributes('role')).toBe('list')
    })

    it('renders slot content', () => {
        const wrapper = mount(UiList, {
            slots: { default: '<div class="test-item">Item 1</div>' }
        })
        expect(wrapper.find('.test-item').exists()).toBe(true)
        expect(wrapper.text()).toContain('Item 1')
    })

    it('renders footer slot', () => {
        const wrapper = mount(UiList, {
            slots: {
                default: '<div>Items</div>',
                footer: '<button>Add Item</button>'
            }
        })
        expect(wrapper.find('.ui-list__footer').exists()).toBe(true)
        expect(wrapper.text()).toContain('Add Item')
    })

    it('does not render footer when slot is empty', () => {
        const wrapper = mount(UiList, {
            slots: { default: '<div>Items</div>' }
        })
        expect(wrapper.find('.ui-list__footer').exists()).toBe(false)
    })

    it('applies maxHeight style', () => {
        const wrapper = mount(UiList, { props: { maxHeight: '300px' } })
        expect(wrapper.attributes('style')).toContain('max-height: 300px')
    })

    it('defaults to no maxHeight', () => {
        const wrapper = mount(UiList)
        expect(wrapper.attributes('style')).toContain('max-height: none')
    })

    it('has scrollable items container', () => {
        const wrapper = mount(UiList)
        expect(wrapper.find('.ui-list__items').exists()).toBe(true)
    })
})

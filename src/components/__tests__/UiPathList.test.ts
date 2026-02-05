import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiPathList from '../UiPathList.vue'

describe('UiPathList', () => {
    const sampleItems = [
        { id: '1', label: 'Root' },
        { id: '2', label: 'Chapter 1' },
        { id: '3', label: 'Scene A' },
    ]

    it('renders with navigation role', () => {
        const wrapper = mount(UiPathList, { props: { items: sampleItems } })
        expect(wrapper.attributes('role')).toBe('navigation')
    })

    it('renders all path items', () => {
        const wrapper = mount(UiPathList, { props: { items: sampleItems } })
        const items = wrapper.findAll('.ui-path-list__item')
        expect(items).toHaveLength(3)
    })

    it('displays item labels', () => {
        const wrapper = mount(UiPathList, { props: { items: sampleItems } })
        expect(wrapper.text()).toContain('Root')
        expect(wrapper.text()).toContain('Chapter 1')
        expect(wrapper.text()).toContain('Scene A')
    })

    it('marks last item as current', () => {
        const wrapper = mount(UiPathList, { props: { items: sampleItems } })
        const items = wrapper.findAll('.ui-path-list__item')
        expect(items[2].classes()).toContain('ui-path-list__item--current')
        expect(items[0].classes()).not.toContain('ui-path-list__item--current')
    })

    it('marks selected item', () => {
        const wrapper = mount(UiPathList, {
            props: { items: sampleItems, selectedId: '2' }
        })
        const items = wrapper.findAll('.ui-path-list__item')
        expect(items[1].classes()).toContain('ui-path-list__item--selected')
    })

    it('emits select event with item and index', async () => {
        const wrapper = mount(UiPathList, { props: { items: sampleItems } })
        const items = wrapper.findAll('.ui-path-list__item')
        await items[1].trigger('click')

        expect(wrapper.emitted('select')).toBeTruthy()
        const [item, index] = wrapper.emitted('select')![0] as [typeof sampleItems[0], number]
        expect(item.id).toBe('2')
        expect(item.label).toBe('Chapter 1')
        expect(index).toBe(1)
    })

    it('applies maxHeight style', () => {
        const wrapper = mount(UiPathList, {
            props: { items: sampleItems, maxHeight: '200px' }
        })
        expect(wrapper.attributes('style')).toContain('max-height: 200px')
    })

    it('defaults to 300px maxHeight', () => {
        const wrapper = mount(UiPathList, { props: { items: sampleItems } })
        expect(wrapper.attributes('style')).toContain('max-height: 300px')
    })

    it('renders empty when no items', () => {
        const wrapper = mount(UiPathList, { props: { items: [] } })
        expect(wrapper.findAll('.ui-path-list__item')).toHaveLength(0)
    })

    it('renders connector dots for each item', () => {
        const wrapper = mount(UiPathList, { props: { items: sampleItems } })
        const dots = wrapper.findAll('.ui-path-list__dot')
        expect(dots).toHaveLength(3)
    })

    it('renders connector lines between items', () => {
        const wrapper = mount(UiPathList, { props: { items: sampleItems } })
        const lines = wrapper.findAll('.ui-path-list__line')
        // First item has no line above it
        expect(lines).toHaveLength(2)
    })
})

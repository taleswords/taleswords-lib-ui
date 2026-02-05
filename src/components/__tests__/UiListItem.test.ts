import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiListItem from '../UiListItem.vue'

describe('UiListItem', () => {
    it('renders with listitem role', () => {
        const wrapper = mount(UiListItem, { slots: { default: 'Item' } })
        expect(wrapper.attributes('role')).toBe('listitem')
    })

    it('renders slot content', () => {
        const wrapper = mount(UiListItem, { slots: { default: 'My Item Content' } })
        expect(wrapper.text()).toContain('My Item Content')
    })

    it('shows expand button when hasChildren is true', () => {
        const wrapper = mount(UiListItem, {
            props: { hasChildren: true },
            slots: { default: 'Parent' }
        })
        expect(wrapper.find('.ui-list-item__expand').exists()).toBe(true)
    })

    it('hides expand button when hasChildren is false', () => {
        const wrapper = mount(UiListItem, {
            props: { hasChildren: false },
            slots: { default: 'Leaf' }
        })
        expect(wrapper.find('.ui-list-item__expand').exists()).toBe(false)
    })

    it('applies selected class', () => {
        const wrapper = mount(UiListItem, {
            props: { selected: true },
            slots: { default: 'Item' }
        })
        expect(wrapper.classes()).toContain('ui-list-item--selected')
    })

    it('applies active class', () => {
        const wrapper = mount(UiListItem, {
            props: { active: true },
            slots: { default: 'Item' }
        })
        expect(wrapper.classes()).toContain('ui-list-item--active')
    })

    it('applies disabled class and attribute', () => {
        const wrapper = mount(UiListItem, {
            props: { disabled: true },
            slots: { default: 'Item' }
        })
        expect(wrapper.classes()).toContain('ui-list-item--disabled')
        expect(wrapper.attributes('tabindex')).toBe('-1')
    })

    it('emits click event', async () => {
        const wrapper = mount(UiListItem, { slots: { default: 'Item' } })
        await wrapper.trigger('click')
        expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('emits dblclick event', async () => {
        const wrapper = mount(UiListItem, { slots: { default: 'Item' } })
        await wrapper.trigger('dblclick')
        expect(wrapper.emitted('dblclick')).toBeTruthy()
    })

    it('emits expand event when expand button clicked', async () => {
        const wrapper = mount(UiListItem, {
            props: { hasChildren: true },
            slots: { default: 'Parent' }
        })
        await wrapper.find('.ui-list-item__expand').trigger('click')
        expect(wrapper.emitted('expand')).toBeTruthy()
    })

    it('does not emit click when disabled', async () => {
        const wrapper = mount(UiListItem, {
            props: { disabled: true },
            slots: { default: 'Item' }
        })
        await wrapper.trigger('click')
        expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('renders actions slot', () => {
        const wrapper = mount(UiListItem, {
            slots: {
                default: 'Item',
                actions: '<button>Edit</button>'
            }
        })
        expect(wrapper.find('.ui-list-item__actions').exists()).toBe(true)
        expect(wrapper.text()).toContain('Edit')
    })

    it('hides actions slot area when not provided', () => {
        const wrapper = mount(UiListItem, { slots: { default: 'Item' } })
        expect(wrapper.find('.ui-list-item__actions').exists()).toBe(false)
    })

    it('has tabindex 0 when not disabled', () => {
        const wrapper = mount(UiListItem, { slots: { default: 'Item' } })
        expect(wrapper.attributes('tabindex')).toBe('0')
    })
})

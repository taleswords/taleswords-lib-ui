import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiDropdownMenu from '../UiDropdownMenu.vue'

const items = [
    { label: 'Edit', action: 'edit' },
    { label: 'Delete', action: 'delete', variant: 'danger' as const },
    { label: 'Disabled', action: 'disabled', disabled: true },
]

describe('UiDropdownMenu', () => {
    it('renders trigger slot', () => {
        const wrapper = mount(UiDropdownMenu, {
            props: { items },
            slots: { default: '<button>Menu</button>' },
        })
        expect(wrapper.text()).toContain('Menu')
    })

    it('trigger has aria-haspopup', () => {
        const wrapper = mount(UiDropdownMenu, {
            props: { items },
            slots: { default: 'Trigger' },
        })
        expect(wrapper.find('[aria-haspopup]').exists()).toBe(true)
    })

    it('trigger has aria-expanded="false" initially', () => {
        const wrapper = mount(UiDropdownMenu, {
            props: { items },
            slots: { default: 'Trigger' },
        })
        expect(wrapper.find('[aria-expanded]').attributes('aria-expanded')).toBe('false')
    })

    it('opens menu on trigger click', async () => {
        const wrapper = mount(UiDropdownMenu, {
            props: { items },
            slots: { default: 'Trigger' },
        })
        await wrapper.find('.ui-dropdown-menu__trigger').trigger('click')
        expect(wrapper.find('[role="menu"]').exists()).toBe(true)
    })

    it('renders menu items with role="menuitem"', async () => {
        const wrapper = mount(UiDropdownMenu, {
            props: { items },
            slots: { default: 'Trigger' },
        })
        await wrapper.find('.ui-dropdown-menu__trigger').trigger('click')
        expect(wrapper.findAll('[role="menuitem"]')).toHaveLength(3)
    })

    it('emits action on item click', async () => {
        const wrapper = mount(UiDropdownMenu, {
            props: { items },
            slots: { default: 'Trigger' },
        })
        await wrapper.find('.ui-dropdown-menu__trigger').trigger('click')
        const menuItems = wrapper.findAll('[role="menuitem"]')
        await menuItems[0].trigger('click')
        expect(wrapper.emitted('action')?.[0]).toEqual(['edit'])
    })

    it('applies danger class to danger variant', async () => {
        const wrapper = mount(UiDropdownMenu, {
            props: { items },
            slots: { default: 'Trigger' },
        })
        await wrapper.find('.ui-dropdown-menu__trigger').trigger('click')
        expect(wrapper.find('.ui-dropdown-menu__item--danger').exists()).toBe(true)
    })

    it('applies disabled class and attribute', async () => {
        const wrapper = mount(UiDropdownMenu, {
            props: { items },
            slots: { default: 'Trigger' },
        })
        await wrapper.find('.ui-dropdown-menu__trigger').trigger('click')
        const disabled = wrapper.find('.ui-dropdown-menu__item--disabled')
        expect(disabled.exists()).toBe(true)
        expect(disabled.attributes('aria-disabled')).toBe('true')
    })

    it('does not emit action for disabled items', async () => {
        const wrapper = mount(UiDropdownMenu, {
            props: { items },
            slots: { default: 'Trigger' },
        })
        await wrapper.find('.ui-dropdown-menu__trigger').trigger('click')
        const menuItems = wrapper.findAll('[role="menuitem"]')
        await menuItems[2].trigger('click')
        expect(wrapper.emitted('action')).toBeUndefined()
    })

    it('closes menu after action', async () => {
        const wrapper = mount(UiDropdownMenu, {
            props: { items },
            slots: { default: 'Trigger' },
        })
        await wrapper.find('.ui-dropdown-menu__trigger').trigger('click')
        expect(wrapper.find('[role="menu"]').exists()).toBe(true)
        await wrapper.findAll('[role="menuitem"]')[0].trigger('click')
        expect(wrapper.find('[role="menu"]').exists()).toBe(false)
    })

    it('aligns left by default', async () => {
        const wrapper = mount(UiDropdownMenu, {
            props: { items },
            slots: { default: 'Trigger' },
        })
        await wrapper.find('.ui-dropdown-menu__trigger').trigger('click')
        expect(wrapper.find('.ui-dropdown-menu__panel--left').exists()).toBe(true)
    })

    it('aligns right when specified', async () => {
        const wrapper = mount(UiDropdownMenu, {
            props: { items, align: 'right' },
            slots: { default: 'Trigger' },
        })
        await wrapper.find('.ui-dropdown-menu__trigger').trigger('click')
        expect(wrapper.find('.ui-dropdown-menu__panel--right').exists()).toBe(true)
    })
})

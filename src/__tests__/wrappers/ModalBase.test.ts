import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import ModalBase from '../../wrappers/modals/Base.vue'

describe('ModalBase', () => {
    it('does not render when modelValue is false', () => {
        const wrapper = mount(ModalBase, {
            props: { modelValue: false },
            global: { stubs: { Teleport: true } },
        })
        expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
    })

    it('renders modal when modelValue is true', () => {
        const wrapper = mount(ModalBase, {
            props: { modelValue: true, title: 'Test Modal' },
            global: { stubs: { Teleport: true } },
        })
        expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
        expect(wrapper.find('[role="dialog"]').attributes('aria-modal')).toBe('true')
    })

    it('renders title in header', () => {
        const wrapper = mount(ModalBase, {
            props: { modelValue: true, title: 'My Dialog' },
            global: { stubs: { Teleport: true } },
        })
        expect(wrapper.text()).toContain('My Dialog')
    })

    it('renders data-testid', () => {
        const wrapper = mount(ModalBase, {
            props: { modelValue: true, title: 'Test' },
            global: { stubs: { Teleport: true } },
        })
        expect(wrapper.find('[data-testid="modal-base"]').exists()).toBe(true)
    })

    it('applies size class', () => {
        const wrapper = mount(ModalBase, {
            props: { modelValue: true, size: 'large', title: 'Big' },
            global: { stubs: { Teleport: true } },
        })
        expect(wrapper.find('.modal--large').exists()).toBe(true)
    })

    it('emits update:modelValue false on close button click', async () => {
        const wrapper = mount(ModalBase, {
            props: { modelValue: true, title: 'Close Me' },
            global: { stubs: { Teleport: true } },
        })
        await wrapper.find('[aria-label="Close"]').trigger('click')
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    })

    it('emits update:modelValue false on overlay click', async () => {
        const wrapper = mount(ModalBase, {
            props: { modelValue: true, title: 'Overlay', closeOnOverlay: true },
            global: { stubs: { Teleport: true } },
        })
        await wrapper.find('.modal-overlay').trigger('click')
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    })

    it('does not close on overlay click when closeOnOverlay is false', async () => {
        const wrapper = mount(ModalBase, {
            props: { modelValue: true, title: 'No Close', closeOnOverlay: false },
            global: { stubs: { Teleport: true } },
        })
        await wrapper.find('.modal-overlay').trigger('click')
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('emits close on escape key', async () => {
        const wrapper = mount(ModalBase, {
            props: { modelValue: true, title: 'Escape' },
            global: { stubs: { Teleport: true } },
        })
        await wrapper.find('.modal-overlay').trigger('keydown', { key: 'Escape' })
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    })

    it('does not close on escape when closeOnEscape is false', async () => {
        const wrapper = mount(ModalBase, {
            props: { modelValue: true, title: 'No Escape', closeOnEscape: false },
            global: { stubs: { Teleport: true } },
        })
        await wrapper.find('.modal-overlay').trigger('keydown', { key: 'Escape' })
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('beforeClose can prevent closing', async () => {
        const wrapper = mount(ModalBase, {
            props: {
                modelValue: true,
                title: 'Confirm',
                beforeClose: () => false,
            },
            global: { stubs: { Teleport: true } },
        })
        await wrapper.find('[aria-label="Close"]').trigger('click')
        // Wait for the async beforeClose to resolve
        await vi.dynamicImportSettled()
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('beforeClose allows closing when returns true', async () => {
        const wrapper = mount(ModalBase, {
            props: {
                modelValue: true,
                title: 'Confirm',
                beforeClose: () => true,
            },
            global: { stubs: { Teleport: true } },
        })
        await wrapper.find('[aria-label="Close"]').trigger('click')
        await vi.dynamicImportSettled()
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    })

    it('renders default slot content', () => {
        const wrapper = mount(ModalBase, {
            props: { modelValue: true, title: 'Content' },
            global: { stubs: { Teleport: true } },
            slots: { default: '<p>Body content</p>' },
        })
        expect(wrapper.text()).toContain('Body content')
    })

    it('renders footer slot', () => {
        const wrapper = mount(ModalBase, {
            props: { modelValue: true, title: 'Footer' },
            global: { stubs: { Teleport: true } },
            slots: { footer: '<button>Save</button>' },
        })
        expect(wrapper.text()).toContain('Save')
    })

    it('does not render close button when hasCloseButton is false', () => {
        const wrapper = mount(ModalBase, {
            props: { modelValue: true, title: 'No Close Btn', hasCloseButton: false },
            global: { stubs: { Teleport: true } },
        })
        expect(wrapper.find('[aria-label="Close"]').exists()).toBe(false)
    })

    it('has no accessibility violations', async () => {
        const wrapper = mount(ModalBase, {
            props: { modelValue: true, title: 'Accessible Modal' },
            global: { stubs: { Teleport: true } },
        })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
})

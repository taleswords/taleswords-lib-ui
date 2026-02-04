import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiModal from '../UiModal.vue'

describe('UiModal', () => {
    it('renders title', () => {
        const wrapper = mount(UiModal, {
            props: { title: 'Test Modal' },
            global: { stubs: { teleport: true } },
        })
        expect(wrapper.find('.ui-modal__title').text()).toBe('Test Modal')
    })

    it('has role="dialog" and aria-modal', () => {
        const wrapper = mount(UiModal, {
            props: { title: 'Dialog' },
            global: { stubs: { teleport: true } },
        })
        const dialog = wrapper.find('[role="dialog"]')
        expect(dialog.exists()).toBe(true)
        expect(dialog.attributes('aria-modal')).toBe('true')
    })

    it('has aria-labelledby pointing to title', () => {
        const wrapper = mount(UiModal, {
            props: { title: 'Dialog' },
            global: { stubs: { teleport: true } },
        })
        const dialog = wrapper.find('[role="dialog"]')
        const titleId = wrapper.find('.ui-modal__title').attributes('id')
        expect(dialog.attributes('aria-labelledby')).toBe(titleId)
    })

    it('renders slot content', () => {
        const wrapper = mount(UiModal, {
            props: { title: 'Test' },
            slots: { default: '<p>Body</p>' },
            global: { stubs: { teleport: true } },
        })
        expect(wrapper.html()).toContain('Body')
    })

    it('renders error text', () => {
        const wrapper = mount(UiModal, {
            props: { title: 'Test', errorText: 'Something wrong' },
            global: { stubs: { teleport: true } },
        })
        expect(wrapper.find('.ui-modal__error-text').text()).toContain('Something wrong')
    })

    it('renders warning text', () => {
        const wrapper = mount(UiModal, {
            props: { title: 'Test', warningText: 'Be careful' },
            global: { stubs: { teleport: true } },
        })
        expect(wrapper.find('.ui-modal__warning-text').text()).toContain('Be careful')
    })

    it('renders info text', () => {
        const wrapper = mount(UiModal, {
            props: { title: 'Test', infoText: 'FYI' },
            global: { stubs: { teleport: true } },
        })
        expect(wrapper.find('.ui-modal__info-text').text()).toContain('FYI')
    })

    it('emits confirm on confirm click', async () => {
        const wrapper = mount(UiModal, {
            props: { title: 'Test' },
            global: { stubs: { teleport: true } },
        })
        const buttons = wrapper.findAll('button')
        const confirmBtn = buttons.find(b => b.text() === 'Confirm')
        await confirmBtn?.trigger('click')
        expect(wrapper.emitted('confirm')).toHaveLength(1)
    })

    it('emits cancel on cancel click', async () => {
        const wrapper = mount(UiModal, {
            props: { title: 'Test' },
            global: { stubs: { teleport: true } },
        })
        const buttons = wrapper.findAll('button')
        const cancelBtn = buttons.find(b => b.text() === 'Cancel')
        await cancelBtn?.trigger('click')
        expect(wrapper.emitted('cancel')).toHaveLength(1)
    })

    it('emits close on overlay click', async () => {
        const wrapper = mount(UiModal, {
            props: { title: 'Test' },
            global: { stubs: { teleport: true } },
        })
        await wrapper.find('.ui-modal-overlay').trigger('click')
        expect(wrapper.emitted('close')).toHaveLength(1)
    })

    it('does not emit when actionsDisabled', async () => {
        const wrapper = mount(UiModal, {
            props: { title: 'Test', actionsDisabled: true },
            global: { stubs: { teleport: true } },
        })
        await wrapper.find('.ui-modal-overlay').trigger('click')
        expect(wrapper.emitted('close')).toBeUndefined()
    })

    it('renders custom button text', () => {
        const wrapper = mount(UiModal, {
            props: { title: 'Test', confirmText: 'Save', cancelText: 'Discard' },
            global: { stubs: { teleport: true } },
        })
        const texts = wrapper.findAll('button').map(b => b.text())
        expect(texts).toContain('Save')
        expect(texts).toContain('Discard')
    })

    it('renders left button', () => {
        const wrapper = mount(UiModal, {
            props: { title: 'Test', leftButtonText: 'Delete' },
            global: { stubs: { teleport: true } },
        })
        const texts = wrapper.findAll('button').map(b => b.text())
        expect(texts).toContain('Delete')
    })
})

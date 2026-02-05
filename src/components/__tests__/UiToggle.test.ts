import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiToggle from '../UiToggle.vue'

describe('UiToggle', () => {
    it('renders unchecked by default', () => {
        const wrapper = mount(UiToggle, { props: { modelValue: false } })
        expect(wrapper.classes()).not.toContain('ui-toggle--checked')
    })

    it('renders checked state', () => {
        const wrapper = mount(UiToggle, { props: { modelValue: true } })
        expect(wrapper.classes()).toContain('ui-toggle--checked')
    })

    it('renders with label', () => {
        const wrapper = mount(UiToggle, { props: { modelValue: false, label: 'Enable feature' } })
        expect(wrapper.text()).toContain('Enable feature')
    })

    it('emits update:modelValue on click', async () => {
        const wrapper = mount(UiToggle, { props: { modelValue: false } })
        await wrapper.find('input').trigger('change')
        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
    })

    it('toggles from true to false', async () => {
        const wrapper = mount(UiToggle, { props: { modelValue: true } })
        await wrapper.find('input').trigger('change')
        expect(wrapper.emitted('update:modelValue')![0]).toEqual([false])
    })

    it('renders disabled state', () => {
        const wrapper = mount(UiToggle, { props: { modelValue: false, disabled: true } })
        expect(wrapper.classes()).toContain('ui-toggle--disabled')
        expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    })

    it('does not emit when disabled', async () => {
        const wrapper = mount(UiToggle, { props: { modelValue: false, disabled: true } })
        await wrapper.find('input').trigger('change')
        expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })

    it('renders all size variants', () => {
        for (const size of ['small', 'medium', 'large'] as const) {
            const wrapper = mount(UiToggle, { props: { modelValue: false, size } })
            expect(wrapper.classes()).toContain(`ui-toggle--${size}`)
        }
    })

    it('renders default medium size', () => {
        const wrapper = mount(UiToggle, { props: { modelValue: false } })
        expect(wrapper.classes()).toContain('ui-toggle--medium')
    })
})

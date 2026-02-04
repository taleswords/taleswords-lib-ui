import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiCheckboxField from '../UiCheckboxField.vue'

describe('UiCheckboxField', () => {
    it('renders with label', () => {
        const wrapper = mount(UiCheckboxField, { props: { modelValue: false, label: 'Accept terms' } })
        expect(wrapper.text()).toContain('Accept terms')
    })

    it('checkbox reflects modelValue', () => {
        const wrapper = mount(UiCheckboxField, { props: { modelValue: true, label: 'Check' } })
        expect((wrapper.find('input[type="checkbox"]').element as HTMLInputElement).checked).toBe(true)
    })

    it('emits update:modelValue on change', async () => {
        const wrapper = mount(UiCheckboxField, { props: { modelValue: false, label: 'Check' } })
        await wrapper.find('input[type="checkbox"]').setValue(true)
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    })

    it('shows error text', () => {
        const wrapper = mount(UiCheckboxField, { props: { modelValue: false, label: 'Check', error: 'Required' } })
        expect(wrapper.find('.ui-checkbox-field__error').text()).toBe('Required')
    })

    it('applies error class to label', () => {
        const wrapper = mount(UiCheckboxField, { props: { modelValue: false, label: 'Check', error: 'Err' } })
        expect(wrapper.find('.ui-checkbox-field__label--error').exists()).toBe(true)
    })

    it('sets aria-invalid when error', () => {
        const wrapper = mount(UiCheckboxField, { props: { modelValue: false, label: 'Check', error: 'Err' } })
        expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
    })

    it('is disabled when prop set', () => {
        const wrapper = mount(UiCheckboxField, { props: { modelValue: false, label: 'Check', disabled: true } })
        expect((wrapper.find('input').element as HTMLInputElement).disabled).toBe(true)
    })
})

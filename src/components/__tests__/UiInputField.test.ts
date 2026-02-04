import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiInputField from '../UiInputField.vue'

describe('UiInputField', () => {
    it('renders with default props', () => {
        const wrapper = mount(UiInputField, { props: { modelValue: '' } })
        const input = wrapper.find('input')
        expect(input.exists()).toBe(true)
        expect(input.attributes('type')).toBe('text')
    })

    it('renders label', () => {
        const wrapper = mount(UiInputField, { props: { modelValue: '', label: 'Email' } })
        expect(wrapper.find('label').text()).toBe('Email')
    })

    it('associates label with input via for/id', () => {
        const wrapper = mount(UiInputField, { props: { modelValue: '', label: 'Name' } })
        const label = wrapper.find('label')
        const input = wrapper.find('input')
        expect(label.attributes('for')).toBe(input.attributes('id'))
    })

    it('shows required star', () => {
        const wrapper = mount(UiInputField, { props: { modelValue: '', label: 'Name', required: true } })
        expect(wrapper.find('.ui-input-field__label--required').exists()).toBe(true)
    })

    it('emits update:modelValue on input', async () => {
        const wrapper = mount(UiInputField, { props: { modelValue: '' } })
        await wrapper.find('input').setValue('hello')
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['hello'])
    })

    it('shows error text', () => {
        const wrapper = mount(UiInputField, { props: { modelValue: '', error: 'Required' } })
        expect(wrapper.find('.ui-input-field__error').text()).toBe('Required')
    })

    it('sets aria-invalid when error', () => {
        const wrapper = mount(UiInputField, { props: { modelValue: '', error: 'Bad' } })
        expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
    })

    it('sets aria-describedby when error', () => {
        const wrapper = mount(UiInputField, { props: { modelValue: '', error: 'Bad' } })
        const input = wrapper.find('input')
        const errorEl = wrapper.find('.ui-input-field__error')
        expect(input.attributes('aria-describedby')).toBe(errorEl.attributes('id'))
    })

    it('does not set aria attributes without error', () => {
        const wrapper = mount(UiInputField, { props: { modelValue: '' } })
        expect(wrapper.find('input').attributes('aria-invalid')).toBeUndefined()
        expect(wrapper.find('input').attributes('aria-describedby')).toBeUndefined()
    })

    it('renders disabled state', () => {
        const wrapper = mount(UiInputField, { props: { modelValue: '', disabled: true } })
        expect((wrapper.find('input').element as HTMLInputElement).disabled).toBe(true)
    })

    it('renders placeholder', () => {
        const wrapper = mount(UiInputField, { props: { modelValue: '', placeholder: 'Enter...' } })
        expect(wrapper.find('input').attributes('placeholder')).toBe('Enter...')
    })

    it('supports email type', () => {
        const wrapper = mount(UiInputField, { props: { modelValue: '', type: 'email' } })
        expect(wrapper.find('input').attributes('type')).toBe('email')
    })
})

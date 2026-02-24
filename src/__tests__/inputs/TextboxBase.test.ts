import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import TextboxBase from '../../inputs/textboxes/Base.vue'

describe('TextboxBase', () => {
    it('renders data-testid', () => {
        const wrapper = mount(TextboxBase)
        expect(wrapper.attributes('data-testid')).toBe('textbox-base')
    })

    it('renders an input element', () => {
        const wrapper = mount(TextboxBase)
        expect(wrapper.find('input').exists()).toBe(true)
    })

    it('binds modelValue to input value', () => {
        const wrapper = mount(TextboxBase, { props: { modelValue: 'hello' } })
        expect(wrapper.find('input').element.value).toBe('hello')
    })

    it('emits update:modelValue on input', async () => {
        const wrapper = mount(TextboxBase, { props: { modelValue: '' } })
        await wrapper.find('input').setValue('new value')
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new value'])
    })

    it('applies error class when hasError is true', () => {
        const wrapper = mount(TextboxBase, { props: { hasError: true } })
        expect(wrapper.find('input').classes()).toContain('textbox__input--error')
    })

    it('sets aria-invalid when hasError is true', () => {
        const wrapper = mount(TextboxBase, { props: { hasError: true } })
        expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
    })

    it('does not set aria-invalid when hasError is false', () => {
        const wrapper = mount(TextboxBase, { props: { hasError: false } })
        expect(wrapper.find('input').attributes('aria-invalid')).toBeUndefined()
    })

    it('disables input when isDisabled is true', () => {
        const wrapper = mount(TextboxBase, { props: { isDisabled: true } })
        expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    })

    it('sets readonly when isReadonly is true', () => {
        const wrapper = mount(TextboxBase, { props: { isReadonly: true } })
        expect(wrapper.find('input').attributes('readonly')).toBeDefined()
    })

    it('sets placeholder', () => {
        const wrapper = mount(TextboxBase, { props: { placeholder: 'Enter text' } })
        expect(wrapper.find('input').attributes('placeholder')).toBe('Enter text')
    })

    it('emits blur event', async () => {
        const wrapper = mount(TextboxBase)
        await wrapper.find('input').trigger('blur')
        expect(wrapper.emitted('blur')).toHaveLength(1)
    })

    it('emits focus event', async () => {
        const wrapper = mount(TextboxBase)
        await wrapper.find('input').trigger('focus')
        expect(wrapper.emitted('focus')).toHaveLength(1)
    })

    it('has no accessibility violations', async () => {
        const wrapper = mount(TextboxBase, {
            props: { modelValue: '', placeholder: 'Enter text' },
        })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
})

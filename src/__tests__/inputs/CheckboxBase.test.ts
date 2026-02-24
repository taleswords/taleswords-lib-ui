import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import CheckboxBase from '../../inputs/checkboxes/Base.vue'

describe('CheckboxBase', () => {
    it('renders data-testid', () => {
        const wrapper = mount(CheckboxBase)
        expect(wrapper.attributes('data-testid')).toBe('checkbox-base')
    })

    it('renders as a label element', () => {
        const wrapper = mount(CheckboxBase)
        expect(wrapper.element.tagName).toBe('LABEL')
    })

    it('renders label text', () => {
        const wrapper = mount(CheckboxBase, { props: { label: 'Accept terms' } })
        expect(wrapper.text()).toContain('Accept terms')
    })

    it('renders hidden native checkbox', () => {
        const wrapper = mount(CheckboxBase)
        const native = wrapper.find('input[type="checkbox"]')
        expect(native.exists()).toBe(true)
    })

    it('binds checked state to native input', () => {
        const wrapper = mount(CheckboxBase, { props: { modelValue: true } })
        const native = wrapper.find('input[type="checkbox"]')
        expect((native.element as HTMLInputElement).checked).toBe(true)
    })

    it('emits update:modelValue on change', async () => {
        const wrapper = mount(CheckboxBase, { props: { modelValue: false } })
        const native = wrapper.find('input[type="checkbox"]')
        await native.setValue(true)
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    })

    it('disables native input when isDisabled is true', () => {
        const wrapper = mount(CheckboxBase, { props: { isDisabled: true } })
        expect(wrapper.find('input').attributes('disabled')).toBeDefined()
        expect(wrapper.classes()).toContain('is-disabled')
    })

    it('applies error class when hasError is true', () => {
        const wrapper = mount(CheckboxBase, { props: { hasError: true } })
        expect(wrapper.classes()).toContain('checkbox--error')
    })

    it('sets aria-invalid when hasError is true', () => {
        const wrapper = mount(CheckboxBase, { props: { hasError: true } })
        expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
    })

    it('has no accessibility violations', async () => {
        const wrapper = mount(CheckboxBase, { props: { label: 'Checkbox' } })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
})

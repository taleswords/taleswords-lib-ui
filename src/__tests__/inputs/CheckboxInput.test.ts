import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import CheckboxInput from '../../inputs/checkboxes/Input.vue'

describe('CheckboxInput', () => {
    it('renders data-testid', () => {
        const wrapper = mount(CheckboxInput)
        expect(wrapper.attributes('data-testid')).toBe('checkbox-input')
    })

    it('renders as a span with aria-hidden', () => {
        const wrapper = mount(CheckboxInput)
        expect(wrapper.element.tagName).toBe('SPAN')
        expect(wrapper.attributes('aria-hidden')).toBe('true')
    })

    it('applies checked class when isChecked is true', () => {
        const wrapper = mount(CheckboxInput, { props: { isChecked: true } })
        expect(wrapper.classes()).toContain('checkbox-input--checked')
    })

    it('does not apply checked class when isChecked is false', () => {
        const wrapper = mount(CheckboxInput, { props: { isChecked: false } })
        expect(wrapper.classes()).not.toContain('checkbox-input--checked')
    })

    it('shows check icon when isChecked is true', () => {
        const wrapper = mount(CheckboxInput, { props: { isChecked: true } })
        expect(wrapper.find('.checkbox-input__check').exists()).toBe(true)
    })

    it('hides check icon when isChecked is false', () => {
        const wrapper = mount(CheckboxInput, { props: { isChecked: false } })
        expect(wrapper.find('.checkbox-input__check').exists()).toBe(false)
    })

    it('applies error class when hasError is true', () => {
        const wrapper = mount(CheckboxInput, { props: { hasError: true } })
        expect(wrapper.classes()).toContain('checkbox-input--error')
    })

    it('applies disabled class when isDisabled is true', () => {
        const wrapper = mount(CheckboxInput, { props: { isDisabled: true } })
        expect(wrapper.classes()).toContain('is-disabled')
    })

    it('has no accessibility violations', async () => {
        const wrapper = mount(CheckboxInput)
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
})

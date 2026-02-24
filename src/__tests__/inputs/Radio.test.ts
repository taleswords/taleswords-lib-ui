import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import Radio from '../../inputs/Radio.vue'

describe('Radio', () => {
    const baseProps = { name: 'group', value: 'option1' }

    it('renders data-testid', () => {
        const wrapper = mount(Radio, { props: baseProps })
        expect(wrapper.attributes('data-testid')).toBe('radio')
    })

    it('renders as a label element', () => {
        const wrapper = mount(Radio, { props: baseProps })
        expect(wrapper.element.tagName).toBe('LABEL')
    })

    it('renders label text', () => {
        const wrapper = mount(Radio, { props: { ...baseProps, label: 'Option 1' } })
        expect(wrapper.text()).toContain('Option 1')
    })

    it('renders native radio input', () => {
        const wrapper = mount(Radio, { props: baseProps })
        const input = wrapper.find('input[type="radio"]')
        expect(input.exists()).toBe(true)
        expect(input.attributes('name')).toBe('group')
    })

    it('checks when modelValue matches value', () => {
        const wrapper = mount(Radio, { props: { ...baseProps, modelValue: 'option1' } })
        const input = wrapper.find('input[type="radio"]')
        expect((input.element as HTMLInputElement).checked).toBe(true)
        expect(wrapper.classes()).toContain('radio--checked')
    })

    it('is unchecked when modelValue differs', () => {
        const wrapper = mount(Radio, { props: { ...baseProps, modelValue: 'other' } })
        const input = wrapper.find('input[type="radio"]')
        expect((input.element as HTMLInputElement).checked).toBe(false)
        expect(wrapper.classes()).not.toContain('radio--checked')
    })

    it('emits update:modelValue with value on change', async () => {
        const wrapper = mount(Radio, { props: { ...baseProps, modelValue: '' } })
        await wrapper.find('input[type="radio"]').trigger('change')
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['option1'])
    })

    it('disables input when isDisabled is true', () => {
        const wrapper = mount(Radio, { props: { ...baseProps, isDisabled: true } })
        expect(wrapper.find('input').attributes('disabled')).toBeDefined()
        expect(wrapper.classes()).toContain('is-disabled')
    })

    it('applies error class when hasError is true', () => {
        const wrapper = mount(Radio, { props: { ...baseProps, hasError: true } })
        expect(wrapper.classes()).toContain('radio--error')
    })

    it('has no accessibility violations', async () => {
        const wrapper = mount(Radio, { props: { ...baseProps, label: 'Option' } })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import Switch from '../../inputs/Switch.vue'

describe('Switch', () => {
    it('renders data-testid', () => {
        const wrapper = mount(Switch)
        expect(wrapper.attributes('data-testid')).toBe('switch')
    })

    it('renders as a label element', () => {
        const wrapper = mount(Switch)
        expect(wrapper.element.tagName).toBe('LABEL')
    })

    it('renders label text', () => {
        const wrapper = mount(Switch, { props: { label: 'Dark mode' } })
        expect(wrapper.text()).toContain('Dark mode')
    })

    it('renders hidden checkbox with role switch', () => {
        const wrapper = mount(Switch)
        const input = wrapper.find('input[type="checkbox"]')
        expect(input.exists()).toBe(true)
        expect(input.attributes('role')).toBe('switch')
    })

    it('applies checked class when modelValue is true', () => {
        const wrapper = mount(Switch, { props: { modelValue: true } })
        expect(wrapper.classes()).toContain('switch--checked')
    })

    it('sets aria-checked based on modelValue', () => {
        const wrapperOn = mount(Switch, { props: { modelValue: true } })
        expect(wrapperOn.find('input').attributes('aria-checked')).toBe('true')

        const wrapperOff = mount(Switch, { props: { modelValue: false } })
        expect(wrapperOff.find('input').attributes('aria-checked')).toBe('false')
    })

    it('emits update:modelValue toggling the value on change', async () => {
        const wrapper = mount(Switch, { props: { modelValue: false } })
        await wrapper.find('input').trigger('change')
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    })

    it('applies size class', () => {
        const wrapper = mount(Switch, { props: { size: 'large' } })
        expect(wrapper.classes()).toContain('switch--large')
    })

    it('applies disabled state', () => {
        const wrapper = mount(Switch, { props: { isDisabled: true } })
        expect(wrapper.classes()).toContain('is-disabled')
        expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    })

    it('does not emit when disabled', async () => {
        const wrapper = mount(Switch, { props: { modelValue: false, isDisabled: true } })
        await wrapper.find('input').trigger('change')
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('has no accessibility violations', async () => {
        const wrapper = mount(Switch, { props: { label: 'Toggle' } })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
})

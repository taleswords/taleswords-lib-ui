import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import FormField from '../../forms/Field.vue'

describe('FormField', () => {
    it('renders data-testid', () => {
        const wrapper = mount(FormField)
        expect(wrapper.attributes('data-testid')).toBe('form-field')
    })

    it('renders label text', () => {
        const wrapper = mount(FormField, { props: { label: 'Username' } })
        expect(wrapper.find('.form-field__label').text()).toContain('Username')
    })

    it('shows required star when not optional', () => {
        const wrapper = mount(FormField, { props: { label: 'Email' } })
        expect(wrapper.find('.form-field__required').exists()).toBe(true)
    })

    it('shows optional text when isOptional is true', () => {
        const wrapper = mount(FormField, { props: { label: 'Bio', isOptional: true } })
        expect(wrapper.find('.form-field__optional').exists()).toBe(true)
        expect(wrapper.find('.form-field__optional').text()).toBe('(optional)')
        expect(wrapper.find('.form-field__required').exists()).toBe(false)
    })

    it('renders description', () => {
        const wrapper = mount(FormField, { props: { description: 'Enter your name' } })
        expect(wrapper.find('.form-field__description').text()).toBe('Enter your name')
    })

    it('renders slot content', () => {
        const wrapper = mount(FormField, {
            slots: { default: '<input type="text" />' },
        })
        expect(wrapper.find('.form-field__control input').exists()).toBe(true)
    })

    it('shows error message from single validation entry', () => {
        const wrapper = mount(FormField, {
            props: {
                validationData: { hasError: true, message: 'Required field' },
            },
        })
        expect(wrapper.find('.form-field__error').text()).toBe('Required field')
        expect(wrapper.classes()).toContain('form-field--error')
    })

    it('shows multiple error messages from array validation', () => {
        const wrapper = mount(FormField, {
            props: {
                validationData: [
                    { hasError: true, message: 'Too short' },
                    { hasError: false, message: 'Invalid format' },
                    { hasError: true, message: 'Contains spaces' },
                ],
            },
        })
        const errors = wrapper.findAll('.form-field__error')
        expect(errors).toHaveLength(2)
        expect(errors[0].text()).toBe('Too short')
        expect(errors[1].text()).toBe('Contains spaces')
    })

    it('does not show errors when hasError is false', () => {
        const wrapper = mount(FormField, {
            props: {
                validationData: { hasError: false, message: 'No error' },
            },
        })
        expect(wrapper.find('.form-field__error').exists()).toBe(false)
        expect(wrapper.classes()).not.toContain('form-field--error')
    })

    it('renders error list with role alert', () => {
        const wrapper = mount(FormField, {
            props: {
                validationData: { hasError: true, message: 'Error' },
            },
        })
        expect(wrapper.find('.form-field__errors').attributes('role')).toBe('alert')
    })

    it('has no accessibility violations', async () => {
        const wrapper = mount(FormField, {
            props: { label: 'Name' },
            slots: { default: '<input type="text" aria-label="Name" />' },
        })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
})

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

    it('does not apply display class by default', () => {
        const wrapper = mount(FormField, { props: { label: 'Name' } })
        expect(wrapper.classes()).not.toContain('form-field--display')
    })

    it('applies display class when display is true', () => {
        const wrapper = mount(FormField, { props: { label: 'Name', display: true } })
        expect(wrapper.classes()).toContain('form-field--display')
    })

    it('does not apply display class when display is false', () => {
        const wrapper = mount(FormField, { props: { label: 'Name', display: false } })
        expect(wrapper.classes()).not.toContain('form-field--display')
    })

    describe('label-suffix slot', () => {
        it('renders label-suffix slot content in label row', () => {
            const wrapper = mount(FormField, {
                props: { label: 'Name' },
                slots: { 'label-suffix': '<span class="test-suffix">Saving</span>' },
            })
            const row = wrapper.find('.form-field__label-row')
            expect(row.exists()).toBe(true)
            expect(row.find('.test-suffix').exists()).toBe(true)
            expect(row.find('.test-suffix').text()).toBe('Saving')
        })

        it('does not render label-suffix wrapper when slot is unused', () => {
            const wrapper = mount(FormField, { props: { label: 'Name' } })
            expect(wrapper.find('.form-field__label-suffix').exists()).toBe(false)
        })

        it('renders label-row wrapper when label prop is provided without suffix', () => {
            const wrapper = mount(FormField, { props: { label: 'Name' } })
            expect(wrapper.find('.form-field__label-row').exists()).toBe(true)
            expect(wrapper.find('.form-field__label').exists()).toBe(true)
        })

        it('label-suffix does not affect label accessible name', () => {
            const wrapper = mount(FormField, {
                props: { label: 'Email' },
                slots: { 'label-suffix': '<span>Saved</span>' },
            })
            const label = wrapper.find('.form-field__label')
            expect(label.text()).toContain('Email')
            expect(label.text()).not.toContain('Saved')
        })

        it('validation errors still render with label-suffix present', () => {
            const wrapper = mount(FormField, {
                props: {
                    label: 'Name',
                    validationData: { hasError: true, message: 'Required' },
                },
                slots: { 'label-suffix': '<span>indicator</span>' },
            })
            expect(wrapper.find('.form-field__error').text()).toBe('Required')
            expect(wrapper.classes()).toContain('form-field--error')
        })

        it('has no accessibility violations with label-suffix populated', async () => {
            const wrapper = mount(FormField, {
                props: { label: 'Name' },
                slots: {
                    default: '<input type="text" aria-label="Name" />',
                    'label-suffix': '<span role="status" aria-label="Saving">⟳</span>',
                },
            })
            const results = await axe(wrapper.element)
            expect(results).toHaveNoViolations()
        })
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

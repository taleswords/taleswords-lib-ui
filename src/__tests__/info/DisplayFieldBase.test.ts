import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import DisplayFieldBase from '../../info/display-fields/Base.vue'

describe('DisplayFieldBase', () => {
    it('renders data-testid', () => {
        const wrapper = mount(DisplayFieldBase, { props: { label: 'Name' } })
        expect(wrapper.attributes('data-testid')).toBe('display-field-base')
    })

    it('renders label text', () => {
        const wrapper = mount(DisplayFieldBase, { props: { label: 'Status' } })
        expect(wrapper.find('.display-field__label').text()).toBe('Status')
    })

    it('renders value text', () => {
        const wrapper = mount(DisplayFieldBase, {
            props: { label: 'Name', value: 'Alice' },
        })
        expect(wrapper.find('.display-field__value').text()).toBe('Alice')
    })

    it('renders em dash when value is null', () => {
        const wrapper = mount(DisplayFieldBase, {
            props: { label: 'Name', value: null },
        })
        expect(wrapper.find('.display-field__value').text()).toBe('\u2014')
    })

    it('renders em dash when value is undefined', () => {
        const wrapper = mount(DisplayFieldBase, { props: { label: 'Name' } })
        expect(wrapper.find('.display-field__value').text()).toBe('\u2014')
    })

    it('renders number value', () => {
        const wrapper = mount(DisplayFieldBase, {
            props: { label: 'Count', value: 42 },
        })
        expect(wrapper.find('.display-field__value').text()).toBe('42')
    })

    it('applies inline class when inline is true', () => {
        const wrapper = mount(DisplayFieldBase, {
            props: { label: 'Key', inline: true },
        })
        expect(wrapper.classes()).toContain('display-field--inline')
    })

    it('does not apply inline class by default', () => {
        const wrapper = mount(DisplayFieldBase, { props: { label: 'Key' } })
        expect(wrapper.classes()).not.toContain('display-field--inline')
    })

    it('applies muted class when isMuted is true', () => {
        const wrapper = mount(DisplayFieldBase, {
            props: { label: 'Note', isMuted: true },
        })
        expect(wrapper.find('.display-field__value').classes()).toContain(
            'display-field__value--muted',
        )
    })

    it('applies truncate class when truncate is true', () => {
        const wrapper = mount(DisplayFieldBase, {
            props: { label: 'Path', truncate: true },
        })
        expect(wrapper.find('.display-field__value').classes()).toContain(
            'display-field__value--truncate',
        )
    })

    it('renders slot content instead of value prop', () => {
        const wrapper = mount(DisplayFieldBase, {
            props: { label: 'Status', value: 'ignored' },
            slots: { default: '<strong>Custom</strong>' },
        })
        expect(wrapper.find('.display-field__value strong').exists()).toBe(true)
        expect(wrapper.find('.display-field__value').text()).toBe('Custom')
    })

    it('has no accessibility violations', async () => {
        const wrapper = mount(DisplayFieldBase, {
            props: { label: 'Name', value: 'Alice' },
        })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
})

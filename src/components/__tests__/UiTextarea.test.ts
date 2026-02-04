import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiTextarea from '../UiTextarea.vue'

describe('UiTextarea', () => {
    it('renders with default props', () => {
        const wrapper = mount(UiTextarea, { props: { modelValue: '' } })
        expect(wrapper.find('textarea').exists()).toBe(true)
    })

    it('renders label', () => {
        const wrapper = mount(UiTextarea, { props: { modelValue: '', label: 'Bio' } })
        expect(wrapper.find('label').text()).toBe('Bio')
    })

    it('associates label with textarea via for/id', () => {
        const wrapper = mount(UiTextarea, { props: { modelValue: '', label: 'Bio' } })
        const label = wrapper.find('label')
        const textarea = wrapper.find('textarea')
        expect(label.attributes('for')).toBe(textarea.attributes('id'))
    })

    it('emits update:modelValue on input', async () => {
        const wrapper = mount(UiTextarea, { props: { modelValue: '' } })
        await wrapper.find('textarea').setValue('hello')
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['hello'])
    })

    it('shows error text', () => {
        const wrapper = mount(UiTextarea, { props: { modelValue: '', error: 'Required' } })
        expect(wrapper.find('.ui-textarea__error').text()).toBe('Required')
    })

    it('sets aria-invalid when error', () => {
        const wrapper = mount(UiTextarea, { props: { modelValue: '', error: 'Bad' } })
        expect(wrapper.find('textarea').attributes('aria-invalid')).toBe('true')
    })

    it('sets aria-describedby when error', () => {
        const wrapper = mount(UiTextarea, { props: { modelValue: '', error: 'Bad' } })
        const textarea = wrapper.find('textarea')
        const errorEl = wrapper.find('.ui-textarea__error')
        expect(textarea.attributes('aria-describedby')).toBe(errorEl.attributes('id'))
    })

    it('shows counter when showCounter and maxLength set', () => {
        const wrapper = mount(UiTextarea, {
            props: { modelValue: 'hello', showCounter: true, maxLength: 200 },
        })
        expect(wrapper.find('.ui-textarea__counter').text()).toBe('5/200')
    })

    it('counter has over class when over limit', () => {
        const wrapper = mount(UiTextarea, {
            props: { modelValue: 'abc', showCounter: true, maxLength: 2 },
        })
        expect(wrapper.find('.ui-textarea__counter--over').exists()).toBe(true)
    })

    it('does not show counter without showCounter', () => {
        const wrapper = mount(UiTextarea, {
            props: { modelValue: 'abc', maxLength: 200 },
        })
        expect(wrapper.find('.ui-textarea__counter').exists()).toBe(false)
    })

    it('shows required star', () => {
        const wrapper = mount(UiTextarea, { props: { modelValue: '', label: 'Bio', required: true } })
        expect(wrapper.find('.ui-textarea__label--required').exists()).toBe(true)
    })

    it('renders disabled state', () => {
        const wrapper = mount(UiTextarea, { props: { modelValue: '', disabled: true } })
        expect((wrapper.find('textarea').element as HTMLTextAreaElement).disabled).toBe(true)
    })

    it('sets rows attribute', () => {
        const wrapper = mount(UiTextarea, { props: { modelValue: '', rows: 8 } })
        expect(wrapper.find('textarea').attributes('rows')).toBe('8')
    })
})

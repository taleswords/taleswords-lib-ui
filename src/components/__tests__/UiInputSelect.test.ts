import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiInputSelect from '../UiInputSelect.vue'

const options = [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
    { label: 'Option C', value: 'c' },
]

describe('UiInputSelect', () => {
    it('renders with placeholder', () => {
        const wrapper = mount(UiInputSelect, { props: { modelValue: '', options, placeholder: 'Pick...' } })
        expect(wrapper.find('.ui-input-select__placeholder').text()).toBe('Pick...')
    })

    it('displays selected option label', () => {
        const wrapper = mount(UiInputSelect, { props: { modelValue: 'b', options } })
        expect(wrapper.find('.ui-input-select__display-text').text()).toBe('Option B')
    })

    it('renders label', () => {
        const wrapper = mount(UiInputSelect, { props: { modelValue: '', options, label: 'Choose' } })
        expect(wrapper.find('.ui-input-select__label').text()).toBe('Choose')
    })

    it('shows error text', () => {
        const wrapper = mount(UiInputSelect, { props: { modelValue: '', options, error: 'Required' } })
        expect(wrapper.find('.ui-input-select__error').text()).toBe('Required')
    })

    it('has aria-expanded on display', () => {
        const wrapper = mount(UiInputSelect, { props: { modelValue: '', options } })
        expect(wrapper.find('.ui-input-select__display').attributes('aria-expanded')).toBe('false')
    })

    it('renders listbox role on dropdown', async () => {
        const wrapper = mount(UiInputSelect, { props: { modelValue: '', options } })
        // Simulate opening the dropdown by focusing the hidden input
        await wrapper.find('.ui-input-select__hidden').trigger('focus')
        expect(wrapper.find('[role="listbox"]').exists()).toBe(true)
    })

    it('renders option roles', async () => {
        const wrapper = mount(UiInputSelect, { props: { modelValue: '', options } })
        await wrapper.find('.ui-input-select__hidden').trigger('focus')
        const optionEls = wrapper.findAll('[role="option"]')
        expect(optionEls).toHaveLength(3)
    })

    it('marks selected option with aria-selected', async () => {
        const wrapper = mount(UiInputSelect, { props: { modelValue: 'b', options } })
        await wrapper.find('.ui-input-select__hidden').trigger('focus')
        const optionEls = wrapper.findAll('[role="option"]')
        expect(optionEls[1].attributes('aria-selected')).toBe('true')
        expect(optionEls[0].attributes('aria-selected')).toBe('false')
    })

    it('shows required star on label', () => {
        const wrapper = mount(UiInputSelect, { props: { modelValue: '', options, label: 'Pick', required: true } })
        expect(wrapper.find('.ui-input-select__label--required').exists()).toBe(true)
    })

    it('applies disabled styling', () => {
        const wrapper = mount(UiInputSelect, { props: { modelValue: '', options, disabled: true } })
        expect(wrapper.find('.ui-input-select__display--disabled').exists()).toBe(true)
    })
})

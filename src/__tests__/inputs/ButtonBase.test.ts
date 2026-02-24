import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import ButtonBase from '../../inputs/buttons/Base.vue'

describe('ButtonBase', () => {
    it('renders as a button by default', () => {
        const wrapper = mount(ButtonBase, { props: { label: 'Click me' } })
        expect(wrapper.element.tagName).toBe('BUTTON')
        expect(wrapper.attributes('type')).toBe('button')
        expect(wrapper.text()).toContain('Click me')
    })

    it('renders data-testid', () => {
        const wrapper = mount(ButtonBase, { props: { label: 'Test' } })
        expect(wrapper.attributes('data-testid')).toBe('button-base')
    })

    it('applies variant class', () => {
        const wrapper = mount(ButtonBase, { props: { variant: 'primary', label: 'Primary' } })
        expect(wrapper.classes()).toContain('button--primary')
    })

    it('applies size class', () => {
        const wrapper = mount(ButtonBase, { props: { size: 'small', label: 'Small' } })
        expect(wrapper.classes()).toContain('button--small')
    })

    it('applies default variant and size when not specified', () => {
        const wrapper = mount(ButtonBase, { props: { label: 'Default' } })
        expect(wrapper.classes()).toContain('button--default')
        expect(wrapper.classes()).toContain('button--medium')
    })

    it('sets disabled attribute when isDisabled is true', () => {
        const wrapper = mount(ButtonBase, { props: { isDisabled: true, label: 'Disabled' } })
        expect(wrapper.attributes('disabled')).toBeDefined()
        expect(wrapper.classes()).toContain('is-disabled')
    })

    it('renders icon on the left by default', () => {
        const wrapper = mount(ButtonBase, { props: { icon: 'check', label: 'Save' } })
        const icons = wrapper.findAll('.button__icon')
        expect(icons).toHaveLength(1)
        expect(icons[0].classes()).toContain('button__icon--left')
        expect(icons[0].classes()).toContain('material-symbols-rounded')
        expect(icons[0].text()).toBe('check')
    })

    it('renders icon on the right when iconPosition is right', () => {
        const wrapper = mount(ButtonBase, { props: { icon: 'arrow_forward', iconPosition: 'right', label: 'Next' } })
        const icons = wrapper.findAll('.button__icon')
        expect(icons).toHaveLength(1)
        expect(icons[0].classes()).toContain('button__icon--right')
        expect(icons[0].classes()).toContain('material-symbols-rounded')
    })

    it('applies icon-only class when icon provided without label', () => {
        const wrapper = mount(ButtonBase, { props: { icon: 'check' } })
        expect(wrapper.classes()).toContain('button--icon-only')
    })

    it('icon span has aria-hidden', () => {
        const wrapper = mount(ButtonBase, { props: { icon: 'check', label: 'Save' } })
        const icon = wrapper.find('.button__icon')
        expect(icon.attributes('aria-hidden')).toBe('true')
    })

    it('renders as anchor when href is provided', () => {
        const wrapper = mount(ButtonBase, { props: { href: 'https://example.com', label: 'Link' } })
        expect(wrapper.element.tagName).toBe('A')
        expect(wrapper.attributes('href')).toBe('https://example.com')
    })

    it('renders slot content', () => {
        const wrapper = mount(ButtonBase, { slots: { default: 'Slot content' } })
        expect(wrapper.text()).toContain('Slot content')
    })

    it('emits click event', async () => {
        const wrapper = mount(ButtonBase, { props: { label: 'Click' } })
        await wrapper.trigger('click')
        expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('has no accessibility violations', async () => {
        const wrapper = mount(ButtonBase, { props: { label: 'Accessible' } })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import LoaderBase from '../../info/loaders/Base.vue'
import LoaderIcon from '../../info/loaders/Icon.vue'

describe('LoaderBase', () => {
    it('renders data-testid', () => {
        const wrapper = mount(LoaderBase)
        expect(wrapper.attributes('data-testid')).toBe('loader-base')
    })

    it('has role status', () => {
        const wrapper = mount(LoaderBase)
        expect(wrapper.attributes('role')).toBe('status')
    })

    it('has aria-live polite', () => {
        const wrapper = mount(LoaderBase)
        expect(wrapper.attributes('aria-live')).toBe('polite')
    })

    it('defaults to spinner variant', () => {
        const wrapper = mount(LoaderBase)
        expect(wrapper.findComponent(LoaderIcon).exists()).toBe(true)
        expect(wrapper.find('.loader__dots').exists()).toBe(false)
    })

    it('renders dots variant', () => {
        const wrapper = mount(LoaderBase, { props: { variant: 'dots' } })
        expect(wrapper.find('.loader__dots').exists()).toBe(true)
        expect(wrapper.findAll('.loader__dot')).toHaveLength(3)
    })

    it('renders label when provided', () => {
        const wrapper = mount(LoaderBase, { props: { label: 'Loading data...' } })
        expect(wrapper.find('.loader__label').text()).toBe('Loading data...')
    })

    it('does not render label when not provided', () => {
        const wrapper = mount(LoaderBase)
        expect(wrapper.find('.loader__label').exists()).toBe(false)
    })

    it('applies overlay class', () => {
        const wrapper = mount(LoaderBase, { props: { isOverlay: true } })
        expect(wrapper.classes()).toContain('loader--overlay')
    })

    it('sets aria-label from label prop', () => {
        const wrapper = mount(LoaderBase, { props: { label: 'Please wait' } })
        expect(wrapper.attributes('aria-label')).toBe('Please wait')
    })

    it('defaults aria-label to Loading', () => {
        const wrapper = mount(LoaderBase)
        expect(wrapper.attributes('aria-label')).toBe('Loading')
    })

    it('has no accessibility violations', async () => {
        const wrapper = mount(LoaderBase, { props: { label: 'Loading' } })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
})

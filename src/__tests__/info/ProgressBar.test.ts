import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import ProgressBar from '../../info/ProgressBar.vue'

describe('ProgressBar', () => {
    it('renders data-testid', () => {
        const wrapper = mount(ProgressBar, { props: { value: 50 } })
        expect(wrapper.attributes('data-testid')).toBe('progress-bar')
    })

    it('has progressbar role', () => {
        const wrapper = mount(ProgressBar, { props: { value: 50 } })
        expect(wrapper.attributes('role')).toBe('progressbar')
    })

    it('sets aria-valuenow', () => {
        const wrapper = mount(ProgressBar, { props: { value: 30 } })
        expect(wrapper.attributes('aria-valuenow')).toBe('30')
    })

    it('sets aria-valuemin to 0', () => {
        const wrapper = mount(ProgressBar, { props: { value: 30 } })
        expect(wrapper.attributes('aria-valuemin')).toBe('0')
    })

    it('sets aria-valuemax', () => {
        const wrapper = mount(ProgressBar, { props: { value: 30, max: 200 } })
        expect(wrapper.attributes('aria-valuemax')).toBe('200')
    })

    it('defaults max to 100', () => {
        const wrapper = mount(ProgressBar, { props: { value: 50 } })
        expect(wrapper.attributes('aria-valuemax')).toBe('100')
    })

    it('calculates fill width as percentage', () => {
        const wrapper = mount(ProgressBar, { props: { value: 75 } })
        const fill = wrapper.find('.progress__fill')
        expect(fill.attributes('style')).toContain('width: 75%')
    })

    it('clamps fill at 100%', () => {
        const wrapper = mount(ProgressBar, { props: { value: 150 } })
        const fill = wrapper.find('.progress__fill')
        expect(fill.attributes('style')).toContain('width: 100%')
    })

    it('clamps fill at 0%', () => {
        const wrapper = mount(ProgressBar, { props: { value: -10 } })
        const fill = wrapper.find('.progress__fill')
        expect(fill.attributes('style')).toContain('width: 0%')
    })

    it('shows label when showLabel is true', () => {
        const wrapper = mount(ProgressBar, { props: { value: 50, showLabel: true } })
        expect(wrapper.find('.progress__label').text()).toBe('50%')
    })

    it('hides label by default', () => {
        const wrapper = mount(ProgressBar, { props: { value: 50 } })
        expect(wrapper.find('.progress__label').exists()).toBe(false)
    })

    it('applies variant class', () => {
        const wrapper = mount(ProgressBar, { props: { value: 50, variant: 'success' } })
        expect(wrapper.classes()).toContain('progress--success')
    })

    it('has no accessibility violations', async () => {
        const wrapper = mount(ProgressBar, { props: { value: 50 } })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
})

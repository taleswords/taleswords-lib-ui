import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import LoaderIcon from '../../info/loaders/Icon.vue'

describe('LoaderIcon', () => {
    it('renders data-testid', () => {
        const wrapper = mount(LoaderIcon)
        expect(wrapper.attributes('data-testid')).toBe('loader-icon')
    })

    it('renders with aria-hidden', () => {
        const wrapper = mount(LoaderIcon)
        expect(wrapper.attributes('aria-hidden')).toBe('true')
    })

    it('applies default medium size', () => {
        const wrapper = mount(LoaderIcon)
        expect(wrapper.classes()).toContain('loader-icon--medium')
    })

    it('applies small size', () => {
        const wrapper = mount(LoaderIcon, { props: { size: 'small' } })
        expect(wrapper.classes()).toContain('loader-icon--small')
    })

    it('applies large size', () => {
        const wrapper = mount(LoaderIcon, { props: { size: 'large' } })
        expect(wrapper.classes()).toContain('loader-icon--large')
    })

    it('has no accessibility violations', async () => {
        const wrapper = mount(LoaderIcon)
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
})

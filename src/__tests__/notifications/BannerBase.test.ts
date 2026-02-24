import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import BannerBase from '../../notifications/banners/Base.vue'

describe('BannerBase', () => {
    it('renders data-testid', () => {
        const wrapper = mount(BannerBase, {
            props: { id: 1, message: 'Hello' },
        })
        expect(wrapper.attributes('data-testid')).toBe('banner-base')
    })

    it('has role alert', () => {
        const wrapper = mount(BannerBase, {
            props: { id: 1, message: 'Test' },
        })
        expect(wrapper.attributes('role')).toBe('alert')
    })

    it('renders message', () => {
        const wrapper = mount(BannerBase, {
            props: { id: 1, message: 'Banner message' },
        })
        expect(wrapper.find('.banner__message').text()).toBe('Banner message')
    })

    it('defaults to info variant', () => {
        const wrapper = mount(BannerBase, {
            props: { id: 1, message: 'Info' },
        })
        expect(wrapper.classes()).toContain('banner--info')
    })

    it('applies variant class', () => {
        const wrapper = mount(BannerBase, {
            props: { id: 1, message: 'Warn', variant: 'warning' },
        })
        expect(wrapper.classes()).toContain('banner--warning')
    })

    it('renders dismiss button by default', () => {
        const wrapper = mount(BannerBase, {
            props: { id: 1, message: 'Test' },
        })
        const dismiss = wrapper.find('.banner__dismiss')
        expect(dismiss.exists()).toBe(true)
        expect(dismiss.attributes('aria-label')).toBe('Dismiss banner')
    })

    it('hides dismiss button when isDismissible is false', () => {
        const wrapper = mount(BannerBase, {
            props: { id: 1, message: 'Test', isDismissible: false },
        })
        expect(wrapper.find('.banner__dismiss').exists()).toBe(false)
    })

    it('emits dismiss with id on dismiss click', async () => {
        const wrapper = mount(BannerBase, {
            props: { id: 7, message: 'Test' },
        })
        await wrapper.find('.banner__dismiss').trigger('click')
        expect(wrapper.emitted('dismiss')?.[0]).toEqual([7])
    })

    it('does not show dont-show-again button by default', () => {
        const wrapper = mount(BannerBase, {
            props: { id: 1, message: 'Test' },
        })
        expect(wrapper.find('.banner__action-btn').exists()).toBe(false)
    })

    it('shows dont-show-again button when hasDontShowAgain', () => {
        const wrapper = mount(BannerBase, {
            props: { id: 1, message: 'Test', hasDontShowAgain: true },
        })
        const btn = wrapper.find('.banner__action-btn')
        expect(btn.exists()).toBe(true)
        expect(btn.text()).toBe("Don't show again")
    })

    it('emits dont-show-again on button click', async () => {
        const wrapper = mount(BannerBase, {
            props: { id: 5, message: 'Test', hasDontShowAgain: true },
        })
        await wrapper.find('.banner__action-btn').trigger('click')
        expect(wrapper.emitted('dont-show-again')?.[0]).toEqual([5])
    })

    it('has no accessibility violations', async () => {
        const wrapper = mount(BannerBase, {
            props: { id: 1, message: 'Accessible banner', variant: 'success' },
        })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
})

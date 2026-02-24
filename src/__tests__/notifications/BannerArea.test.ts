import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import BannerArea from '../../notifications/banners/Area.vue'
import { useBanner } from '../../utils/useBanner'

beforeEach(() => {
    useBanner().clearAll()
})

describe('BannerArea', () => {
    it('renders data-testid', () => {
        const wrapper = mount(BannerArea)
        expect(wrapper.find('[data-testid="banner-area"]').exists()).toBe(true)
    })

    it('has aria-live polite', () => {
        const wrapper = mount(BannerArea)
        expect(wrapper.find('[aria-live="polite"]').exists()).toBe(true)
    })

    it('renders no banners initially', () => {
        const wrapper = mount(BannerArea, {
            global: { stubs: { TransitionGroup: false } },
        })
        expect(wrapper.findAll('[data-testid="banner-base"]')).toHaveLength(0)
    })

    it('renders banners from useBanner state', async () => {
        const { addBanner } = useBanner()
        addBanner({ message: 'Banner 1' })
        addBanner({ message: 'Banner 2' })

        const wrapper = mount(BannerArea, {
            global: { stubs: { TransitionGroup: false } },
        })

        expect(wrapper.findAll('[data-testid="banner-base"]')).toHaveLength(2)
    })

    it('removes banner via composable', async () => {
        const { addBanner, removeBanner, banners } = useBanner()
        const id = addBanner({ message: 'Dismissable' })

        expect(banners).toHaveLength(1)
        removeBanner(id)
        expect(banners).toHaveLength(0)
    })

    it('renders dismiss button on banner', () => {
        const { addBanner } = useBanner()
        addBanner({ message: 'Dismissable' })

        const wrapper = mount(BannerArea, {
            global: { stubs: { TransitionGroup: false } },
        })

        expect(wrapper.find('.banner__dismiss').exists()).toBe(true)
    })

    it('emits dont-show-again from banner', async () => {
        const { addBanner } = useBanner()
        addBanner({ message: 'Banner', hasDontShowAgain: true })

        const wrapper = mount(BannerArea, {
            global: { stubs: { TransitionGroup: false } },
        })

        await wrapper.find('.banner__action-btn').trigger('click')
        expect(wrapper.emitted('dont-show-again')).toBeTruthy()
    })

    it('has no accessibility violations', async () => {
        const { addBanner } = useBanner()
        addBanner({ message: 'A11y banner' })

        const wrapper = mount(BannerArea, {
            global: { stubs: { TransitionGroup: false } },
        })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
})

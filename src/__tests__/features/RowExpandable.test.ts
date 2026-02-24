import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import RowExpandable from '../../features/RowExpandable.vue'

// Mock ResizeObserver (not available in jsdom)
const observeMock = vi.fn()
const disconnectMock = vi.fn()

beforeEach(() => {
    observeMock.mockClear()
    disconnectMock.mockClear()
    vi.stubGlobal('ResizeObserver', class {
        observe = observeMock
        unobserve = vi.fn()
        disconnect = disconnectMock
    })
})

describe('RowExpandable', () => {
    it('renders data-testid', () => {
        const wrapper = mount(RowExpandable, {
            slots: { default: '<p>Content</p>' },
        })
        expect(wrapper.attributes('data-testid')).toBe('row-expandable')
    })

    it('renders slot content', () => {
        const wrapper = mount(RowExpandable, {
            slots: { default: '<p>Hello</p>' },
        })
        expect(wrapper.text()).toContain('Hello')
    })

    it('applies collapsed class when not expanded', () => {
        const wrapper = mount(RowExpandable, {
            props: { expanded: false },
            slots: { default: '<p>Content</p>' },
        })
        expect(wrapper.find('.row-expandable__content--collapsed').exists()).toBe(true)
    })

    it('removes collapsed class when expanded', () => {
        const wrapper = mount(RowExpandable, {
            props: { expanded: true },
            slots: { default: '<p>Content</p>' },
        })
        expect(wrapper.find('.row-expandable__content--collapsed').exists()).toBe(false)
    })

    it('shows toggle button when expanded', () => {
        const wrapper = mount(RowExpandable, {
            props: { expanded: true },
            slots: { default: '<p>Content</p>' },
        })
        const toggle = wrapper.find('.row-expandable__toggle')
        expect(toggle.exists()).toBe(true)
        expect(toggle.text()).toBe('Show less')
    })

    it('emits update:expanded on toggle click', async () => {
        const wrapper = mount(RowExpandable, {
            props: { expanded: true },
            slots: { default: '<p>Content</p>' },
        })
        await wrapper.find('.row-expandable__toggle').trigger('click')
        expect(wrapper.emitted('update:expanded')?.[0]).toEqual([false])
    })

    it('toggle has aria-expanded', () => {
        const wrapper = mount(RowExpandable, {
            props: { expanded: true },
            slots: { default: '<p>Content</p>' },
        })
        expect(wrapper.find('.row-expandable__toggle').attributes('aria-expanded')).toBe('true')
    })

    it('sets up ResizeObserver on mount', () => {
        mount(RowExpandable, {
            slots: { default: '<p>Content</p>' },
        })
        expect(observeMock).toHaveBeenCalled()
    })

    it('disconnects ResizeObserver on unmount', () => {
        const wrapper = mount(RowExpandable, {
            slots: { default: '<p>Content</p>' },
        })
        wrapper.unmount()
        expect(disconnectMock).toHaveBeenCalled()
    })

    it('has no accessibility violations', async () => {
        const wrapper = mount(RowExpandable, {
            props: { expanded: true },
            slots: { default: '<p>Expandable content here</p>' },
        })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
})

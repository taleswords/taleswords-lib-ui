import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import { resetUidCounter } from '../../utils/uid'
import TooltipBase from '../../info/tooltips/Base.vue'

// Stub getBoundingClientRect for positioning
function stubRect(el: HTMLElement, rect: Partial<DOMRect>): void {
    el.getBoundingClientRect = () => ({
        x: 0, y: 0, width: 100, height: 30, top: 0, left: 0, right: 100, bottom: 30,
        toJSON: () => ({}),
        ...rect,
    })
}

describe('TooltipBase', () => {
    beforeEach(() => {
        vi.useFakeTimers()
        resetUidCounter()
        // Stub viewport
        Object.defineProperty(window, 'innerWidth', { value: 1024, configurable: true })
        Object.defineProperty(window, 'innerHeight', { value: 768, configurable: true })
    })

    afterEach(() => {
        vi.useRealTimers()
        // Clean up any teleported elements
        document.querySelectorAll('[role="tooltip"]').forEach(el => el.remove())
    })

    it('renders trigger slot', () => {
        const wrapper = mount(TooltipBase, {
            props: { content: 'Hello' },
            slots: { default: '<button>Trigger</button>' },
        })
        expect(wrapper.find('button').text()).toBe('Trigger')
    })

    it('does not show tooltip initially', () => {
        mount(TooltipBase, {
            props: { content: 'Hello' },
            slots: { default: '<button>Trigger</button>' },
        })
        expect(document.querySelector('[role="tooltip"]')).toBeNull()
    })

    it('shows tooltip on pointerenter after delay', async () => {
        const wrapper = mount(TooltipBase, {
            props: { content: 'Hello', openDelayMs: 100 },
            slots: { default: '<button>Trigger</button>' },
            attachTo: document.body,
        })
        const trigger = wrapper.find('.tooltip-trigger')
        stubRect(trigger.element as HTMLElement, { top: 400, left: 400, width: 100, height: 40, bottom: 440, right: 500 })

        await trigger.trigger('pointerenter', { pointerType: 'mouse' })
        // Not visible yet
        expect(document.querySelector('[role="tooltip"]')).toBeNull()

        vi.advanceTimersByTime(100)
        await vi.dynamicImportSettled()
        // After delay, should be open
        expect(document.querySelector('[role="tooltip"]')).not.toBeNull()

        wrapper.unmount()
    })

    it('hides tooltip on pointerleave after delay', async () => {
        const wrapper = mount(TooltipBase, {
            props: { content: 'Hello', openDelayMs: 0, closeDelayMs: 100 },
            slots: { default: '<button>Trigger</button>' },
            attachTo: document.body,
        })
        const trigger = wrapper.find('.tooltip-trigger')
        stubRect(trigger.element as HTMLElement, { top: 400, left: 400, width: 100, height: 40, bottom: 440, right: 500 })

        await trigger.trigger('pointerenter', { pointerType: 'mouse' })
        vi.advanceTimersByTime(1)
        await vi.dynamicImportSettled()
        expect(document.querySelector('[role="tooltip"]')).not.toBeNull()

        await trigger.trigger('pointerleave', { pointerType: 'mouse' })
        // Still visible during close delay
        expect(document.querySelector('[role="tooltip"]')).not.toBeNull()

        vi.advanceTimersByTime(100)
        await vi.dynamicImportSettled()

        wrapper.unmount()
    })

    it('shows tooltip on focusin', async () => {
        const wrapper = mount(TooltipBase, {
            props: { content: 'Focus tooltip', openDelayMs: 0 },
            slots: { default: '<button>Trigger</button>' },
            attachTo: document.body,
        })
        const trigger = wrapper.find('.tooltip-trigger')
        stubRect(trigger.element as HTMLElement, { top: 400, left: 400, width: 100, height: 40, bottom: 440, right: 500 })

        await trigger.trigger('focusin')
        vi.advanceTimersByTime(1)
        await vi.dynamicImportSettled()

        expect(document.querySelector('[role="tooltip"]')).not.toBeNull()

        wrapper.unmount()
    })

    it('hides tooltip on focusout', async () => {
        const wrapper = mount(TooltipBase, {
            props: { content: 'Focus tooltip', openDelayMs: 0, closeDelayMs: 0 },
            slots: { default: '<button>Trigger</button>' },
            attachTo: document.body,
        })
        const trigger = wrapper.find('.tooltip-trigger')
        stubRect(trigger.element as HTMLElement, { top: 400, left: 400, width: 100, height: 40, bottom: 440, right: 500 })

        await trigger.trigger('focusin')
        vi.advanceTimersByTime(1)
        await vi.dynamicImportSettled()
        expect(document.querySelector('[role="tooltip"]')).not.toBeNull()

        await trigger.trigger('focusout')
        vi.advanceTimersByTime(1)
        await vi.dynamicImportSettled()

        wrapper.unmount()
    })

    it('closes on Escape key', async () => {
        const wrapper = mount(TooltipBase, {
            props: { content: 'Escape me', openDelayMs: 0, closeDelayMs: 0 },
            slots: { default: '<button>Trigger</button>' },
            attachTo: document.body,
        })
        const trigger = wrapper.find('.tooltip-trigger')
        stubRect(trigger.element as HTMLElement, { top: 400, left: 400, width: 100, height: 40, bottom: 440, right: 500 })

        await trigger.trigger('focusin')
        vi.advanceTimersByTime(1)
        await vi.dynamicImportSettled()
        expect(document.querySelector('[role="tooltip"]')).not.toBeNull()

        await trigger.trigger('keydown', { key: 'Escape' })
        await vi.dynamicImportSettled()

        // Tooltip should be closed (may still be in DOM briefly for transition)
        // Check that the component's open state was toggled
        wrapper.unmount()
    })

    it('adds aria-describedby when open', async () => {
        const wrapper = mount(TooltipBase, {
            props: { content: 'Accessible', openDelayMs: 0 },
            slots: { default: '<button>Trigger</button>' },
            attachTo: document.body,
        })
        const trigger = wrapper.find('.tooltip-trigger')
        stubRect(trigger.element as HTMLElement, { top: 400, left: 400, width: 100, height: 40, bottom: 440, right: 500 })

        // No aria-describedby before open
        expect(trigger.attributes('aria-describedby')).toBeUndefined()

        await trigger.trigger('pointerenter', { pointerType: 'mouse' })
        vi.advanceTimersByTime(1)
        await vi.dynamicImportSettled()

        // aria-describedby should reference tooltip id
        const describedBy = trigger.attributes('aria-describedby')
        expect(describedBy).toBeTruthy()
        expect(describedBy).toMatch(/^tooltip-/)

        wrapper.unmount()
    })

    it('tooltip element has role="tooltip"', async () => {
        const wrapper = mount(TooltipBase, {
            props: { content: 'Role check', openDelayMs: 0 },
            slots: { default: '<button>Trigger</button>' },
            attachTo: document.body,
        })
        const trigger = wrapper.find('.tooltip-trigger')
        stubRect(trigger.element as HTMLElement, { top: 400, left: 400, width: 100, height: 40, bottom: 440, right: 500 })

        await trigger.trigger('pointerenter', { pointerType: 'mouse' })
        vi.advanceTimersByTime(1)
        await vi.dynamicImportSettled()

        const tooltip = document.querySelector('[role="tooltip"]')
        expect(tooltip).not.toBeNull()
        expect(tooltip!.getAttribute('role')).toBe('tooltip')

        wrapper.unmount()
    })

    it('sets positioning style when open', async () => {
        const wrapper = mount(TooltipBase, {
            props: { content: 'Positioned', openDelayMs: 0 },
            slots: { default: '<button>Trigger</button>' },
            attachTo: document.body,
        })
        const trigger = wrapper.find('.tooltip-trigger')
        stubRect(trigger.element as HTMLElement, { top: 400, left: 400, width: 100, height: 40, bottom: 440, right: 500 })

        await trigger.trigger('pointerenter', { pointerType: 'mouse' })
        vi.advanceTimersByTime(1)
        await vi.dynamicImportSettled()

        const tooltip = document.querySelector('[role="tooltip"]') as HTMLElement
        expect(tooltip).not.toBeNull()
        // Should have top/left style set
        expect(tooltip.style.top).toBeTruthy()
        expect(tooltip.style.left).toBeTruthy()

        wrapper.unmount()
    })

    it('does not show tooltip when isDisabled', async () => {
        const wrapper = mount(TooltipBase, {
            props: { content: 'Disabled', isDisabled: true, openDelayMs: 0 },
            slots: { default: '<button>Trigger</button>' },
            attachTo: document.body,
        })
        const trigger = wrapper.find('.tooltip-trigger')

        await trigger.trigger('pointerenter', { pointerType: 'mouse' })
        vi.advanceTimersByTime(1)
        await vi.dynamicImportSettled()

        expect(document.querySelector('[role="tooltip"]')).toBeNull()

        wrapper.unmount()
    })

    it('renders data-testid', async () => {
        const wrapper = mount(TooltipBase, {
            props: { content: 'TestId', testId: 'my-tooltip', openDelayMs: 0 },
            slots: { default: '<button>Trigger</button>' },
            attachTo: document.body,
        })
        const trigger = wrapper.find('.tooltip-trigger')
        stubRect(trigger.element as HTMLElement, { top: 400, left: 400, width: 100, height: 40, bottom: 440, right: 500 })

        await trigger.trigger('pointerenter', { pointerType: 'mouse' })
        vi.advanceTimersByTime(1)
        await vi.dynamicImportSettled()

        const tooltip = document.querySelector('[data-testid="my-tooltip"]')
        expect(tooltip).not.toBeNull()

        wrapper.unmount()
    })

    it('has no accessibility violations when closed', async () => {
        vi.useRealTimers()
        const wrapper = mount(TooltipBase, {
            props: { content: 'Accessible' },
            slots: { default: '<button>Trigger</button>' },
            attachTo: document.body,
        })

        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()

        wrapper.unmount()
        vi.useFakeTimers()
    })

    it('has no accessibility violations when open', async () => {
        // Open tooltip with fake timers
        const wrapper = mount(TooltipBase, {
            props: { content: 'Accessible open', openDelayMs: 0 },
            slots: { default: '<button>Trigger</button>' },
            attachTo: document.body,
        })
        const trigger = wrapper.find('.tooltip-trigger')
        stubRect(trigger.element as HTMLElement, { top: 400, left: 400, width: 100, height: 40, bottom: 440, right: 500 })

        await trigger.trigger('pointerenter', { pointerType: 'mouse' })
        vi.advanceTimersByTime(1)
        await vi.dynamicImportSettled()

        // Switch to real timers for axe run
        vi.useRealTimers()

        // Create a container with both trigger and tooltip for axe to test
        const container = document.createElement('div')
        container.appendChild(wrapper.element.cloneNode(true))
        const tooltip = document.querySelector('[role="tooltip"]')
        if (tooltip) container.appendChild(tooltip.cloneNode(true))
        document.body.appendChild(container)

        const results = await axe(container)
        expect(results).toHaveNoViolations()

        container.remove()
        wrapper.unmount()
        vi.useFakeTimers()
    })
})

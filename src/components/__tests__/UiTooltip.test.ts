import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiTooltip from '../UiTooltip.vue'

describe('UiTooltip', () => {
    it('renders trigger content', () => {
        const wrapper = mount(UiTooltip, {
            props: { text: 'Help text' },
            slots: { default: '<button>Hover me</button>' },
        })
        expect(wrapper.text()).toContain('Hover me')
    })

    it('renders tooltip text', () => {
        const wrapper = mount(UiTooltip, {
            props: { text: 'Help text' },
            slots: { default: 'Trigger' },
        })
        expect(wrapper.find('[role="tooltip"]').text()).toBe('Help text')
    })

    it('has role="tooltip"', () => {
        const wrapper = mount(UiTooltip, {
            props: { text: 'Help' },
            slots: { default: 'Trigger' },
        })
        expect(wrapper.find('[role="tooltip"]').exists()).toBe(true)
    })

    it('trigger has aria-describedby pointing to tooltip', () => {
        const wrapper = mount(UiTooltip, {
            props: { text: 'Help' },
            slots: { default: 'Trigger' },
        })
        const tooltipId = wrapper.find('[role="tooltip"]').attributes('id')
        const trigger = wrapper.find('.ui-tooltip__trigger')
        expect(trigger.attributes('aria-describedby')).toBe(tooltipId)
    })

    it('defaults to top position', () => {
        const wrapper = mount(UiTooltip, {
            props: { text: 'Help' },
            slots: { default: 'Trigger' },
        })
        expect(wrapper.classes()).toContain('ui-tooltip--top')
    })

    it('renders all positions', () => {
        for (const position of ['top', 'bottom', 'left', 'right'] as const) {
            const wrapper = mount(UiTooltip, {
                props: { text: 'Help', position },
                slots: { default: 'Trigger' },
            })
            expect(wrapper.classes()).toContain(`ui-tooltip--${position}`)
        }
    })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiBadge from '../UiBadge.vue'

describe('UiBadge', () => {
    it('renders with value', () => {
        const wrapper = mount(UiBadge, { props: { value: 'admin' } })
        expect(wrapper.text()).toBe('admin')
        expect(wrapper.classes()).toContain('ui-badge--admin')
    })

    it('applies correct class for each badge type', () => {
        const values = ['visitor', 'guest', 'guest-editor', 'reviewer', 'editor', 'manager', 'admin', 'owner', 'public', 'private', 'pending', 'declined', 'accepted'] as const
        for (const value of values) {
            const wrapper = mount(UiBadge, { props: { value } })
            expect(wrapper.classes()).toContain(`ui-badge--${value}`)
        }
    })

    it('emits click event', async () => {
        const wrapper = mount(UiBadge, { props: { value: 'admin' } })
        await wrapper.trigger('click')
        expect(wrapper.emitted('click')).toHaveLength(1)
    })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiUserIcon from '../UiUserIcon.vue'

describe('UiUserIcon', () => {
    it('renders first letter of name', () => {
        const wrapper = mount(UiUserIcon, { props: { name: 'Alice' } })
        expect(wrapper.text()).toBe('A')
    })

    it('has background color style', () => {
        const wrapper = mount(UiUserIcon, { props: { name: 'Bob' } })
        const style = wrapper.attributes('style')
        expect(style).toContain('background-color')
    })

    it('has text color style', () => {
        const wrapper = mount(UiUserIcon, { props: { name: 'Charlie' } })
        const style = wrapper.attributes('style')
        expect(style).toContain('color')
    })

    it('generates deterministic colors', () => {
        const w1 = mount(UiUserIcon, { props: { name: 'Test' } })
        const w2 = mount(UiUserIcon, { props: { name: 'Test' } })
        expect(w1.attributes('style')).toBe(w2.attributes('style'))
    })

    it('handles unicode names', () => {
        const wrapper = mount(UiUserIcon, { props: { name: '🎭Alice' } })
        expect(wrapper.text()).toBe('🎭')
    })
})

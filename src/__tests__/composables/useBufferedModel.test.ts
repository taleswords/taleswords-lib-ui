import { describe, it, expect, vi } from 'vitest'
import { ref, nextTick, defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { useBufferedModel } from '../../composables/useBufferedModel'

function createWrapper(modelValue = '') {
    const emit = vi.fn()
    const props = { modelValue }

    const component = defineComponent({
        setup() {
            const result = useBufferedModel(props, emit)
            return { ...result }
        },
        render() {
            return h('div')
        },
    })

    const wrapper = mount(component)
    return { wrapper, emit, props }
}

describe('useBufferedModel', () => {
    it('initializes displayValue from modelValue', () => {
        const { wrapper } = createWrapper('hello')
        expect(wrapper.vm.displayValue).toBe('hello')
    })

    it('initializes displayValue to empty string when modelValue is undefined', () => {
        const { wrapper } = createWrapper(undefined as unknown as string)
        expect(wrapper.vm.displayValue).toBe('')
    })

    it('initializes isFocused to false', () => {
        const { wrapper } = createWrapper()
        expect(wrapper.vm.isFocused).toBe(false)
    })

    it('sets isFocused to true on onFocus', () => {
        const { wrapper } = createWrapper()
        wrapper.vm.onFocus()
        expect(wrapper.vm.isFocused).toBe(true)
    })

    it('sets isFocused to false on onBlur', () => {
        const { wrapper } = createWrapper()
        wrapper.vm.onFocus()
        wrapper.vm.onBlur()
        expect(wrapper.vm.isFocused).toBe(false)
    })

    it('updates displayValue and emits on onInput', () => {
        const { wrapper, emit } = createWrapper()
        const event = { target: { value: 'typed' } } as unknown as Event
        wrapper.vm.onInput(event)
        expect(wrapper.vm.displayValue).toBe('typed')
        expect(emit).toHaveBeenCalledWith('update:modelValue', 'typed')
    })

    it('syncs displayValue with modelValue on blur', () => {
        const emit = vi.fn()
        const props = { modelValue: 'initial' }

        const component = defineComponent({
            setup() {
                return useBufferedModel(props, emit)
            },
            render() {
                return h('div')
            },
        })

        const wrapper = mount(component)

        wrapper.vm.onFocus()
        const event = { target: { value: 'edited' } } as unknown as Event
        wrapper.vm.onInput(event)
        expect(wrapper.vm.displayValue).toBe('edited')

        props.modelValue = 'server-trimmed'
        wrapper.vm.onBlur()
        expect(wrapper.vm.displayValue).toBe('server-trimmed')
    })
})

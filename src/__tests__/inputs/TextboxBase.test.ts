import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import TextboxBase from '../../inputs/textboxes/Base.vue'

describe('TextboxBase', () => {
    it('renders data-testid', () => {
        const wrapper = mount(TextboxBase)
        expect(wrapper.attributes('data-testid')).toBe('textbox-base')
    })

    it('renders an input element', () => {
        const wrapper = mount(TextboxBase)
        expect(wrapper.find('input').exists()).toBe(true)
    })

    it('binds modelValue to input value', () => {
        const wrapper = mount(TextboxBase, { props: { modelValue: 'hello' } })
        expect(wrapper.find('input').element.value).toBe('hello')
    })

    it('emits update:modelValue on input', async () => {
        const wrapper = mount(TextboxBase, { props: { modelValue: '' } })
        await wrapper.find('input').setValue('new value')
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new value'])
    })

    it('applies error class when hasError is true', () => {
        const wrapper = mount(TextboxBase, { props: { hasError: true } })
        expect(wrapper.find('input').classes()).toContain('textbox__input--error')
    })

    it('sets aria-invalid when hasError is true', () => {
        const wrapper = mount(TextboxBase, { props: { hasError: true } })
        expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
    })

    it('does not set aria-invalid when hasError is false', () => {
        const wrapper = mount(TextboxBase, { props: { hasError: false } })
        expect(wrapper.find('input').attributes('aria-invalid')).toBeUndefined()
    })

    it('disables input when isDisabled is true', () => {
        const wrapper = mount(TextboxBase, { props: { isDisabled: true } })
        expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    })

    it('sets readonly when isReadonly is true', () => {
        const wrapper = mount(TextboxBase, { props: { isReadonly: true } })
        expect(wrapper.find('input').attributes('readonly')).toBeDefined()
    })

    it('sets placeholder', () => {
        const wrapper = mount(TextboxBase, { props: { placeholder: 'Enter text' } })
        expect(wrapper.find('input').attributes('placeholder')).toBe('Enter text')
    })

    it('emits blur event', async () => {
        const wrapper = mount(TextboxBase)
        await wrapper.find('input').trigger('blur')
        expect(wrapper.emitted('blur')).toHaveLength(1)
    })

    it('emits focus event', async () => {
        const wrapper = mount(TextboxBase)
        await wrapper.find('input').trigger('focus')
        expect(wrapper.emitted('focus')).toHaveLength(1)
    })

    it('has no accessibility violations', async () => {
        const wrapper = mount(TextboxBase, {
            props: { modelValue: '', placeholder: 'Enter text' },
        })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })

    describe('multiline', () => {
        it('renders textarea when multiline is true', () => {
            const wrapper = mount(TextboxBase, { props: { multiline: true } })
            expect(wrapper.find('textarea').exists()).toBe(true)
            expect(wrapper.find('input').exists()).toBe(false)
        })

        it('renders input when multiline is false', () => {
            const wrapper = mount(TextboxBase, { props: { multiline: false } })
            expect(wrapper.find('input').exists()).toBe(true)
            expect(wrapper.find('textarea').exists()).toBe(false)
        })

        it('binds modelValue to textarea', () => {
            const wrapper = mount(TextboxBase, {
                props: { multiline: true, modelValue: 'multi\nline' },
            })
            expect(wrapper.find('textarea').element.value).toBe('multi\nline')
        })

        it('emits update:modelValue from textarea', async () => {
            const wrapper = mount(TextboxBase, {
                props: { multiline: true, modelValue: '' },
            })
            await wrapper.find('textarea').setValue('new text')
            expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new text'])
        })

        it('applies rows attribute', () => {
            const wrapper = mount(TextboxBase, {
                props: { multiline: true, rows: 5 },
            })
            expect(wrapper.find('textarea').attributes('rows')).toBe('5')
        })

        it('applies error class on textarea', () => {
            const wrapper = mount(TextboxBase, {
                props: { multiline: true, hasError: true },
            })
            expect(wrapper.find('textarea').classes()).toContain('textbox__input--error')
        })

        it('sets aria-invalid on textarea when hasError is true', () => {
            const wrapper = mount(TextboxBase, {
                props: { multiline: true, hasError: true },
            })
            expect(wrapper.find('textarea').attributes('aria-invalid')).toBe('true')
        })

        it('disables textarea when isDisabled is true', () => {
            const wrapper = mount(TextboxBase, {
                props: { multiline: true, isDisabled: true },
            })
            expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
        })

        it('sets readonly on textarea when isReadonly is true', () => {
            const wrapper = mount(TextboxBase, {
                props: { multiline: true, isReadonly: true },
            })
            expect(wrapper.find('textarea').attributes('readonly')).toBeDefined()
        })

        it('emits blur from textarea', async () => {
            const wrapper = mount(TextboxBase, { props: { multiline: true } })
            await wrapper.find('textarea').trigger('blur')
            expect(wrapper.emitted('blur')).toHaveLength(1)
        })

        it('emits focus from textarea', async () => {
            const wrapper = mount(TextboxBase, { props: { multiline: true } })
            await wrapper.find('textarea').trigger('focus')
            expect(wrapper.emitted('focus')).toHaveLength(1)
        })

        it('applies multiline class', () => {
            const wrapper = mount(TextboxBase, { props: { multiline: true } })
            expect(wrapper.find('textarea').classes()).toContain('textbox__input--multiline')
        })

        it('applies autosize class when multiline and autosize', () => {
            const wrapper = mount(TextboxBase, {
                props: { multiline: true, autosize: true },
            })
            expect(wrapper.find('textarea').classes()).toContain('textbox__input--autosize')
        })

        it('does not apply autosize class when not multiline', () => {
            const wrapper = mount(TextboxBase, {
                props: { multiline: false, autosize: true },
            })
            expect(wrapper.find('input').classes()).not.toContain('textbox__input--autosize')
        })

        it('adjusts height on input when autosize is true', async () => {
            const wrapper = mount(TextboxBase, {
                props: { multiline: true, autosize: true },
                attachTo: document.body,
            })
            const textarea = wrapper.find('textarea').element
            Object.defineProperty(textarea, 'offsetParent', { value: document.body, configurable: true })
            Object.defineProperty(textarea, 'scrollHeight', { value: 80, configurable: true })
            await wrapper.find('textarea').setValue('line1\nline2\nline3')
            expect(textarea.style.height).not.toBe('')
            wrapper.unmount()
        })

        it('has no accessibility violations with textarea', async () => {
            const wrapper = mount(TextboxBase, {
                props: { multiline: true, placeholder: 'Enter text' },
            })
            const results = await axe(wrapper.element)
            expect(results).toHaveNoViolations()
        })

        describe('autosize visibility guard', () => {
            it('skips autosize when textarea is hidden (offsetParent is null)', async () => {
                const wrapper = mount(TextboxBase, {
                    props: { multiline: true, autosize: true },
                    attachTo: document.body,
                })
                const textarea = wrapper.find('textarea').element
                Object.defineProperty(textarea, 'offsetParent', { value: null, configurable: true })
                textarea.style.height = ''
                await wrapper.find('textarea').setValue('line1\nline2\nline3')
                expect(textarea.style.height).toBe('')
                wrapper.unmount()
            })

            it('does not write height 0px when scrollHeight is 0', async () => {
                const wrapper = mount(TextboxBase, {
                    props: { multiline: true, autosize: true },
                    attachTo: document.body,
                })
                const textarea = wrapper.find('textarea').element
                Object.defineProperty(textarea, 'offsetParent', { value: document.body, configurable: true })
                Object.defineProperty(textarea, 'scrollHeight', { value: 0, configurable: true })
                await wrapper.find('textarea').setValue('some text')
                expect(textarea.style.height).not.toBe('0px')
                wrapper.unmount()
            })

            it('applies height normally when textarea is visible', async () => {
                const wrapper = mount(TextboxBase, {
                    props: { multiline: true, autosize: true },
                    attachTo: document.body,
                })
                const textarea = wrapper.find('textarea').element
                Object.defineProperty(textarea, 'offsetParent', { value: document.body, configurable: true })
                Object.defineProperty(textarea, 'scrollHeight', { value: 120, configurable: true })
                await wrapper.find('textarea').setValue('line1\nline2\nline3')
                expect(textarea.style.height).toBe('120px')
                wrapper.unmount()
            })
        })
    })
})

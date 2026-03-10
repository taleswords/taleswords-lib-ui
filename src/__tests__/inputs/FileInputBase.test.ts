import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import FileInputBase from '../../inputs/file-inputs/Base.vue'

describe('FileInputBase', () => {
    it('renders data-testid', () => {
        const wrapper = mount(FileInputBase)
        expect(wrapper.attributes('data-testid')).toBe('file-input-base')
    })

    it('renders a hidden native file input', () => {
        const wrapper = mount(FileInputBase)
        const input = wrapper.find('input[type="file"]')
        expect(input.exists()).toBe(true)
        expect(input.attributes('tabindex')).toBe('-1')
    })

    it('renders trigger button with default label', () => {
        const wrapper = mount(FileInputBase)
        expect(wrapper.find('.file-input__trigger').exists()).toBe(true)
        expect(wrapper.text()).toContain('Select files')
    })

    it('renders custom label', () => {
        const wrapper = mount(FileInputBase, { props: { label: 'Upload image' } })
        expect(wrapper.text()).toContain('Upload image')
    })

    it('passes accept attribute to native input', () => {
        const wrapper = mount(FileInputBase, { props: { accept: 'image/*' } })
        expect(wrapper.find('input[type="file"]').attributes('accept')).toBe('image/*')
    })

    it('passes multiple attribute to native input', () => {
        const wrapper = mount(FileInputBase, { props: { multiple: true } })
        expect(wrapper.find('input[type="file"]').attributes('multiple')).toBeDefined()
    })

    it('does not set multiple by default', () => {
        const wrapper = mount(FileInputBase)
        expect(wrapper.find('input[type="file"]').attributes('multiple')).toBeUndefined()
    })

    it('disables trigger when isDisabled is true', () => {
        const wrapper = mount(FileInputBase, { props: { isDisabled: true } })
        const trigger = wrapper.find('.file-input__trigger')
        expect(trigger.attributes('disabled')).toBeDefined()
        expect(trigger.classes()).toContain('is-disabled')
    })

    it('disables native input when isDisabled is true', () => {
        const wrapper = mount(FileInputBase, { props: { isDisabled: true } })
        expect(wrapper.find('input[type="file"]').attributes('disabled')).toBeDefined()
    })

    it('clicks native input when trigger is clicked', async () => {
        const wrapper = mount(FileInputBase, { attachTo: document.body })
        const input = wrapper.find('input[type="file"]').element as HTMLInputElement
        const clickSpy = vi.spyOn(input, 'click')
        await wrapper.find('.file-input__trigger').trigger('click')
        expect(clickSpy).toHaveBeenCalled()
        wrapper.unmount()
    })

    it('does not click native input when disabled and trigger is clicked', async () => {
        const wrapper = mount(FileInputBase, {
            props: { isDisabled: true },
            attachTo: document.body,
        })
        const input = wrapper.find('input[type="file"]').element as HTMLInputElement
        const clickSpy = vi.spyOn(input, 'click')
        await wrapper.find('.file-input__trigger').trigger('click')
        expect(clickSpy).not.toHaveBeenCalled()
        wrapper.unmount()
    })

    it('emits files-selected when files are chosen', async () => {
        const wrapper = mount(FileInputBase)
        const input = wrapper.find('input[type="file"]')
        const file = new File(['content'], 'test.txt', { type: 'text/plain' })
        const fileList = { 0: file, length: 1, item: (i: number) => i === 0 ? file : null }
        Object.defineProperty(input.element, 'files', {
            value: fileList,
            configurable: true,
        })
        await input.trigger('change')
        expect(wrapper.emitted('files-selected')).toHaveLength(1)
        expect(wrapper.emitted('files-selected')![0][0]).toHaveLength(1)
    })

    it('does not emit when no files selected', async () => {
        const wrapper = mount(FileInputBase)
        const input = wrapper.find('input[type="file"]')
        Object.defineProperty(input.element, 'files', {
            value: { length: 0, item: () => null },
            configurable: true,
        })
        await input.trigger('change')
        expect(wrapper.emitted('files-selected')).toBeUndefined()
    })

    it('activates on Enter key', async () => {
        const wrapper = mount(FileInputBase, { attachTo: document.body })
        const input = wrapper.find('input[type="file"]').element as HTMLInputElement
        const clickSpy = vi.spyOn(input, 'click')
        await wrapper.find('.file-input__trigger').trigger('keydown', { key: 'Enter' })
        expect(clickSpy).toHaveBeenCalled()
        wrapper.unmount()
    })

    it('activates on Space key', async () => {
        const wrapper = mount(FileInputBase, { attachTo: document.body })
        const input = wrapper.find('input[type="file"]').element as HTMLInputElement
        const clickSpy = vi.spyOn(input, 'click')
        await wrapper.find('.file-input__trigger').trigger('keydown', { key: ' ' })
        expect(clickSpy).toHaveBeenCalled()
        wrapper.unmount()
    })

    it('has no accessibility violations', async () => {
        const wrapper = mount(FileInputBase, { props: { label: 'Upload' } })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
})

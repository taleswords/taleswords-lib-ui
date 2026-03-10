import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { axe } from '../axeHelper'
import DropdownBase from '../../inputs/dropdowns/Base.vue'

const sampleOptions = [
    { value: 'a', label: 'Alpha' },
    { value: 'b', label: 'Beta' },
    { value: 'c', label: 'Gamma' },
]

const global = { stubs: { Teleport: true } }

describe('DropdownBase', () => {
    it('renders with data-testid', () => {
        const wrapper = mount(DropdownBase, { global, props: { options: sampleOptions } })
        expect(wrapper.attributes('data-testid')).toBe('dropdown-base')
    })

    it('shows placeholder when no selection', () => {
        const wrapper = mount(DropdownBase, { global, props: { options: sampleOptions } })
        expect(wrapper.text()).toContain('Select...')
    })

    it('shows selected label for single select', () => {
        const wrapper = mount(DropdownBase, {
            global, props: { options: sampleOptions, modelValue: 'b' },
        })
        expect(wrapper.text()).toContain('Beta')
    })

    it('opens menu on trigger click', async () => {
        const wrapper = mount(DropdownBase, { global, props: { options: sampleOptions } })
        await wrapper.find('[aria-haspopup]').trigger('click')
        expect(wrapper.find('[role="listbox"]').exists()).toBe(true)
    })

    it('closes menu on escape key', async () => {
        const wrapper = mount(DropdownBase, { global, props: { options: sampleOptions } })
        await wrapper.find('[aria-haspopup]').trigger('click')
        expect(wrapper.find('[role="listbox"]').exists()).toBe(true)
        await wrapper.trigger('keydown', { key: 'Escape' })
        expect(wrapper.find('[role="listbox"]').exists()).toBe(false)
    })

    it('emits update:modelValue on option click (single select)', async () => {
        const wrapper = mount(DropdownBase, { global, props: { options: sampleOptions } })
        await wrapper.find('[aria-haspopup]').trigger('click')
        const options = wrapper.findAll('[role="option"]')
        await options[1].trigger('click')
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b'])
    })

    it('emits update:modelValue with array on multi-select', async () => {
        const wrapper = mount(DropdownBase, {
            global, props: { options: sampleOptions, isMultiSelect: true, modelValue: [] },
        })
        await wrapper.find('[aria-haspopup]').trigger('click')
        const options = wrapper.findAll('[role="option"]')
        await options[0].trigger('click')
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['a']])
    })

    it('filters options by search', async () => {
        const wrapper = mount(DropdownBase, {
            global, props: { options: sampleOptions, hasSearch: true },
        })
        await wrapper.find('[aria-haspopup]').trigger('click')
        const searchInput = wrapper.find('input[type="text"]')
        await searchInput.setValue('alp')
        await searchInput.trigger('input')
        const options = wrapper.findAll('[role="option"]')
        expect(options).toHaveLength(1)
        expect(options[0].text()).toContain('Alpha')
    })

    it('does not open when disabled', async () => {
        const wrapper = mount(DropdownBase, {
            global, props: { options: sampleOptions, isDisabled: true },
        })
        await wrapper.find('[aria-haspopup]').trigger('click')
        expect(wrapper.find('[role="listbox"]').exists()).toBe(false)
    })

    it('keyboard ArrowDown navigates through options', async () => {
        const wrapper = mount(DropdownBase, { global, props: { options: sampleOptions } })
        await wrapper.find('[aria-haspopup]').trigger('click')
        await wrapper.trigger('keydown', { key: 'ArrowDown' })
        const options = wrapper.findAll('[role="option"]')
        expect(options[0].classes()).toContain('dropdown-menu__option--active')
    })

    it('does not select disabled options', async () => {
        const opts = [
            { value: 'a', label: 'Alpha', isDisabled: true },
            { value: 'b', label: 'Beta' },
        ]
        const wrapper = mount(DropdownBase, { global, props: { options: opts } })
        await wrapper.find('[aria-haspopup]').trigger('click')
        const options = wrapper.findAll('[role="option"]')
        await options[0].trigger('click')
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('shows apply/clear buttons in multi-select with hasApplyButton', async () => {
        const wrapper = mount(DropdownBase, {
            global,
            props: {
                options: sampleOptions,
                isMultiSelect: true,
                hasApplyButton: true,
                hasClearButton: true,
                modelValue: [],
            },
        })
        await wrapper.find('[aria-haspopup]').trigger('click')
        expect(wrapper.text()).toContain('Apply')
        expect(wrapper.text()).toContain('Clear')
    })

    describe('selected slot', () => {
        it('renders selected slot content inside the trigger, not in the panel', () => {
            const wrapper = mount(DropdownBase, {
                global,
                props: { options: sampleOptions, modelValue: 'b' },
                slots: {
                    selected: '<span class="custom-selected">Custom: {{ params.selectedLabel }}</span>',
                },
            })
            const trigger = wrapper.find('[aria-haspopup]')
            expect(trigger.find('.custom-selected').exists()).toBe(true)
        })

        it('shows placeholder when selected slot is provided but nothing selected', () => {
            const wrapper = mount(DropdownBase, {
                global,
                props: { options: sampleOptions },
                slots: {
                    selected: '<span class="custom-selected">Custom</span>',
                },
            })
            expect(wrapper.find('.custom-selected').exists()).toBe(false)
            expect(wrapper.text()).toContain('Select...')
        })

        it('falls back to default label when selected slot is not provided', () => {
            const wrapper = mount(DropdownBase, {
                global,
                props: { options: sampleOptions, modelValue: 'a' },
            })
            expect(wrapper.text()).toContain('Alpha')
        })
    })

    it('has no accessibility violations', async () => {
        const wrapper = mount(DropdownBase, { global, props: { options: sampleOptions } })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })

    it('has no accessibility violations when open', async () => {
        const wrapper = mount(DropdownBase, { global, props: { options: sampleOptions } })
        await wrapper.find('[aria-haspopup]').trigger('click')
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })

    describe('panel width behavior', () => {
        function mockRect(el: Element, rect: Partial<DOMRect>): void {
            vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
                x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0, toJSON: () => ({}),
                ...rect,
            })
        }

        it('sets minWidth on the panel to match trigger width', async () => {
            const wrapper = mount(DropdownBase, {
                props: { options: sampleOptions },
                attachTo: document.body,
            })
            const triggerWrapper = wrapper.find('.dropdown__trigger-wrapper').element
            mockRect(triggerWrapper, { width: 120, height: 36, top: 100, left: 50, bottom: 136, right: 170 })
            await wrapper.find('[aria-haspopup]').trigger('click')
            await flushPromises()
            const panel = document.body.querySelector('.dropdown__panel') as HTMLElement
            expect(panel).not.toBeNull()
            mockRect(panel, { width: 120, height: 100, top: 140, left: 50, bottom: 240, right: 170 })
            // Trigger repositioning after panel is mounted
            window.dispatchEvent(new Event('resize'))
            expect(panel.style.minWidth).toBe('120px')
            wrapper.unmount()
        })

        it('does not set a fixed width on the panel', async () => {
            const wrapper = mount(DropdownBase, {
                props: { options: sampleOptions },
                attachTo: document.body,
            })
            const triggerWrapper = wrapper.find('.dropdown__trigger-wrapper').element
            mockRect(triggerWrapper, { width: 32, height: 32, top: 50, left: 10, bottom: 82, right: 42 })
            await wrapper.find('[aria-haspopup]').trigger('click')
            await flushPromises()
            const panel = document.body.querySelector('.dropdown__panel') as HTMLElement
            expect(panel).not.toBeNull()
            mockRect(panel, { width: 32, height: 80, top: 86, left: 10, bottom: 166, right: 42 })
            window.dispatchEvent(new Event('resize'))
            expect(panel.style.width).toBe('')
            wrapper.unmount()
        })

        it('still applies top and left positioning', async () => {
            const wrapper = mount(DropdownBase, {
                props: { options: sampleOptions },
                attachTo: document.body,
            })
            const triggerWrapper = wrapper.find('.dropdown__trigger-wrapper').element
            mockRect(triggerWrapper, { width: 200, height: 40, top: 80, left: 60, bottom: 120, right: 260 })
            await wrapper.find('[aria-haspopup]').trigger('click')
            await flushPromises()
            const panel = document.body.querySelector('.dropdown__panel') as HTMLElement
            expect(panel).not.toBeNull()
            mockRect(panel, { width: 200, height: 120, top: 124, left: 60, bottom: 244, right: 260 })
            window.dispatchEvent(new Event('resize'))
            expect(panel.style.top).not.toBe('')
            expect(panel.style.left).not.toBe('')
            wrapper.unmount()
        })
    })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiPagination from '../UiPagination.vue'

describe('UiPagination', () => {
    it('renders with nav element', () => {
        const wrapper = mount(UiPagination, { props: { modelValue: 1, totalPages: 5 } })
        expect(wrapper.find('nav').attributes('aria-label')).toBe('Pagination')
    })

    it('renders correct number of page buttons for small total', () => {
        const wrapper = mount(UiPagination, { props: { modelValue: 1, totalPages: 5 } })
        const pageButtons = wrapper.findAll('.ui-pagination__btn:not(.ui-pagination__btn--prev):not(.ui-pagination__btn--next)')
        expect(pageButtons).toHaveLength(5)
    })

    it('marks active page with aria-current', () => {
        const wrapper = mount(UiPagination, { props: { modelValue: 3, totalPages: 5 } })
        const active = wrapper.find('[aria-current="page"]')
        expect(active.text()).toBe('3')
    })

    it('active page has active class', () => {
        const wrapper = mount(UiPagination, { props: { modelValue: 2, totalPages: 5 } })
        const active = wrapper.find('.ui-pagination__btn--active')
        expect(active.text()).toBe('2')
    })

    it('emits update:modelValue on page click', async () => {
        const wrapper = mount(UiPagination, { props: { modelValue: 1, totalPages: 5 } })
        const pageButtons = wrapper.findAll('.ui-pagination__btn:not(.ui-pagination__btn--prev):not(.ui-pagination__btn--next)')
        await pageButtons[2].trigger('click')
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([3])
    })

    it('disables prev button on first page', () => {
        const wrapper = mount(UiPagination, { props: { modelValue: 1, totalPages: 5 } })
        expect((wrapper.find('.ui-pagination__btn--prev').element as HTMLButtonElement).disabled).toBe(true)
    })

    it('disables next button on last page', () => {
        const wrapper = mount(UiPagination, { props: { modelValue: 5, totalPages: 5 } })
        expect((wrapper.find('.ui-pagination__btn--next').element as HTMLButtonElement).disabled).toBe(true)
    })

    it('shows ellipsis for large total pages', () => {
        const wrapper = mount(UiPagination, { props: { modelValue: 10, totalPages: 20 } })
        const ellipsis = wrapper.findAll('.ui-pagination__ellipsis')
        expect(ellipsis.length).toBeGreaterThanOrEqual(1)
    })

    it('always shows first and last page', () => {
        const wrapper = mount(UiPagination, { props: { modelValue: 10, totalPages: 20 } })
        const buttons = wrapper.findAll('.ui-pagination__btn:not(.ui-pagination__btn--prev):not(.ui-pagination__btn--next)')
        const texts = buttons.map(b => b.text())
        expect(texts[0]).toBe('1')
        expect(texts[texts.length - 1]).toBe('20')
    })

    it('page buttons have aria-label', () => {
        const wrapper = mount(UiPagination, { props: { modelValue: 1, totalPages: 3 } })
        const buttons = wrapper.findAll('.ui-pagination__btn:not(.ui-pagination__btn--prev):not(.ui-pagination__btn--next)')
        expect(buttons[0].attributes('aria-label')).toBe('Page 1')
    })

    it('navigates with prev/next buttons', async () => {
        const wrapper = mount(UiPagination, { props: { modelValue: 3, totalPages: 5 } })
        await wrapper.find('.ui-pagination__btn--prev').trigger('click')
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
    })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import Pagination from '../../features/Pagination.vue'

describe('Pagination', () => {
    it('renders data-testid', () => {
        const wrapper = mount(Pagination, { props: { currentPage: 1, totalPages: 5 } })
        expect(wrapper.attributes('data-testid')).toBe('pagination')
    })

    it('renders nav with aria-label Pagination', () => {
        const wrapper = mount(Pagination, { props: { currentPage: 1, totalPages: 5 } })
        const nav = wrapper.find('nav')
        expect(nav.attributes('aria-label')).toBe('Pagination')
    })

    it('renders correct number of page buttons for small total', () => {
        const wrapper = mount(Pagination, { props: { currentPage: 1, totalPages: 3 } })
        const pageButtons = wrapper.findAll('.pagination__btn:not(.pagination__btn--prev):not(.pagination__btn--next)')
        expect(pageButtons).toHaveLength(3)
    })

    it('marks current page with aria-current', () => {
        const wrapper = mount(Pagination, { props: { currentPage: 2, totalPages: 5 } })
        const current = wrapper.find('[aria-current="page"]')
        expect(current.exists()).toBe(true)
        expect(current.text()).toBe('2')
    })

    it('marks current page with active class', () => {
        const wrapper = mount(Pagination, { props: { currentPage: 2, totalPages: 5 } })
        expect(wrapper.find('.pagination__btn--active').text()).toBe('2')
    })

    it('disables prev button on first page', () => {
        const wrapper = mount(Pagination, { props: { currentPage: 1, totalPages: 5 } })
        expect(wrapper.find('.pagination__btn--prev').attributes('disabled')).toBeDefined()
    })

    it('disables next button on last page', () => {
        const wrapper = mount(Pagination, { props: { currentPage: 5, totalPages: 5 } })
        expect(wrapper.find('.pagination__btn--next').attributes('disabled')).toBeDefined()
    })

    it('emits page-changed on page button click', async () => {
        const wrapper = mount(Pagination, { props: { currentPage: 1, totalPages: 5 } })
        const pageButtons = wrapper.findAll('.pagination__btn:not(.pagination__btn--prev):not(.pagination__btn--next)')
        await pageButtons[2].trigger('click')
        expect(wrapper.emitted('page-changed')?.[0]).toEqual([3])
    })

    it('emits page-changed on prev button click', async () => {
        const wrapper = mount(Pagination, { props: { currentPage: 3, totalPages: 5 } })
        await wrapper.find('.pagination__btn--prev').trigger('click')
        expect(wrapper.emitted('page-changed')?.[0]).toEqual([2])
    })

    it('emits page-changed on next button click', async () => {
        const wrapper = mount(Pagination, { props: { currentPage: 3, totalPages: 5 } })
        await wrapper.find('.pagination__btn--next').trigger('click')
        expect(wrapper.emitted('page-changed')?.[0]).toEqual([4])
    })

    it('does not emit when clicking current page', async () => {
        const wrapper = mount(Pagination, { props: { currentPage: 2, totalPages: 5 } })
        await wrapper.find('.pagination__btn--active').trigger('click')
        expect(wrapper.emitted('page-changed')).toBeUndefined()
    })

    it('shows ellipsis for large page count', () => {
        const wrapper = mount(Pagination, { props: { currentPage: 5, totalPages: 20 } })
        const ellipsis = wrapper.findAll('.pagination__ellipsis')
        expect(ellipsis.length).toBeGreaterThan(0)
    })

    it('computes totalPages from totalItems and perPage', () => {
        const wrapper = mount(Pagination, {
            props: { currentPage: 1, totalItems: 50, perPage: 10 },
        })
        // Should have 5 pages
        const pageButtons = wrapper.findAll('.pagination__btn:not(.pagination__btn--prev):not(.pagination__btn--next)')
        expect(pageButtons).toHaveLength(5)
    })

    it('has no accessibility violations', async () => {
        const wrapper = mount(Pagination, { props: { currentPage: 1, totalPages: 5 } })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
})

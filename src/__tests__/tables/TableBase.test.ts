import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import TableBase from '../../tables/Base.vue'

const columns = [
    { key: 'name', label: 'Name', isSortable: true },
    { key: 'email', label: 'Email' },
]

const rows = [
    { id: 1, name: 'Alice', email: 'alice@test.com' },
    { id: 2, name: 'Bob', email: 'bob@test.com' },
    { id: 3, name: 'Charlie', email: 'charlie@test.com' },
]

describe('TableBase', () => {
    it('renders with data-testid', () => {
        const wrapper = mount(TableBase, { props: { columns, rows } })
        expect(wrapper.attributes('data-testid')).toBe('table-base')
    })

    it('renders column headers', () => {
        const wrapper = mount(TableBase, { props: { columns, rows } })
        expect(wrapper.text()).toContain('Name')
        expect(wrapper.text()).toContain('Email')
    })

    it('renders row data', () => {
        const wrapper = mount(TableBase, { props: { columns, rows } })
        expect(wrapper.text()).toContain('Alice')
        expect(wrapper.text()).toContain('bob@test.com')
    })

    it('renders empty text when no rows', () => {
        const wrapper = mount(TableBase, { props: { columns, rows: [] } })
        expect(wrapper.text()).toContain('No data available')
    })

    it('renders custom empty text', () => {
        const wrapper = mount(TableBase, {
            props: { columns, rows: [], emptyText: 'Nothing here' },
        })
        expect(wrapper.text()).toContain('Nothing here')
    })

    it('emits update:sort on sortable column click', async () => {
        const wrapper = mount(TableBase, { props: { columns, rows } })
        const headers = wrapper.findAll('th')
        // First header is "Name" (sortable)
        await headers[0].trigger('click')
        expect(wrapper.emitted('update:sort')?.[0]).toEqual([{ key: 'name', direction: 'asc' }])
    })

    it('toggles sort direction asc -> desc', async () => {
        const wrapper = mount(TableBase, {
            props: { columns, rows, sort: { key: 'name', direction: 'asc' } },
        })
        const headers = wrapper.findAll('th')
        await headers[0].trigger('click')
        expect(wrapper.emitted('update:sort')?.[0]).toEqual([{ key: 'name', direction: 'desc' }])
    })

    it('toggles sort direction desc -> null', async () => {
        const wrapper = mount(TableBase, {
            props: { columns, rows, sort: { key: 'name', direction: 'desc' } },
        })
        const headers = wrapper.findAll('th')
        await headers[0].trigger('click')
        expect(wrapper.emitted('update:sort')?.[0]).toEqual([{ key: 'name', direction: null }])
    })

    it('emits row-click on row click', async () => {
        const wrapper = mount(TableBase, { props: { columns, rows } })
        const bodyRows = wrapper.findAll('tbody tr')
        await bodyRows[1].trigger('click')
        expect(wrapper.emitted('row-click')?.[0]).toEqual([rows[1]])
    })

    it('renders select-all checkbox when selectable', () => {
        const wrapper = mount(TableBase, {
            props: { columns, rows, isSelectable: true, selectedIds: [] },
        })
        const checkboxes = wrapper.findAll('input[type="checkbox"]')
        // header checkbox + 3 row checkboxes
        expect(checkboxes.length).toBeGreaterThanOrEqual(4)
    })

    it('emits update:selectedIds on toggle-all', async () => {
        const wrapper = mount(TableBase, {
            props: { columns, rows, isSelectable: true, selectedIds: [] },
        })
        const selectAll = wrapper.find('thead input[type="checkbox"]')
        await selectAll.trigger('change')
        expect(wrapper.emitted('update:selectedIds')?.[0]).toEqual([[1, 2, 3]])
    })

    it('emits update:selectedIds to deselect all', async () => {
        const wrapper = mount(TableBase, {
            props: { columns, rows, isSelectable: true, selectedIds: [1, 2, 3] },
        })
        const selectAll = wrapper.find('thead input[type="checkbox"]')
        await selectAll.trigger('change')
        expect(wrapper.emitted('update:selectedIds')?.[0]).toEqual([[]])
    })

    it('emits update:selectedIds on row checkbox toggle', async () => {
        const wrapper = mount(TableBase, {
            props: { columns, rows, isSelectable: true, selectedIds: [] },
        })
        const rowCheckboxes = wrapper.findAll('tbody input[type="checkbox"]')
        await rowCheckboxes[0].trigger('change')
        expect(wrapper.emitted('update:selectedIds')?.[0]).toEqual([[1]])
    })

    it('paginates rows', () => {
        const wrapper = mount(TableBase, {
            props: {
                columns,
                rows,
                pagination: { currentPage: 1, pageSize: 2, totalItems: 3 },
            },
        })
        const bodyRows = wrapper.findAll('tbody tr')
        expect(bodyRows).toHaveLength(2)
        expect(wrapper.text()).toContain('Page 1 of 2')
    })

    it('emits update:pagination on page change', async () => {
        const wrapper = mount(TableBase, {
            props: {
                columns,
                rows,
                pagination: { currentPage: 1, pageSize: 2, totalItems: 3 },
            },
        })
        const nextBtn = wrapper.find('[aria-label="Next page"]')
        await nextBtn.trigger('click')
        expect(wrapper.emitted('update:pagination')?.[0]).toEqual([
            { currentPage: 2, pageSize: 2, totalItems: 3 },
        ])
    })

    it('shows loading overlay when isLoading', () => {
        const wrapper = mount(TableBase, {
            props: { columns, rows, isLoading: true },
        })
        expect(wrapper.find('.table-base__loading').exists()).toBe(true)
    })

    it('has no accessibility violations', async () => {
        const wrapper = mount(TableBase, { props: { columns, rows } })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })

    it('has no accessibility violations with selectable rows', async () => {
        const wrapper = mount(TableBase, {
            props: { columns, rows, isSelectable: true, selectedIds: [1] },
        })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
})

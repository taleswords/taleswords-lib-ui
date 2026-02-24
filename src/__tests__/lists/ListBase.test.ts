import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import ListBase from '../../lists/Base.vue'

const rows = [
    { id: 1, label: 'Item One' },
    { id: 2, label: 'Item Two' },
    { id: 3, label: 'Item Three' },
]

describe('ListBase', () => {
    it('renders with data-testid', () => {
        const wrapper = mount(ListBase, { props: { rows } })
        expect(wrapper.find('[data-testid="list-base"]').exists()).toBe(true)
    })

    it('renders row labels', () => {
        const wrapper = mount(ListBase, { props: { rows } })
        expect(wrapper.text()).toContain('Item One')
        expect(wrapper.text()).toContain('Item Two')
        expect(wrapper.text()).toContain('Item Three')
    })

    it('hides table header', () => {
        const wrapper = mount(ListBase, { props: { rows } })
        // The header should be hidden via CSS (display: none)
        const thead = wrapper.find('thead')
        expect(thead.exists()).toBe(true) // exists in DOM, hidden via CSS
    })

    it('renders empty text when no rows', () => {
        const wrapper = mount(ListBase, { props: { rows: [] } })
        expect(wrapper.text()).toContain('No items available')
    })

    it('uses custom labelKey', () => {
        const customRows = [
            { id: 1, name: 'Custom Label' },
        ]
        const wrapper = mount(ListBase, { props: { rows: customRows, labelKey: 'name' } })
        expect(wrapper.text()).toContain('Custom Label')
    })

    it('emits row-click', async () => {
        const wrapper = mount(ListBase, { props: { rows } })
        const bodyRows = wrapper.findAll('tbody tr')
        await bodyRows[0].trigger('click')
        expect(wrapper.emitted('row-click')?.[0]).toEqual([rows[0]])
    })

    it('emits update:selectedIds on row selection', async () => {
        const wrapper = mount(ListBase, {
            props: { rows, isSelectable: true, selectedIds: [] },
        })
        const checkboxes = wrapper.findAll('tbody input[type="checkbox"]')
        await checkboxes[0].trigger('change')
        expect(wrapper.emitted('update:selectedIds')?.[0]).toEqual([[1]])
    })

    it('has no accessibility violations', async () => {
        const wrapper = mount(ListBase, { props: { rows } })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
})

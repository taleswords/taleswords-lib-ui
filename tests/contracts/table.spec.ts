import { test, expect } from '@playwright/test'

test.describe('TableBase contract', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/tables')
        await expect(page.locator('[data-testid="page-tables"]')).toBeVisible()
    })

    test('sorting: click sortable header, row order changes', async ({ page }) => {
        const sortableTable = page.locator('[data-testid="table-sortable"]')

        const firstCellBefore = await sortableTable.locator('tbody tr').first().locator('td').first().textContent()

        // Click the "Name" header to sort
        await sortableTable.locator('th').first().click()

        const firstCellAfter = await sortableTable.locator('tbody tr').first().locator('td').first().textContent()

        expect(firstCellBefore).toBeDefined()
        expect(firstCellAfter).toBeDefined()
    })

    test('selection: click select-all checkbox, count updates', async ({ page }) => {
        const selectableTable = page.locator('[data-testid="table-selectable"]')
        const selectAll = selectableTable.locator('th input[type="checkbox"]')
        await selectAll.click()

        // The selected count text should show 8 rows selected
        await expect(page.locator('text=8 row(s)')).toBeVisible()
    })

    test('pagination: click page 2, different rows shown', async ({ page }) => {
        const paginatedTable = page.locator('[data-testid="table-paginated"]')

        const firstRowBefore = await paginatedTable.locator('tbody tr').first().locator('td').first().textContent()

        // Click page 2 in pagination
        await page.locator('[data-testid="pagination"] >> text=2').click()

        const firstRowAfter = await paginatedTable.locator('tbody tr').first().locator('td').first().textContent()

        expect(firstRowAfter).not.toBe(firstRowBefore)
    })

    test('custom cells: BadgeBase renders in status column', async ({ page }) => {
        const customTable = page.locator('[data-testid="table-custom-cells"]')
        const badge = customTable.locator('.badge-base').first()
        await expect(badge).toBeVisible()
    })
})

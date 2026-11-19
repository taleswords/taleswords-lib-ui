import { test, expect, type Page } from '@playwright/test'

async function heights(page: Page, testId: string): Promise<number[]> {
    return page.locator(`[data-testid="${testId}"]`).evaluate((row) =>
        Array.from(row.querySelectorAll('.dropdown-trigger, .textbox__input'))
            .map((el) => el.getBoundingClientRect().height),
    )
}

for (const theme of ['light', 'dark'] as const) {
    test.describe(`One control height contract (${theme})`, () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('/lib/dropdowns')
            await expect(page.locator('[data-testid="control-row"]')).toBeVisible()
            await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme)
        })

        test('a dropdown, a textbox and a date textbox in one row measure 46px', async ({ page }) => {
            const h = await heights(page, 'control-row')
            expect(h).toHaveLength(3)
            expect(h).toEqual([46, 46, 46])
        })

        test('the same row measures 43px at the compact density', async ({ page }) => {
            const h = await heights(page, 'control-row-compact')
            expect(h).toHaveLength(3)
            expect(h).toEqual([43, 43, 43])
        })
    })
}

test('a multiline textbox keeps its own height', async ({ page }) => {
    await page.goto('/lib/textboxes')
    const area = page.locator('textarea.textbox__input').first()
    await expect(area).toBeVisible()
    const h = await area.evaluate((el) => el.getBoundingClientRect().height)
    expect(h).toBeGreaterThan(46)
})

import { test, expect, type Locator } from '@playwright/test'

/** True when the element's box lies wholly inside the container's box (1px tolerance). */
async function isWhollyInside(el: Locator, container: Locator): Promise<boolean> {
    const a = await el.boundingBox()
    const b = await container.boundingBox()
    if (!a || !b) return false
    return a.x >= b.x - 1 && a.x + a.width <= b.x + b.width + 1
}

for (const width of ['375', '320'] as const) {
    test.describe(`TabsBase contract: an overflowing row (${width})`, () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('/lib/tabs')
            await expect(page.locator(`[data-testid="tabs-overflow-${width}"]`)).toBeVisible()
        })

        test('shows the end edge alone at the start, and no page overflow', async ({ page }) => {
            const box = page.locator(`[data-testid="tabs-overflow-${width}"]`)
            await expect(box.locator('[data-testid="tabs-edge-end"]')).toBeVisible()
            await expect(box.locator('[data-testid="tabs-edge-start"]')).toHaveCount(0)
            const list = box.locator('[role="tablist"]')
            const wider = await list.evaluate((el) => el.scrollWidth > el.clientWidth)
            expect(wider).toBe(true)
            const outer = await box.boundingBox()
            const inner = await list.boundingBox()
            expect(inner!.width).toBeLessThanOrEqual(outer!.width + 1)
        })

        test('keyboard reaches every tab and each reached tab is wholly visible', async ({ page }) => {
            const box = page.locator(`[data-testid="tabs-overflow-${width}"]`)
            const list = box.locator('[role="tablist"]')
            const tabs = box.locator('[role="tab"]')
            await tabs.first().focus()
            const count = await tabs.count()
            for (let i = 1; i < count; i++) {
                await page.keyboard.press('ArrowRight')
                await expect(tabs.nth(i)).toBeFocused()
                await expect(tabs.nth(i)).toHaveAttribute('aria-selected', 'true')
                await expect.poll(() => isWhollyInside(tabs.nth(i), list)).toBe(true)
            }
            await expect(box.locator('[data-testid="tabs-edge-end"]')).toHaveCount(0)
            await expect(box.locator('[data-testid="tabs-edge-start"]')).toBeVisible()
            await page.keyboard.press('Home')
            await expect.poll(() => isWhollyInside(tabs.first(), list)).toBe(true)
            await expect(box.locator('[data-testid="tabs-edge-start"]')).toHaveCount(0)
        })

        test('pressing the end edge scrolls the row; the edges are not tab stops', async ({ page }) => {
            const box = page.locator(`[data-testid="tabs-overflow-${width}"]`)
            const list = box.locator('[role="tablist"]')
            const edge = box.locator('[data-testid="tabs-edge-end"]')
            await expect(edge).toHaveAttribute('tabindex', '-1')
            await expect(edge).toHaveAttribute('aria-hidden', 'true')
            await edge.click()
            await expect.poll(() => list.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0)
            await expect(box.locator('[data-testid="tabs-edge-start"]')).toBeVisible()
        })

        test('the indicator sits under the selected tab after a scroll', async ({ page }) => {
            const box = page.locator(`[data-testid="tabs-overflow-${width}"]`)
            const tabs = box.locator('[role="tab"]')
            await tabs.first().focus()
            await page.keyboard.press('End')
            const last = tabs.last()
            await expect(last).toHaveAttribute('aria-selected', 'true')
            const indicator = box.locator('.tabs-base__indicator')
            await expect.poll(async () => {
                const t = await last.boundingBox()
                const i = await indicator.boundingBox()
                if (!t || !i) return false
                return Math.abs(t.x - i.x) <= 1 && Math.abs(t.width - i.width) <= 1
            }).toBe(true)
        })

        test('a focused tab shows a focus ring drawn inside the tab', async ({ page }) => {
            const box = page.locator(`[data-testid="tabs-overflow-${width}"]`)
            const tabs = box.locator('[role="tab"]')
            await tabs.first().focus()
            await page.keyboard.press('ArrowRight')
            const style = await tabs.nth(1).evaluate((el) => {
                const cs = getComputedStyle(el)
                return { style: cs.outlineStyle, width: cs.outlineWidth, offset: cs.outlineOffset }
            })
            expect(style.style).toBe('solid')
            expect(style.width).toBe('2px')
            expect(style.offset).toBe('-2px')
        })
    })
}

test.describe('TabsBase contract: opening and fitting', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/lib/tabs')
        await expect(page.locator('[data-testid="tabs-overflow-last"]')).toBeVisible()
    })

    test('opened on the last tab, that tab is wholly visible', async ({ page }) => {
        const box = page.locator('[data-testid="tabs-overflow-last"]')
        const list = box.locator('[role="tablist"]')
        const last = box.locator('[role="tab"]').last()
        await expect(last).toHaveAttribute('aria-selected', 'true')
        await expect.poll(() => isWhollyInside(last, list)).toBe(true)
        await expect(box.locator('[data-testid="tabs-edge-start"]')).toBeVisible()
        await expect(box.locator('[data-testid="tabs-edge-end"]')).toHaveCount(0)
    })

    test('a row that fits shows no edge and does not scroll', async ({ page }) => {
        const box = page.locator('[data-testid="tabs-fits"]')
        await expect(box.locator('.tabs-base__edge')).toHaveCount(0)
        const list = box.locator('[role="tablist"]')
        expect(await list.evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true)
    })

    test('the edges follow a resize of the column', async ({ page }) => {
        const box = page.locator('[data-testid="tabs-fits"]')
        await expect(box.locator('.tabs-base__edge')).toHaveCount(0)
        await box.evaluate((el) => { (el as HTMLElement).style.width = '200px' })
        await expect(box.locator('[data-testid="tabs-edge-end"]')).toBeVisible()
        const tab = box.locator('[role="tab"][aria-selected="true"]')
        const indicator = box.locator('.tabs-base__indicator')
        const t = await tab.boundingBox()
        const i = await indicator.boundingBox()
        expect(Math.abs(t!.x - i!.x)).toBeLessThanOrEqual(1)
        await box.evaluate((el) => { (el as HTMLElement).style.width = '600px' })
        await expect(box.locator('.tabs-base__edge')).toHaveCount(0)
    })
})

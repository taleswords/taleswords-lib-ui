import { test, expect } from '@playwright/test'

test.describe('Notifications contract', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/notifications')
        await expect(page.locator('[data-testid="page-notifications"]')).toBeVisible()
    })

    test('toast: click info button, toast appears, auto-dismisses', async ({ page }) => {
        await page.locator('[data-testid="page-notifications"] >> text=Info Toast').click()

        const toast = page.locator('[data-testid="toast-area"] [data-testid="toast-base"]')
        await expect(toast.first()).toBeVisible()

        // Wait for auto-dismiss (default 5s + buffer)
        await expect(toast).toHaveCount(0, { timeout: 8000 })
    })

    test('toast hover-pause: hovering keeps toast alive past duration', async ({ page }) => {
        await page.locator('[data-testid="page-notifications"] >> text=Info Toast').click()

        const toast = page.locator('[data-testid="toast-area"] [data-testid="toast-base"]').first()
        await expect(toast).toBeVisible()

        // Hover over the toast to pause the timer
        await toast.hover()

        // Wait longer than default duration (5s)
        await page.waitForTimeout(6000)

        // Toast should still be visible because timer is paused
        await expect(toast).toBeVisible()

        // Move mouse away to resume timer
        await page.mouse.move(0, 0)

        // Toast should eventually dismiss
        await expect(page.locator('[data-testid="toast-area"] [data-testid="toast-base"]')).toHaveCount(0, { timeout: 8000 })
    })

    test('persistent toast stays until dismissed', async ({ page }) => {
        await page.locator('[data-testid="page-notifications"] >> text=Add Persistent Toast').click()

        const toast = page.locator('[data-testid="toast-area"] [data-testid="toast-base"]').first()
        await expect(toast).toBeVisible()

        // Wait beyond default auto-dismiss time
        await page.waitForTimeout(6000)
        await expect(toast).toBeVisible()
    })

    test('banner: click info button, banner appears, dismiss removes it', async ({ page }) => {
        await page.locator('[data-testid="page-notifications"] >> text=Info Banner').click()

        const banner = page.locator('[data-testid="banner-base"]').first()
        await expect(banner).toBeVisible()

        // Click the dismiss button on the banner
        const dismissBtn = banner.locator('.banner__dismiss')
        await dismissBtn.click()

        await expect(banner).not.toBeVisible()
    })

    test('dont-show-again banner action is visible', async ({ page }) => {
        await page.locator("[data-testid=\"page-notifications\"] >> text=Add Banner with Don't Show Again").click()

        const banner = page.locator('[data-testid="banner-base"]').first()
        await expect(banner).toBeVisible()

        const dontShowBtn = banner.locator('.banner__dont-show-again')
        await expect(dontShowBtn).toBeVisible()
    })
})

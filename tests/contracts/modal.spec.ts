import { test, expect } from '@playwright/test'

test.describe('ModalBase contract', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/modals')
        await expect(page.locator('[data-testid="page-modals"]')).toBeVisible()
    })

    test('open basic modal, verify visible, close via Escape', async ({ page }) => {
        await page.locator('[data-testid="open-basic-modal"]').click()

        const modal = page.locator('[data-testid="modal-base"]')
        await expect(modal).toBeVisible()

        await page.keyboard.press('Escape')
        await expect(modal).not.toBeVisible()
    })

    test('open modal, close via overlay click', async ({ page }) => {
        await page.locator('[data-testid="open-basic-modal"]').click()

        const modal = page.locator('[data-testid="modal-base"]')
        await expect(modal).toBeVisible()

        // Click the overlay (the modal backdrop area outside the dialog)
        const overlay = page.locator('.modal__overlay')
        await overlay.click({ position: { x: 10, y: 10 } })
        await expect(modal).not.toBeVisible()
    })

    test('beforeClose: confirm dialog prevents close', async ({ page }) => {
        // "Open with Confirm" button
        await page.locator('[data-testid="page-modals"] >> text=Open with Confirm').click()

        const modal = page.locator('[data-testid="modal-base"]')
        await expect(modal).toBeVisible()

        // Dismiss the confirm dialog (cancel)
        page.on('dialog', (dialog) => dialog.dismiss())
        await page.keyboard.press('Escape')

        // Modal should stay open because confirm was dismissed
        await expect(modal).toBeVisible()
    })

    test('nested modals: close inner, outer stays visible', async ({ page }) => {
        // Open outer modal
        await page.locator('[data-testid="page-modals"] >> text=Open Outer Modal').click()
        const outerModal = page.locator('[data-testid="modal-base"]').first()
        await expect(outerModal).toBeVisible()

        // Open inner modal
        await page.locator('text=Open Inner Modal').click()
        const innerModal = page.locator('[data-testid="modal-base"]').nth(1)
        await expect(innerModal).toBeVisible()

        // Close inner via Escape
        await page.keyboard.press('Escape')
        await expect(innerModal).not.toBeVisible()

        // Outer should still be visible
        await expect(outerModal).toBeVisible()
    })
})

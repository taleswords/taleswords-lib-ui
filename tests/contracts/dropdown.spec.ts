import { test, expect } from '@playwright/test'

test.describe('DropdownBase contract', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/dropdowns')
        await expect(page.locator('[data-testid="page-dropdowns"]')).toBeVisible()
    })

    test('open basic dropdown, select option, menu closes', async ({ page }) => {
        const dropdown = page.locator('[data-testid="dropdown-basic"]')
        await dropdown.click()

        const menu = dropdown.locator('.dropdown__menu')
        await expect(menu).toBeVisible()

        const option = menu.locator('.dropdown__option').first()
        await option.click()

        await expect(menu).not.toBeVisible()
    })

    test('keyboard: open with Enter, navigate with arrows, select with Enter', async ({ page }) => {
        const dropdown = page.locator('[data-testid="dropdown-basic"]')
        await dropdown.locator('.dropdown__trigger').focus()
        await dropdown.press('Enter')

        const menu = dropdown.locator('.dropdown__menu')
        await expect(menu).toBeVisible()

        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('Enter')

        await expect(menu).not.toBeVisible()
    })

    test('custom trigger slot renders', async ({ page }) => {
        const customDropdown = page.locator('[data-testid="dropdown-custom"]')
        const customTrigger = customDropdown.locator('.button-base')
        await expect(customTrigger).toBeVisible()
    })

    test('custom option slot renders', async ({ page }) => {
        const customDropdown = page.locator('[data-testid="dropdown-custom"]')
        await customDropdown.click()

        const menu = customDropdown.locator('.dropdown__menu')
        await expect(menu).toBeVisible()

        const customOption = menu.locator('.custom-option').first()
        await expect(customOption).toBeVisible()
    })
})

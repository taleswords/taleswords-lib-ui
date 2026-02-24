import { describe, it, expect } from 'vitest'

/**
 * WCAG AA contrast regression tests.
 *
 * These guard the palette→token mappings established by the Color Doctrine.
 * If a palette value changes, these tests catch any contrast regression
 * before it ships. All interactive text must meet ≥ 4.5 : 1 (AA normal).
 */

// ── Palette hex values (must stay in sync with palette.css) ──

const PALETTE = {
    white: '#FFFFFF',
    black: '#000000',
    'neutral-1300': '#333333',
    'neutral-800': '#B0B0B0',
    'danger-350': '#D32F2F',
    'danger-400': '#E63946',
    'success-400': '#4CAF50',
    'success-600': '#1B5E20',
    'primary-300': '#FFD166',
    'primary-500': '#D4A23A',
    'accent-500': '#457B9D',
    'neutral-1100': '#4A5568',
    'nord-danger': '#E06C75',
    'nord-text-bright': '#ECEFF4',
    'nord-deep': '#2E3440',
    'nord-primary': '#EBCB8B',
    'nord-deep-danger': '#BF616A',
} as const

// ── Contrast calculation (WCAG 2.1) ──

function hexToRgb(hex: string): [number, number, number] {
    const h = hex.replace('#', '')
    return [
        parseInt(h.slice(0, 2), 16) / 255,
        parseInt(h.slice(2, 4), 16) / 255,
        parseInt(h.slice(4, 6), 16) / 255,
    ]
}

function linearize(c: number): number {
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

function luminance(hex: string): number {
    const [r, g, b] = hexToRgb(hex).map(linearize)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrastRatio(fg: string, bg: string): number {
    const l1 = luminance(fg)
    const l2 = luminance(bg)
    const lighter = Math.max(l1, l2)
    const darker = Math.min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)
}

// ── Tests ──

describe('Color Doctrine — WCAG AA contrast regression', () => {
    describe('danger button (worst-case interactive text)', () => {
        it('light: white text on danger-350 bg ≥ 4.5:1', () => {
            const ratio = contrastRatio(PALETTE.white, PALETTE['danger-350'])
            expect(ratio).toBeGreaterThanOrEqual(4.5)
        })

        it('dark: white text on danger-350 bg ≥ 4.5:1', () => {
            // Dark theme danger button also uses danger-350 for AA compliance
            const ratio = contrastRatio(PALETTE.white, PALETTE['danger-350'])
            expect(ratio).toBeGreaterThanOrEqual(4.5)
        })
    })

    describe('worst-case badges', () => {
        it('admin: white on danger-350 ≥ 4.5:1', () => {
            const ratio = contrastRatio(PALETTE.white, PALETTE['danger-350'])
            expect(ratio).toBeGreaterThanOrEqual(4.5)
        })

        it('public: white on success-600 ≥ 4.5:1', () => {
            const ratio = contrastRatio(PALETTE.white, PALETTE['success-600'])
            expect(ratio).toBeGreaterThanOrEqual(4.5)
        })

        it('accepted: dark text on success-400 ≥ 4.5:1', () => {
            const ratio = contrastRatio(PALETTE['neutral-1300'], PALETTE['success-400'])
            expect(ratio).toBeGreaterThanOrEqual(4.5)
        })

        it('guest: white on neutral-1100 ≥ 4.5:1', () => {
            const ratio = contrastRatio(PALETTE.white, PALETTE['neutral-1100'])
            expect(ratio).toBeGreaterThanOrEqual(4.5)
        })

        it('reviewer: dark text on primary-300 ≥ 4.5:1', () => {
            const ratio = contrastRatio(PALETTE['neutral-1300'], PALETTE['primary-300'])
            expect(ratio).toBeGreaterThanOrEqual(4.5)
        })

        it('pending: dark text on primary-500 ≥ 4.5:1', () => {
            const ratio = contrastRatio(PALETTE['neutral-1300'], PALETTE['primary-500'])
            expect(ratio).toBeGreaterThanOrEqual(4.5)
        })
    })

    describe('dark theme badges', () => {
        it('reviewer: dark text on nord-primary ≥ 4.5:1', () => {
            const ratio = contrastRatio(PALETTE['nord-deep'], PALETTE['nord-primary'])
            expect(ratio).toBeGreaterThanOrEqual(4.5)
        })

        it('admin: white text on danger-350 ≥ 4.5:1', () => {
            // Dark theme admin/editor/private badges use danger-350 for AA
            const ratio = contrastRatio(PALETTE.white, PALETTE['danger-350'])
            expect(ratio).toBeGreaterThanOrEqual(4.5)
        })
    })

    describe('primary button', () => {
        it('light: dark text on primary-300 ≥ 4.5:1', () => {
            const ratio = contrastRatio(PALETTE['neutral-1300'], PALETTE['primary-300'])
            expect(ratio).toBeGreaterThanOrEqual(4.5)
        })

        it('dark: dark text on nord-primary ≥ 4.5:1', () => {
            const ratio = contrastRatio(PALETTE['neutral-1300'], PALETTE['nord-primary'])
            expect(ratio).toBeGreaterThanOrEqual(4.5)
        })
    })

    describe('ghost-primary button text', () => {
        it('light: accent-500 on white ≥ 4.5:1', () => {
            const ratio = contrastRatio(PALETTE['accent-500'], PALETTE.white)
            expect(ratio).toBeGreaterThanOrEqual(4.5)
        })
    })
})

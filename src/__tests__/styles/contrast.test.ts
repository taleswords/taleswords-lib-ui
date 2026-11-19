import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * Non-text contrast (WCAG 2.2 SC 1.4.11) of a control's resting boundary,
 * resolved through the real token files so a palette edit cannot regress it silently.
 */

const stylesDir = resolve(__dirname, '../../styles')

function declarations(file: string): Map<string, string> {
    const css = readFileSync(resolve(stylesDir, file), 'utf-8')
    const map = new Map<string, string>()
    for (const match of css.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/gi)) {
        if (!map.has(match[1])) map.set(match[1], match[2].trim())
    }
    return map
}

const palette = declarations('palette.css')
const light = declarations('tokens.css')
const dark = declarations('tokens-dark.css')

function resolveToken(name: string, theme: 'light' | 'dark'): string {
    const layers = theme === 'dark' ? [dark, light, palette] : [light, palette]
    let value: string | undefined
    for (const layer of layers) {
        value = layer.get(name)
        if (value !== undefined) break
    }
    if (value === undefined) throw new Error(`token ${name} is not declared`)
    const ref = /^var\((--[a-z0-9-]+)\)$/i.exec(value)
    if (ref) return resolveToken(ref[1], theme)
    if (!/^#[0-9a-f]{6}$/i.test(value)) throw new Error(`token ${name} resolves to ${value}, not a 6-digit hex`)
    return value
}

function luminance(hex: string): number {
    const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    const [r, g, b] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a: string, b: string): number {
    const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
    return (hi + 0.05) / (lo + 0.05)
}

describe('a control\'s resting boundary meets 3:1 (WCAG 1.4.11)', () => {
    it('computes contrast correctly (black on white is 21:1)', () => {
        expect(contrast('#000000', '#FFFFFF')).toBeCloseTo(21, 5)
    })

    for (const theme of ['light', 'dark'] as const) {
        for (const border of ['--radio-border', '--checkbox-border']) {
            for (const ground of ['--general-body-bg', '--general-card-bg']) {
                it(`${border} on ${ground} (${theme})`, () => {
                    const ratio = contrast(resolveToken(border, theme), resolveToken(ground, theme))
                    expect(ratio).toBeGreaterThanOrEqual(3)
                })
            }
        }
    }

    it('fails for the grey these borders used before 2.7.0 (the test can fail)', () => {
        expect(contrast('#D1D1D1', resolveToken('--general-body-bg', 'light'))).toBeLessThan(3)
        expect(contrast('#454B5E', resolveToken('--general-body-bg', 'dark'))).toBeLessThan(3)
    })
})

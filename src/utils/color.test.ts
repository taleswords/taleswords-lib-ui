import { describe, it, expect } from 'vitest'
import { stringToColor, getTextColorForBackground } from './color'

describe('stringToColor', () => {
    it('returns a hex color string', () => {
        const color = stringToColor('test')
        expect(color).toMatch(/^#[0-9a-f]{6}$/i)
    })

    it('is deterministic', () => {
        expect(stringToColor('hello')).toBe(stringToColor('hello'))
    })

    it('returns different colors for different strings', () => {
        expect(stringToColor('Alice')).not.toBe(stringToColor('Bob'))
    })

    it('handles empty string', () => {
        const color = stringToColor('')
        expect(color).toMatch(/^#[0-9a-f]{6}$/i)
    })
})

describe('getTextColorForBackground', () => {
    it('returns light text for dark backgrounds', () => {
        expect(getTextColorForBackground('#000000')).toBe('#FAFAFA')
    })

    it('returns dark text for light backgrounds', () => {
        expect(getTextColorForBackground('#FFFFFF')).toBe('#333333')
    })

    it('returns dark text for yellow background', () => {
        expect(getTextColorForBackground('#FFD166')).toBe('#333333')
    })

    it('returns light text for dark blue', () => {
        expect(getTextColorForBackground('#1A1A2E')).toBe('#FAFAFA')
    })
})

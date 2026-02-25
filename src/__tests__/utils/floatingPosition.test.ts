import { describe, it, expect } from 'vitest'
import { calculateFloatingPosition, type FloatingOptions } from '../../utils/floatingPosition'

function makeRect(x: number, y: number, w: number, h: number): DOMRect {
    return { x, y, width: w, height: h, top: y, left: x, right: x + w, bottom: y + h, toJSON: () => ({}) }
}

const viewport = { width: 1024, height: 768 }

const defaultOpts: FloatingOptions = {
    placement: 'top',
    offset: 10,
    collisionPadding: 8,
    flip: true,
    shift: true,
}

describe('calculateFloatingPosition', () => {
    describe('basic placement', () => {
        const trigger = makeRect(400, 400, 100, 40) // centered-ish
        const floating = makeRect(0, 0, 120, 30)

        it('places above for top', () => {
            const result = calculateFloatingPosition(trigger, floating, viewport, { ...defaultOpts, placement: 'top' })
            expect(result.y).toBe(400 - 30 - 10) // triggerTop - floatingHeight - offset
            // Centered: 400 + (100-120)/2 = 390
            expect(result.x).toBe(390)
            expect(result.placement).toBe('top')
        })

        it('places below for bottom', () => {
            const result = calculateFloatingPosition(trigger, floating, viewport, { ...defaultOpts, placement: 'bottom' })
            expect(result.y).toBe(440 + 10) // triggerBottom + offset
            expect(result.x).toBe(390)
            expect(result.placement).toBe('bottom')
        })

        it('places left for left', () => {
            const result = calculateFloatingPosition(trigger, floating, viewport, { ...defaultOpts, placement: 'left' })
            expect(result.x).toBe(400 - 120 - 10) // triggerLeft - floatingWidth - offset
            // Vertically centered: 400 + (40-30)/2 = 405
            expect(result.y).toBe(405)
            expect(result.placement).toBe('left')
        })

        it('places right for right', () => {
            const result = calculateFloatingPosition(trigger, floating, viewport, { ...defaultOpts, placement: 'right' })
            expect(result.x).toBe(500 + 10) // triggerRight + offset
            expect(result.y).toBe(405)
            expect(result.placement).toBe('right')
        })
    })

    describe('alignment', () => {
        const trigger = makeRect(400, 400, 200, 40)
        const floating = makeRect(0, 0, 100, 30)

        it('aligns start on top', () => {
            const result = calculateFloatingPosition(trigger, floating, viewport, { ...defaultOpts, placement: 'top-start' })
            expect(result.x).toBe(400) // triggerLeft
        })

        it('aligns center on top', () => {
            const result = calculateFloatingPosition(trigger, floating, viewport, { ...defaultOpts, placement: 'top-center' })
            expect(result.x).toBe(450) // 400 + (200-100)/2
        })

        it('aligns end on top', () => {
            const result = calculateFloatingPosition(trigger, floating, viewport, { ...defaultOpts, placement: 'top-end' })
            expect(result.x).toBe(500) // triggerRight - floatingWidth
        })

        it('aligns start on left (vertical)', () => {
            const result = calculateFloatingPosition(trigger, floating, viewport, { ...defaultOpts, placement: 'left-start' })
            expect(result.y).toBe(400) // triggerTop
        })

        it('aligns end on left (vertical)', () => {
            const result = calculateFloatingPosition(trigger, floating, viewport, { ...defaultOpts, placement: 'left-end' })
            expect(result.y).toBe(410) // triggerBottom - floatingHeight = 440 - 30
        })
    })

    describe('flip', () => {
        it('flips from top to bottom when trigger is near top edge', () => {
            const trigger = makeRect(400, 20, 100, 40) // near top
            const floating = makeRect(0, 0, 120, 50) // 50px tall
            const result = calculateFloatingPosition(trigger, floating, viewport, { ...defaultOpts, placement: 'top' })
            // top placement: 20 - 50 - 10 = -40 which is < padding=8, so flip to bottom
            expect(result.placement).toBe('bottom')
            expect(result.y).toBe(60 + 10) // triggerBottom + offset
        })

        it('flips from bottom to top when trigger is near bottom edge', () => {
            const trigger = makeRect(400, 720, 100, 40) // near bottom
            const floating = makeRect(0, 0, 120, 50)
            const result = calculateFloatingPosition(trigger, floating, viewport, { ...defaultOpts, placement: 'bottom' })
            // bottom: 760 + 10 + 50 = 820 > 768-8=760, flip to top
            expect(result.placement).toBe('top')
            expect(result.y).toBe(720 - 50 - 10)
        })

        it('flips from left to right when trigger is near left edge', () => {
            const trigger = makeRect(10, 400, 40, 40)
            const floating = makeRect(0, 0, 120, 30)
            const result = calculateFloatingPosition(trigger, floating, viewport, { ...defaultOpts, placement: 'left' })
            // left: 10 - 120 - 10 = -120 < 8, flip to right
            expect(result.placement).toBe('right')
            expect(result.x).toBe(50 + 10) // triggerRight + offset
        })

        it('does not flip when flip is disabled', () => {
            const trigger = makeRect(400, 20, 100, 40)
            const floating = makeRect(0, 0, 120, 50)
            const result = calculateFloatingPosition(trigger, floating, viewport, { ...defaultOpts, placement: 'top', flip: false })
            expect(result.placement).toBe('top')
        })
    })

    describe('shift', () => {
        it('shifts floating into viewport horizontally', () => {
            const trigger = makeRect(950, 400, 60, 40) // near right edge
            const floating = makeRect(0, 0, 200, 30)
            const result = calculateFloatingPosition(trigger, floating, viewport, { ...defaultOpts, placement: 'top' })
            // Centered x: 950 + (60-200)/2 = 880. Right edge: 880 + 200 = 1080 > 1024-8=1016
            // Shift: 1016 - 200 = 816
            expect(result.x).toBeLessThanOrEqual(1024 - 8 - 200)
        })

        it('shifts floating into viewport when near left edge', () => {
            const trigger = makeRect(5, 400, 40, 40)
            const floating = makeRect(0, 0, 200, 30)
            const result = calculateFloatingPosition(trigger, floating, viewport, { ...defaultOpts, placement: 'top' })
            // Centered x: 5 + (40-200)/2 = -75, shifted to padding=8
            expect(result.x).toBe(8)
        })

        it('does not shift when shift is disabled', () => {
            const trigger = makeRect(5, 400, 40, 40)
            const floating = makeRect(0, 0, 200, 30)
            const result = calculateFloatingPosition(trigger, floating, viewport, { ...defaultOpts, placement: 'top', shift: false })
            // No shift: centered x = 5 + (40-200)/2 = -75
            expect(result.x).toBe(-75)
        })
    })

    describe('arrow', () => {
        it('computes arrow position for top placement', () => {
            const trigger = makeRect(400, 400, 100, 40)
            const floating = makeRect(0, 0, 120, 30)
            const result = calculateFloatingPosition(trigger, floating, viewport, {
                ...defaultOpts,
                placement: 'top',
                arrowSize: 8,
            })
            expect(result.arrow).toBeDefined()
            // Arrow x: triggerCenter(450) - floatingX(390) - half(4) = 56
            expect(result.arrow!.x).toBe(56)
            // Arrow y at bottom of tooltip: 30 - 4 = 26
            expect(result.arrow!.y).toBe(26)
        })

        it('computes arrow position for bottom placement', () => {
            const trigger = makeRect(400, 400, 100, 40)
            const floating = makeRect(0, 0, 120, 30)
            const result = calculateFloatingPosition(trigger, floating, viewport, {
                ...defaultOpts,
                placement: 'bottom',
                arrowSize: 8,
            })
            expect(result.arrow).toBeDefined()
            expect(result.arrow!.x).toBe(56)
            // Arrow y at top: -4
            expect(result.arrow!.y).toBe(-4)
        })

        it('does not include arrow when arrowSize is undefined', () => {
            const trigger = makeRect(400, 400, 100, 40)
            const floating = makeRect(0, 0, 120, 30)
            const result = calculateFloatingPosition(trigger, floating, viewport, defaultOpts)
            expect(result.arrow).toBeUndefined()
        })
    })
})

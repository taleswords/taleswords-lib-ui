// ── Types ──────────────────────────────────────────

export type Placement = 'top' | 'bottom' | 'left' | 'right'
export type Align = 'start' | 'center' | 'end'
export type PlacementWithAlign = `${Placement}-${Align}` | Placement

export interface FloatingOptions {
    placement: PlacementWithAlign
    offset: number
    collisionPadding: number
    flip: boolean
    shift: boolean
    arrowSize?: number
}

export interface FloatingResult {
    x: number
    y: number
    placement: PlacementWithAlign
    arrow?: { x: number; y: number }
}

// ── Helpers ────────────────────────────────────────

function parsePlacement(p: PlacementWithAlign): { side: Placement; align: Align } {
    const parts = p.split('-') as [Placement, Align?]
    return { side: parts[0], align: parts[1] ?? 'center' }
}

const OPPOSITE: Record<Placement, Placement> = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
}

// ── Core ───────────────────────────────────────────

function computePosition(
    triggerRect: DOMRect,
    floatingRect: DOMRect,
    side: Placement,
    align: Align,
    offset: number,
): { x: number; y: number } {
    let x = 0
    let y = 0

    // Main axis — position the floating element on the correct side
    switch (side) {
        case 'top':
            y = triggerRect.top - floatingRect.height - offset
            break
        case 'bottom':
            y = triggerRect.bottom + offset
            break
        case 'left':
            x = triggerRect.left - floatingRect.width - offset
            break
        case 'right':
            x = triggerRect.right + offset
            break
    }

    // Cross axis — alignment
    if (side === 'top' || side === 'bottom') {
        switch (align) {
            case 'start':
                x = triggerRect.left
                break
            case 'center':
                x = triggerRect.left + (triggerRect.width - floatingRect.width) / 2
                break
            case 'end':
                x = triggerRect.right - floatingRect.width
                break
        }
    } else {
        switch (align) {
            case 'start':
                y = triggerRect.top
                break
            case 'center':
                y = triggerRect.top + (triggerRect.height - floatingRect.height) / 2
                break
            case 'end':
                y = triggerRect.bottom - floatingRect.height
                break
        }
    }

    return { x: Math.round(x), y: Math.round(y) }
}

function overflows(
    pos: { x: number; y: number },
    floatingRect: DOMRect,
    side: Placement,
    viewport: { width: number; height: number },
    padding: number,
): boolean {
    switch (side) {
        case 'top':
            return pos.y < padding
        case 'bottom':
            return pos.y + floatingRect.height > viewport.height - padding
        case 'left':
            return pos.x < padding
        case 'right':
            return pos.x + floatingRect.width > viewport.width - padding
    }
}

function shiftIntoViewport(
    pos: { x: number; y: number },
    floatingRect: DOMRect,
    viewport: { width: number; height: number },
    padding: number,
): { x: number; y: number } {
    let { x, y } = pos

    // Horizontal clamp
    if (x < padding) x = padding
    if (x + floatingRect.width > viewport.width - padding) {
        x = viewport.width - padding - floatingRect.width
    }

    // Vertical clamp
    if (y < padding) y = padding
    if (y + floatingRect.height > viewport.height - padding) {
        y = viewport.height - padding - floatingRect.height
    }

    return { x: Math.round(x), y: Math.round(y) }
}

function computeArrow(
    triggerRect: DOMRect,
    floatingRect: DOMRect,
    pos: { x: number; y: number },
    side: Placement,
    arrowSize: number,
): { x: number; y: number } {
    const half = arrowSize / 2

    if (side === 'top' || side === 'bottom') {
        // Arrow x is centered on the trigger, clamped within the floating element
        const triggerCenter = triggerRect.left + triggerRect.width / 2
        let ax = triggerCenter - pos.x - half
        ax = Math.max(half, Math.min(ax, floatingRect.width - arrowSize - half))
        const ay = side === 'top' ? floatingRect.height - half : -half
        return { x: Math.round(ax), y: Math.round(ay) }
    } else {
        const triggerCenter = triggerRect.top + triggerRect.height / 2
        let ay = triggerCenter - pos.y - half
        ay = Math.max(half, Math.min(ay, floatingRect.height - arrowSize - half))
        const ax = side === 'left' ? floatingRect.width - half : -half
        return { x: Math.round(ax), y: Math.round(ay) }
    }
}

// ── Public API ─────────────────────────────────────

export function calculateFloatingPosition(
    triggerRect: DOMRect,
    floatingRect: DOMRect,
    viewport: { width: number; height: number },
    options: FloatingOptions,
): FloatingResult {
    const { offset, collisionPadding, flip, shift, arrowSize } = options
    let { side, align } = parsePlacement(options.placement)

    // Compute initial position
    let pos = computePosition(triggerRect, floatingRect, side, align, offset)

    // Flip if overflows on the main axis
    if (flip && overflows(pos, floatingRect, side, viewport, collisionPadding)) {
        const flippedSide = OPPOSITE[side]
        const flippedPos = computePosition(triggerRect, floatingRect, flippedSide, align, offset)
        if (!overflows(flippedPos, floatingRect, flippedSide, viewport, collisionPadding)) {
            side = flippedSide
            pos = flippedPos
        }
    }

    // Shift into viewport on the cross axis
    if (shift) {
        pos = shiftIntoViewport(pos, floatingRect, viewport, collisionPadding)
    }

    const resolvedPlacement: PlacementWithAlign = align === 'center' ? side : `${side}-${align}`

    const result: FloatingResult = {
        x: pos.x,
        y: pos.y,
        placement: resolvedPlacement,
    }

    if (arrowSize !== undefined) {
        result.arrow = computeArrow(triggerRect, floatingRect, pos, side, arrowSize)
    }

    return result
}

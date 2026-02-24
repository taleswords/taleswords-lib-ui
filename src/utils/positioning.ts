export interface PositionOffset {
    top: number
    left: number
}

export function calculateDropdownPosition(
    trigger: HTMLElement,
    menu: HTMLElement
): PositionOffset {
    const triggerRect = trigger.getBoundingClientRect()
    const menuRect = menu.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const viewportWidth = window.innerWidth

    let top = triggerRect.bottom
    let left = triggerRect.left

    // Flip vertically if menu overflows bottom
    if (top + menuRect.height > viewportHeight) {
        top = triggerRect.top - menuRect.height
    }

    // Constrain horizontally
    if (left + menuRect.width > viewportWidth) {
        left = viewportWidth - menuRect.width
    }

    if (left < 0) {
        left = 0
    }

    return { top, left }
}

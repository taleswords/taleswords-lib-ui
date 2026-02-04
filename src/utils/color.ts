export function stringToColor(str: string): string {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff
        color += ('00' + value.toString(16)).slice(-2)
    }

    return color
}

const luminanceFactor = (value: number): number => {
    value /= 255
    return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4)
}

export function getTextColorForBackground(hexColor: string): string {
    const r = parseInt(hexColor.slice(1, 3), 16)
    const g = parseInt(hexColor.slice(3, 5), 16)
    const b = parseInt(hexColor.slice(5, 7), 16)

    const luminance =
        0.2126 * luminanceFactor(r) +
        0.7152 * luminanceFactor(g) +
        0.0722 * luminanceFactor(b)

    return luminance < 0.5 ? '#FAFAFA' : '#333333'
}

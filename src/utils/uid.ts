let counter = 0

export function uid(prefix = 'uid'): string {
    counter += 1
    return `${prefix}-${counter}`
}

export function resetUidCounter(): void {
    counter = 0
}

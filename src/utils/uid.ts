/**
 * Deterministic counter-based ID generator.
 * No Math.random / crypto.randomUUID — safe for SSR and snapshot tests.
 * Call resetUidCounter() between test runs to keep assertions stable.
 */
let counter = 0

export function uid(prefix = 'uid'): string {
    counter += 1
    return `${prefix}-${counter}`
}

export function resetUidCounter(): void {
    counter = 0
}

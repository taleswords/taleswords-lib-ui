/**
 * Dev-only structural validation for playground pages.
 * Detects legacy layout patterns that should have been migrated.
 * Called once on app mount in dev mode.
 */

const BANNED_PATTERNS = [
    { pattern: /class="demo-row"/, label: 'demo-row class' },
    { pattern: /class="demo-stack"/, label: 'demo-stack class' },
    { pattern: /class="demo-grid"/, label: 'demo-grid class' },
    { pattern: /class="page"/, label: 'page wrapper class' },
    { pattern: /data-testid="page-/, label: 'page-level data-testid' },
    { pattern: /<h1[\s>]/, label: '<h1> page title' },
] as const

export function validatePlaygroundStructure(): void {
    if (!import.meta.env.DEV) return

    // Wait for the page to render
    requestAnimationFrame(() => {
        const content = document.querySelector('.playground-body__content')
        if (!content) return

        const html = content.innerHTML

        for (const { pattern, label } of BANNED_PATTERNS) {
            if (pattern.test(html)) {
                console.warn(
                    `[Playground Contract] Legacy pattern detected: "${label}". ` +
                    'Please use Section/Case components instead.',
                )
            }
        }
    })
}

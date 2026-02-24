import { configureAxe } from 'vitest-axe'

// Isolated component tests are not wrapped in landmark elements.
// Disable the 'region' rule globally for all component axe tests.
export const axe = configureAxe({
    rules: {
        region: { enabled: false },
    },
})

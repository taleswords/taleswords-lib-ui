import { expect } from 'vitest'
import * as matchers from 'vitest-axe/matchers'
import { configureAxe } from 'vitest-axe'

expect.extend(matchers)

// Disable 'region' rule globally — isolated component tests are not
// wrapped in landmark elements (<main>, <nav>, etc.).
configureAxe({
    rules: [{ id: 'region', enabled: false }],
})

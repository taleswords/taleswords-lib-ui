import { expect } from 'vitest'
import type { AxeMatchers } from 'vitest-axe/matchers'
import * as matchers from 'vitest-axe/matchers'
import { configureAxe } from 'vitest-axe'

declare module 'vitest' {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface Assertion<T = any> extends AxeMatchers {}
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface AsymmetricMatchersContaining extends AxeMatchers {}
}

expect.extend(matchers)

// Disable 'region' rule globally — isolated component tests are not
// wrapped in landmark elements (<main>, <nav>, etc.).
configureAxe({
    rules: { region: { enabled: false } },
})

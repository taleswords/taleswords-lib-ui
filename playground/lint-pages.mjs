#!/usr/bin/env node
/**
 * Static linter for playground pages.
 * Validates that all pages use definePlaygroundPage() and follow the contract.
 * Run via: npm run lint:playground
 */

import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

const PAGES_DIR = join(import.meta.dirname, 'src/pages')

const BANNED_PATTERNS = [
    { pattern: /class="demo-row"/, label: 'demo-row class' },
    { pattern: /class="demo-stack"/, label: 'demo-stack class' },
    { pattern: /class="demo-grid"/, label: 'demo-grid class' },
    { pattern: /class="page"/, label: 'page wrapper class' },
    { pattern: /data-testid="page-/, label: 'page-level data-testid' },
    { pattern: /<h1[\s>]/, label: '<h1> page title' },
]

let exitCode = 0

async function lint() {
    const files = (await readdir(PAGES_DIR)).filter(f => f.endsWith('Page.vue'))

    for (const file of files) {
        const filePath = join(PAGES_DIR, file)
        const content = await readFile(filePath, 'utf-8')
        const errors = []

        // Check for definePlaygroundPage() call
        if (!content.includes('definePlaygroundPage(')) {
            errors.push('Missing definePlaygroundPage() call')
        }

        // Check for banned legacy patterns
        for (const { pattern, label } of BANNED_PATTERNS) {
            if (pattern.test(content)) {
                errors.push(`Legacy pattern: "${label}"`)
            }
        }

        // Check for Section/Case imports
        if (!content.includes("from '../components/Section.vue'")) {
            errors.push('Missing Section.vue import')
        }
        if (!content.includes("from '../components/Case.vue'")) {
            errors.push('Missing Case.vue import')
        }

        if (errors.length > 0) {
            exitCode = 1
            console.error(`\n  ${file}`)
            for (const error of errors) {
                console.error(`    - ${error}`)
            }
        }
    }

    if (exitCode === 0) {
        console.log(`  All ${files.length} playground pages pass contract checks.`)
    } else {
        console.error(`\n  Playground contract violations found.`)
    }

    process.exit(exitCode)
}

lint()

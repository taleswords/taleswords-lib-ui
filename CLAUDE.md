# CLAUDE.md — @taleswords/lib-ui Doctrine

This file defines the behavioral, architectural, and quality rules for
working inside the **@taleswords/lib-ui** repository.

This repository is a **sealed internal UI design system**.
It is NOT an application.
It is NOT a dashboard.
It is NOT a backend.

Claude must obey this doctrine strictly.

---

# 1. Architectural Role

@taleswords/lib-ui is:

* A Vue 3 component library
* A token-driven design system
* A strictly typed UI surface
* The single source of truth for Taleswords visual identity

It is NOT:

* An app
* A router layer
* A store layer
* An API layer
* A business logic layer
* A Pixi/editor layer

Dependency direction is always:

```
taleswords-web → @taleswords/lib-ui
```

Never reverse this.

---

# 2. Technology Stack

Mandatory:

* Vue 3
* Composition API
* `<script setup lang="ts">`
* TypeScript (strict mode)
* Vite (library mode)
* Vitest + Vue Test Utils + vitest-axe

Build output:

* ES module only
* Single CSS bundle (`styles.css`)
* Vue as peer dependency (external)
* Type declarations emitted

Never:

* Add UMD builds
* Bundle Vue
* Add runtime-only hacks

---

# 3. TypeScript Rules

Claude MUST:

* Avoid `any`
* Prefer `unknown` + narrowing
* Type all props explicitly
* Export public types when appropriate
* Keep public API strongly typed

Claude MUST NOT:

* Use implicit any
* Bypass type safety for convenience
* Export unstable internal types

---

# 4. Styling Doctrine

Styling follows a strict 3-layer architecture:

1. Palette (raw colors)
2. Semantic Tokens
3. Component Tokens

Components MUST:

* Use semantic tokens only
* Never reference `--color-*` directly
* Never hardcode hex or rgba
* Use BEM class naming

If a token is missing:

* Add it to the tokens layer
* Do NOT inline a color

Consumers must never override component internals.

---

# 5. Floating & Overlay Components

All floating components (Dropdown, Tooltip, future Popover, etc.) MUST:

* Use shared `calculateFloatingPosition`
* Use `position: fixed`
* Support flip + shift
* Support scroll + resize repositioning
* Avoid DOM query hacks
* Avoid reliance on slot consumer structure

Never duplicate positioning logic.

---

# 6. Accessibility Requirements

All interactive components MUST:

* Support keyboard navigation
* Provide visible focus ring
* Use correct ARIA roles
* Pass vitest-axe tests
* Maintain WCAG AA contrast compliance

Tooltip-specific requirements:

* `role="tooltip"`
* `aria-describedby` wiring
* Escape dismiss
* Hover + focus activation

Accessibility regressions are not allowed.

---

# 7. Component Design Principles

Components must be:

* Small
* Focused
* Predictable
* Stateless unless required
* Free of domain logic

Do NOT:

* Add store imports
* Add router imports
* Add API calls
* Add application-specific behavior

This library contains UI only.

---

# 8. Testing Requirements

When adding or modifying components:

* Add unit tests
* Add accessibility tests for interactive components
* Add utility tests for pure functions
* Do not silence failing tests

Before publishing:

```
npm run test
npm run build
npm pack
```

Ensure tarball only contains dist/.

---

# 9. Playground Rules

The playground:

* Is for development only
* Must follow the page contract
* Must not leak into dist
* Must not affect library build

Never rely on playground-only logic inside library components.

---

# 10. Versioning Discipline

Internal but structured:

* Patch: bugfixes, stability improvements
* Minor: new components or non-breaking props
* Major: breaking API or token changes

Breaking changes are allowed, but must be intentional.

---

# 11. Hard Stops

If a change impacts:

* Public API surface
* Token architecture
* Floating positioning utility
* Accessibility guarantees
* Build structure

STOP and evaluate architectural impact before proceeding.

---

# Final Principle

@taleswords/lib-ui is a sealed, deterministic, token-driven UI system.

It must remain:

* Predictable
* Typed
* Accessible
* Architecturally consistent

No shortcuts.
No hacks.
No domain leakage.

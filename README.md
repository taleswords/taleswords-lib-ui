# @taleswords/lib-ui

Private UI component library for **Taleswords Web**.

This package contains the complete design system used by the Taleswords application, including:

* Vue 3 base components
* Composed UI systems (Dropdown, Modal, Table, Tooltip, etc.)
* Design tokens (color, typography, spacing)
* Dark mode support
* Global base styles
* Accessibility-safe interaction patterns

> ⚠️ This package is **private** and intended for use only inside `taleswords-web`.

---

# Philosophy

`@taleswords/lib-ui` is a **sealed UI subsystem**.

It provides:

* Deterministic styling
* Strong TypeScript surface
* Strict component contracts
* Token-driven design
* Zero domain knowledge

It does **not** include:

* Application logic
* API logic
* Store logic
* Router logic
* Pixi or editor logic

Dependency direction must always be:

```
taleswords-web  →  @taleswords/lib-ui
```

Never reverse.

---

# Installation

This package is installed via private registry:

```
npm install @taleswords/lib-ui
```

Peer dependency:

* Vue 3.x

Vue is intentionally **not bundled**.

---

# Usage

Import styles once at application root:

```ts
import '@taleswords/lib-ui/styles.css'
```

Import components as needed:

```ts
import { ButtonBase, DropdownBase, TooltipBase } from '@taleswords/lib-ui'
```

Do not deep-import internal files.

Allowed:

```ts
import { ButtonBase } from '@taleswords/lib-ui'
```

Not allowed:

```ts
import ButtonBase from '@taleswords/lib-ui/dist/...'
```

---

# What This Library Exports

## Base Controls

* ButtonBase
* TextboxBase
* CheckboxBase
* Radio
* Switch
* BadgeBase
* LoaderBase
* ProgressBar

## Composed Systems

* DropdownBase
* ModalBase
* TableBase
* ListBase
* TabsBase
* AccordionBase
* Pagination
* NavigationButtons
* TooltipBase

## Layout Primitives

* CardBase
* LayoutBase
* TitleDescAction

## Notification Systems

* ToastBase
* BannerBase
* useToast
* useBanner

All components are fully typed.

---

# TooltipBase

TooltipBase provides accessible, collision-safe floating tooltips.

### Features

* Hover + focus activation (recommended pattern)
* Escape dismiss
* Scroll + resize repositioning
* Auto-flip + viewport shift
* Optional arrow
* Teleport to body (no clipping issues)
* WCAG-safe aria-describedby wiring

Example:

```vue
<TooltipBase content="Delete project">
  <ButtonBase variant="danger" />
</TooltipBase>
```

Custom content:

```vue
<TooltipBase placement="bottom">
  <ButtonBase label="Info" />
  <template #content>
    <strong>Custom tooltip</strong>
  </template>
</TooltipBase>
```

Optional outside close:

```vue
<TooltipBase closeOnPointerDown>
  <ButtonBase label="Interactive" />
</TooltipBase>
```

---

# Styling System

The styling architecture follows a strict three-layer model:

1. Palette (raw colors)
2. Semantic Tokens
3. Component Tokens

Consumers must never override component classes directly.

All customization must happen via:

* Token adjustments
* Component props
* Layout wrappers

---

# Typography

The library bundles the official Taleswords typography stack:

* Lora (narrative body text)
* Raleway (UI headings)
* Source Sans Pro (UI body)
* Material Symbols (icons)

Typography is opinionated and global.

---

# Dark Mode

Dark mode is token-driven.

Activate via:

```
document.documentElement.setAttribute('data-theme', 'dark')
```

The application is responsible for toggling the theme.

---

# Accessibility

All interactive components:

* Support keyboard navigation
* Provide visible focus rings
* Follow ARIA best practices
* Are WCAG AA contrast compliant

Accessibility validation is enforced in playground development.

---

# Development

Build library:

```
npm run build
```

Verify tarball contents:

```
npm pack
```

Only the `dist/` directory is published.

---

# Boundary Rules

The application must NOT:

* Override internal component classes
* Redefine design tokens
* Depend on component internal DOM structure
* Import internal paths

If visual changes are required, update this library — not the app.

---

# Versioning Strategy

Since this is an internal package:

* Breaking changes are allowed
* Version increments should reflect UI surface changes
* taleswords-web should upgrade intentionally

Recommended:

* Patch: styling fixes, internal stability improvements
* Minor: new components or non-breaking props
* Major: breaking API or token changes

---

# Status

This library is actively maintained as part of Taleswords frontend stabilization.

It is the single source of truth for:

* Visual identity
* Interaction patterns
* UI accessibility

---

# License

Private – Taleswords internal use only.

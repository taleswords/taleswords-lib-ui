# @taleswords/lib-ui

[![npm](https://img.shields.io/npm/v/@taleswords/lib-ui)](https://www.npmjs.com/package/@taleswords/lib-ui)
[![license](https://img.shields.io/npm/l/@taleswords/lib-ui)](./LICENSE)

A Vue 3 component library and design system: typed base controls, composed UI systems
(dropdown, modal, table, tooltip, toasts), a three-layer token architecture, dark mode and
accessibility-safe interaction patterns.

It was built as the design system for one application, Taleswords Web, and is published under
MIT because the components are generally useful even though the opinions are not neutral.

**What that means in practice**

* It is **opinionated**: typography, spacing and interaction patterns are decided, not configurable
  by theme object.
* It is **sealed**: components expose props and tokens, never internal classes or DOM structure.
* It carries **zero domain knowledge** — no application logic, no API or store layer, no router,
  no canvas or editor code.
* Its roadmap follows the needs of the application that consumes it. Issues and questions are
  welcome; feature requests outside that path may simply not fit.

If you need a neutral, fully themeable kit, this is not it. If you want a small, strict,
accessible Vue 3 system you can read end to end, it may be.

---

## Requirements

* Vue 3.5 or later (peer dependency — Vue is intentionally not bundled)

## Installation

```
npm install @taleswords/lib-ui
```

## Usage

Import the stylesheet once at the application root:

```ts
import '@taleswords/lib-ui/styles.css'
```

Import components where you need them:

```ts
import { ButtonBase, DropdownBase, TooltipBase } from '@taleswords/lib-ui'
```

Only the package root and `./styles.css` are exported. Deep imports into `dist/` are not a
supported interface and will break without a major version.

---

## What it exports

**Base controls** — `ButtonBase` · `TextboxBase` · `CheckboxBase` · `Radio` · `Switch` ·
`BadgeBase` · `LoaderBase` · `ProgressBar`

**Composed systems** — `DropdownBase` · `ModalBase` · `TableBase` · `ListBase` · `TabsBase` ·
`AccordionBase` · `Pagination` · `NavigationButtons` · `TooltipBase`

**Layout primitives** — `CardBase` · `LayoutBase` · `TitleDescAction`

**Notifications** — `ToastBase` · `BannerBase` · `useToast` · `useBanner`

Everything is fully typed; `.d.ts` files ship with the package.

---

## Example: TooltipBase

Accessible, collision-safe floating tooltips: hover and focus activation, Escape to dismiss,
reposition on scroll and resize, auto-flip and viewport shift, optional arrow, teleported to
`body` so nothing clips it, and `aria-describedby` wired for screen readers.

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

Close on outside pointer-down, for interactive content:

```vue
<TooltipBase closeOnPointerDown>
  <ButtonBase label="Interactive" />
</TooltipBase>
```

---

## Styling

Three layers, in this order, and customisation happens at the token level:

1. **Palette** — raw colours
2. **Semantic tokens** — meaning, not colour (`--surface`, `--danger`, …)
3. **Component tokens** — per-component surface

Adjust tokens, pass props, or wrap in your own layout. Do not override component classes or
depend on internal DOM structure: both are private and change without notice.

## Typography

No font binaries are vendored. Faces arrive as declared dependencies:

| face | package | licence |
|---|---|---|
| Lora (narrative body) | `@fontsource-variable/lora` | SIL Open Font License 1.1 |
| Source Sans Pro (UI) | `@fontsource/source-sans-pro` | SIL Open Font License 1.1 |
| Material Symbols Rounded (icons) | `@material-symbols/font-400` | Apache License 2.0 |

Typography is global and opinionated.

## Dark mode

Token-driven. The application owns the toggle:

```ts
document.documentElement.setAttribute('data-theme', 'dark')
```

## Accessibility

Every interactive component supports keyboard navigation, shows a visible focus ring, follows
ARIA patterns, and meets WCAG AA contrast. Behaviour is held in place by Playwright contract
tests for the components where accessibility is easiest to regress — dropdown, modal, table and
notifications — and the playground is linted for accessibility during development.

---

## Development

```
npm install
npm run dev              # playground
npm test                 # unit tests (Vitest)
npm run test:contracts   # interaction contracts (Playwright)
npm run typecheck        # vue-tsc
npm run lint             # ESLint
npm run lint:boundaries  # enforce the import boundaries
npm run build            # build dist/ and emit types
```

Only `dist/` is published; `npm pack` shows exactly what ships.

## Versioning

Semantic versioning.

* **Patch** — styling fixes, internal stability
* **Minor** — new components, non-breaking props
* **Major** — breaking component API or token changes

The library is developed alongside one application, so major versions happen when that
application needs them to. Pin the major if you depend on it.

## Licence

MIT — see [LICENSE](./LICENSE).

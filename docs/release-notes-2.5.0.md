# Release Notes — v2.5.0

**Type:** Minor (additive)
**Breaking changes:** None

---

## New Component

### FileInputBase

A file input primitive that wraps a hidden `<input type="file">` behind a styled trigger button. Eliminates raw `<input type="file">` usage in downstream applications.

- `accept` — restrict file types
- `multiple` — allow multiple file selection
- `isDisabled` — disable interaction
- `label` — customise trigger text
- Emits `files-selected` with `File[]` payload
- Keyboard accessible (Enter / Space activation)
- Uses existing `--file-upload-*` token set

---

## New Feature

### TextboxBase — Narrative Variant

Added optional `variant` prop to `TextboxBase`:

```vue
<TextboxBase variant="narrative" />
```

Applies the narrative font stack (`--narrative-font`) for dialogue and story editing fields. Default behavior is unchanged when `variant` is omitted or set to `"default"`.

---

## New Utility Class

### `.tw-narrative-text`

Global CSS class applying narrative typography tokens:

```html
<div class="tw-narrative-text">{{ dialogueText }}</div>
```

Uses `--narrative-font`, `--narrative-size`, `--narrative-weight`, and `--narrative-leading`.

---

## New Tokens

### Border Radius Scale

```css
--radius-xs:   2px
--radius-sm:   4px
--radius-md:   6px
--radius-lg:   8px
--radius-xl:   12px
--radius-pill:  999px
```

Existing component radius tokens (`--button-border-radius`, `--textbox-border-radius`, `--badge-border-radius`, `--progress-border-radius`) now reference the new scale. Hardcoded radius values in tooltip, tabs, banners, toasts, checkbox, and dropdown menu have been migrated.

### Micro Spacing Token

```css
--space-2xs: 2px
```

Extends the spacing scale below `--space-xs` for micro-spacing patterns (badges, icon overlays, compact UI density).

---

## Reference

docs/proposals/RFC-bundle-dashboard-2.4-propsals.md

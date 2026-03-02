# Release Notes — @taleswords/lib-ui 2.2.0

> Additive release. No breaking changes. No migration required.

---

## Density & Spacing Token System

All component spacing is now driven by a 5-tier semantic token scale (`--space-xs` through `--space-xl`) and a `--density-scale` multiplier. Every hardcoded padding, gap, and margin across all 34 components has been replaced with token references or density-aware `calc()` expressions.

Default rendering is pixel-identical to 2.1.0.

### Compact mode

Opt in by adding `data-density="compact"` to any container element:

```html
<div data-density="compact">
    <!-- all lib-ui components inside render at 85% spacing -->
</div>
```

The attribute can be applied at any level — a single card, a sidebar, or the entire app. Nesting is safe; the innermost `data-density` wins.

### Tokens

| Token | Base value |
|-------|-----------|
| `--density-scale` | `1` |
| `--space-xs` | `0.25rem` (4px) |
| `--space-sm` | `0.5rem` (8px) |
| `--space-md` | `0.75rem` (12px) |
| `--space-lg` | `1rem` (16px) |
| `--space-xl` | `1.25rem` (20px) |

All spacing tokens are computed as `calc(base * var(--density-scale))`, so overriding `--density-scale` in a descendant propagates automatically.

---

## BadgeBase — Semantic Variants

`BadgeBase` now supports 5 domain-agnostic semantic variants in addition to the existing 13 role variants:

```ts
type BadgeSemanticVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger'
```

```vue
<BadgeBase variant="success" label="Active" />
<BadgeBase variant="warning" label="Expiring" />
<BadgeBase variant="danger" label="Blocked" size="sm" />
```

### New props

| Prop | Type | Default |
|------|------|---------|
| `size` | `'sm' \| 'md'` | `'md'` |
| `testId` | `string` | `'badge-base'` |

### New type exports

- `BadgeRoleVariant` — the 13 existing role values
- `BadgeSemanticVariant` — the 5 new semantic values
- `BadgeSize` — `'sm' | 'md'`
- `BadgeVariant` — union of both (unchanged name, widened type)

Full light and dark theme token coverage for all semantic variants.

---

## FormField — Display Mode

`FormField` now accepts `display?: boolean` (default `false`). When enabled:

- Label cursor changes from pointer to default
- Focus-within accent styling is suppressed
- Layout and validation remain identical

Use this when wrapping read-only content in a form-like layout:

```vue
<FormField label="Full Name" display>
    <DisplayFieldBase label="" value="Jane Doe" />
</FormField>

<FormField label="Email" display>
    <TextboxBase model-value="jane@example.com" is-readonly />
</FormField>
```

---

## Stats

- 37 files changed in the spacing refactor, 7 files changed for badge + display mode
- 404 tests passing (9 new)
- Zero breaking changes

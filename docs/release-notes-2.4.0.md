# Release Notes — @taleswords/lib-ui 2.4.0

**Date:** 2026-03-02
**Type:** Minor (additive, non-breaking)

---

## Summary

Adds optional named slots to AccordionItem and FormField, enabling consumers to place auxiliary content (badges, icons, spinners, counts) inside component headers and label rows without CSS overrides or component forking.

---

## New Features

### AccordionItem — `trigger-prefix` and `trigger-suffix` Slots

Two new optional named slots render content inside the accordion trigger button:

- **`trigger-prefix`** — before the title text (e.g., icons)
- **`trigger-suffix`** — after the title text, before the chevron (e.g., badges, counts)

Wrapper `<span>` elements are conditionally rendered only when the slot is provided. Zero DOM overhead when unused.

```vue
<AccordionItem id="gov" title="Pepper Signals">
    <template #trigger-suffix>
        <BadgeBase variant="danger" label="3" size="sm" />
    </template>
    Content here.
</AccordionItem>
```

### FormField — `label-suffix` Slot

One new optional named slot renders inline content after the label text and required/optional indicator:

- **`label-suffix`** — saving spinners, status badges, character counts

The `<label>` element is now wrapped in a `.form-field__label-row` flex container. The suffix renders in a sibling `<span>` outside the `<label>`, preserving the label's accessible name.

```vue
<FormField label="Character Name">
    <template #label-suffix>
        <LoaderIcon v-if="isSaving" size="small" />
    </template>
    <TextboxBase v-model="name" />
</FormField>
```

---

## Styling

All new CSS follows BEM naming and uses density-aware spacing:

- `.accordion-item__trigger-prefix` / `.accordion-item__trigger-suffix`
- `.form-field__label-row` / `.form-field__label-suffix`
- All margins use `calc(value * var(--density-scale))`
- No new design tokens introduced

---

## Testing

- 6 new AccordionBase tests (trigger slot rendering, conditional wrappers, expand/collapse with slots, disabled with slots, axe a11y)
- 6 new FormField tests (suffix rendering, conditional wrappers, label-row with/without suffix, accessible name isolation, validation with suffix, axe a11y)
- All 404 existing tests continue to pass unchanged

---

## Breaking Changes

None.

- No props removed or renamed
- No behavioral changes to existing API
- No token changes
- No CSS class renaming
- `AccordionItemProps` type unchanged
- `FormFieldProps` type unchanged

**DOM note:** FormField's `<label>` is now inside a `.form-field__label-row` wrapper `<div>`. Consumers following doctrine (no internal CSS overrides) are unaffected.

---

## Playground

- AccordionsPage: new "Trigger Slots" and "Trigger Slots — Compact" cases under Composition
- FormsPage: new "Label Suffix" cases (spinner, badge, character count, compact density) under Composition

---

## Migration

No migration required from 2.3.0. All changes are additive.

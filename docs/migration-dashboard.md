# Migration Guide — Dashboard → @taleswords/lib-ui

Step-by-step guide for migrating the Taleswords dashboard from legacy components to `@taleswords/lib-ui`.

---

## 1. Installation

```bash
npm install @taleswords/lib-ui
```

### CSS imports (in your entry file)

```ts
// main.ts
import '@taleswords/lib-ui/styles.css'   // all component styles + design tokens
```

### Theme setup

The library ships with light and dark themes. Apply the dark theme by adding `data-theme="dark"` to a parent element (typically `<html>` or `<body>`):

```html
<html data-theme="dark">
```

---

## 2. Component Mapping Table

| Old Component | New Component | Notes |
|---|---|---|
| `UiButton` | `ButtonBase` | Variants renamed: `outline` → `secondary`, `link` → `ghost` |
| `UiInputField` | `TextboxBase` + `FormField` | Wrap in FormField for label/validation |
| `UiTextarea` | *(not in lib-ui)* | Use native `<textarea>` with `FormField` |
| `UiCheckboxField` | `CheckboxBase` | |
| `UiToggle` | `Switch` | |
| `UiInputSelect` | `DropdownBase` | Props API completely different — see below |
| `UiBadge` | `BadgeBase` | Variants changed to role-based names |
| `UiModal` | `ModalBase` | v-model driven, `beforeClose` hook |
| `UiPopover` | *(not in lib-ui)* | Use `DropdownBase` with custom `#trigger` slot |
| `UiTooltip` | *(not in lib-ui)* | Use native `title` attr or CSS tooltip |
| `UiDropdownMenu` | `DropdownBase` | Use custom slots for menu items |
| `UiAlert` | `BannerBase` / `ToastBase` | Persistent → Banner, transient → Toast |
| `UiLoader` | `LoaderBase` | |
| `UiBreadcrumbs` | `Breadcrumbs` | |
| `UiTabs` | `TabsBase` | v-model driven |
| `UiPagination` | `Pagination` | |
| `UiCard` | `CardBase` | |
| `UiActionsHeader` | `TitleDescAction` / `LayoutBase` | |
| `UiList` / `UiListItem` | `ListBase` | Data-driven (`rows` prop), no UiListItem |
| `UiFileUpload` | *(not in lib-ui)* | Build with `ButtonBase` + native file input |
| `UiPathList` | `ListBase` + custom `#item` slot | |

---

## 3. Key Migration Patterns

### Buttons

```vue
<!-- Before -->
<UiButton variant="outline" @click="handler">Save</UiButton>

<!-- After -->
<ButtonBase variant="secondary" label="Save" @click="handler" />
```

### Text inputs with validation

```vue
<!-- Before -->
<UiInputField v-model="name" label="Name" :error="nameError" />

<!-- After -->
<FormField label="Name" :validation-data="{ type: 'error', message: nameError }">
    <TextboxBase v-model="name" :has-error="!!nameError" />
</FormField>
```

### Dropdowns

```vue
<!-- Before -->
<UiInputSelect v-model="selected" :items="items" />

<!-- After -->
<DropdownBase
    v-model="selected"
    :options="options"
    placeholder="Select..."
/>
```

Note: Options use `{ value, label }` shape instead of raw strings. Multi-select uses `is-multi-select` prop.

### Modals

```vue
<!-- Before -->
<UiModal :show="isOpen" @close="isOpen = false">
    <template #header>Title</template>
    Content
</UiModal>

<!-- After -->
<ModalBase v-model="isOpen" title="Title">
    Content
    <template #footer="{ close }">
        <ButtonBase variant="secondary" label="Cancel" @click="close" />
        <ButtonBase variant="primary" label="Save" @click="save" />
    </template>
</ModalBase>
```

### Alerts → Notifications

```vue
<!-- Before (inline alert) -->
<UiAlert type="warning">Something happened</UiAlert>

<!-- After (persistent banner) -->
<script setup>
const { addBanner } = useBanner()
addBanner({ message: 'Something happened', variant: 'warning' })
</script>
<BannerArea />

<!-- After (transient toast) -->
<script setup>
const { addToast } = useToast()
addToast({ message: 'Something happened', variant: 'warning' })
</script>
<ToastArea />  <!-- place once in App.vue -->
```

---

## 4. Theme Integration

### Semantic tokens

All components use CSS custom properties defined as semantic tokens. Override them per-theme:

```css
:root {
    --button-primary-bg: #3b82f6;
    --button-primary-text: #ffffff;
}

[data-theme="dark"] {
    --button-primary-bg: #60a5fa;
    --button-primary-text: #0f172a;
}
```

### Adding custom token overrides

Create a CSS file loaded after `styles.css`:

```css
/* my-overrides.css */
:root {
    --general-body-bg: #f8fafc;
    --general-card-bg: #ffffff;
    --general-card-border: #e2e8f0;
}
```

---

## 5. data-testid Guidance

Every component accepts a `testId` prop that renders as `data-testid`:

```vue
<ButtonBase testId="save-user" label="Save" />
<!-- renders: <button data-testid="save-user"> -->
```

### Default naming conventions

| Component | Default testId |
|-----------|---------------|
| `ButtonBase` | — (no default) |
| `DropdownBase` | `dropdown-base` |
| `ModalBase` | `modal-base` |
| `TableBase` | `table-base` |
| `ToastArea` | `toast-area` |
| `BannerArea` | `banner-area` |
| `Pagination` | `pagination` |

### Using in Playwright / Cypress

```ts
// Playwright
await page.locator('[data-testid="save-user"]').click()

// Cypress
cy.get('[data-testid="save-user"]').click()
```

---

## 6. Breaking Behaviors

### v-model replaces event-driven open/close

Modals now use `v-model` instead of `:show` + `@close`:

```vue
<!-- Old pattern -->
<UiModal :show="isOpen" @close="isOpen = false" />

<!-- New pattern -->
<ModalBase v-model="isOpen" />
```

### Singleton composables for notifications

Toasts and banners are managed via singleton composables (`useToast`, `useBanner`). There is no per-component state — all instances share the same reactive store.

Place `<ToastArea />` and `<BannerArea />` once in your root `App.vue`.

### No UiListItem — data-driven lists

`ListBase` is data-driven via the `rows` prop. There is no `UiListItem` equivalent. Customize rendering with the `#item` slot:

```vue
<ListBase :rows="items">
    <template #item="{ row }">
        <span>{{ row.label }}</span>
    </template>
</ListBase>
```

### Accordion is container-based

Use `AccordionBase` + `AccordionItem` instead of individual collapsible components:

```vue
<AccordionBase>
    <AccordionItem id="faq-1" title="Question 1">
        Answer 1
    </AccordionItem>
    <AccordionItem id="faq-2" title="Question 2">
        Answer 2
    </AccordionItem>
</AccordionBase>
```

### FormField wraps inputs for labels/validation

There is no built-in label/error prop on `TextboxBase` or `CheckboxBase`. Use `FormField` wrapper:

```vue
<FormField label="Email" :validation-data="errors.email">
    <TextboxBase v-model="form.email" type="email" :has-error="!!errors.email" />
</FormField>
```

## 2.1.0 Notes

### TextboxBase — Multiline Support

`TextboxBase` now supports `<textarea>` rendering via three new props:

- `multiline?: boolean` — renders a `<textarea>` instead of `<input>`
- `rows?: number` — sets the visible row count (textarea only)
- `autosize?: boolean` — auto-grows height to fit content (textarea only)

```vue
<TextboxBase v-model="bio" multiline :rows="4" />
<TextboxBase v-model="note" multiline autosize placeholder="Auto-growing..." />
```

Replaces the need for `UiTextarea` in migration — wrap with `FormField` for label/validation.

### DisplayFieldBase — New Component

New read-only label+value display component for inspector panels, detail views, and summaries.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Label text (required) |
| `value` | `string \| number \| null` | — | Value text; renders em dash when null/undefined |
| `inline` | `boolean` | `false` | Horizontal layout (label + value on same line) |
| `isMuted` | `boolean` | `false` | Muted value color |
| `truncate` | `boolean` | `false` | Truncate overflowing value text |

Provides a `default` slot to override the value region with custom content (badges, links, etc.).

```vue
<DisplayFieldBase label="Status">
    <BadgeBase variant="accepted" label="Active" />
</DisplayFieldBase>
```

### AccordionBase — Default Expanded State

`AccordionBase` now accepts `defaultExpanded` to control which items start expanded:

- `defaultExpanded?: string[] | 'all'`
- Pass an array of item IDs to expand specific items on mount
- Pass `'all'` to expand every item on mount
- Runtime toggling works normally after initial mount

```vue
<!-- Specific items -->
<AccordionBase allow-multiple :default-expanded="['faq-1', 'faq-3']">

<!-- All items -->
<AccordionBase allow-multiple default-expanded="all">
```

---

## 2.0.x Notes

### 2.0.1

**DropdownBase**
- `#trigger` slot now exposes `toggle()` in slot props, enabling fully custom trigger UIs to open/close the dropdown.
- Trigger measurement for positioning no longer relies on querying `[aria-haspopup]` from slotted content; it uses an internal trigger wrapper ref for slot-safe positioning.

**TooltipBase**
- Added `closeOnPointerDown` prop (default: `false`).
  - When `true`, tooltip closes on outside pointer down (mouse + touch).
- Improved leave animation reliability by separating mount/unmount (`v-if`) from visibility (`v-show`).

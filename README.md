# @taleswords/lib-ui

Vue 3 UI component library with built-in typography, theming via CSS custom properties, and a complete set of form and layout components.

## Features

- 11 ready-to-use Vue 3 components
- Full TypeScript support with exported prop interfaces
- Global base styles (typography, forms, links, buttons)
- 90+ CSS custom properties for theming
- Bundled fonts: Raleway (headings/UI), Lora (body), Source Sans Pro (inputs)
- Responsive design with mobile-first approach
- Tree-shakeable named exports

## Installation

```bash
npm install @taleswords/lib-ui
```

**Peer dependency:** Vue 3.5+

## Quick Start

### Option A: Plugin (global registration)

```ts
import { createApp } from 'vue'
import LibUiPlugin from '@taleswords/lib-ui'
import '@taleswords/lib-ui/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(LibUiPlugin)
app.mount('#app')
```

All components are then available globally without imports.

### Option B: Named imports (tree-shaking)

```ts
// main.ts
import '@taleswords/lib-ui/style.css'
```

```vue
<script setup lang="ts">
import { UiButton, UiCard } from '@taleswords/lib-ui'
</script>

<template>
    <UiCard>
        <UiButton variant="primary">Click me</UiButton>
    </UiCard>
</template>
```

## CSS Entry Points

| Import | Description |
|--------|-------------|
| `@taleswords/lib-ui/style.css` | Everything: variables + base styles + component styles |
| `@taleswords/lib-ui/variables.css` | CSS custom properties only (for custom builds) |
| `@taleswords/lib-ui/base.css` | Base element styles only (typography, forms, links) |

**Note:** Base styles apply globally to standard HTML elements (`h1`-`h5`, `p`, `a`, `label`, `input`, `button`, `select`, `textarea`). No wrapper class is needed.

## Components

### UiButton

Button with four style variants and two sizes.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'danger'` | `'default'` | Visual style |
| `size` | `'small' \| 'medium'` | `'medium'` | Button size |
| `disabled` | `boolean` | `false` | Disables interaction |

```vue
<UiButton variant="primary">Save</UiButton>
<UiButton variant="danger" size="small">Delete</UiButton>
<UiButton disabled>Unavailable</UiButton>
```

### UiBadge

Colored label for roles, statuses, and visibility.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `UiBadgeValue` | *required* | Badge type |

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Badge clicked |

**`UiBadgeValue`** is one of: `visitor`, `guest`, `guest-editor`, `reviewer`, `editor`, `manager`, `admin`, `owner`, `public`, `private`, `pending`, `declined`, `accepted`

```vue
<UiBadge value="admin" />
<UiBadge value="pending" @click="handleClick" />
```

### UiCard

Container with three visual variants.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'elevated' \| 'outlined'` | `'default'` | Card style |
| `noPadding` | `boolean` | `false` | Removes padding |
| `row` | `boolean` | `false` | Horizontal flex layout |

```vue
<UiCard>Default card with background</UiCard>
<UiCard variant="elevated">Card with box shadow</UiCard>
<UiCard variant="outlined">Transparent with border</UiCard>
<UiCard row>
    <UiButton>A</UiButton>
    <UiButton>B</UiButton>
</UiCard>
```

### UiInputField

Text input with label, validation, and v-model support.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | *required* | Input value (v-model) |
| `type` | `'text' \| 'email' \| 'password'` | `'text'` | HTML input type |
| `label` | `string` | — | Label text |
| `placeholder` | `string` | — | Placeholder text |
| `error` | `string` | — | Error message (shows red border + text) |
| `required` | `boolean` | `false` | Shows asterisk on label |
| `disabled` | `boolean` | `false` | Disables the input |
| `autocomplete` | `string` | — | HTML autocomplete attribute |

```vue
<UiInputField
    v-model="email"
    type="email"
    label="Email"
    placeholder="you@example.com"
    required
    :error="emailError"
/>
```

### UiCheckboxField

Checkbox with label and optional error state.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | *required* | Checked state (v-model) |
| `label` | `string` | *required* | Label text |
| `error` | `string` | — | Error message |
| `disabled` | `boolean` | `false` | Disables the checkbox |

```vue
<UiCheckboxField
    v-model="agreed"
    label="I agree to the terms"
    :error="agreed ? '' : 'You must accept'"
/>
```

### UiInputSelect

Custom dropdown select with keyboard support.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | *required* | Selected value (v-model) |
| `options` | `{ label: string; value: string }[]` | *required* | Available options |
| `label` | `string` | — | Label text |
| `placeholder` | `string` | — | Placeholder when nothing is selected |
| `error` | `string` | — | Error message |
| `required` | `boolean` | `false` | Shows asterisk on label |
| `disabled` | `boolean` | `false` | Disables the select |

```vue
<UiInputSelect
    v-model="role"
    label="Role"
    placeholder="Select a role..."
    :options="[
        { label: 'Editor', value: 'editor' },
        { label: 'Reviewer', value: 'reviewer' },
        { label: 'Admin', value: 'admin' },
    ]"
    required
/>
```

### UiModal

Fullscreen modal on mobile (slides up from bottom) and centered dialog on desktop. Teleports to `<body>` and locks page scroll.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | *required* | Modal header title |
| `confirmText` | `string` | `'Confirm'` | Confirm button label |
| `cancelText` | `string` | `'Cancel'` | Cancel button label |
| `confirmVariant` | `'default' \| 'primary' \| 'secondary' \| 'danger'` | `'primary'` | Confirm button style |
| `confirmDisabled` | `boolean` | `false` | Disables confirm button only |
| `actionsDisabled` | `boolean` | `false` | Disables all actions (close, cancel, confirm) |
| `errorText` | `string` | — | Error message with icon |
| `warningText` | `string` | — | Warning message with icon |
| `infoText` | `string` | — | Info message with icon |
| `progressText` | `string` | — | Progress message with hourglass icon |
| `leftButtonText` | `string` | — | Optional left-side button label |
| `leftButtonVariant` | `'default' \| 'primary' \| 'secondary' \| 'danger'` | `'secondary'` | Left button style |
| `noScrolls` | `boolean` | `false` | Disables scroll containment on desktop |

| Event | Description |
|-------|-------------|
| `close` | Overlay or X button clicked |
| `confirm` | Confirm button clicked |
| `cancel` | Cancel button clicked |
| `left-button-click` | Left button clicked |

**Slot:** Default slot for modal body content.

```vue
<UiModal
    v-if="showModal"
    title="Delete Item"
    confirm-text="Delete"
    confirm-variant="danger"
    :error-text="deleteError"
    @close="showModal = false"
    @confirm="handleDelete"
    @cancel="showModal = false"
>
    <p>Are you sure you want to delete this item?</p>
</UiModal>
```

### UiPopover

Toast notification that auto-dismisses.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `string` | *required* | Notification text |
| `type` | `'success' \| 'error'` | `'success'` | Visual style |
| `duration` | `number` | `3000` | Auto-dismiss time in ms |

| Event | Description |
|-------|-------------|
| `close` | Popover dismissed (by timer or click) |

```vue
<UiPopover
    v-if="showToast"
    message="Changes saved"
    type="success"
    @close="showToast = false"
/>
```

### UiUserIcon

Circular avatar with the first letter of a name. Background color is deterministically generated from the name string with auto-contrasting text.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | *required* | User name |

```vue
<UiUserIcon name="Alice" />
```

### UiBreadcrumbs

Navigation breadcrumb trail.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `{ label: string; href?: string }[]` | *required* | Breadcrumb items (last item renders as plain text) |

```vue
<UiBreadcrumbs :items="[
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Current Project' },
]" />
```

### UiActionsHeader

Section header with a title and a slot for action buttons.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | *required* | Header text |

**Slot:** Default slot for action buttons.

```vue
<UiActionsHeader title="Team Members">
    <UiButton variant="primary" size="small">Invite</UiButton>
</UiActionsHeader>
```

## Utilities

The library exports two color utility functions:

```ts
import { stringToColor, getTextColorForBackground } from '@taleswords/lib-ui'

const bg = stringToColor('Alice')       // deterministic hex color from string
const text = getTextColorForBackground(bg) // '#FAFAFA' or '#333333' for contrast
```

## TypeScript

All prop interfaces are exported:

```ts
import type {
    UiButtonProps,
    UiBadgeProps,
    UiBadgeValue,
    UiCardProps,
    UiModalProps,
    UiPopoverProps,
    UiInputFieldProps,
    UiCheckboxFieldProps,
    UiInputSelectProps,
    UiInputSelectOption,
    UiUserIconProps,
    UiBreadcrumbsProps,
    UiBreadcrumbItem,
    UiActionsHeaderProps,
} from '@taleswords/lib-ui'
```

## Theming

Override any CSS custom property in your app to customize the theme:

```css
:root {
    --ui-primary-btn: #3B82F6;
    --ui-primary-btn-hover: #2563EB;
    --ui-body-bg: #1a1a2e;
    --ui-text-color: #e0e0e0;
}
```

### Available CSS Variable Categories

| Category | Prefix | Examples |
|----------|--------|---------|
| Text & Background | `--ui-text-*`, `--ui-body-*` | `--ui-text-color`, `--ui-body-bg` |
| Cards | `--ui-card-*` | `--ui-card-bg`, `--ui-card-border-color`, `--ui-card-shadow` |
| Buttons | `--ui-primary-btn*`, `--ui-secondary-btn*`, `--ui-button-*` | `--ui-primary-btn`, `--ui-button-danger` |
| Headings | `--ui-h1-color` ... `--ui-h5-color` | Per-level heading colors |
| Links | `--ui-link-*`, `--ui-secondary-link-*` | `--ui-link-color`, `--ui-link-hover` |
| Inputs | `--ui-input-*` | `--ui-input-bg`, `--ui-input-border-color`, `--ui-input-focus-*` |
| Badges | `--ui-badge-*` | `--ui-badge-admin-bg`, `--ui-badge-admin-text` |
| Modals | `--ui-modal-*` | `--ui-modal-overlay`, `--ui-modal-shadow` |
| Status Icons | `--ui-warning-icon`, `--ui-error-icon`, `--ui-info-icon` | Modal message icons |
| Status Text | `--ui-error-text-color`, `--ui-success-text-color`, `--ui-info-text` | Feedback colors |

See [`src/styles/variables.css`](src/styles/variables.css) for the full list of variables and their default values.

## Fonts

Three font families are bundled and loaded automatically:

| Font | Usage | Weight |
|------|-------|--------|
| **Raleway** (variable) | Headings, labels, buttons | 400-700 |
| **Lora** (variable) | Body text | 400 |
| **Source Sans Pro** | Form inputs, selects | 400 |

## Development

```bash
npm install       # Install dependencies
npm run dev       # Start playground (Vite dev server)
npm run build     # Build library (ES + UMD + type declarations)
npm run typecheck # Run vue-tsc type checking
```

The playground at `playground/` demonstrates all components with interactive controls.

## License

MIT

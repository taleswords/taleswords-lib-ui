# Public API Reference — @taleswords/lib-ui

> API freeze snapshot. All exports listed here are public and stable.

---

## Components

### Inputs

| Component | Props | Emits | Slots |
|-----------|-------|-------|-------|
| **ButtonBase** | `variant?: ButtonVariant` (`'default'`), `size?: ButtonSize` (`'medium'`), `icon?: string`, `iconPosition?: 'left'\|'right'` (`'left'`), `isDisabled?: boolean`, `label?: string`, `href?: string`, `to?: string\|object` | `click` | `default` |
| **TextboxBase** | `modelValue?: string` (`''`), `type?: TextboxType` (`'text'`), `placeholder?: string`, `isDisabled?: boolean`, `isReadonly?: boolean`, `hasError?: boolean`, `autocomplete?: string`, `maxlength?: number`, `multiline?: boolean` (`false`), `rows?: number`, `autosize?: boolean` (`false`) | `update:modelValue`, `blur`, `focus` | — |
| **CheckboxInput** | `isChecked?: boolean`, `isDisabled?: boolean`, `hasError?: boolean` | — | — |
| **CheckboxBase** | `modelValue?: boolean`, `label?: string`, `isDisabled?: boolean`, `hasError?: boolean` | `update:modelValue` | — |
| **Radio** | `modelValue?: string`, `value: string` (required), `name: string` (required), `label?: string`, `isDisabled?: boolean`, `hasError?: boolean` | `update:modelValue` | — |
| **Switch** | `modelValue?: boolean`, `label?: string`, `size?: SwitchSize` (`'medium'`), `isDisabled?: boolean` | `update:modelValue` | — |

### Info

| Component | Props | Emits | Slots |
|-----------|-------|-------|-------|
| **BadgeBase** | `variant: BadgeVariant` (required), `label?: string`, `size?: BadgeSize` (`'md'`), `testId?: string` | — | — |
| **LoaderIcon** | `size?: LoaderIconSize` (`'medium'`) | — | — |
| **LoaderBase** | `size?: LoaderIconSize` (`'medium'`), `variant?: LoaderVariant` (`'spinner'`), `label?: string`, `isOverlay?: boolean` | — | — |
| **ProgressBar** | `value: number` (required), `max?: number` (`100`), `variant?: ProgressVariant` (`'default'`), `showLabel?: boolean`, `ariaLabel?: string` | — | — |
| **DisplayFieldBase** | `label: string` (required), `value?: string\|number\|null`, `inline?: boolean` (`false`), `isMuted?: boolean` (`false`), `truncate?: boolean` (`false`) | — | `default` |

### Forms

| Component | Props | Emits | Slots |
|-----------|-------|-------|-------|
| **FormField** | `label?: string`, `description?: string`, `isOptional?: boolean`, `display?: boolean` (`false`), `validationData?: ValidationEntry\|ValidationEntry[]\|Record` | — | `default` |

### Composed — Dropdown

| Component | Props | Emits | Slots |
|-----------|-------|-------|-------|
| **DropdownBase** | `modelValue?: T\|T[]`, `options?: DropdownOption<T>[]`, `isMultiSelect?: boolean`, `hasSearch?: boolean`, `hasGroups?: boolean`, `hasApplyButton?: boolean`, `hasCheckboxes?: boolean`, `hasClearButton?: boolean`, `isDisabled?: boolean`, `hasError?: boolean`, `placeholder?: string` (`'Select...'`), `searchPlaceholder?: string` (`'Search...'`), `placement?: string` (`'bottom-start'`), `offset?: number` (`4`), `testId?: string` | `update:modelValue`, `open`, `close`, `search`, `apply`, `clear`, `selection-changed`, `active-option-changed` | `trigger`, `option`, `selected`, `empty`, `header`, `footer` |

### Composed — Modal

| Component | Props | Emits | Slots |
|-----------|-------|-------|-------|
| **ModalBase** | `modelValue: boolean` (required), `size?: 'small'\|'medium'\|'large'\|'full'` (`'medium'`), `title?: string`, `hasCloseButton?: boolean` (`true`), `closeOnOverlay?: boolean` (`true`), `closeOnEscape?: boolean` (`true`), `beforeClose?: () => boolean\|Promise<boolean>`, `testId?: string` | `update:modelValue`, `open`, `close` | `header`, `default`, `footer` |

### Composed — Table

| Component | Props | Emits | Slots |
|-----------|-------|-------|-------|
| **TableBase** | `columns: TableColumn[]` (required), `rows: TableRow[]` (required), `selectedIds?: RowId[]`, `sort?: TableSort\|null`, `pagination?: TablePagination\|null`, `isSelectable?: boolean`, `isLoading?: boolean`, `hasHoverHighlight?: boolean` (`true`), `stickyHeader?: boolean`, `emptyText?: string`, `testId?: string` | `update:selectedIds`, `update:sort`, `update:pagination`, `row-click` | `features`, `cell`, `empty`, `footer` |

### Composed — List

| Component | Props | Emits | Slots |
|-----------|-------|-------|-------|
| **ListBase** | `rows: TableRow[]` (required), `labelKey?: string` (`'label'`), `selectedIds?: RowId[]`, `sort?: TableSort\|null`, `pagination?: TablePagination\|null`, `isSelectable?: boolean`, `isLoading?: boolean`, `hasHoverHighlight?: boolean` (`true`), `emptyText?: string`, `testId?: string` | `update:selectedIds`, `update:sort`, `update:pagination`, `row-click` | `item`, `empty`, `features`, `footer` |

### Features

| Component | Props | Emits | Slots |
|-----------|-------|-------|-------|
| **TitleDescAction** | `title?: string`, `description?: string`, `testId?: string` | — | `default`, `action` |
| **Breadcrumbs** | `items: BreadcrumbItem[]` (required), `testId?: string` | `item-clicked` | — |
| **Pagination** | `currentPage: number` (required), `totalPages?: number`, `totalItems?: number`, `perPage?: number` (`10`), `maxVisiblePages?: number` (`5`), `testId?: string` | `page-changed` | — |
| **NavigationButtons** | `items: NavItem[]` (required), `activeId?: string`, `testId?: string` | `item-clicked` | — |
| **RowExpandable** | `expanded?: boolean`, `testId?: string` | `update:expanded` | `default` |

### Wrappers

| Component | Props | Emits | Slots |
|-----------|-------|-------|-------|
| **CardBase** | `title?: string`, `description?: string`, `isLoading?: boolean`, `testId?: string` | — | `header`, `default`, `actions` |
| **LayoutBase** | `title?: string`, `description?: string`, `isLoading?: boolean`, `testId?: string` | — | `breadcrumbs`, `actions`, `default` |
| **TabsBase** | `modelValue: string` (required), `tabs: TabItem[]` (required), `testId?: string` | `update:modelValue` | `default` |
| **AccordionBase** | `allowMultiple?: boolean`, `defaultExpanded?: string[]\|'all'`, `testId?: string` | — | `default` |
| **AccordionItem** | `id: string` (required), `title: string` (required), `isDisabled?: boolean` | — | `default` |

### Notifications

| Component | Props | Emits | Slots |
|-----------|-------|-------|-------|
| **ToastBase** | `id: number` (required), `variant?: ToastVariant` (`'info'`), `message: string` (required), `isDismissible?: boolean` (`true`), `testId?: string` | `dismiss` | — |
| **ToastArea** | `testId?: string` | — | — |
| **BannerBase** | `id: number` (required), `variant?: BannerVariant` (`'info'`), `message: string` (required), `isDismissible?: boolean` (`true`), `hasDontShowAgain?: boolean`, `testId?: string` | `dismiss`, `dont-show-again` | — |
| **BannerArea** | `testId?: string` | `dont-show-again` | — |

---

## Composables

### `useToast()`

Singleton composable for managing toast notifications.

```ts
const { toasts, addToast, removeToast, pauseTimer, resumeTimer, clearAll } = useToast()
```

| Return | Type | Description |
|--------|------|-------------|
| `toasts` | `ToastEntry[]` | Reactive array of active toasts |
| `addToast` | `(options: ToastOptions) => number` | Add a toast, returns its id |
| `removeToast` | `(id: number) => void` | Remove a toast by id |
| `pauseTimer` | `(id: number) => void` | Pause auto-dismiss timer (hover) |
| `resumeTimer` | `(id: number) => void` | Resume auto-dismiss timer (unhover) |
| `clearAll` | `() => void` | Remove all toasts and reset state |

**`ToastOptions`**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `message` | `string` | — | Toast message (required) |
| `variant` | `ToastVariant` | `'info'` | `'info' \| 'success' \| 'warning' \| 'error'` |
| `duration` | `number` | `5000` | Auto-dismiss duration (ms) |
| `isPersistent` | `boolean` | `false` | If true, toast stays until manually dismissed |
| `isDismissible` | `boolean` | `true` | Show dismiss button |

### `useBanner()`

Singleton composable for managing banner notifications.

```ts
const { banners, addBanner, removeBanner, clearAll } = useBanner()
```

| Return | Type | Description |
|--------|------|-------------|
| `banners` | `BannerEntry[]` | Reactive array of active banners |
| `addBanner` | `(options: BannerOptions) => number` | Add a banner, returns its id |
| `removeBanner` | `(id: number) => void` | Remove a banner by id |
| `clearAll` | `() => void` | Remove all banners and reset state |

**`BannerOptions`**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `message` | `string` | — | Banner message (required) |
| `variant` | `BannerVariant` | `'info'` | `'info' \| 'success' \| 'warning' \| 'error'` |
| `isDismissible` | `boolean` | `true` | Show dismiss button |
| `hasDontShowAgain` | `boolean` | `false` | Show "don't show again" action |

---

## Design Tokens

### Density & Spacing

All component spacing is driven by a 5-tier token scale and a density multiplier. Tokens are defined in `tokens.css` and resolve at use-time via `var()`.

| Token | Base value | Description |
|-------|-----------|-------------|
| `--density-scale` | `1` | Multiplier applied to all spacing tokens and density-aware `calc()` expressions |
| `--space-xs` | `0.25rem` (4px) | Micro gaps, separators |
| `--space-sm` | `0.5rem` (8px) | Tight gaps, inline spacing |
| `--space-md` | `0.75rem` (12px) | Standard internal padding |
| `--space-lg` | `1rem` (16px) | Section padding, card insets |
| `--space-xl` | `1.25rem` (20px) | Generous padding, card headers |

Compact mode is opt-in via a data attribute:

```html
<div data-density="compact">
    <!-- all descendants render at 85% spacing -->
</div>
```

| Selector | `--density-scale` |
|----------|-------------------|
| `:root` (default) | `1` |
| `[data-density="compact"]` | `0.85` |

### Badge Tokens

Semantic variant tokens (light theme defaults):

| Token | Value |
|-------|-------|
| `--badge-neutral-bg` | `--color-neutral-400` |
| `--badge-neutral-text` | `--color-neutral-1300` |
| `--badge-info-bg` | `--color-info-300` |
| `--badge-info-text` | `--color-info-500` |
| `--badge-success-bg` | `--color-success-100` |
| `--badge-success-text` | `--color-success-600` |
| `--badge-warning-bg` | `--color-warning-100` |
| `--badge-warning-text` | `--color-warning-500` |
| `--badge-danger-bg` | `--color-danger-100` |
| `--badge-danger-text` | `--color-danger-500` |
| `--badge-size-sm` | `--text-sm` |

Dark theme overrides exist in `tokens-dark.css` using Nord palette equivalents.

---

## Utility Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `uid` | `(prefix?: string) => string` | Deterministic counter-based unique ID generator |
| `resetUidCounter` | `() => void` | Reset uid counter to 0 (for testing) |
| `stringToColor` | `(str: string) => string` | Deterministic string → hex color |
| `getTextColorForBackground` | `(hexColor: string) => '#FAFAFA' \| '#333333'` | Contrast text color for a background |
| `resolveNavigationTag` | `(props: NavigationProps) => NavigationTag` | Resolve element tag from `to`/`href` props |
| `resolveNavigationAttrs` | `(props: NavigationProps) => Record<string, unknown>` | Resolve element attributes from `to`/`href` props |
| `useOutsideClick` | `(elementRef: Ref<HTMLElement\|null>, callback: () => void) => void` | Lifecycle-bound outside click handler |
| `calculateDropdownPosition` | `(trigger: HTMLElement, menu: HTMLElement) => PositionOffset` | Calculate dropdown position with viewport clamping |

---

## Type Exports

### Input Types

- `ButtonBaseProps`, `ButtonVariant`, `ButtonSize`
- `TextboxBaseProps`, `TextboxType`
- `CheckboxInputProps`
- `CheckboxBaseProps`
- `RadioProps`
- `SwitchProps`, `SwitchSize`
- `DropdownOption`, `DropdownBaseProps`

### Info Types

- `BadgeBaseProps`, `BadgeVariant`, `BadgeRoleVariant`, `BadgeSemanticVariant`, `BadgeSize`
- `LoaderIconProps`, `LoaderIconSize`
- `LoaderBaseProps`, `LoaderVariant`
- `ProgressBarProps`, `ProgressVariant`
- `DisplayFieldBaseProps`

### Form Types

- `FormFieldProps`, `ValidationEntry`

### Navigation / Positioning Types

- `NavigationTag`, `NavigationProps`
- `PositionOffset`

### Composed Types

- `ModalBaseProps`
- `RowId`, `SortDirection`, `TableColumn`, `TableRow`, `TableSort`, `TablePagination`, `TableBaseProps`
- `ListBaseProps`

### Feature Types

- `TitleDescActionProps`
- `CardBaseProps`
- `LayoutBaseProps`
- `TabItem`, `TabsBaseProps`
- `AccordionBaseProps`
- `AccordionItemProps`
- `BreadcrumbItem`, `BreadcrumbsProps`
- `PaginationProps`
- `NavItem`, `NavigationButtonsProps`
- `RowExpandableProps`

### Notification Types

- `ToastBaseProps`, `ToastAreaProps`
- `ToastOptions`, `ToastVariant`, `ToastEntry`
- `BannerBaseProps`, `BannerAreaProps`
- `BannerOptions`, `BannerVariant`, `BannerEntry`

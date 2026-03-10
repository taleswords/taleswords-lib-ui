// Font imports
import '@fontsource/source-sans-pro'
import '@fontsource-variable/lora'

// Styles (order matters: palette → tokens → dark → fonts → base → icons)
import './styles/palette.css'
import './styles/tokens.css'
import './styles/tokens-dark.css'
import './styles/fonts.css'
import './styles/base.css'
import './styles/icons.css'

// Foundation — Inputs
export { default as ButtonBase } from './inputs/buttons/Base.vue'
export { default as TextboxBase } from './inputs/textboxes/Base.vue'
export { default as FileInputBase } from './inputs/file-inputs/Base.vue'
export { default as CheckboxInput } from './inputs/checkboxes/Input.vue'
export { default as CheckboxBase } from './inputs/checkboxes/Base.vue'
export { default as Radio } from './inputs/Radio.vue'
export { default as Switch } from './inputs/Switch.vue'

// Foundation — Info
export { default as BadgeBase } from './info/badges/Base.vue'
export { default as LoaderIcon } from './info/loaders/Icon.vue'
export { default as LoaderBase } from './info/loaders/Base.vue'
export { default as ProgressBar } from './info/ProgressBar.vue'
export { default as TooltipBase } from './info/tooltips/Base.vue'
export { default as DisplayFieldBase } from './info/display-fields/Base.vue'

// Foundation — Forms
export { default as FormField } from './forms/Field.vue'

// Composed — Inputs
export { default as DropdownBase } from './inputs/dropdowns/Base.vue'

// Composed — Wrappers
export { default as ModalBase } from './wrappers/modals/Base.vue'

// Composed — Tables
export { default as TableBase } from './tables/Base.vue'

// Composed — Lists
export { default as ListBase } from './lists/Base.vue'

// Phase 4 — Features
export { default as TitleDescAction } from './features/TitleDescAction.vue'
export { default as Breadcrumbs } from './features/Breadcrumbs.vue'
export { default as Pagination } from './features/Pagination.vue'
export { default as NavigationButtons } from './features/NavigationButtons.vue'
export { default as RowExpandable } from './features/RowExpandable.vue'

// Phase 4 — Wrappers
export { default as CardBase } from './wrappers/cards/Base.vue'
export { default as LayoutBase } from './wrappers/layouts/Base.vue'
export { default as TabsBase } from './wrappers/tabs/Base.vue'
export { default as AccordionBase } from './wrappers/accordions/Base.vue'
export { default as AccordionItem } from './wrappers/accordions/components/Item.vue'

// Phase 4 — Notifications
export { default as ToastBase } from './notifications/toasts/Base.vue'
export { default as ToastArea } from './notifications/toasts/Area.vue'
export { default as BannerBase } from './notifications/banners/Base.vue'
export { default as BannerArea } from './notifications/banners/Area.vue'

// Utilities
export { stringToColor, getTextColorForBackground } from './utils/color'
export { uid, resetUidCounter } from './utils/uid'
export { resolveNavigationTag, resolveNavigationAttrs } from './utils/navigation'
export { useOutsideClick } from './utils/outsideClick'
export { calculateDropdownPosition } from './utils/positioning'
export { calculateFloatingPosition } from './utils/floatingPosition'
export { useToast } from './utils/useToast'
export { useBanner } from './utils/useBanner'

// Type re-exports
export type { ButtonBaseProps, ButtonVariant, ButtonSize } from './inputs/buttons/Base.vue'
export type { TextboxBaseProps, TextboxType, TextboxVariant } from './inputs/textboxes/Base.vue'
export type { FileInputBaseProps } from './inputs/file-inputs/Base.vue'
export type { CheckboxInputProps } from './inputs/checkboxes/Input.vue'
export type { CheckboxBaseProps } from './inputs/checkboxes/Base.vue'
export type { RadioProps } from './inputs/Radio.vue'
export type { SwitchProps, SwitchSize } from './inputs/Switch.vue'
export type { BadgeBaseProps, BadgeVariant, BadgeRoleVariant, BadgeSemanticVariant, BadgeSize } from './info/badges/Base.vue'
export type { LoaderIconProps, LoaderIconSize } from './info/loaders/Icon.vue'
export type { LoaderBaseProps, LoaderVariant } from './info/loaders/Base.vue'
export type { ProgressBarProps, ProgressVariant } from './info/ProgressBar.vue'
export type { FormFieldProps, ValidationEntry } from './forms/Field.vue'
export type { NavigationTag, NavigationProps } from './utils/navigation'
export type { PositionOffset } from './utils/positioning'
export type { Placement, Align, PlacementWithAlign, FloatingOptions, FloatingResult } from './utils/floatingPosition'
export type { TooltipBaseProps } from './info/tooltips/Base.vue'
export type { DisplayFieldBaseProps } from './info/display-fields/Base.vue'

// Composed — Type re-exports
export type { DropdownOption, DropdownBaseProps } from './inputs/dropdowns/Base.vue'
export type { ModalBaseProps } from './wrappers/modals/Base.vue'
export type {
    RowId,
    SortDirection,
    TableColumn,
    TableRow,
    TableSort,
    TablePagination,
    TableBaseProps,
} from './tables/Base.vue'
export type { ListBaseProps } from './lists/Base.vue'

// Phase 4 — Type re-exports
export type { TitleDescActionProps } from './features/TitleDescAction.vue'
export type { CardBaseProps } from './wrappers/cards/Base.vue'
export type { LayoutBaseProps } from './wrappers/layouts/Base.vue'
export type { TabItem, TabsBaseProps } from './wrappers/tabs/Base.vue'
export type { AccordionBaseProps } from './wrappers/accordions/Base.vue'
export type { AccordionItemProps } from './wrappers/accordions/components/Item.vue'
export type { BreadcrumbItem, BreadcrumbsProps } from './features/Breadcrumbs.vue'
export type { PaginationProps } from './features/Pagination.vue'
export type { NavItem, NavigationButtonsProps } from './features/NavigationButtons.vue'
export type { RowExpandableProps } from './features/RowExpandable.vue'
export type { ToastBaseProps } from './notifications/toasts/Base.vue'
export type { ToastAreaProps } from './notifications/toasts/Area.vue'
export type { ToastOptions, ToastVariant, ToastEntry } from './utils/useToast'
export type { BannerBaseProps } from './notifications/banners/Base.vue'
export type { BannerAreaProps } from './notifications/banners/Area.vue'
export type { BannerOptions, BannerVariant, BannerEntry } from './utils/useBanner'

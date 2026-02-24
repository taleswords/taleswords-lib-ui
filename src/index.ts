/// <reference path="./globals.d.ts" />

// Font imports
import '@fontsource/source-sans-pro'
import '@fontsource-variable/lora'
import '@fontsource-variable/raleway'

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
export { default as CheckboxInput } from './inputs/checkboxes/Input.vue'
export { default as CheckboxBase } from './inputs/checkboxes/Base.vue'
export { default as Radio } from './inputs/Radio.vue'
export { default as Switch } from './inputs/Switch.vue'

// Foundation — Info
export { default as BadgeBase } from './info/badges/Base.vue'
export { default as LoaderIcon } from './info/loaders/Icon.vue'
export { default as LoaderBase } from './info/loaders/Base.vue'
export { default as ProgressBar } from './info/ProgressBar.vue'

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

// Utilities
export { stringToColor, getTextColorForBackground } from './utils/color'
export { uid, resetUidCounter } from './utils/uid'
export { resolveNavigationTag, resolveNavigationAttrs } from './utils/navigation'
export { useOutsideClick } from './utils/outsideClick'
export { calculateDropdownPosition } from './utils/positioning'

// Type re-exports
export type { ButtonBaseProps, ButtonVariant, ButtonSize } from './inputs/buttons/Base.vue'
export type { TextboxBaseProps, TextboxType } from './inputs/textboxes/Base.vue'
export type { CheckboxInputProps } from './inputs/checkboxes/Input.vue'
export type { CheckboxBaseProps } from './inputs/checkboxes/Base.vue'
export type { RadioProps } from './inputs/Radio.vue'
export type { SwitchProps, SwitchSize } from './inputs/Switch.vue'
export type { BadgeBaseProps, BadgeVariant } from './info/badges/Base.vue'
export type { LoaderIconProps, LoaderIconSize } from './info/loaders/Icon.vue'
export type { LoaderBaseProps, LoaderVariant } from './info/loaders/Base.vue'
export type { ProgressBarProps, ProgressVariant } from './info/ProgressBar.vue'
export type { FormFieldProps, ValidationEntry } from './forms/Field.vue'
export type { NavigationTag, NavigationProps } from './utils/navigation'
export type { PositionOffset } from './utils/positioning'

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

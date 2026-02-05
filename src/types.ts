// Component prop types

export type IconName =
    | 'cancel'
    | 'login'
    | 'down-dir'
    | 'up-dir'
    | 'cog'
    | 'logout'
    | 'ok'
    | 'search'
    | 'attention'
    | 'edit'
    | 'trash-empty'
    | 'users'
    | 'globe'
    | 'info-circled'
    | 'attention-circled'
    | 'help-circled'
    | 'cancel-circled2'
    | 'ok-circled2'
    | 'plus'
    | 'pencil'
    | 'link-ext'
    | 'plus-squared'
    | 'minus-squared'
    | 'level-up'
    | 'level-down'
    | 'ok-squared'
    | 'dollar'
    | 'left'
    | 'right'
    | 'apple'
    | 'android'
    | 'dot-circled'
    | 'cubes'
    | 'toggle-off'
    | 'toggle-on'
    | 'diamond'
    | 'user-plus'
    | 'user-times'
    | 'question-circle-o'

export interface UiIconProps {
    name: IconName
    size?: 'small' | 'medium' | 'large'
}

export interface UiButtonProps {
    variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'ghost' | 'ghost-primary' | 'ghost-danger'
    size?: 'small' | 'medium'
    disabled?: boolean
    icon?: IconName
    iconPosition?: 'left' | 'right'
}

export type UiBadgeValue =
    | 'visitor'
    | 'guest'
    | 'guest-editor'
    | 'reviewer'
    | 'editor'
    | 'manager'
    | 'admin'
    | 'owner'
    | 'public'
    | 'private'
    | 'pending'
    | 'declined'
    | 'accepted'

export interface UiBadgeProps {
    value: UiBadgeValue
}

export interface UiModalProps {
    title: string
    confirmText?: string
    cancelText?: string
    confirmVariant?: 'default' | 'primary' | 'secondary' | 'danger'
    confirmDisabled?: boolean
    actionsDisabled?: boolean
    errorText?: string
    warningText?: string
    infoText?: string
    progressText?: string
    leftButtonText?: string
    leftButtonVariant?: 'default' | 'primary' | 'secondary' | 'danger'
    noScrolls?: boolean
}

export interface UiPopoverProps {
    message: string
    type?: 'success' | 'error'
    duration?: number
}

export interface UiInputFieldProps {
    modelValue: string
    type?: 'text' | 'email' | 'password'
    label?: string
    placeholder?: string
    error?: string
    required?: boolean
    disabled?: boolean
    autocomplete?: string
}

export interface UiCheckboxFieldProps {
    modelValue: boolean
    label: string
    error?: string
    disabled?: boolean
}

export interface UiInputSelectOption {
    label: string
    value: string
}

export interface UiInputSelectProps {
    modelValue: string
    label?: string
    placeholder?: string
    error?: string
    required?: boolean
    disabled?: boolean
    options: UiInputSelectOption[]
}

export interface UiUserIconProps {
    name: string
}

export interface UiBreadcrumbItem {
    label: string
    href?: string
}

export interface UiBreadcrumbsProps {
    items: UiBreadcrumbItem[]
}

export interface UiActionsHeaderProps {
    title: string
}

export interface UiCardProps {
    variant?: 'default' | 'elevated' | 'outlined'
    noPadding?: boolean
    row?: boolean
}

export interface UiTextareaProps {
    modelValue: string
    label?: string
    placeholder?: string
    error?: string
    required?: boolean
    disabled?: boolean
    rows?: number
    maxLength?: number
    showCounter?: boolean
}

export interface UiTabItem {
    key: string
    label: string
    disabled?: boolean
}

export interface UiTabsProps {
    items: UiTabItem[]
    modelValue: string
}

export interface UiTooltipProps {
    text: string
    position?: 'top' | 'bottom' | 'left' | 'right'
}

export interface UiLoaderProps {
    size?: 'small' | 'medium' | 'large'
    variant?: 'spinner' | 'dots'
    overlay?: boolean
    label?: string
}

export interface UiPaginationProps {
    modelValue: number
    totalPages: number
    maxVisible?: number
}

export interface UiDropdownMenuItem {
    label: string
    action: string
    variant?: 'default' | 'danger'
    disabled?: boolean
}

export interface UiDropdownMenuProps {
    items: UiDropdownMenuItem[]
    align?: 'left' | 'right'
}

export interface UiAlertProps {
    type?: 'info' | 'success' | 'warning' | 'error'
    message: string
    dismissible?: boolean
}

export interface UiToggleProps {
    modelValue: boolean
    label?: string
    disabled?: boolean
    size?: 'small' | 'medium' | 'large'
}

export interface UiListItemProps {
    hasChildren?: boolean
    selected?: boolean
    active?: boolean
    disabled?: boolean
}

export interface UiListProps {
    maxHeight?: string
}

export interface UiPathItem {
    id: string | number
    label: string
    [key: string]: unknown
}

export interface UiPathListProps {
    items: UiPathItem[]
    selectedId?: string | number
    maxHeight?: string
}

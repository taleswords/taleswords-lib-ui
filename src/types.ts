// Component prop types

export interface UiButtonProps {
    variant?: 'default' | 'primary' | 'secondary' | 'danger'
    size?: 'small' | 'medium'
    disabled?: boolean
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

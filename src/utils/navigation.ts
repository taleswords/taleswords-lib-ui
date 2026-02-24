export type NavigationTag = 'button' | 'a' | 'RouterLink'

export interface NavigationProps {
    to?: string | Record<string, unknown>
    href?: string
}

export function resolveNavigationTag(props: NavigationProps): NavigationTag {
    if (props.to) return 'RouterLink'
    if (props.href) return 'a'
    return 'button'
}

export function resolveNavigationAttrs(props: NavigationProps): Record<string, unknown> {
    if (props.to) return { to: props.to }
    if (props.href) return { href: props.href }
    return { type: 'button' }
}

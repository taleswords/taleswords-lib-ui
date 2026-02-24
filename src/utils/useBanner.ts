import { reactive } from 'vue'

// ── Types ──────────────────────────────────────────

export type BannerVariant = 'info' | 'success' | 'warning' | 'error'

export interface BannerOptions {
    message: string
    variant?: BannerVariant
    isDismissible?: boolean
    hasDontShowAgain?: boolean
}

export interface BannerEntry {
    id: number
    message: string
    variant: BannerVariant
    isDismissible: boolean
    hasDontShowAgain: boolean
}

// ── Singleton state ────────────────────────────────

let nextId = 1

const state = reactive<{ banners: BannerEntry[] }>({
    banners: [],
})

// ── API ────────────────────────────────────────────

function addBanner(options: BannerOptions): number {
    const id = nextId++
    state.banners.push({
        id,
        message: options.message,
        variant: options.variant ?? 'info',
        isDismissible: options.isDismissible ?? true,
        hasDontShowAgain: options.hasDontShowAgain ?? false,
    })
    return id
}

function removeBanner(id: number): void {
    const index = state.banners.findIndex((b) => b.id === id)
    if (index !== -1) state.banners.splice(index, 1)
}

function clearAll(): void {
    state.banners.splice(0, state.banners.length)
    nextId = 1
}

// ── Composable ─────────────────────────────────────

export function useBanner() {
    return {
        banners: state.banners,
        addBanner,
        removeBanner,
        clearAll,
    }
}

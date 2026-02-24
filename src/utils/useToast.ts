import { reactive } from 'vue'

// ── Types ──────────────────────────────────────────

export type ToastVariant = 'info' | 'success' | 'warning' | 'error'

export interface ToastOptions {
    message: string
    variant?: ToastVariant
    duration?: number
    isPersistent?: boolean
    isDismissible?: boolean
}

export interface ToastEntry {
    id: number
    message: string
    variant: ToastVariant
    isDismissible: boolean
}

// ── Singleton state ────────────────────────────────

let nextId = 1

const state = reactive<{ toasts: ToastEntry[] }>({
    toasts: [],
})

const timers = new Map<number, ReturnType<typeof setTimeout>>()
const startTimes = new Map<number, number>()
const durations = new Map<number, number>()

// ── API ────────────────────────────────────────────

function addToast(options: ToastOptions): number {
    const id = nextId++
    const variant = options.variant ?? 'info'
    const duration = options.duration ?? 5000
    const isDismissible = options.isDismissible ?? true

    state.toasts.push({ id, message: options.message, variant, isDismissible })

    if (!options.isPersistent && duration > 0) {
        startTimes.set(id, Date.now())
        durations.set(id, duration)

        const timer = setTimeout(() => {
            removeToast(id)
        }, duration)
        timers.set(id, timer)
    }

    return id
}

function removeToast(id: number): void {
    const timer = timers.get(id)
    if (timer) {
        clearTimeout(timer)
        timers.delete(id)
    }
    startTimes.delete(id)
    durations.delete(id)
    const index = state.toasts.findIndex((t) => t.id === id)
    if (index !== -1) state.toasts.splice(index, 1)
}

function pauseTimer(id: number): void {
    const timer = timers.get(id)
    if (!timer) return

    clearTimeout(timer)
    timers.delete(id)

    const start = startTimes.get(id)
    const total = durations.get(id)
    if (start != null && total != null) {
        const elapsed = Date.now() - start
        const remaining = Math.max(total - elapsed, 0)
        durations.set(id, remaining)
    }
}

function resumeTimer(id: number): void {
    // Only resume if this toast has a remaining duration and no active timer
    const remaining = durations.get(id)
    if (remaining == null || timers.has(id)) return

    startTimes.set(id, Date.now())

    const timer = setTimeout(() => {
        removeToast(id)
    }, remaining)
    timers.set(id, timer)
}

function clearAll(): void {
    for (const timer of timers.values()) {
        clearTimeout(timer)
    }
    timers.clear()
    startTimes.clear()
    durations.clear()
    state.toasts.splice(0, state.toasts.length)
    nextId = 1
}

// ── Composable ─────────────────────────────────────

export function useToast() {
    return {
        toasts: state.toasts,
        addToast,
        removeToast,
        pauseTimer,
        resumeTimer,
        clearAll,
    }
}

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from '../axeHelper'
import ToastArea from '../../notifications/toasts/Area.vue'
import { useToast } from '../../utils/useToast'

beforeEach(() => {
    useToast().clearAll()
})

describe('ToastArea', () => {
    it('renders data-testid', () => {
        const wrapper = mount(ToastArea, {
            props: {},
            global: { stubs: { Teleport: true } },
        })
        expect(wrapper.find('[data-testid="toast-area"]').exists()).toBe(true)
    })

    it('has aria-live polite', () => {
        const wrapper = mount(ToastArea, {
            global: { stubs: { Teleport: true } },
        })
        expect(wrapper.find('[aria-live="polite"]').exists()).toBe(true)
    })

    it('renders no toasts initially', () => {
        const wrapper = mount(ToastArea, {
            global: { stubs: { Teleport: true } },
        })
        expect(wrapper.findAll('[data-testid="toast-base"]')).toHaveLength(0)
    })

    it('renders toasts from useToast state', async () => {
        const { addToast } = useToast()
        addToast({ message: 'Toast 1', isPersistent: true })
        addToast({ message: 'Toast 2', isPersistent: true })

        const wrapper = mount(ToastArea, {
            global: { stubs: { Teleport: true, TransitionGroup: false } },
        })

        expect(wrapper.findAll('[data-testid="toast-base"]')).toHaveLength(2)
    })

    it('removes toast via composable', async () => {
        const { addToast, removeToast, toasts } = useToast()
        const id = addToast({ message: 'Dismissable', isPersistent: true })

        expect(toasts).toHaveLength(1)
        removeToast(id)
        expect(toasts).toHaveLength(0)
    })

    it('renders dismiss button on toast', () => {
        const { addToast } = useToast()
        addToast({ message: 'Dismissable', isPersistent: true })

        const wrapper = mount(ToastArea, {
            global: { stubs: { Teleport: true, TransitionGroup: false } },
        })

        expect(wrapper.find('.toast__dismiss').exists()).toBe(true)
    })

    it('has no accessibility violations', async () => {
        const { addToast } = useToast()
        addToast({ message: 'A11y test', isPersistent: true })

        const wrapper = mount(ToastArea, {
            global: { stubs: { Teleport: true, TransitionGroup: false } },
        })
        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
    })
})

describe('useToast pause/resume', () => {
    beforeEach(() => {
        vi.useFakeTimers()
        useToast().clearAll()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('pauseTimer prevents auto-dismiss', () => {
        const { addToast, pauseTimer, toasts } = useToast()
        const id = addToast({ message: 'Pause test', duration: 1000 })

        vi.advanceTimersByTime(500)
        pauseTimer(id)

        // Advance well past original duration
        vi.advanceTimersByTime(2000)
        expect(toasts).toHaveLength(1)
    })

    it('resumeTimer dismisses after remaining time', () => {
        const { addToast, pauseTimer, resumeTimer, toasts } = useToast()
        const id = addToast({ message: 'Resume test', duration: 1000 })

        vi.advanceTimersByTime(600)
        pauseTimer(id)

        // Remaining should be ~400ms
        resumeTimer(id)

        // Not yet dismissed at 300ms after resume
        vi.advanceTimersByTime(300)
        expect(toasts).toHaveLength(1)

        // Dismissed at 400ms+ after resume
        vi.advanceTimersByTime(200)
        expect(toasts).toHaveLength(0)
    })

    it('pauseTimer is no-op for persistent toasts', () => {
        const { addToast, pauseTimer, toasts } = useToast()
        const id = addToast({ message: 'Persistent', isPersistent: true })

        // Should not throw
        pauseTimer(id)
        vi.advanceTimersByTime(10000)
        expect(toasts).toHaveLength(1)
    })

    it('resumeTimer is no-op if not paused', () => {
        const { addToast, resumeTimer, toasts } = useToast()
        const id = addToast({ message: 'No-op resume', duration: 1000 })

        // Call resume without pause — should not create duplicate timer
        resumeTimer(id)
        vi.advanceTimersByTime(1100)
        expect(toasts).toHaveLength(0)
    })

    it('clearAll cleans up pause state', () => {
        const { addToast, pauseTimer, clearAll, toasts } = useToast()
        const id = addToast({ message: 'Clear test', duration: 1000 })

        vi.advanceTimersByTime(500)
        pauseTimer(id)
        clearAll()

        expect(toasts).toHaveLength(0)
    })
})

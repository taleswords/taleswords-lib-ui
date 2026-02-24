import { describe, it, expect, beforeEach } from 'vitest'
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

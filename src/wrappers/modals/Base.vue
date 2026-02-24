<script setup lang="ts">
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'
import ModalHeader from './components/Header.vue'
import ModalBody from './components/Body.vue'
import ModalFooter from './components/Footer.vue'

// ── Types ──────────────────────────────────────────

export interface ModalBaseProps {
    modelValue: boolean
    size?: 'small' | 'medium' | 'large' | 'full'
    title?: string
    hasCloseButton?: boolean
    closeOnOverlay?: boolean
    closeOnEscape?: boolean
    beforeClose?: () => boolean | Promise<boolean>
    testId?: string
}

// ── Slots ──────────────────────────────────────────

defineSlots<{
    header?: (slotProps: { title: string; close: () => void }) => unknown
    default?: () => unknown
    footer?: (slotProps: { close: () => void }) => unknown
}>()

// ── Props / Emits ──────────────────────────────────

const props = withDefaults(defineProps<ModalBaseProps>(), {
    size: 'medium',
    hasCloseButton: true,
    closeOnOverlay: true,
    closeOnEscape: true,
    testId: 'modal-base',
})

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
    open: []
    close: []
}>()

// ── Refs ───────────────────────────────────────────

const modalRef = ref<HTMLElement | null>(null)
let previouslyFocusedElement: HTMLElement | null = null

// ── Scroll lock (reference-counted) ────────────────

let scrollLockCount = 0

function lockScroll(): void {
    scrollLockCount++
    if (scrollLockCount === 1) {
        document.body.classList.add('modal-open')
    }
}

function unlockScroll(): void {
    scrollLockCount--
    if (scrollLockCount <= 0) {
        scrollLockCount = 0
        document.body.classList.remove('modal-open')
    }
}

// ── Computed class ─────────────────────────────────

function getSizeClass(): string {
    return `modal--${props.size}`
}

// ── Close logic ────────────────────────────────────

async function requestClose(): Promise<void> {
    if (props.beforeClose) {
        const result = await props.beforeClose()
        if (result === false) return
    }
    emit('update:modelValue', false)
}

function handleOverlayClick(): void {
    if (props.closeOnOverlay) {
        requestClose()
    }
}

function handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && props.closeOnEscape) {
        event.stopPropagation()
        requestClose()
    }
}

// ── Watch modelValue ───────────────────────────────

watch(
    () => props.modelValue,
    (isOpen) => {
        if (isOpen) {
            previouslyFocusedElement = document.activeElement instanceof HTMLElement
                ? document.activeElement
                : null
            lockScroll()
            emit('open')
            nextTick(() => {
                modalRef.value?.focus()
            })
        } else {
            unlockScroll()
            emit('close')
            if (previouslyFocusedElement) {
                nextTick(() => {
                    previouslyFocusedElement?.focus()
                    previouslyFocusedElement = null
                })
            }
        }
    },
)

// ── Cleanup on unmount ─────────────────────────────

onBeforeUnmount(() => {
    if (props.modelValue) {
        unlockScroll()
    }
})

// ── Expose ─────────────────────────────────────────

defineExpose({ close: requestClose })
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div
                v-if="modelValue"
                class="modal-overlay"
                @click.self="handleOverlayClick"
                @keydown="handleKeydown"
            >
                <div
                    class="modal"
                    :class="getSizeClass()"
                    ref="modalRef"
                    tabindex="-1"
                    role="dialog"
                    aria-modal="true"
                    :aria-label="title"
                    :data-testid="testId"
                >
                    <slot name="header" :title="title ?? ''" :close="requestClose">
                        <ModalHeader
                            v-if="title"
                            :title="title"
                            :has-close-button="hasCloseButton"
                            @close="requestClose"
                        />
                    </slot>

                    <ModalBody>
                        <slot />
                    </ModalBody>

                    <slot name="footer" :close="requestClose">
                        <ModalFooter />
                    </slot>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--modal-overlay-bg);
}

.modal {
    background: var(--general-card-bg);
    border-radius: var(--button-border-radius);
    box-shadow: var(--modal-shadow);
    display: flex;
    flex-direction: column;
    max-height: 90vh;
    outline: none;
}

.modal--small {
    width: 400px;
    max-width: 90vw;
}

.modal--medium {
    width: 600px;
    max-width: 90vw;
}

.modal--large {
    width: 800px;
    max-width: 90vw;
}

.modal--full {
    width: 95vw;
    height: 95vh;
}

/* Transition */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(0.95);
}
</style>

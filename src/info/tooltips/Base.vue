<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { uid } from '../../utils/uid'
import { calculateFloatingPosition, type PlacementWithAlign, type Placement } from '../../utils/floatingPosition'

// ── Types ──────────────────────────────────────────

export interface TooltipBaseProps {
    content?: string
    placement?: PlacementWithAlign
    offset?: number
    openDelayMs?: number
    closeDelayMs?: number
    maxWidth?: string
    isDisabled?: boolean
    hasArrow?: boolean
    closeOnPointerDown?: boolean
    testId?: string
}

// ── Props ──────────────────────────────────────────

const props = withDefaults(defineProps<TooltipBaseProps>(), {
    content: '',
    placement: 'top',
    offset: 10,
    openDelayMs: 150,
    closeDelayMs: 100,
    maxWidth: '240px',
    isDisabled: false,
    hasArrow: true,
    closeOnPointerDown: false,
    testId: 'tooltip',
})

defineSlots<{
    default?: () => unknown
    content?: () => unknown
}>()

// ── State ──────────────────────────────────────────

const tooltipId = uid('tooltip')
const triggerRef = ref<HTMLElement | null>(null)
const tooltipRef = ref<HTMLElement | null>(null)

const isOpen = ref(false)
const isMounted = ref(false)
const resolvedPlacement = ref<Placement>(props.placement.split('-')[0] as Placement)
const floatingStyle = ref({ top: '0px', left: '0px' })
const arrowStyle = ref({ left: '0px', top: '0px' })

const ARROW_SIZE = 8

let openTimer: ReturnType<typeof setTimeout> | null = null
let closeTimer: ReturnType<typeof setTimeout> | null = null
let touchTimeout: ReturnType<typeof setTimeout> | null = null

// ── Computed ───────────────────────────────────────

const hasContent = computed(() => !!props.content)

// ── Positioning ────────────────────────────────────

function updatePosition(): void {
    if (!triggerRef.value || !tooltipRef.value) return
    const triggerRect = triggerRef.value.getBoundingClientRect()
    const tooltipRect = tooltipRef.value.getBoundingClientRect()
    const viewport = { width: window.innerWidth, height: window.innerHeight }

    const result = calculateFloatingPosition(triggerRect, tooltipRect, viewport, {
        placement: props.placement,
        offset: props.offset,
        collisionPadding: 8,
        flip: true,
        shift: true,
        arrowSize: props.hasArrow ? ARROW_SIZE : undefined,
    })

    floatingStyle.value = { top: `${result.y}px`, left: `${result.x}px` }
    resolvedPlacement.value = result.placement.split('-')[0] as Placement

    if (result.arrow) {
        arrowStyle.value = { left: `${result.arrow.x}px`, top: `${result.arrow.y}px` }
    }
}

// ── Open / Close ───────────────────────────────────

function scheduleOpen(): void {
    if (props.isDisabled) return
    cancelClose()
    if (isOpen.value) return
    openTimer = setTimeout(() => {
        isOpen.value = true
    }, props.openDelayMs)
}

function scheduleClose(): void {
    cancelOpen()
    if (!isOpen.value) return
    closeTimer = setTimeout(() => {
        isOpen.value = false
    }, props.closeDelayMs)
}

function closeImmediate(): void {
    cancelOpen()
    cancelClose()
    isOpen.value = false
}

function cancelOpen(): void {
    if (openTimer !== null) { clearTimeout(openTimer); openTimer = null }
}

function cancelClose(): void {
    if (closeTimer !== null) { clearTimeout(closeTimer); closeTimer = null }
}

// ── Event handlers ─────────────────────────────────

function onPointerEnter(e: PointerEvent): void {
    if (e.pointerType === 'touch') return
    scheduleOpen()
}

function onPointerLeave(e: PointerEvent): void {
    if (e.pointerType === 'touch') return
    scheduleClose()
}

function onFocusIn(): void {
    scheduleOpen()
}

function onFocusOut(): void {
    scheduleClose()
}

function onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape' && isOpen.value) {
        closeImmediate()
    }
}

function onTouchStart(): void {
    if (props.isDisabled) return
    if (isOpen.value) {
        closeImmediate()
        return
    }
    cancelOpen()
    cancelClose()
    isOpen.value = true
    // Auto-close after timeout
    touchTimeout = setTimeout(() => {
        isOpen.value = false
    }, 1500)
}

function onDocumentPointerDown(e: PointerEvent): void {
    if (!isOpen.value) return
    const isTouch = e.pointerType === 'touch'
    if (!isTouch && !props.closeOnPointerDown) return
    const target = e.target as Node
    if (triggerRef.value?.contains(target)) return
    if (tooltipRef.value?.contains(target)) return
    closeImmediate()
    if (isTouch && touchTimeout !== null) { clearTimeout(touchTimeout); touchTimeout = null }
}

// ── Lifecycle ──────────────────────────────────────

watch(isOpen, (val) => {
    if (val) {
        isMounted.value = true
        nextTick(() => {
            requestAnimationFrame(() => {
                updatePosition()
            })
        })
    } else {
        // Leave isMounted true briefly for exit animation
        // CSS transition handles fade; afterLeave unmounts
    }
})

function onAfterLeave(): void {
    isMounted.value = false
}

onMounted(() => {
    window.addEventListener('scroll', onScrollResize, true)
    window.addEventListener('resize', onScrollResize)
    document.addEventListener('pointerdown', onDocumentPointerDown)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScrollResize, true)
    window.removeEventListener('resize', onScrollResize)
    document.removeEventListener('pointerdown', onDocumentPointerDown)
    cancelOpen()
    cancelClose()
    if (touchTimeout !== null) clearTimeout(touchTimeout)
})

function onScrollResize(): void {
    if (isOpen.value) updatePosition()
}
</script>

<template>
    <span
        ref="triggerRef"
        class="tooltip-trigger"
        :aria-describedby="isOpen ? tooltipId : undefined"
        @pointerenter="onPointerEnter"
        @pointerleave="onPointerLeave"
        @focusin="onFocusIn"
        @focusout="onFocusOut"
        @keydown="onKeydown"
        @touchstart.passive="onTouchStart"
    >
        <slot />
    </span>

    <Teleport to="body">
        <Transition
            name="tooltip-fade"
            @after-leave="onAfterLeave"
        >
            <div
                v-if="isMounted && (hasContent || $slots.content)"
                v-show="isOpen"
                :id="tooltipId"
                ref="tooltipRef"
                role="tooltip"
                class="tooltip"
                :class="[`tooltip--${resolvedPlacement}`]"
                :style="{ ...floatingStyle, maxWidth: props.maxWidth }"
                :data-testid="props.testId"
            >
                <div class="tooltip__content">
                    <slot name="content">{{ props.content }}</slot>
                </div>
                <div
                    v-if="props.hasArrow"
                    class="tooltip__arrow"
                    :style="arrowStyle"
                />
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.tooltip-trigger {
    display: inline-flex;
}

.tooltip {
    position: fixed;
    z-index: 9999;
    pointer-events: none;
    box-sizing: border-box;
}

.tooltip__content {
    background: var(--tooltip-bg);
    color: var(--tooltip-text);
    box-shadow: var(--tooltip-shadow);
    border-radius: 6px;
    padding: calc(0.375rem * var(--density-scale)) calc(0.625rem * var(--density-scale));
    font-size: 0.8125rem;
    line-height: 1.4;
    word-wrap: break-word;
}

.tooltip__arrow {
    position: absolute;
    width: 8px;
    height: 8px;
    background: var(--tooltip-bg);
    transform: rotate(45deg);
}

/* Arrow positioning per side */
.tooltip--top .tooltip__arrow {
    bottom: -4px;
}

.tooltip--bottom .tooltip__arrow {
    top: -4px;
}

.tooltip--left .tooltip__arrow {
    right: -4px;
}

.tooltip--right .tooltip__arrow {
    left: -4px;
}

/* ── Transition ──────────────────────────────── */
.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
    transition: opacity 0.15s ease, transform 0.15s ease;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
    opacity: 0;
}

.tooltip--top.tooltip-fade-enter-from,
.tooltip--top.tooltip-fade-leave-to {
    transform: translateY(4px);
}

.tooltip--bottom.tooltip-fade-enter-from,
.tooltip--bottom.tooltip-fade-leave-to {
    transform: translateY(-4px);
}

.tooltip--left.tooltip-fade-enter-from,
.tooltip--left.tooltip-fade-leave-to {
    transform: translateX(4px);
}

.tooltip--right.tooltip-fade-enter-from,
.tooltip--right.tooltip-fade-leave-to {
    transform: translateX(-4px);
}
</style>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { AccordionKey } from '../context'
import type { AccordionContext } from '../context'
import { uid } from '../../../utils/uid'

// ── Types ──────────────────────────────────────────

export interface AccordionItemProps {
    id: string
    title: string
    isDisabled?: boolean
}

// ── Slots ──────────────────────────────────────────

defineSlots<{
    default?: () => unknown
}>()

// ── Props ──────────────────────────────────────────

const props = withDefaults(defineProps<AccordionItemProps>(), {
    isDisabled: false,
})

// ── Inject ─────────────────────────────────────────

const accordion = inject<AccordionContext>(AccordionKey)
accordion?.register(props.id)

// ── IDs ────────────────────────────────────────────

const triggerId = uid('accordion-trigger')
const panelId = uid('accordion-panel')

// ── Computed ───────────────────────────────────────

const isExpanded = computed(() => accordion?.expandedIds.value.has(props.id) ?? false)

// ── Content height transition ──────────────────────

function handleToggle(): void {
    if (props.isDisabled || !accordion) return
    accordion.toggle(props.id)
}

function onBeforeEnter(el: Element): void {
    const htmlEl = el as HTMLElement
    htmlEl.style.height = '0'
}

function onEnter(el: Element): void {
    const htmlEl = el as HTMLElement
    htmlEl.style.height = `${htmlEl.scrollHeight}px`
}

function onAfterEnter(el: Element): void {
    const htmlEl = el as HTMLElement
    htmlEl.style.height = ''
}

function onBeforeLeave(el: Element): void {
    const htmlEl = el as HTMLElement
    htmlEl.style.height = `${htmlEl.scrollHeight}px`
}

function onLeave(el: Element): void {
    const htmlEl = el as HTMLElement
    // force reflow
    void htmlEl.offsetHeight
    htmlEl.style.height = '0'
}

function onAfterLeave(el: Element): void {
    const htmlEl = el as HTMLElement
    htmlEl.style.height = ''
}
</script>

<template>
    <div
        class="accordion-item"
        :class="{ 'accordion-item--disabled': isDisabled }"
    >
        <h3 class="accordion-item__heading">
            <button
                :id="triggerId"
                class="accordion-item__trigger"
                type="button"
                :aria-expanded="isExpanded"
                :aria-controls="panelId"
                :disabled="isDisabled"
                @click="handleToggle"
            >
                <span class="accordion-item__title">{{ title }}</span>
                <span
                    class="material-symbols-rounded accordion-item__icon"
                    :class="{ 'accordion-item__icon--expanded': isExpanded }"
                    aria-hidden="true"
                >expand_more</span>
            </button>
        </h3>

        <Transition
            name="accordion"
            @before-enter="onBeforeEnter"
            @enter="onEnter"
            @after-enter="onAfterEnter"
            @before-leave="onBeforeLeave"
            @leave="onLeave"
            @after-leave="onAfterLeave"
        >
            <div
                v-show="isExpanded"
                :id="panelId"
                ref="contentRef"
                role="region"
                :aria-labelledby="triggerId"
                class="accordion-item__panel"
            >
                <div class="accordion-item__content">
                    <slot />
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.accordion-item + .accordion-item {
    border-top: 1px solid var(--accordion-border);
}

.accordion-item__heading {
    margin: 0;
    font-size: inherit;
}

.accordion-item__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--space-md) var(--space-lg);
    font-family: var(--accordion-font);
    font-size: var(--accordion-size);
    font-weight: var(--accordion-weight);
    color: var(--general-text-color);
    background: var(--general-card-bg);
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background-color 0.2s;
}

.accordion-item__trigger:hover:not(:disabled) {
    background-color: var(--accordion-trigger-hover-bg);
}

.accordion-item__trigger:focus-visible {
    outline: 2px solid var(--general-focus-ring);
    outline-offset: -2px;
}

.accordion-item--disabled .accordion-item__trigger {
    color: var(--accordion-trigger-color-disabled);
    cursor: not-allowed;
}

.accordion-item__icon {
    display: flex;
    transition: transform 0.25s ease;
    flex-shrink: 0;
    font-size: 1.25em;
}

.accordion-item__icon--expanded {
    transform: rotate(180deg);
}

.accordion-item__panel {
    overflow: hidden;
    transition: height 0.25s ease;
}

.accordion-item__content {
    padding: 0 var(--space-lg) var(--space-md);
}
</style>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { uid } from '../../utils/uid'

// ── Types ──────────────────────────────────────────

export interface TabItem {
    id: string
    label: string
    icon?: string
    isDisabled?: boolean
}

export interface TabsBaseProps {
    modelValue: string
    tabs: TabItem[]
    testId?: string
}

// ── Slots ──────────────────────────────────────────

defineSlots<{
    default?: (slotProps: { activeTab: string }) => unknown
}>()

// ── Props / Emits ──────────────────────────────────

const props = withDefaults(defineProps<TabsBaseProps>(), {
    testId: 'tabs-base',
})

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

// ── IDs ────────────────────────────────────────────

const baseId = uid('tabs')

function tabId(id: string): string {
    return `${baseId}-tab-${id}`
}

function panelId(id: string): string {
    return `${baseId}-panel-${id}`
}

// ── Indicator ──────────────────────────────────────

const tabListRef = ref<HTMLElement | null>(null)
const indicatorStyle = ref<Record<string, string>>({})

function updateIndicator(): void {
    if (!tabListRef.value) return
    const activeBtn = tabListRef.value.querySelector<HTMLElement>(
        `[data-tab-id="${props.modelValue}"]`,
    )
    if (activeBtn) {
        indicatorStyle.value = {
            transform: `translateX(${activeBtn.offsetLeft}px)`,
            width: `${activeBtn.offsetWidth}px`,
        }
    }
}

// ── Overflow: the row scrolls and shows it ─────────

const hasStart = ref(false)
const hasEnd = ref(false)

function updateEdges(): void {
    const list = tabListRef.value
    if (!list) return
    hasStart.value = list.scrollLeft > 1
    hasEnd.value = list.scrollLeft + list.clientWidth < list.scrollWidth - 1
}

function activeTabElement(): HTMLElement | null {
    return tabListRef.value?.querySelector<HTMLElement>(
        `[data-tab-id="${props.modelValue}"]`,
    ) ?? null
}

function revealActiveTab(): void {
    const activeBtn = activeTabElement()
    if (activeBtn && typeof activeBtn.scrollIntoView === 'function') {
        activeBtn.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    }
}

function prefersReducedMotion(): boolean {
    return typeof window.matchMedia === 'function'
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function scrollRow(direction: -1 | 1): void {
    const list = tabListRef.value
    if (!list || typeof list.scrollBy !== 'function') return
    list.scrollBy({
        left: direction * list.clientWidth * 0.8,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
}

function refresh(): void {
    updateIndicator()
    updateEdges()
}

let resizeObserver: InstanceType<typeof window.ResizeObserver> | null = null

onMounted(() => {
    nextTick(() => {
        revealActiveTab()
        refresh()
    })
    if (tabListRef.value && typeof window.ResizeObserver === 'function') {
        resizeObserver = new window.ResizeObserver(refresh)
        resizeObserver.observe(tabListRef.value)
    }
})

onBeforeUnmount(() => {
    resizeObserver?.disconnect()
    resizeObserver = null
})

watch(() => props.modelValue, () => {
    nextTick(() => {
        revealActiveTab()
        refresh()
    })
})

watch(() => props.tabs, () => {
    nextTick(refresh)
}, { deep: true })

// ── Keyboard ───────────────────────────────────────

const enabledTabs = computed(() => props.tabs.filter((t) => !t.isDisabled))

function handleKeydown(event: KeyboardEvent): void {
    const currentIndex = enabledTabs.value.findIndex((t) => t.id === props.modelValue)
    let nextIndex = -1

    switch (event.key) {
        case 'ArrowRight':
            event.preventDefault()
            nextIndex = (currentIndex + 1) % enabledTabs.value.length
            break
        case 'ArrowLeft':
            event.preventDefault()
            nextIndex = (currentIndex - 1 + enabledTabs.value.length) % enabledTabs.value.length
            break
        case 'Home':
            event.preventDefault()
            nextIndex = 0
            break
        case 'End':
            event.preventDefault()
            nextIndex = enabledTabs.value.length - 1
            break
        default:
            return
    }

    if (nextIndex >= 0) {
        const nextTab = enabledTabs.value[nextIndex]
        emit('update:modelValue', nextTab.id)
        nextTick(() => {
            tabListRef.value
                ?.querySelector<HTMLElement>(`[data-tab-id="${nextTab.id}"]`)
                ?.focus()
        })
    }
}

function selectTab(tab: TabItem): void {
    if (!tab.isDisabled) {
        emit('update:modelValue', tab.id)
    }
}
</script>

<template>
    <div class="tabs-base" :data-testid="testId">
        <div class="tabs-base__list-wrap">
        <div
            ref="tabListRef"
            class="tabs-base__list"
            role="tablist"
            @keydown="handleKeydown"
            @scroll.passive="updateEdges"
        >
            <button
                v-for="tab in tabs"
                :key="tab.id"
                :id="tabId(tab.id)"
                :data-tab-id="tab.id"
                role="tab"
                :aria-selected="tab.id === modelValue"
                :aria-controls="panelId(tab.id)"
                :tabindex="tab.id === modelValue ? 0 : -1"
                :disabled="tab.isDisabled"
                class="tabs-base__tab"
                :class="{
                    'tabs-base__tab--active': tab.id === modelValue,
                    'tabs-base__tab--disabled': tab.isDisabled,
                }"
                @click="selectTab(tab)"
            >
                <span v-if="tab.icon" class="material-symbols-rounded tabs-base__icon" aria-hidden="true">{{ tab.icon }}</span>
                {{ tab.label }}
            </button>
            <span class="tabs-base__indicator" :style="indicatorStyle" />
        </div>
            <button
                v-if="hasStart"
                type="button"
                class="tabs-base__edge tabs-base__edge--start"
                tabindex="-1"
                aria-hidden="true"
                data-testid="tabs-edge-start"
                @click="scrollRow(-1)"
            >
                <span class="material-symbols-rounded tabs-base__edge-icon">chevron_left</span>
            </button>
            <button
                v-if="hasEnd"
                type="button"
                class="tabs-base__edge tabs-base__edge--end"
                tabindex="-1"
                aria-hidden="true"
                data-testid="tabs-edge-end"
                @click="scrollRow(1)"
            >
                <span class="material-symbols-rounded tabs-base__edge-icon">chevron_right</span>
            </button>
        </div>

        <div
            :id="panelId(modelValue)"
            class="tabs-base__panel"
            role="tabpanel"
            :aria-labelledby="tabId(modelValue)"
            tabindex="0"
        >
            <slot :active-tab="modelValue" />
        </div>
    </div>
</template>

<style scoped>
/* The row's 2px rule is drawn by the wrap, and the list keeps the same 2px as
   padding: the indicator, a child of the scrolling list, lies over the rule
   and is never clipped by the scroll container. */
.tabs-base__list-wrap {
    position: relative;
    box-shadow: inset 0 -2px 0 var(--tabs-border-color);
}

.tabs-base__list {
    display: flex;
    position: relative;
    padding-bottom: 2px;
    gap: 0;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
}

.tabs-base__list::-webkit-scrollbar {
    display: none;
}

.tabs-base__edge {
    position: absolute;
    top: 0;
    bottom: 2px;
    width: 2.5rem;
    padding: 0;
    display: flex;
    align-items: center;
    border: none;
    color: var(--tabs-edge-icon-color);
    cursor: pointer;
}

.tabs-base__edge--start {
    left: 0;
    justify-content: flex-start;
    background: linear-gradient(to right, var(--tabs-edge-fade) 40%, transparent);
}

.tabs-base__edge--end {
    right: 0;
    justify-content: flex-end;
    background: linear-gradient(to left, var(--tabs-edge-fade) 40%, transparent);
}

.tabs-base__edge:hover {
    color: var(--tabs-tab-hover-color);
}

.tabs-base__edge-icon {
    font-size: 1.25rem;
}

.tabs-base__tab {
    position: relative;
    padding: calc(0.625rem * var(--density-scale)) var(--space-lg);
    font-family: var(--tab-font);
    font-size: var(--tab-size);
    font-weight: var(--tab-weight);
    color: var(--tabs-tab-color);
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s;
    white-space: nowrap;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: calc(0.375rem * var(--density-scale));
}

.tabs-base__tab:focus-visible {
    outline: 2px solid var(--general-focus-ring);
    outline-offset: -2px;
    border-radius: var(--radius-xs);
}

.tabs-base__tab:hover:not(:disabled) {
    color: var(--tabs-tab-hover-color);
}

.tabs-base__tab--active {
    color: var(--tabs-tab-active-color);
    font-weight: var(--tab-weight-active);
}

.tabs-base__tab--disabled {
    color: var(--tabs-tab-disabled-color);
    cursor: not-allowed;
}

.tabs-base__icon {
    font-size: 1.25em;
}

.tabs-base__indicator {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: var(--tabs-tab-active-border);
    transition: transform 0.25s ease, width 0.25s ease;
}

.tabs-base__panel {
    padding-top: var(--space-lg);
    outline: none;
}

.tabs-base__panel:focus-visible {
    outline: 2px solid var(--general-focus-ring);
    outline-offset: 2px;
    border-radius: var(--radius-xs);
}
</style>

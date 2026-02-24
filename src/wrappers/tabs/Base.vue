<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
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

onMounted(() => {
    nextTick(updateIndicator)
})

watch(() => props.modelValue, () => {
    nextTick(updateIndicator)
})

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
        <div
            ref="tabListRef"
            class="tabs-base__list"
            role="tablist"
            @keydown="handleKeydown"
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
.tabs-base__list {
    display: flex;
    position: relative;
    border-bottom: 2px solid var(--tabs-border-color);
    gap: 0;
}

.tabs-base__tab {
    position: relative;
    padding: 0.625rem 1rem;
    font-family: var(--tab-font);
    font-size: var(--tab-size);
    font-weight: var(--tab-weight);
    color: var(--tabs-tab-color);
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 0.375rem;
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
    bottom: -2px;
    left: 0;
    height: 2px;
    background-color: var(--tabs-tab-active-border);
    transition: transform 0.25s ease, width 0.25s ease;
}

.tabs-base__panel {
    padding-top: 1rem;
    outline: none;
}

.tabs-base__panel:focus-visible {
    outline: 2px solid var(--general-focus-ring);
    outline-offset: 2px;
    border-radius: 2px;
}
</style>

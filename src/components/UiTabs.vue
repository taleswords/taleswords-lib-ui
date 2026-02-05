<script setup lang="ts">
import { ref, computed } from 'vue'
import type { UiTabsProps } from '../types'

const props = defineProps<UiTabsProps>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const tablistRef = ref<HTMLElement | null>(null)

const activeIndex = computed(() =>
    props.items.findIndex(item => item.key === props.modelValue)
)

function selectTab(key: string) {
    emit('update:modelValue', key)
}

function getEnabledIndices(): number[] {
    return props.items
        .map((item, i) => ({ i, disabled: item.disabled }))
        .filter(x => !x.disabled)
        .map(x => x.i)
}

function focusTab(index: number) {
    const tabs = tablistRef.value?.querySelectorAll<HTMLElement>('[role="tab"]')
    tabs?.[index]?.focus()
}

function handleKeydown(e: KeyboardEvent) {
    const enabled = getEnabledIndices()
    if (enabled.length === 0) return

    const currentIdx = enabled.indexOf(activeIndex.value)
    let nextIdx: number | undefined

    switch (e.key) {
        case 'ArrowRight': {
            e.preventDefault()
            const pos = currentIdx === -1 ? 0 : (currentIdx + 1) % enabled.length
            nextIdx = enabled[pos]
            break
        }
        case 'ArrowLeft': {
            e.preventDefault()
            const pos = currentIdx === -1 ? enabled.length - 1 : (currentIdx - 1 + enabled.length) % enabled.length
            nextIdx = enabled[pos]
            break
        }
        case 'Home':
            e.preventDefault()
            nextIdx = enabled[0]
            break
        case 'End':
            e.preventDefault()
            nextIdx = enabled[enabled.length - 1]
            break
    }

    if (nextIdx != null) {
        selectTab(props.items[nextIdx].key)
        focusTab(nextIdx)
    }
}
</script>

<template>
    <div class="ui-tabs">
        <div
            ref="tablistRef"
            role="tablist"
            class="ui-tabs__list"
            @keydown="handleKeydown"
        >
            <button
                v-for="item in props.items"
                :key="item.key"
                role="tab"
                :id="`tab-${item.key}`"
                :aria-selected="props.modelValue === item.key"
                :aria-controls="`tabpanel-${item.key}`"
                :tabindex="props.modelValue === item.key ? 0 : -1"
                :disabled="item.disabled"
                class="ui-tabs__tab"
                :class="{
                    'ui-tabs__tab--active': props.modelValue === item.key,
                    'ui-tabs__tab--disabled': item.disabled,
                }"
                @click="!item.disabled && selectTab(item.key)"
            >{{ item.label }}</button>
        </div>
        <div
            :id="`tabpanel-${props.modelValue}`"
            role="tabpanel"
            :aria-labelledby="`tab-${props.modelValue}`"
            class="ui-tabs__panel"
        >
            <slot />
        </div>
    </div>
</template>

<style scoped>
.ui-tabs__list {
    display: flex;
    border-bottom: 2px solid var(--ui-tabs-border-color);
    gap: 0;
}

.ui-tabs__tab {
    padding: 0.75em 1.25em;
    border: none;
    border-bottom: 2px solid transparent;
    border-radius: 0;
    margin-bottom: -2px;
    background: none;
    font-family: "Raleway", system-ui, sans-serif;
    font-weight: 500;
    font-size: 1em;
    color: var(--ui-tabs-tab-color, #4A5568);
    cursor: pointer;
    transition: color 0.3s, border-color 0.3s;
    min-width: auto;
}

.ui-tabs__tab:hover:not(:disabled) {
    color: var(--ui-tabs-tab-hover-color);
}

.ui-tabs__tab--active {
    color: var(--ui-tabs-tab-active-color);
    border-bottom-color: var(--ui-tabs-tab-active-border-color);
}

.ui-tabs__tab--disabled {
    color: var(--ui-tabs-tab-disabled-color);
    cursor: not-allowed;
}

.ui-tabs__tab:focus-visible {
    outline: 2px solid var(--ui-input-focus-border-color);
    outline-offset: -2px;
}

.ui-tabs__panel {
    padding: 1em 0;
}
</style>

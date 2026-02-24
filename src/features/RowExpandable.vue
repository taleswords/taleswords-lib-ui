<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

// ── Types ──────────────────────────────────────────

export interface RowExpandableProps {
    expanded?: boolean
    testId?: string
}

// ── Props / Emits ──────────────────────────────────

const props = withDefaults(defineProps<RowExpandableProps>(), {
    expanded: false,
    testId: 'row-expandable',
})

const emit = defineEmits<{
    'update:expanded': [value: boolean]
}>()

// ── Slots ──────────────────────────────────────────

defineSlots<{
    default?: () => unknown
}>()

// ── Overflow detection ─────────────────────────────

const contentRef = ref<HTMLElement | null>(null)
const isOverflowing = ref(false)
let observer: ResizeObserver | null = null

function checkOverflow(): void {
    if (!contentRef.value) return
    isOverflowing.value = contentRef.value.scrollHeight > contentRef.value.clientHeight
}

onMounted(() => {
    if (contentRef.value && typeof ResizeObserver !== 'undefined') {
        observer = new ResizeObserver(checkOverflow)
        observer.observe(contentRef.value)
    }
    checkOverflow()
})

onBeforeUnmount(() => {
    observer?.disconnect()
})

// ── Toggle ─────────────────────────────────────────

function toggle(): void {
    emit('update:expanded', !props.expanded)
}
</script>

<template>
    <div class="row-expandable" :data-testid="testId">
        <div
            ref="contentRef"
            class="row-expandable__content"
            :class="{ 'row-expandable__content--collapsed': !expanded }"
        >
            <slot />
        </div>
        <button
            v-if="isOverflowing || expanded"
            class="row-expandable__toggle"
            type="button"
            :aria-expanded="expanded"
            @click="toggle"
        >{{ expanded ? 'Show less' : 'Show more' }}</button>
    </div>
</template>

<style scoped>
.row-expandable__content--collapsed {
    max-height: 4.5em;
    overflow: hidden;
}

.row-expandable__toggle {
    display: inline-block;
    margin-top: 0.25rem;
    padding: 0;
    font-family: var(--font-ui);
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--link-color);
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s;
}

.row-expandable__toggle:hover {
    color: var(--link-color-hover);
    text-decoration: underline;
}
</style>

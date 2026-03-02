<script setup lang="ts">
import { ref, provide, readonly } from 'vue'
import { AccordionKey } from './context'

// ── Types ──────────────────────────────────────────

export interface AccordionBaseProps {
    allowMultiple?: boolean
    defaultExpanded?: string[] | 'all'
    testId?: string
}

// ── Slots ──────────────────────────────────────────

defineSlots<{
    default?: () => unknown
}>()

// ── Props ──────────────────────────────────────────

const props = withDefaults(defineProps<AccordionBaseProps>(), {
    allowMultiple: false,
    testId: 'accordion-base',
})

// ── State ──────────────────────────────────────────

const expandedIds = ref<Set<string>>(
    new Set(Array.isArray(props.defaultExpanded) ? props.defaultExpanded : []),
)

const shouldExpandAll = props.defaultExpanded === 'all'

function register(id: string): void {
    if (shouldExpandAll) {
        const next = new Set(expandedIds.value)
        next.add(id)
        expandedIds.value = next
    }
}

function toggle(id: string): void {
    const next = new Set(expandedIds.value)
    if (next.has(id)) {
        next.delete(id)
    } else {
        if (!props.allowMultiple) {
            next.clear()
        }
        next.add(id)
    }
    expandedIds.value = next
}

function expandAll(): void {
    expandedIds.value = new Set()
}

function collapseAll(): void {
    expandedIds.value = new Set()
}

// ── Provide / Expose ───────────────────────────────

provide(AccordionKey, {
    expandedIds: readonly(expandedIds),
    allowMultiple: props.allowMultiple,
    toggle,
    register,
})

defineExpose({ expandAll, collapseAll })
</script>

<template>
    <div class="accordion-base" :data-testid="testId">
        <slot />
    </div>
</template>

<style scoped>
.accordion-base {
    border: 1px solid var(--accordion-border);
    border-radius: var(--button-border-radius);
    overflow: hidden;
}
</style>

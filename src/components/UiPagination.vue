<script setup lang="ts">
import { computed } from 'vue'
import type { UiPaginationProps } from '../types'

const props = withDefaults(defineProps<UiPaginationProps>(), {
    maxVisible: 5,
})

const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

const pages = computed(() => {
    const total = props.totalPages
    const current = props.modelValue
    const max = props.maxVisible

    if (total <= max + 2) {
        return Array.from({ length: total }, (_, i) => i + 1)
    }

    const result: (number | '...')[] = [1]
    const half = Math.floor(max / 2)

    let start = Math.max(2, current - half)
    let end = Math.min(total - 1, current + half)

    if (current <= half + 1) {
        end = max
    } else if (current >= total - half) {
        start = total - max + 1
    }

    if (start > 2) result.push('...')
    for (let i = start; i <= end; i++) result.push(i)
    if (end < total - 1) result.push('...')
    result.push(total)

    return result
})

function goToPage(page: number) {
    if (page >= 1 && page <= props.totalPages && page !== props.modelValue) {
        emit('update:modelValue', page)
    }
}
</script>

<template>
    <nav aria-label="Pagination" class="ui-pagination">
        <button
            class="ui-pagination__btn ui-pagination__btn--prev"
            :disabled="props.modelValue <= 1"
            aria-label="Previous page"
            @click="goToPage(props.modelValue - 1)"
        >&lsaquo;</button>

        <template v-for="(page, index) in pages" :key="index">
            <span
                v-if="page === '...'"
                class="ui-pagination__ellipsis"
            >&hellip;</span>
            <button
                v-else
                class="ui-pagination__btn"
                :class="{ 'ui-pagination__btn--active': page === props.modelValue }"
                :aria-current="page === props.modelValue ? 'page' : undefined"
                :aria-label="`Page ${page}`"
                @click="goToPage(page as number)"
            >{{ page }}</button>
        </template>

        <button
            class="ui-pagination__btn ui-pagination__btn--next"
            :disabled="props.modelValue >= props.totalPages"
            aria-label="Next page"
            @click="goToPage(props.modelValue + 1)"
        >&rsaquo;</button>
    </nav>
</template>

<style scoped>
.ui-pagination {
    display: flex;
    align-items: center;
    gap: 0.25em;
    flex-wrap: wrap;
}

.ui-pagination__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2.25em;
    height: 2.25em;
    padding: 0.25em 0.5em;
    font-family: "Raleway", system-ui, sans-serif;
    font-size: 0.875em;
    font-weight: 500;
    border: 1px solid var(--ui-pagination-btn-border);
    border-radius: 4px;
    background-color: var(--ui-pagination-btn-bg);
    color: var(--ui-pagination-btn-color);
    cursor: pointer;
    transition: background-color 0.2s, border-color 0.2s;
}

.ui-pagination__btn:hover:not(:disabled):not(.ui-pagination__btn--active) {
    background-color: var(--ui-pagination-btn-hover-bg);
    border-color: var(--ui-pagination-btn-hover-border);
}

.ui-pagination__btn--active {
    background-color: var(--ui-pagination-active-bg);
    color: var(--ui-pagination-active-color);
    border-color: var(--ui-pagination-active-bg);
}

.ui-pagination__btn:disabled {
    color: var(--ui-pagination-disabled-color);
    cursor: not-allowed;
    opacity: 0.65;
}

.ui-pagination__btn:focus-visible {
    outline: 2px solid var(--ui-input-focus-border-color);
    outline-offset: 2px;
}

.ui-pagination__ellipsis {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2.25em;
    height: 2.25em;
    color: var(--ui-pagination-ellipsis-color);
    font-size: 0.875em;
}
</style>

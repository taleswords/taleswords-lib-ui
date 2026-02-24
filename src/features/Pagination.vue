<script setup lang="ts">
import { computed } from 'vue'

// ── Types ──────────────────────────────────────────

export interface PaginationProps {
    currentPage: number
    totalPages?: number
    totalItems?: number
    perPage?: number
    maxVisiblePages?: number
    testId?: string
}

// ── Props / Emits ──────────────────────────────────

const props = withDefaults(defineProps<PaginationProps>(), {
    perPage: 10,
    maxVisiblePages: 5,
    testId: 'pagination',
})

const emit = defineEmits<{
    'page-changed': [page: number]
}>()

// ── Computed ───────────────────────────────────────

const resolvedTotalPages = computed<number>(() => {
    if (props.totalPages != null) return props.totalPages
    if (props.totalItems != null) return Math.max(1, Math.ceil(props.totalItems / props.perPage))
    return 1
})

const pages = computed<(number | 'ellipsis')[]>(() => {
    const total = resolvedTotalPages.value
    const max = props.maxVisiblePages
    const current = props.currentPage

    if (total <= max) {
        return Array.from({ length: total }, (_, i) => i + 1)
    }

    const result: (number | 'ellipsis')[] = []
    const half = Math.floor(max / 2)

    let start = Math.max(2, current - half)
    let end = Math.min(total - 1, current + half)

    if (current <= half + 1) {
        end = max - 1
    }
    if (current >= total - half) {
        start = total - max + 2
    }

    result.push(1)
    if (start > 2) result.push('ellipsis')
    for (let i = start; i <= end; i++) result.push(i)
    if (end < total - 1) result.push('ellipsis')
    result.push(total)

    return result
})

// ── Methods ────────────────────────────────────────

function goToPage(page: number): void {
    if (page < 1 || page > resolvedTotalPages.value || page === props.currentPage) return
    emit('page-changed', page)
}
</script>

<template>
    <nav :aria-label="'Pagination'" :data-testid="testId">
        <ul class="pagination">
            <li>
                <button
                    class="pagination__btn pagination__btn--prev"
                    :disabled="currentPage <= 1"
                    :aria-label="'Go to previous page'"
                    @click="goToPage(currentPage - 1)"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </li>

            <li v-for="(page, index) in pages" :key="index">
                <span
                    v-if="page === 'ellipsis'"
                    class="pagination__ellipsis"
                    aria-hidden="true"
                >&hellip;</span>
                <button
                    v-else
                    class="pagination__btn"
                    :class="{ 'pagination__btn--active': page === currentPage }"
                    :aria-label="`Go to page ${page}`"
                    :aria-current="page === currentPage ? 'page' : undefined"
                    @click="goToPage(page)"
                >{{ page }}</button>
            </li>

            <li>
                <button
                    class="pagination__btn pagination__btn--next"
                    :disabled="currentPage >= resolvedTotalPages"
                    :aria-label="'Go to next page'"
                    @click="goToPage(currentPage + 1)"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
.pagination {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    list-style: none;
    margin: 0;
    padding: 0;
}

.pagination__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2rem;
    height: 2rem;
    padding: 0 0.375rem;
    font-family: var(--pagination-font);
    font-size: var(--pagination-size);
    font-weight: var(--pagination-weight);
    color: var(--pagination-btn-color);
    background: var(--pagination-btn-bg);
    border: 1px solid var(--pagination-btn-border);
    border-radius: var(--button-border-radius);
    cursor: pointer;
    transition: background-color 0.2s, border-color 0.2s, color 0.2s;
}

.pagination__btn:hover:not(:disabled):not(.pagination__btn--active) {
    background: var(--pagination-btn-hover-bg);
    border-color: var(--pagination-btn-hover-border);
}

.pagination__btn--active {
    background: var(--pagination-active-bg);
    color: var(--pagination-active-color);
    border-color: var(--pagination-active-bg);
    cursor: default;
}

.pagination__btn:disabled {
    color: var(--pagination-disabled-color);
    cursor: not-allowed;
    opacity: 0.5;
}

.pagination__ellipsis {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2rem;
    height: 2rem;
    color: var(--pagination-ellipsis-color);
    font-weight: 600;
    user-select: none;
}
</style>

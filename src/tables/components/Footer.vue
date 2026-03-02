<script setup lang="ts">
import { computed } from 'vue'
import type { TablePagination } from '../Base.vue'

export interface TableFooterProps {
    pagination: TablePagination | null
}

const props = withDefaults(defineProps<TableFooterProps>(), {
    pagination: null,
})

const emit = defineEmits<{
    'page-change': [page: number]
}>()

const totalPages = computed<number>(() => {
    if (!props.pagination || props.pagination.pageSize <= 0) return 0
    return Math.ceil(props.pagination.totalItems / props.pagination.pageSize)
})

const hasPrev = computed<boolean>(() => {
    return props.pagination !== null && props.pagination.currentPage > 1
})

const hasNext = computed<boolean>(() => {
    return props.pagination !== null && props.pagination.currentPage < totalPages.value
})

function goToPrev(): void {
    if (!props.pagination || !hasPrev.value) return
    emit('page-change', props.pagination.currentPage - 1)
}

function goToNext(): void {
    if (!props.pagination || !hasNext.value) return
    emit('page-change', props.pagination.currentPage + 1)
}
</script>

<template>
    <div v-if="props.pagination" class="table-footer">
        <span class="table-footer__info">
            Page {{ props.pagination.currentPage }} of {{ totalPages }}
        </span>
        <nav class="table-footer__nav" aria-label="Table pagination">
            <button
                type="button"
                class="table-footer__btn"
                :class="{ 'table-footer__btn--disabled': !hasPrev }"
                :disabled="!hasPrev"
                aria-label="Previous page"
                @click="goToPrev"
            >
                <span class="material-symbols-rounded" aria-hidden="true">chevron_left</span>
                Prev
            </button>
            <button
                type="button"
                class="table-footer__btn"
                :class="{ 'table-footer__btn--disabled': !hasNext }"
                :disabled="!hasNext"
                aria-label="Next page"
                @click="goToNext"
            >
                Next
                <span class="material-symbols-rounded" aria-hidden="true">chevron_right</span>
            </button>
        </nav>
    </div>
</template>

<style scoped>
.table-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: calc(0.75em * var(--density-scale)) calc(1em * var(--density-scale));
    font-family: var(--table-cell-font);
    font-size: var(--description-size);
}

.table-footer__info {
    color: var(--general-text-color);
}

.table-footer__nav {
    display: flex;
    align-items: center;
    gap: calc(0.5em * var(--density-scale));
}

.table-footer__btn {
    display: inline-flex;
    align-items: center;
    gap: calc(0.375em * var(--density-scale));
    padding: calc(0.375em * var(--density-scale)) calc(0.75em * var(--density-scale));
    font-family: var(--label-font);
    font-weight: var(--label-weight);
    font-size: var(--description-size);
    color: var(--pagination-btn-color);
    background-color: var(--pagination-btn-bg);
    border: 1px solid var(--pagination-btn-border);
    border-radius: var(--button-border-radius);
    cursor: pointer;
    transition: background-color 0.2s, border-color 0.2s;
}

.table-footer__btn:hover:not(:disabled) {
    background-color: var(--pagination-btn-hover-bg);
    border-color: var(--pagination-btn-hover-border);
}

.table-footer__btn--disabled {
    color: var(--table-footer-btn-disabled-color);
    background-color: var(--table-footer-btn-disabled-bg);
    border-color: var(--table-footer-btn-disabled-border);
    cursor: not-allowed;
}

.table-footer__btn .material-symbols-rounded {
    font-size: 1.125em;
}
</style>

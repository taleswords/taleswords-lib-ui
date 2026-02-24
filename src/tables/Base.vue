<script setup lang="ts">
import { computed } from 'vue'
import TableHeader from './components/Header.vue'
import TableBody from './components/Body.vue'
import TableFooter from './components/Footer.vue'

// ── Types ──────────────────────────────────────────

export type RowId = string | number
export type SortDirection = 'asc' | 'desc' | null

export interface TableColumn {
    key: string
    label: string
    isSortable?: boolean
    width?: string
    align?: 'left' | 'center' | 'right'
    headerClass?: string
    cellClass?: string
}

export interface TableRow {
    id: RowId
    [key: string]: unknown
}

export interface TableSort {
    key: string
    direction: SortDirection
}

export interface TablePagination {
    currentPage: number
    pageSize: number
    totalItems: number
}

export interface TableBaseProps {
    columns: TableColumn[]
    rows: TableRow[]
    selectedIds?: RowId[]
    sort?: TableSort | null
    pagination?: TablePagination | null
    isSelectable?: boolean
    isLoading?: boolean
    hasHoverHighlight?: boolean
    stickyHeader?: boolean
    emptyText?: string
    testId?: string
}

// ── Slots ──────────────────────────────────────────

defineSlots<{
    features?: () => unknown
    cell?: (slotProps: { row: TableRow; column: TableColumn; value: unknown }) => unknown
    empty?: () => unknown
    footer?: () => unknown
}>()

// ── Props / Emits ──────────────────────────────────

const props = withDefaults(defineProps<TableBaseProps>(), {
    columns: () => [],
    rows: () => [],
    selectedIds: () => [],
    sort: null,
    pagination: null,
    isSelectable: false,
    isLoading: false,
    hasHoverHighlight: true,
    stickyHeader: false,
    emptyText: 'No data available',
    testId: 'table-base',
})

const emit = defineEmits<{
    'update:selectedIds': [ids: RowId[]]
    'update:sort': [sort: TableSort]
    'update:pagination': [pagination: TablePagination]
    'row-click': [row: TableRow]
}>()

// ── Computed ───────────────────────────────────────

const allSelected = computed<boolean>(() => {
    if (props.rows.length === 0) return false
    return props.rows.every((row) => props.selectedIds.includes(row.id))
})

const someSelected = computed<boolean>(() => {
    if (props.rows.length === 0) return false
    const count = props.rows.filter((row) => props.selectedIds.includes(row.id)).length
    return count > 0 && count < props.rows.length
})

const sortedRows = computed<TableRow[]>(() => {
    if (!props.sort || props.sort.direction === null) return props.rows

    const { key, direction } = props.sort
    const sorted = [...props.rows]

    sorted.sort((a, b) => {
        const valA = String(a[key] ?? '')
        const valB = String(b[key] ?? '')
        const cmp = valA.localeCompare(valB)
        return direction === 'asc' ? cmp : -cmp
    })

    return sorted
})

const displayedRows = computed<TableRow[]>(() => {
    if (!props.pagination) return sortedRows.value

    const { currentPage, pageSize } = props.pagination
    const start = (currentPage - 1) * pageSize
    return sortedRows.value.slice(start, start + pageSize)
})

// ── Methods ────────────────────────────────────────

function handleSort(key: string): void {
    let nextDirection: SortDirection

    if (!props.sort || props.sort.key !== key) {
        nextDirection = 'asc'
    } else if (props.sort.direction === 'asc') {
        nextDirection = 'desc'
    } else if (props.sort.direction === 'desc') {
        nextDirection = null
    } else {
        nextDirection = 'asc'
    }

    emit('update:sort', { key, direction: nextDirection })
}

function handleToggleAll(): void {
    if (allSelected.value) {
        emit('update:selectedIds', [])
    } else {
        emit('update:selectedIds', props.rows.map((row) => row.id))
    }
}

function handleToggleRow(id: RowId): void {
    const current = [...props.selectedIds]
    const idx = current.indexOf(id)

    if (idx >= 0) {
        current.splice(idx, 1)
    } else {
        current.push(id)
    }

    emit('update:selectedIds', current)
}

function handleRowClick(row: TableRow): void {
    emit('row-click', row)
}

function handlePageChange(page: number): void {
    if (!props.pagination) return

    emit('update:pagination', {
        ...props.pagination,
        currentPage: page,
    })
}

function clearSelection(): void {
    emit('update:selectedIds', [])
}

// ── Expose ─────────────────────────────────────────

defineExpose({ clearSelection })
</script>

<template>
    <div class="table-base" :data-testid="props.testId">
        <slot name="features" />

        <div
            class="table-base__wrapper"
            :class="{ 'table-base__wrapper--sticky': props.stickyHeader }"
        >
            <table class="table-base__table">
                <TableHeader
                    :columns="props.columns"
                    :sort="props.sort"
                    :is-selectable="props.isSelectable"
                    :all-selected="allSelected"
                    :some-selected="someSelected"
                    @sort="handleSort"
                    @toggle-all="handleToggleAll"
                />
                <TableBody
                    :columns="props.columns"
                    :rows="displayedRows"
                    :selected-ids="props.selectedIds"
                    :is-selectable="props.isSelectable"
                    :has-hover-highlight="props.hasHoverHighlight"
                    @row-click="handleRowClick"
                    @toggle-row="handleToggleRow"
                >
                    <template v-if="$slots.cell" #cell="slotProps">
                        <slot name="cell" v-bind="slotProps" />
                    </template>
                </TableBody>
            </table>

            <!-- Empty state -->
            <div
                v-if="displayedRows.length === 0 && !props.isLoading"
                class="table-base__empty"
            >
                <slot name="empty">{{ props.emptyText }}</slot>
            </div>

            <!-- Loading overlay -->
            <div v-if="props.isLoading" class="table-base__loading">
                <span class="table-base__loading-text">Loading...</span>
            </div>
        </div>

        <slot name="footer">
            <TableFooter
                :pagination="props.pagination"
                @page-change="handlePageChange"
            />
        </slot>
    </div>
</template>

<style scoped>
.table-base {
    width: 100%;
}

.table-base__wrapper {
    position: relative;
    overflow-x: auto;
    border: 1px solid var(--general-card-border);
    border-radius: var(--button-border-radius);
}

.table-base__wrapper--sticky :deep(.table-header__cell) {
    position: sticky;
    top: 0;
    z-index: 10;
}

.table-base__table {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--table-cell-font);
    font-size: var(--table-cell-size);
}

/* Header cell styles (deep because Header.vue is scoped) */
.table-base__table :deep(.table-header__cell) {
    padding: 0.75em 1em;
    font-family: var(--table-header-font);
    font-weight: var(--table-header-weight);
    font-size: var(--table-header-size);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--general-text-color);
    background: var(--general-card-bg);
    border-bottom: 2px solid var(--general-card-border);
}

/* Body row styles (deep because Body.vue is scoped) */
.table-base__table :deep(.table-body__row) {
    border-bottom: 1px solid var(--general-card-border);
}

.table-base__table :deep(.table-body__row--hoverable:hover) {
    background-color: var(--dropdown-item-hover-bg);
}

.table-base__table :deep(.table-body__row--selected) {
    background-color: var(--table-row-selected-bg);
}

/* Body cell styles */
.table-base__table :deep(.table-body__cell) {
    padding: 0.75em 1em;
    color: var(--general-text-color);
}

.table-base__empty {
    padding: 2em;
    text-align: center;
    color: var(--form-field-description-color);
    font-family: var(--table-cell-font);
}

.table-base__loading {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--loader-overlay-bg);
}

.table-base__loading-text {
    font-family: var(--table-header-font);
    font-weight: var(--table-header-weight);
    color: var(--general-text-color);
}
</style>

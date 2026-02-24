<script setup lang="ts">
import { ref } from 'vue'
import type { TableRow, TableColumn, RowId, TableSort, TablePagination } from '../tables/Base.vue'
import TableBase from '../tables/Base.vue'

// ── Types ──────────────────────────────────────────

export interface ListBaseProps {
    rows: TableRow[]
    labelKey?: string
    selectedIds?: RowId[]
    sort?: TableSort | null
    pagination?: TablePagination | null
    isSelectable?: boolean
    isLoading?: boolean
    hasHoverHighlight?: boolean
    emptyText?: string
    testId?: string
}

// ── Slots ──────────────────────────────────────────

defineSlots<{
    item?: (slotProps: { row: TableRow; value: unknown }) => unknown
    empty?: () => unknown
    features?: () => unknown
    footer?: () => unknown
}>()

// ── Props / Emits ──────────────────────────────────

const props = withDefaults(defineProps<ListBaseProps>(), {
    rows: () => [],
    labelKey: 'label',
    selectedIds: () => [],
    sort: null,
    pagination: null,
    isSelectable: false,
    isLoading: false,
    hasHoverHighlight: true,
    emptyText: 'No items available',
    testId: 'list-base',
})

const emit = defineEmits<{
    'update:selectedIds': [ids: RowId[]]
    'update:sort': [sort: TableSort]
    'update:pagination': [pagination: TablePagination]
    'row-click': [row: TableRow]
}>()

// ── Single-column schema ──────────────────────────

const columns: TableColumn[] = [
    { key: props.labelKey, label: 'Items' },
]

// ── Refs ───────────────────────────────────────────

const tableRef = ref<InstanceType<typeof TableBase> | null>(null)

// ── Expose ─────────────────────────────────────────

function clearSelection(): void {
    emit('update:selectedIds', [])
}

defineExpose({ clearSelection })
</script>

<template>
    <TableBase
        ref="tableRef"
        class="list-base"
        :columns="columns"
        :rows="props.rows"
        :selected-ids="props.selectedIds"
        :sort="props.sort"
        :pagination="props.pagination"
        :is-selectable="props.isSelectable"
        :is-loading="props.isLoading"
        :has-hover-highlight="props.hasHoverHighlight"
        :sticky-header="false"
        :empty-text="props.emptyText"
        :test-id="props.testId"
        @update:selected-ids="(ids) => emit('update:selectedIds', ids)"
        @update:sort="(s) => emit('update:sort', s)"
        @update:pagination="(p) => emit('update:pagination', p)"
        @row-click="(row) => emit('row-click', row)"
    >
        <template #features>
            <slot name="features" />
        </template>

        <template #cell="{ row, column, value }">
            <slot name="item" :row="row" :value="value">
                {{ value === null || value === undefined ? '' : String(value) }}
            </slot>
        </template>

        <template #empty>
            <slot name="empty" />
        </template>

        <template #footer>
            <slot name="footer" />
        </template>
    </TableBase>
</template>

<style scoped>
.list-base :deep(.table-header) {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

.list-base :deep(.table-base__table) {
    table-layout: fixed;
}
</style>

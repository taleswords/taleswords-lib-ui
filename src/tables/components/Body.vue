<script setup lang="ts">
import type { TableColumn, TableRow, RowId } from '../Base.vue'

export interface TableBodyProps {
    columns: TableColumn[]
    rows: TableRow[]
    selectedIds: RowId[]
    isSelectable: boolean
    hasHoverHighlight: boolean
}

const props = withDefaults(defineProps<TableBodyProps>(), {
    rows: () => [],
    selectedIds: () => [],
    isSelectable: false,
    hasHoverHighlight: true,
})

const emit = defineEmits<{
    'row-click': [row: TableRow]
    'toggle-row': [id: RowId]
}>()

defineSlots<{
    cell?: (slotProps: { row: TableRow; column: TableColumn; value: unknown }) => unknown
}>()

function isSelected(id: RowId): boolean {
    return props.selectedIds.includes(id)
}

function getCellValue(row: TableRow, key: string): unknown {
    return row[key]
}

function formatCellValue(value: unknown): string {
    if (value === null || value === undefined) return ''
    return String(value)
}
</script>

<template>
    <tbody class="table-body">
        <tr
            v-for="row in props.rows"
            :key="row.id"
            class="table-body__row"
            :class="{
                'table-body__row--selected': isSelected(row.id),
                'table-body__row--hoverable': props.hasHoverHighlight,
            }"
            @click="emit('row-click', row)"
        >
            <td
                v-if="props.isSelectable"
                class="table-body__cell table-body__cell--checkbox"
                @click.stop
            >
                <input
                    type="checkbox"
                    :checked="isSelected(row.id)"
                    aria-label="Select row"
                    @change="emit('toggle-row', row.id)"
                />
            </td>
            <td
                v-for="column in props.columns"
                :key="column.key"
                class="table-body__cell"
                :class="column.cellClass"
                :style="{ textAlign: column.align ?? undefined }"
            >
                <slot
                    name="cell"
                    :row="row"
                    :column="column"
                    :value="getCellValue(row, column.key)"
                >
                    {{ formatCellValue(getCellValue(row, column.key)) }}
                </slot>
            </td>
        </tr>
    </tbody>
</template>

<style scoped>
.table-body__cell--checkbox {
    width: 3em;
    text-align: center;
}

.table-body__cell--checkbox input[type="checkbox"] {
    accent-color: var(--checkbox-accent);
    cursor: pointer;
}
</style>

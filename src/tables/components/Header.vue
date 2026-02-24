<script setup lang="ts">
import type { TableColumn, TableSort } from '../Base.vue'

export interface TableHeaderProps {
    columns: TableColumn[]
    sort: TableSort | null
    isSelectable: boolean
    allSelected: boolean
    someSelected: boolean
}

const props = withDefaults(defineProps<TableHeaderProps>(), {
    sort: null,
    isSelectable: false,
    allSelected: false,
    someSelected: false,
})

const emit = defineEmits<{
    sort: [key: string]
    'toggle-all': []
}>()

function getSortIcon(key: string): string | null {
    if (!props.sort || props.sort.key !== key || props.sort.direction === null) {
        return null
    }
    return props.sort.direction === 'asc' ? 'arrow_upward' : 'arrow_downward'
}
</script>

<template>
    <thead class="table-header">
        <tr>
            <th
                v-if="props.isSelectable"
                class="table-header__cell table-header__cell--checkbox"
            >
                <input
                    type="checkbox"
                    :checked="props.allSelected"
                    :indeterminate="props.someSelected"
                    aria-label="Select all rows"
                    @change="emit('toggle-all')"
                />
            </th>
            <th
                v-for="column in props.columns"
                :key="column.key"
                class="table-header__cell"
                :class="[
                    { 'table-header__cell--sortable': column.isSortable },
                    column.headerClass,
                ]"
                :style="{
                    width: column.width ?? undefined,
                    textAlign: column.align ?? undefined,
                }"
                @click="column.isSortable ? emit('sort', column.key) : undefined"
            >
                <span class="table-header__label">{{ column.label }}</span>
                <span
                    v-if="column.isSortable"
                    class="table-header__sort-icon"
                    aria-hidden="true"
                >
                    <span v-if="getSortIcon(column.key)" class="material-symbols-rounded">{{ getSortIcon(column.key) }}</span>
                    <template v-else>&#8211;</template>
                </span>
            </th>
        </tr>
    </thead>
</template>

<style scoped>
.table-header__cell--checkbox {
    width: 3em;
    text-align: center;
}

.table-header__cell--checkbox input[type="checkbox"] {
    accent-color: var(--checkbox-accent);
    cursor: pointer;
}

.table-header__cell--sortable {
    cursor: pointer;
    user-select: none;
}

.table-header__cell--sortable:hover {
    background-color: var(--dropdown-item-hover-bg);
}

.table-header__label {
    display: inline;
}

.table-header__sort-icon {
    display: inline-flex;
    align-items: center;
    margin-left: 0.375em;
    font-size: 0.75em;
    color: var(--general-text-color);
    opacity: 0.6;
}

.table-header__sort-icon .material-symbols-rounded {
    font-size: 1.25em;
}
</style>

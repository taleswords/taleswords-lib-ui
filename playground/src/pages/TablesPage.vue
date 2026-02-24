<script setup lang="ts">
import { ref, computed } from 'vue'
import { TableBase, BadgeBase, Pagination, CardBase, ButtonBase } from '@lib'
import type { TableColumn, TableRow, TableSort, TablePagination, RowId, BadgeVariant } from '@lib'

const columns: TableColumn[] = [
    { key: 'name', label: 'Name', isSortable: true },
    { key: 'email', label: 'Email', isSortable: true },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
    { key: 'joined', label: 'Joined', isSortable: true, align: 'right' },
]

const allRows: TableRow[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'accepted', joined: '2024-01-15' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'accepted', joined: '2024-02-20' },
    { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'pending', joined: '2024-03-10' },
    { id: 4, name: 'David Brown', email: 'david@example.com', role: 'Editor', status: 'accepted', joined: '2024-04-05' },
    { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'declined', joined: '2024-05-12' },
    { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'Viewer', status: 'accepted', joined: '2024-06-18' },
    { id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'Editor', status: 'pending', joined: '2024-07-22' },
    { id: 8, name: 'Henry Wilson', email: 'henry@example.com', role: 'Viewer', status: 'accepted', joined: '2024-08-30' },
]

const statusBadgeMap: Record<string, BadgeVariant> = {
    accepted: 'accepted',
    pending: 'pending',
    declined: 'declined',
}

// Sortable demo
const sort = ref<TableSort | null>(null)

const sortedRows = computed(() => {
    if (!sort.value || !sort.value.direction) return allRows
    const key = sort.value.key
    const dir = sort.value.direction === 'asc' ? 1 : -1
    return [...allRows].sort((a, b) => {
        const aVal = String(a[key] ?? '')
        const bVal = String(b[key] ?? '')
        return aVal.localeCompare(bVal) * dir
    })
})

// Selectable demo
const selectedIds = ref<RowId[]>([])

// Paginated demo
const paginationState = ref<TablePagination>({
    currentPage: 1,
    pageSize: 3,
    totalItems: allRows.length,
})

const paginatedRows = computed(() => {
    const start = (paginationState.value.currentPage - 1) * paginationState.value.pageSize
    return sortedRows.value.slice(start, start + paginationState.value.pageSize)
})

const totalPages = computed(() =>
    Math.ceil(paginationState.value.totalItems / paginationState.value.pageSize)
)

function onPageChanged(page: number): void {
    paginationState.value = { ...paginationState.value, currentPage: page }
}

// Loading demo
const isLoading = ref(false)
</script>

<template>
    <div class="page" data-testid="page-tables">
        <h1>Tables</h1>

        <CardBase title="Basic Table">
            <TableBase :columns="columns" :rows="allRows" />
        </CardBase>

        <CardBase title="Sortable">
            <TableBase
                :columns="columns"
                :rows="sortedRows"
                :sort="sort"
                @update:sort="sort = $event"
            />
        </CardBase>

        <CardBase title="Selectable">
            <p class="demo-value">Selected: {{ selectedIds.length }} row(s)</p>
            <TableBase
                :columns="columns"
                :rows="allRows"
                is-selectable
                :selected-ids="selectedIds"
                @update:selected-ids="selectedIds = $event"
            />
        </CardBase>

        <CardBase title="With Pagination">
            <TableBase
                :columns="columns"
                :rows="paginatedRows"
                :sort="sort"
                @update:sort="sort = $event"
            />
            <div style="margin-top: 1rem;">
                <Pagination
                    :current-page="paginationState.currentPage"
                    :total-pages="totalPages"
                    @page-changed="onPageChanged"
                />
            </div>
        </CardBase>

        <CardBase title="Custom Cells (Badge for Status)">
            <TableBase :columns="columns" :rows="allRows">
                <template #cell="{ column, value }">
                    <BadgeBase
                        v-if="column.key === 'status'"
                        :variant="statusBadgeMap[String(value)] ?? 'pending'"
                        :label="String(value)"
                    />
                    <template v-else>{{ value }}</template>
                </template>
            </TableBase>
        </CardBase>

        <CardBase title="Empty State">
            <TableBase :columns="columns" :rows="[]" empty-text="No users found." />
        </CardBase>

        <CardBase title="Loading State">
            <TableBase :columns="columns" :rows="allRows" :is-loading="isLoading" />
            <template #actions>
                <ButtonBase
                    size="small"
                    :variant="isLoading ? 'danger' : 'secondary'"
                    :label="isLoading ? 'Stop Loading' : 'Start Loading'"
                    @click="isLoading = !isLoading"
                />
            </template>
        </CardBase>
    </div>
</template>

<style scoped>
.demo-value {
    margin-bottom: 0.5rem;
    font-size: 0.8125rem;
    color: var(--form-field-description-color);
}
</style>

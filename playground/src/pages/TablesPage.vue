<script setup lang="ts">
import { ref, computed } from 'vue'
import { TableBase, BadgeBase, Pagination } from '@lib'
import type { TableColumn, TableRow, TableSort, TablePagination, RowId, BadgeVariant } from '@lib'
import Section from '../components/Section.vue'
import Case from '../components/Case.vue'
import { usePlaygroundControls } from '../composables/usePlaygroundControls'
import { definePlaygroundPage } from '../composables/usePageContract'

definePlaygroundPage({ sections: ['Variants', 'States', 'Composition', 'Accessibility'], isInteractive: true })

const { isLoading } = usePlaygroundControls()

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

const selectedIds = ref<RowId[]>([])

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
</script>

<template>
    <Section title="Variants" :full-width="true">
        <Case title="Basic Table" layout="columns">
            <TableBase :columns="columns" :rows="allRows" />
        </Case>
        <Case title="Custom Cells (Badge for Status)" layout="columns">
            <TableBase :columns="columns" :rows="allRows" test-id="table-custom-cells">
                <template #cell="{ column, value }">
                    <BadgeBase
                        v-if="column.key === 'status'"
                        :variant="statusBadgeMap[String(value)] ?? 'pending'"
                        :label="String(value)"
                    />
                    <template v-else>{{ value }}</template>
                </template>
            </TableBase>
        </Case>
    </Section>

    <Section title="States" :full-width="true">
        <Case title="Sortable" layout="columns">
            <TableBase
                :columns="columns"
                :rows="sortedRows"
                :sort="sort"
                test-id="table-sortable"
                @update:sort="sort = $event"
            />
        </Case>
        <Case title="Selectable" layout="columns">
            <p style="margin-bottom: 0.5rem; font-size: 0.8125rem; color: var(--form-field-description-color);">Selected: {{ selectedIds.length }} row(s)</p>
            <TableBase
                :columns="columns"
                :rows="allRows"
                is-selectable
                :selected-ids="selectedIds"
                test-id="table-selectable"
                @update:selected-ids="selectedIds = $event"
            />
        </Case>
        <Case title="Loading" layout="columns">
            <TableBase :columns="columns" :rows="allRows" :is-loading="isLoading" />
        </Case>
        <Case title="Empty" layout="columns">
            <TableBase :columns="columns" :rows="[]" empty-text="No users found." />
        </Case>
    </Section>

    <Section title="Composition" :full-width="true">
        <Case title="With Pagination" layout="columns">
            <TableBase
                :columns="columns"
                :rows="paginatedRows"
                :sort="sort"
                test-id="table-paginated"
                @update:sort="sort = $event"
            />
            <Pagination
                :current-page="paginationState.currentPage"
                :total-pages="totalPages"
                @page-changed="onPageChanged"
            />
        </Case>
    </Section>

    <Section title="Accessibility">
        <Case title="Keyboard Navigation" layout="columns">
            <p>Tables use native table semantics. Sortable columns are clickable. Selection uses native checkbox inputs. Tab navigates between interactive elements within the table.</p>
        </Case>
    </Section>
</template>

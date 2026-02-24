<script setup lang="ts">
import { ListBase, BadgeBase, CardBase } from '@lib'
import type { TableRow, BadgeVariant } from '@lib'

const items: TableRow[] = [
    { id: 1, label: 'Dashboard Settings' },
    { id: 2, label: 'User Management' },
    { id: 3, label: 'Content Library' },
    { id: 4, label: 'Analytics Overview' },
    { id: 5, label: 'Notification Preferences' },
]

const itemsWithStatus: TableRow[] = [
    { id: 1, label: 'Project Alpha', status: 'accepted' },
    { id: 2, label: 'Project Beta', status: 'pending' },
    { id: 3, label: 'Project Gamma', status: 'declined' },
    { id: 4, label: 'Project Delta', status: 'accepted' },
]

const statusBadgeMap: Record<string, BadgeVariant> = {
    accepted: 'accepted',
    pending: 'pending',
    declined: 'declined',
}
</script>

<template>
    <div class="page" data-testid="page-lists">
        <h1>Lists</h1>

        <CardBase title="Basic List">
            <ListBase :rows="items" />
        </CardBase>

        <CardBase title="Custom Item Slot">
            <ListBase :rows="itemsWithStatus">
                <template #item="{ row }">
                    <div class="list-item-custom">
                        <span>{{ row.label }}</span>
                        <BadgeBase
                            :variant="statusBadgeMap[String(row.status)] ?? 'pending'"
                            :label="String(row.status)"
                        />
                    </div>
                </template>
            </ListBase>
        </CardBase>

        <CardBase title="Empty List">
            <ListBase :rows="[]" empty-text="No items to display." />
        </CardBase>
    </div>
</template>

<style scoped>
.list-item-custom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}
</style>

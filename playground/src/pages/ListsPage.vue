<script setup lang="ts">
import { ListBase, BadgeBase } from '@lib'
import type { TableRow, BadgeVariant } from '@lib'
import Section from '../components/Section.vue'
import Case from '../components/Case.vue'
import { definePlaygroundPage } from '../composables/usePageContract'

definePlaygroundPage({ sections: ['Variants', 'States'] })

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
    <Section title="Variants" :full-width="true">
        <Case title="Basic List" layout="columns">
            <ListBase :rows="items" />
        </Case>
        <Case title="Custom Item Slot" layout="columns">
            <ListBase :rows="itemsWithStatus">
                <template #item="{ row }">
                    <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                        <span>{{ row.label }}</span>
                        <BadgeBase
                            :variant="statusBadgeMap[String(row.status)] ?? 'pending'"
                            :label="String(row.status)"
                        />
                    </div>
                </template>
            </ListBase>
        </Case>
    </Section>

    <Section title="States" :full-width="true">
        <Case title="Empty List" layout="columns">
            <ListBase :rows="[]" empty-text="No items to display." />
        </Case>
    </Section>
</template>

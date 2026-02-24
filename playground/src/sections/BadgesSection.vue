<script setup lang="ts">
import { UiBadge, UiUserIcon, UiCard } from '@lib'
import type { UiBadgeValue } from '@lib'

const badgeValues: UiBadgeValue[] = [
    'visitor', 'guest', 'guest-editor', 'reviewer', 'editor',
    'manager', 'admin', 'owner', 'public', 'private',
    'pending', 'declined', 'accepted',
]

const userNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Edward']
</script>

<template>
    <UiCard variant="outlined">
        <h2>UiBadge</h2>
        <div class="row">
            <UiBadge v-for="v in badgeValues" :key="v" :value="v" />
        </div>
    </UiCard>

    <UiCard variant="outlined">
        <h2>UiUserIcon</h2>
        <div class="row">
            <span v-for="name in userNames" :key="name" class="user-icon-demo">
                <UiUserIcon :name="name" />
                <span>{{ name }}</span>
            </span>
        </div>
    </UiCard>
</template>

<style scoped>
.row {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: center;
}

.user-icon-demo {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}
</style>

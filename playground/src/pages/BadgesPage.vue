<script setup lang="ts">
import { BadgeBase, CardBase } from '@lib'
import type { BadgeVariant } from '@lib'

const variants: BadgeVariant[] = [
    'visitor', 'guest', 'guest-editor',
    'reviewer', 'editor', 'manager',
    'admin', 'owner', 'public', 'private',
    'pending', 'declined', 'accepted',
]
</script>

<template>
    <div class="page" data-testid="page-badges">
        <h1>Badges</h1>

        <CardBase title="All Variants">
            <div class="demo-row">
                <BadgeBase
                    v-for="v in variants"
                    :key="v"
                    :variant="v"
                    :label="v"
                />
            </div>
        </CardBase>
    </div>
</template>

<style scoped>
.demo-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
}
</style>

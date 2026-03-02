<script setup lang="ts">
import { BadgeBase } from '@lib'
import type { BadgeRoleVariant, BadgeSemanticVariant } from '@lib'
import Section from '../components/Section.vue'
import Case from '../components/Case.vue'
import { definePlaygroundPage } from '../composables/usePageContract'

definePlaygroundPage({ sections: ['Variants', 'Density'] })

const roleVariants: BadgeRoleVariant[] = [
    'visitor', 'guest', 'guest-editor',
    'reviewer', 'editor', 'manager',
    'admin', 'owner', 'public', 'private',
    'pending', 'declined', 'accepted',
]

const semanticVariants: BadgeSemanticVariant[] = [
    'neutral', 'info', 'success', 'warning', 'danger',
]
</script>

<template>
    <Section title="Variants">
        <Case title="Role Variants" layout="row">
            <BadgeBase
                v-for="v in roleVariants"
                :key="v"
                :variant="v"
                :label="v"
            />
        </Case>

        <Case title="Semantic Variants" layout="row">
            <BadgeBase
                v-for="v in semanticVariants"
                :key="v"
                :variant="v"
                :label="v"
            />
        </Case>

        <Case title="Semantic Variants — Small" layout="row">
            <BadgeBase
                v-for="v in semanticVariants"
                :key="v"
                :variant="v"
                :label="v"
                size="sm"
            />
        </Case>

        <Case title="Size Comparison" layout="row">
            <BadgeBase variant="info" label="Default (md)" />
            <BadgeBase variant="info" label="Small" size="sm" />
        </Case>

    </Section>

    <Section title="Density">
        <Case title="Compact" layout="row">
            <div data-density="compact" style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <BadgeBase
                    v-for="v in semanticVariants"
                    :key="v"
                    :variant="v"
                    :label="v"
                />
                <BadgeBase variant="info" label="Small compact" size="sm" />
            </div>
        </Case>
    </Section>
</template>

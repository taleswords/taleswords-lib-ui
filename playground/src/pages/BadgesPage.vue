<script setup lang="ts">
import { BadgeBase } from '@lib'
import type { BadgeVariant } from '@lib'
import Section from '../components/Section.vue'
import Case from '../components/Case.vue'
import { definePlaygroundPage } from '../composables/usePageContract'

definePlaygroundPage({ sections: ['Variants'] })

const variants: BadgeVariant[] = [
    'visitor', 'guest', 'guest-editor',
    'reviewer', 'editor', 'manager',
    'admin', 'owner', 'public', 'private',
    'pending', 'declined', 'accepted',
]
</script>

<template>
    <Section title="Variants">
        <Case title="All Variants" layout="row">
            <BadgeBase
                v-for="v in variants"
                :key="v"
                :variant="v"
                :label="v"
            />
        </Case>
    </Section>
</template>

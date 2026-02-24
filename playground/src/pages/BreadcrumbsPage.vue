<script setup lang="ts">
import { Breadcrumbs } from '@lib'
import Section from '../components/Section.vue'
import Case from '../components/Case.vue'
import { definePlaygroundPage } from '../composables/usePageContract'

definePlaygroundPage({ sections: ['Variants', 'Accessibility'], isInteractive: true })
</script>

<template>
    <Section title="Variants" :full-width="true">
        <Case title="Full Path" layout="columns">
            <Breadcrumbs :items="[
                { label: 'Home' },
                { label: 'Products' },
                { label: 'Category' },
                { label: 'Item Details' },
            ]" />
        </Case>
        <Case title="With Links" layout="columns">
            <Breadcrumbs :items="[
                { label: 'Home', href: '#' },
                { label: 'Settings', href: '#' },
                { label: 'Account' },
            ]" />
        </Case>
        <Case title="Short (2 Items)" layout="columns">
            <Breadcrumbs :items="[
                { label: 'Home' },
                { label: 'Current Page' },
            ]" />
        </Case>
    </Section>

    <Section title="Accessibility">
        <Case title="Navigation Landmark" layout="columns">
            <p>Breadcrumbs use a nav element with aria-label "Breadcrumb". The current page is marked with aria-current="page". Links are keyboard-focusable.</p>
        </Case>
    </Section>
</template>

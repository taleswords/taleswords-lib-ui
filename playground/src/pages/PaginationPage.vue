<script setup lang="ts">
import { ref, computed } from 'vue'
import { Pagination } from '@lib'
import Section from '../components/Section.vue'
import Case from '../components/Case.vue'
import { definePlaygroundPage } from '../composables/usePageContract'

definePlaygroundPage({ sections: ['Variants', 'States', 'Accessibility'], isInteractive: true })

const basicPage = ref(1)
const manyPage = ref(1)
const fewPage = ref(1)
const computedPage = ref(1)

const totalItems = 47
const perPage = 10
const computedTotalPages = computed(() => Math.ceil(totalItems / perPage))
</script>

<template>
    <Section title="Variants" :full-width="true">
        <Case title="Basic (10 Pages)" layout="columns">
            <Pagination
                :current-page="basicPage"
                :total-pages="10"
                @page-changed="basicPage = $event"
            />
        </Case>
        <Case title="Many Pages (50) with Ellipsis" layout="columns">
            <Pagination
                :current-page="manyPage"
                :total-pages="50"
                @page-changed="manyPage = $event"
            />
        </Case>
        <Case title="Few Pages (3)" layout="columns">
            <Pagination
                :current-page="fewPage"
                :total-pages="3"
                @page-changed="fewPage = $event"
            />
        </Case>
        <Case title="Computed from Items" layout="columns">
            <p style="margin-bottom: 0.5rem; font-size: 0.8125rem; color: var(--form-field-description-color);">{{ totalItems }} items, {{ perPage }} per page = {{ computedTotalPages }} pages</p>
            <Pagination
                :current-page="computedPage"
                :total-items="totalItems"
                :per-page="perPage"
                @page-changed="computedPage = $event"
            />
        </Case>
    </Section>

    <Section title="States" :full-width="true">
        <Case title="Active and Disabled" layout="columns">
            <p style="margin-bottom: 0.5rem; font-size: 0.8125rem; color: var(--form-field-description-color);">First and last page buttons are disabled at boundaries. Active page is highlighted.</p>
            <Pagination
                :current-page="1"
                :total-pages="5"
            />
        </Case>
    </Section>

    <Section title="Accessibility">
        <Case title="Keyboard Navigation" layout="columns">
            <p>Tab navigates between page buttons. Enter/Space activates. Current page is announced via aria-current. Disabled buttons use aria-disabled.</p>
        </Case>
    </Section>
</template>

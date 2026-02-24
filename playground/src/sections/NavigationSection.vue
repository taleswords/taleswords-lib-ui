<script setup lang="ts">
import { ref } from 'vue'
import { UiCard, UiBreadcrumbs, UiTabs, UiPagination } from '@lib'

const breadcrumbs = [
    { label: 'Home', href: '#' },
    { label: 'Projects', href: '#' },
    { label: 'Current Project' },
]

const activeTab = ref('tab1')
const currentPage = ref(1)
</script>

<template>
    <!-- UiBreadcrumbs -->
    <UiCard variant="outlined">
        <h2>UiBreadcrumbs</h2>
        <UiBreadcrumbs :items="breadcrumbs" />
    </UiCard>

    <!-- UiTabs -->
    <UiCard variant="outlined">
        <h2>UiTabs</h2>
        <UiTabs
            v-model="activeTab"
            :items="[
                { key: 'tab1', label: 'Overview' },
                { key: 'tab2', label: 'Details' },
                { key: 'tab3', label: 'Disabled', disabled: true },
                { key: 'tab4', label: 'Settings' },
            ]"
        >
            <div v-if="activeTab === 'tab1'">
                <p>Overview content goes here.</p>
            </div>
            <div v-else-if="activeTab === 'tab2'">
                <p>Details content with more information.</p>
            </div>
            <div v-else-if="activeTab === 'tab4'">
                <p>Settings panel content.</p>
            </div>
        </UiTabs>
    </UiCard>

    <!-- UiPagination -->
    <UiCard variant="outlined">
        <h2>UiPagination</h2>
        <UiPagination v-model="currentPage" :total-pages="20" :max-visible="5" />
        <p>Current page: {{ currentPage }}</p>
    </UiCard>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Pagination, CardBase } from '@lib'

const basicPage = ref(1)
const manyPage = ref(1)
const fewPage = ref(1)
const computedPage = ref(1)

const totalItems = 47
const perPage = 10
const computedTotalPages = computed(() => Math.ceil(totalItems / perPage))
</script>

<template>
    <div class="page" data-testid="page-pagination">
        <h1>Pagination</h1>

        <CardBase title="Basic (10 Pages)">
            <p class="demo-value">Current page: {{ basicPage }}</p>
            <Pagination
                :current-page="basicPage"
                :total-pages="10"
                @page-changed="basicPage = $event"
            />
        </CardBase>

        <CardBase title="Many Pages (50) with Ellipsis">
            <p class="demo-value">Current page: {{ manyPage }}</p>
            <Pagination
                :current-page="manyPage"
                :total-pages="50"
                @page-changed="manyPage = $event"
            />
        </CardBase>

        <CardBase title="Few Pages (3)">
            <p class="demo-value">Current page: {{ fewPage }}</p>
            <Pagination
                :current-page="fewPage"
                :total-pages="3"
                @page-changed="fewPage = $event"
            />
        </CardBase>

        <CardBase title="Computed from Items">
            <p class="demo-value">{{ totalItems }} items, {{ perPage }} per page = {{ computedTotalPages }} pages. Current: {{ computedPage }}</p>
            <Pagination
                :current-page="computedPage"
                :total-items="totalItems"
                :per-page="perPage"
                @page-changed="computedPage = $event"
            />
        </CardBase>
    </div>
</template>

<style scoped>
.demo-value {
    margin-bottom: 0.5rem;
    font-size: 0.8125rem;
    color: var(--form-field-description-color);
}
</style>

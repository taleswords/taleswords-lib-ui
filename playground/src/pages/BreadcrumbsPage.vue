<script setup lang="ts">
import { Breadcrumbs, CardBase } from '@lib'
</script>

<template>
    <div class="page" data-testid="page-breadcrumbs">
        <h1>Breadcrumbs</h1>

        <CardBase title="Basic Breadcrumbs">
            <Breadcrumbs :items="[
                { label: 'Home' },
                { label: 'Products' },
                { label: 'Category' },
                { label: 'Item Details' },
            ]" />
        </CardBase>

        <CardBase title="With Links">
            <Breadcrumbs :items="[
                { label: 'Home', href: '#' },
                { label: 'Settings', href: '#' },
                { label: 'Account' },
            ]" />
        </CardBase>

        <CardBase title="Short (2 Items)">
            <Breadcrumbs :items="[
                { label: 'Home' },
                { label: 'Current Page' },
            ]" />
        </CardBase>
    </div>
</template>

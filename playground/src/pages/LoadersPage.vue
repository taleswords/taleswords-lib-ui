<script setup lang="ts">
import { ref } from 'vue'
import { LoaderIcon, LoaderBase, CardBase, ButtonBase } from '@lib'

const showOverlay = ref(false)
</script>

<template>
    <div class="page" data-testid="page-loaders">
        <h1>Loaders</h1>

        <CardBase title="LoaderIcon Sizes">
            <div class="demo-row">
                <LoaderIcon size="small" />
                <LoaderIcon size="medium" />
                <LoaderIcon size="large" />
            </div>
        </CardBase>

        <CardBase title="LoaderBase — Spinner">
            <div class="demo-row">
                <LoaderBase variant="spinner" size="small" label="Loading..." />
                <LoaderBase variant="spinner" size="medium" label="Loading..." />
                <LoaderBase variant="spinner" size="large" label="Loading..." />
            </div>
        </CardBase>

        <CardBase title="LoaderBase — Dots">
            <div class="demo-row">
                <LoaderBase variant="dots" size="small" label="Loading..." />
                <LoaderBase variant="dots" size="medium" label="Loading..." />
                <LoaderBase variant="dots" size="large" label="Loading..." />
            </div>
        </CardBase>

        <CardBase title="Overlay Demo" :is-loading="showOverlay">
            <p>This card shows a loader overlay when toggled.</p>
            <p>Content is still here underneath the overlay.</p>
            <template #actions>
                <ButtonBase
                    :variant="showOverlay ? 'danger' : 'primary'"
                    :label="showOverlay ? 'Hide Overlay' : 'Show Overlay'"
                    size="small"
                    @click="showOverlay = !showOverlay"
                />
            </template>
        </CardBase>
    </div>
</template>

<style scoped>
.demo-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
}
</style>

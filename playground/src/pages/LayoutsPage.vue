<script setup lang="ts">
import { ref } from 'vue'
import { LayoutBase, Breadcrumbs, ButtonBase, CardBase } from '@lib'

const isLoading = ref(false)
</script>

<template>
    <div class="page" data-testid="page-layouts">
        <h1>Layouts</h1>

        <CardBase title="Basic Layout">
            <LayoutBase title="Page Title" description="This is a page-level layout wrapper.">
                <CardBase>
                    <p>Content inside the layout.</p>
                </CardBase>
            </LayoutBase>
        </CardBase>

        <CardBase title="Layout with Breadcrumbs">
            <LayoutBase title="User Settings">
                <template #breadcrumbs>
                    <Breadcrumbs :items="[
                        { label: 'Home' },
                        { label: 'Settings' },
                        { label: 'Users' },
                    ]" />
                </template>
                <CardBase>
                    <p>Layout with breadcrumb navigation above the title.</p>
                </CardBase>
            </LayoutBase>
        </CardBase>

        <CardBase title="Layout with Actions">
            <LayoutBase title="Projects" description="Manage your team projects">
                <template #actions>
                    <ButtonBase variant="primary" size="small" label="New Project" />
                </template>
                <CardBase>
                    <p>Layout with action buttons in the header area.</p>
                </CardBase>
            </LayoutBase>
        </CardBase>

        <CardBase title="Loading Layout">
            <LayoutBase title="Dashboard" :is-loading="isLoading">
                <CardBase>
                    <p>Toggle loading state on the layout.</p>
                </CardBase>
                <template #actions>
                    <ButtonBase
                        size="small"
                        :variant="isLoading ? 'danger' : 'secondary'"
                        :label="isLoading ? 'Stop' : 'Load'"
                        @click="isLoading = !isLoading"
                    />
                </template>
            </LayoutBase>
        </CardBase>
    </div>
</template>

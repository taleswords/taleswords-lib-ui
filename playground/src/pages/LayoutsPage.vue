<script setup lang="ts">
import { LayoutBase, Breadcrumbs, ButtonBase, CardBase } from '@lib'
import Section from '../components/Section.vue'
import Case from '../components/Case.vue'
import { usePlaygroundControls } from '../composables/usePlaygroundControls'
import { definePlaygroundPage } from '../composables/usePageContract'

definePlaygroundPage({ sections: ['Variants', 'States', 'Density'] })

const { isLoading } = usePlaygroundControls()
</script>

<template>
    <Section title="Variants" :full-width="true">
        <Case title="Basic Layout" layout="columns">
            <LayoutBase title="Page Title" description="This is a page-level layout wrapper.">
                <CardBase>
                    <p>Content inside the layout.</p>
                </CardBase>
            </LayoutBase>
        </Case>
        <Case title="Layout with Breadcrumbs" layout="columns">
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
        </Case>
        <Case title="Layout with Actions" layout="columns">
            <LayoutBase title="Projects" description="Manage your team projects">
                <template #actions>
                    <ButtonBase variant="primary" size="small" label="New Project" />
                </template>
                <CardBase>
                    <p>Layout with action buttons in the header area.</p>
                </CardBase>
            </LayoutBase>
        </Case>
    </Section>

    <Section title="States" :full-width="true">
        <Case title="Loading Layout" layout="columns">
            <LayoutBase title="Dashboard" :is-loading="isLoading">
                <CardBase>
                    <p>This layout responds to the global loading toggle in the right sidebar.</p>
                </CardBase>
            </LayoutBase>
        </Case>
    </Section>

    <Section title="Density" :full-width="true">
        <Case title="Compact" layout="columns">
            <div data-density="compact">
                <LayoutBase title="Compact Layout" description="Layout rendered at compact density">
                    <CardBase>
                        <p>Content inside compact layout.</p>
                    </CardBase>
                </LayoutBase>
            </div>
        </Case>
    </Section>
</template>

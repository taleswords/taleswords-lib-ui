<script setup lang="ts">
import { ref } from 'vue'
import { CardBase, ButtonBase } from '@lib'
import Section from '../components/Section.vue'
import Case from '../components/Case.vue'
import { usePlaygroundControls } from '../composables/usePlaygroundControls'
import { definePlaygroundPage } from '../composables/usePageContract'

definePlaygroundPage({ sections: ['Variants', 'States', 'Density'] })

const { isLoading } = usePlaygroundControls()
const localLoading = ref(false)
</script>

<template>
    <Section title="Variants" :full-width="true">
        <Case title="Basic Card" layout="columns">
            <CardBase title="Basic Card" description="A card with title and description">
                <p>This is the card content area. You can put any content here.</p>
            </CardBase>
        </Case>
        <Case title="Card with Actions" layout="columns">
            <CardBase title="Card with Actions">
                <p>This card has action buttons in the header.</p>
                <template #actions>
                    <ButtonBase variant="ghost" size="small" label="Edit" />
                    <ButtonBase variant="primary" size="small" label="Save" />
                </template>
            </CardBase>
        </Case>
        <Case title="Custom Header Slot" layout="columns">
            <CardBase>
                <template #header>
                    <div style="display: flex; align-items: center; gap: 0.5rem; padding: 1rem;">
                        <h3 style="margin: 0; font-size: 1rem;">Custom Header Slot</h3>
                        <span style="font-size: 0.6875rem; font-weight: 600; padding: 0.125rem 0.5rem; border-radius: 1rem; background: var(--button-primary-bg); color: var(--button-primary-text);">New</span>
                    </div>
                </template>
                <p>This card uses a custom header slot instead of the title prop.</p>
            </CardBase>
        </Case>
    </Section>

    <Section title="States" :full-width="true">
        <Case title="Loading (Global Toggle)" layout="columns">
            <CardBase title="Loading Card" :is-loading="isLoading">
                <p>This card responds to the global loading toggle in the right sidebar.</p>
            </CardBase>
        </Case>
        <Case title="Loading (Local Toggle)" layout="columns">
            <CardBase title="Local Loading" :is-loading="localLoading">
                <p>Toggle the loading state locally.</p>
                <template #actions>
                    <ButtonBase
                        size="small"
                        :variant="localLoading ? 'danger' : 'secondary'"
                        :label="localLoading ? 'Stop' : 'Load'"
                        @click="localLoading = !localLoading"
                    />
                </template>
            </CardBase>
        </Case>
    </Section>

    <Section title="Density" :full-width="true">
        <Case title="Compact" layout="columns">
            <div data-density="compact">
                <CardBase title="Compact Card" description="Card rendered at compact density">
                    <p>Content with tighter spacing.</p>
                </CardBase>
            </div>
        </Case>
    </Section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RowExpandable } from '@lib'
import Section from '../components/Section.vue'
import Case from '../components/Case.vue'
import { definePlaygroundPage } from '../composables/usePageContract'

definePlaygroundPage({ sections: ['Variants', 'Density'], isInteractive: true })

const expanded1 = ref(false)
const expanded2 = ref(true)
</script>

<template>
    <Section title="Variants" :full-width="true">
        <Case title="Collapsed (Long Content)" layout="columns">
            <RowExpandable v-model:expanded="expanded1">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
            </RowExpandable>
        </Case>
        <Case title="Pre-Expanded" layout="columns">
            <RowExpandable v-model:expanded="expanded2">
                <p>This content starts expanded. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.</p>
                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </RowExpandable>
        </Case>
        <Case title="Short Content (No Toggle)" layout="columns">
            <RowExpandable>
                <p>This text is short enough that no toggle button should appear.</p>
            </RowExpandable>
        </Case>
    </Section>

    <Section title="Density" :full-width="true">
        <Case title="Compact" layout="columns">
            <div data-density="compact">
                <RowExpandable>
                    <p>This expandable row is rendered at compact density. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </RowExpandable>
            </div>
        </Case>
    </Section>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onBeforeUnmount } from 'vue'
import { CardBase } from '@lib'
import ButtonHash from '../layout/ButtonHash.vue'
import { SECTION_REGISTRY_KEY } from '../composables/useSectionRegistry'

const props = withDefaults(defineProps<{
    title: string
    fullWidth?: boolean
}>(), {
    fullWidth: false,
})

function toHashId(...parts: string[]): string {
    return parts.filter(Boolean).join('-').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const sectionId = computed(() => toHashId(props.title))

const registry = inject(SECTION_REGISTRY_KEY, null)

onMounted(() => {
    registry?.registerSection({ id: sectionId.value, title: props.title, order: 0 })
})

onBeforeUnmount(() => {
    registry?.unregisterSection(sectionId.value)
})
</script>

<template>
    <CardBase :id="sectionId" class="playground-section" :title="props.title">
        <template #actions>
            <ButtonHash :hash-id="sectionId" />
        </template>
        <div
            class="playground-section__content"
            :class="{ 'playground-section__content--full-width': props.fullWidth }"
        >
            <slot />
        </div>
    </CardBase>
</template>

<style scoped>
.playground-section__content {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}

.playground-section__content--full-width {
    display: flex;
    flex-direction: column;
    width: 100%;
}
</style>

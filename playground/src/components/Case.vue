<script setup lang="ts">
import { ref, computed, inject, onMounted, onBeforeUnmount } from 'vue'
import ButtonHash from '../layout/ButtonHash.vue'
import { SECTION_REGISTRY_KEY } from '../composables/useSectionRegistry'

const props = withDefaults(defineProps<{
    title: string
    layout?: 'row' | 'columns'
}>(), {
    layout: 'columns',
})

function toHashId(...parts: string[]): string {
    return parts.filter(Boolean).join('-').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const caseElement = ref<HTMLElement | null>(null)
const parentId = ref('')

const caseId = computed(() => toHashId(parentId.value, props.title))

const registry = inject(SECTION_REGISTRY_KEY, null)

function getParentSectionId(): void {
    if (!caseElement.value) return
    const parentSection = caseElement.value.closest('.playground-section')
    if (parentSection) {
        parentId.value = parentSection.id || ''
    }
}

onMounted(() => {
    getParentSectionId()
    if (parentId.value) {
        registry?.registerCase({
            id: caseId.value,
            title: props.title,
            sectionId: parentId.value,
            order: 0,
        })
    }
})

onBeforeUnmount(() => {
    registry?.unregisterCase(caseId.value)
})
</script>

<template>
    <div :id="caseId" ref="caseElement" class="playground-case">
        <h3 class="playground-case__title">
            {{ props.title }}
            <ButtonHash :hash-id="caseId" />
        </h3>
        <div
            class="playground-case__content"
            :class="props.layout === 'row' ? 'playground-case__content--row' : 'playground-case__content--columns'"
        >
            <slot />
        </div>
    </div>
</template>

<style scoped>
.playground-case {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.playground-case__title {
    display: flex;
    align-items: center;
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--form-field-label-color);
    margin: 0;
}

.playground-case__content {
    gap: 0.75rem;
}

.playground-case__content--columns {
    display: flex;
    flex-direction: column;
}

.playground-case__content--row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
</style>

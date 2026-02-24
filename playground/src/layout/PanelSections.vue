<script setup lang="ts">
import { inject, computed } from 'vue'
import { SECTION_REGISTRY_KEY } from '../composables/useSectionRegistry'

const registry = inject(SECTION_REGISTRY_KEY, null)

const sections = computed(() => registry?.sections.value ?? [])

function navigateToHash(hashId: string): void {
    const targetElement = document.getElementById(hashId)
    if (!targetElement) return

    window.location.hash = hashId
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' })

    document.querySelectorAll('.hash-highlight').forEach(el => {
        el.classList.remove('hash-highlight')
    })
    targetElement.classList.add('hash-highlight')
    setTimeout(() => {
        targetElement.classList.remove('hash-highlight')
    }, 3000)
}
</script>

<template>
    <div class="panel-sections">
        <div class="panel-sections__header">Sections</div>

        <div v-if="sections.length > 0" class="panel-sections__content">
            <div
                v-for="section in sections"
                :key="section.id"
                class="panel-sections__group"
            >
                <button
                    class="panel-sections__item panel-sections__item--section"
                    :title="section.title"
                    @click="navigateToHash(section.id)"
                >
                    <span class="panel-sections__item-text">{{ section.title }}</span>
                </button>

                <div v-if="section.cases.length > 0" class="panel-sections__cases">
                    <button
                        v-for="caseItem in section.cases"
                        :key="caseItem.id"
                        class="panel-sections__item panel-sections__item--case"
                        :title="caseItem.title"
                        @click="navigateToHash(caseItem.id)"
                    >
                        {{ caseItem.title }}
                    </button>
                </div>
            </div>
        </div>

        <div v-else class="panel-sections__empty">
            No sections
        </div>
    </div>
</template>

<style scoped>
.panel-sections {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.panel-sections__header {
    display: flex;
    align-items: center;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--general-card-border);
    font-weight: 600;
    color: var(--form-field-label-color);
    font-size: 0.875rem;
}

.panel-sections__content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-height: 400px;
    overflow-y: auto;
    padding-right: 0.25rem;
}

.panel-sections__group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.panel-sections__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.375rem 0.75rem;
    border-radius: 4px;
    background: transparent;
    border: none;
    color: var(--form-field-description-color);
    font-size: 0.75rem;
    font-weight: 400;
    text-align: left;
    cursor: pointer;
    transition: all 0.15s ease;
    width: 100%;
    font-family: var(--font-ui);
}

.panel-sections__item-text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.panel-sections__item--section {
    font-weight: 500;
    font-size: 0.8125rem;
    color: var(--form-field-label-color);
}

.panel-sections__item--case {
    padding-left: 1.25rem;
    font-size: 0.75rem;
}

.panel-sections__item:hover {
    background-color: var(--general-hover-bg);
    color: var(--form-field-label-color);
}

.panel-sections__cases {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.panel-sections__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    color: var(--form-field-description-color);
    font-size: 0.75rem;
}
</style>

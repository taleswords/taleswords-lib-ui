<script setup lang="ts">
import { provide, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SidebarLeft from './SidebarLeft.vue'
import SidebarRight from './SidebarRight.vue'
import { useHashNavigation } from '../composables/useHashNavigation'
import { createSectionRegistry, SECTION_REGISTRY_KEY } from '../composables/useSectionRegistry'
import { validatePlaygroundStructure } from '../dev/validateStructure'

const route = useRoute()
const registry = createSectionRegistry()

provide(SECTION_REGISTRY_KEY, registry)

watch(() => route.path, () => {
    registry.clear()
})

useHashNavigation()

onMounted(() => {
    validatePlaygroundStructure()
})

watch(() => route.path, () => {
    validatePlaygroundStructure()
})
</script>

<template>
    <div class="playground-body">
        <SidebarLeft />
        <SidebarRight />

        <div class="playground-body__content">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.playground-body {
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
}

.playground-body__content {
    display: flex;
    flex-direction: column;
    max-width: 960px;
    width: 75%;
    min-width: 0;
    padding: 2rem;
    padding-bottom: 6rem;
    gap: 1.25rem;
}

/* Hash highlight animation */
:deep(.hash-highlight) {
    position: relative;
}

:deep(.hash-highlight::before) {
    content: '';
    position: absolute;
    inset: -8px;
    border: 2px solid var(--button-ghost-primary-text);
    border-radius: 8px;
    background-color: color-mix(in srgb, var(--button-ghost-primary-text) 10%, transparent);
    pointer-events: none;
    animation: hash-highlight-fade 2s ease-in-out forwards;
}

@keyframes hash-highlight-fade {
    0% { opacity: 1; }
    70% { opacity: 1; }
    100% { opacity: 0; }
}
</style>

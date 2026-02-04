<script setup lang="ts">
import type { UiBreadcrumbsProps } from '../types'

const props = defineProps<UiBreadcrumbsProps>()
</script>

<template>
    <nav class="ui-breadcrumbs" aria-label="Breadcrumb">
        <template v-for="(item, index) in props.items" :key="index">
            <p class="ui-breadcrumbs__item">
                <a
                    v-if="item.href && index < props.items.length - 1"
                    :href="item.href"
                    class="ui-breadcrumbs__link"
                >&gt; {{ item.label }}</a>
                <span
                    v-else
                    class="ui-breadcrumbs__current"
                    :aria-current="index === props.items.length - 1 ? 'page' : undefined"
                >&gt; {{ item.label }}</span>
            </p>
        </template>
    </nav>
</template>

<style scoped>
.ui-breadcrumbs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25em;
}

.ui-breadcrumbs__item {
    display: inline-block;
    margin: 0;
}

.ui-breadcrumbs__link,
.ui-breadcrumbs__current {
    white-space: nowrap;
}

.ui-breadcrumbs__link {
    color: var(--ui-link-color);
    text-decoration: none;
    transition: color 0.3s;
}

.ui-breadcrumbs__link:hover {
    color: var(--ui-link-hover);
}

.ui-breadcrumbs__current {
    color: var(--ui-text-color);
}
</style>

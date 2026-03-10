<script setup lang="ts">
import { ButtonBase, TextboxBase, BadgeBase, FormField } from '@lib'
import Section from '../components/Section.vue'
import Case from '../components/Case.vue'
import { definePlaygroundPage } from '../composables/usePageContract'

definePlaygroundPage({ sections: ['Scale', 'Scaling', 'Propagation'] })

const spacingTokens = [
    { name: '2XS', variable: '--space-2xs', base: '2px' },
    { name: 'XS', variable: '--space-xs', base: '4px' },
    { name: 'SM', variable: '--space-sm', base: '8px' },
    { name: 'MD', variable: '--space-md', base: '12px' },
    { name: 'LG', variable: '--space-lg', base: '16px' },
    { name: 'XL', variable: '--space-xl', base: '20px' },
] as const
</script>

<template>
    <Section title="Scale" :full-width="true">
        <Case title="Spacing Token Scale" layout="columns">
            <p class="page-note">
                All spacing in the design system is driven by five semantic tokens.
                Values shown are defaults at <code>--density-scale: 1</code>.
            </p>
            <div class="scale-grid">
                <div
                    v-for="token in spacingTokens"
                    :key="token.name"
                    class="scale-row"
                >
                    <span class="scale-row__label">{{ token.name }}</span>
                    <code class="scale-row__variable">{{ token.variable }}</code>
                    <div class="scale-row__track">
                        <div
                            class="scale-row__bar"
                            :style="{ width: `var(${token.variable})` }"
                        />
                    </div>
                    <span class="scale-row__value">{{ token.base }}</span>
                </div>
            </div>
        </Case>

        <Case title="Spacing as Padding" layout="columns">
            <div class="padding-grid">
                <div
                    v-for="token in spacingTokens"
                    :key="token.name"
                    class="padding-block"
                    :style="{ padding: `var(${token.variable})` }"
                >
                    <code>{{ token.variable }}</code>
                </div>
            </div>
        </Case>
    </Section>

    <Section title="Scaling" :full-width="true">
        <Case title="Default vs Compact Density" layout="columns">
            <p class="page-note">
                Setting <code>data-density="compact"</code> on any container applies
                <code>--density-scale: 0.85</code>, reducing all spacing by 15%.
            </p>
            <div class="density-comparison">
                <div class="density-column">
                    <h4 class="density-column__heading">Default <code>--density-scale: 1</code></h4>
                    <div class="density-column__blocks">
                        <div
                            v-for="token in spacingTokens"
                            :key="token.name"
                            class="density-block"
                            :style="{ padding: `var(${token.variable})` }"
                        >
                            {{ token.name }}
                        </div>
                    </div>
                </div>
                <div class="density-column" data-density="compact">
                    <h4 class="density-column__heading">Compact <code>--density-scale: 0.85</code></h4>
                    <div class="density-column__blocks">
                        <div
                            v-for="token in spacingTokens"
                            :key="token.name"
                            class="density-block"
                            :style="{ padding: `var(${token.variable})` }"
                        >
                            {{ token.name }}
                        </div>
                    </div>
                </div>
            </div>
        </Case>
    </Section>

    <Section title="Propagation" :full-width="true">
        <Case title="Component Propagation — Default" layout="columns">
            <p class="page-note">
                All components inherit <code>--density-scale</code> from their nearest ancestor.
                No per-component density props exist — the system is purely container-driven.
            </p>
            <div class="propagation-demo">
                <FormField label="Username">
                    <TextboxBase model-value="alice" placeholder="Enter name..." />
                </FormField>
                <div class="propagation-demo__row">
                    <ButtonBase variant="primary" label="Save" icon="check" />
                    <ButtonBase variant="secondary" label="Cancel" />
                    <BadgeBase variant="success" label="Active" />
                    <BadgeBase variant="warning" label="2 warnings" size="sm" />
                </div>
            </div>
        </Case>

        <Case title="Component Propagation — Compact" layout="columns">
            <div class="propagation-demo" data-density="compact">
                <FormField label="Username">
                    <TextboxBase model-value="alice" placeholder="Enter name..." />
                </FormField>
                <div class="propagation-demo__row">
                    <ButtonBase variant="primary" label="Save" icon="check" />
                    <ButtonBase variant="secondary" label="Cancel" />
                    <BadgeBase variant="success" label="Active" />
                    <BadgeBase variant="warning" label="2 warnings" size="sm" />
                </div>
            </div>
        </Case>

        <Case title="Side-by-Side Comparison" layout="columns">
            <div class="density-comparison">
                <div class="density-column">
                    <h4 class="density-column__heading">Default</h4>
                    <div class="propagation-demo">
                        <FormField label="Character Name">
                            <TextboxBase model-value="Kael" />
                        </FormField>
                        <FormField label="Description" is-optional>
                            <TextboxBase model-value="A wandering bard" />
                        </FormField>
                        <div class="propagation-demo__row">
                            <ButtonBase variant="primary" label="Save" size="small" />
                            <BadgeBase variant="info" label="Draft" size="sm" />
                        </div>
                    </div>
                </div>
                <div class="density-column" data-density="compact">
                    <h4 class="density-column__heading">Compact</h4>
                    <div class="propagation-demo">
                        <FormField label="Character Name">
                            <TextboxBase model-value="Kael" />
                        </FormField>
                        <FormField label="Description" is-optional>
                            <TextboxBase model-value="A wandering bard" />
                        </FormField>
                        <div class="propagation-demo__row">
                            <ButtonBase variant="primary" label="Save" size="small" />
                            <BadgeBase variant="info" label="Draft" size="sm" />
                        </div>
                    </div>
                </div>
            </div>
        </Case>
    </Section>
</template>

<style scoped>
.page-note {
    margin: 0;
    font-size: var(--text-sm);
    color: var(--form-field-description-color);
    line-height: 1.5;
}

.page-note code {
    font-size: 0.875em;
    background: var(--color-neutral-200);
    padding: 0.125em 0.375em;
    border-radius: 3px;
}

/* ── Scale section ─────────────────────────────── */

.scale-grid {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
}

.scale-row {
    display: grid;
    grid-template-columns: 2rem 10rem 1fr 3rem;
    align-items: center;
    gap: var(--space-md);
}

.scale-row__label {
    font-family: var(--font-ui);
    font-weight: var(--weight-semi);
    font-size: var(--text-sm);
    color: var(--general-text-color);
}

.scale-row__variable {
    font-size: var(--text-sm);
    color: var(--form-field-description-color);
}

.scale-row__track {
    height: var(--space-sm);
    background: var(--color-neutral-200);
    border-radius: 3px;
    overflow: hidden;
}

.scale-row__bar {
    height: 100%;
    background: var(--color-accent-500);
    border-radius: 3px;
    transition: width 0.3s ease;
}

.scale-row__value {
    font-family: var(--font-ui);
    font-size: var(--text-sm);
    color: var(--form-field-description-color);
    text-align: right;
}

/* ── Padding demo ──────────────────────────────── */

.padding-grid {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-md);
}

.padding-block {
    background: var(--color-accent-100);
    border: 1px solid var(--color-accent-300);
    border-radius: 4px;
    font-size: var(--text-sm);
    color: var(--color-accent-700);
}

.padding-block code {
    font-size: 0.8125em;
}

/* ── Density comparison ────────────────────────── */

.density-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-xl);
}

.density-column {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
}

.density-column__heading {
    margin: 0;
    font-family: var(--font-ui);
    font-size: var(--text-sm);
    font-weight: var(--weight-semi);
    color: var(--general-text-color);
}

.density-column__heading code {
    font-weight: var(--weight-regular);
    color: var(--form-field-description-color);
}

.density-column__blocks {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
}

.density-block {
    background: var(--color-accent-100);
    border: 1px solid var(--color-accent-300);
    border-radius: 4px;
    font-family: var(--font-ui);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    color: var(--color-accent-700);
    text-align: center;
}

/* ── Propagation demo ──────────────────────────── */

.propagation-demo {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
}

.propagation-demo__row {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    flex-wrap: wrap;
}
</style>

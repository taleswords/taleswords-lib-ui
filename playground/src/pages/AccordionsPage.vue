<script setup lang="ts">
import { AccordionBase, AccordionItem, BadgeBase, ButtonBase } from '@lib'
import Section from '../components/Section.vue'
import Case from '../components/Case.vue'
import { definePlaygroundPage } from '../composables/usePageContract'

definePlaygroundPage({ sections: ['Variants', 'States', 'Composition', 'Density', 'Accessibility'], isInteractive: true })
</script>

<template>
    <Section title="Variants" :full-width="true">
        <Case title="Single Expand (Default)" layout="columns">
            <AccordionBase>
                <AccordionItem id="faq-1" title="What is lib-ui?">
                    A Vue 3 component library for building admin dashboards.
                </AccordionItem>
                <AccordionItem id="faq-2" title="How do I install it?">
                    Install via npm: <code>npm install @taleswords/lib-ui</code>
                </AccordionItem>
                <AccordionItem id="faq-3" title="Is it accessible?">
                    Yes, all components follow WAI-ARIA patterns and are tested with axe-core.
                </AccordionItem>
            </AccordionBase>
        </Case>
        <Case title="Multiple Expand" layout="columns">
            <AccordionBase allow-multiple>
                <AccordionItem id="multi-1" title="Section A">
                    Content for section A. Multiple sections can be open at once.
                </AccordionItem>
                <AccordionItem id="multi-2" title="Section B">
                    Content for section B.
                </AccordionItem>
                <AccordionItem id="multi-3" title="Section C">
                    Content for section C.
                </AccordionItem>
            </AccordionBase>
        </Case>
        <Case title="Default Expanded (specific IDs)" layout="columns">
            <AccordionBase allow-multiple :default-expanded="['def-1', 'def-3']">
                <AccordionItem id="def-1" title="Open by default">
                    This item starts expanded via defaultExpanded.
                </AccordionItem>
                <AccordionItem id="def-2" title="Collapsed by default">
                    This item starts collapsed.
                </AccordionItem>
                <AccordionItem id="def-3" title="Also open by default">
                    This item also starts expanded.
                </AccordionItem>
            </AccordionBase>
        </Case>
        <Case title="Default Expanded (all)" layout="columns">
            <AccordionBase allow-multiple default-expanded="all">
                <AccordionItem id="all-1" title="First Section">
                    All sections start expanded when defaultExpanded is "all".
                </AccordionItem>
                <AccordionItem id="all-2" title="Second Section">
                    You can still collapse and re-expand each section.
                </AccordionItem>
                <AccordionItem id="all-3" title="Third Section">
                    Runtime toggling works normally after initial mount.
                </AccordionItem>
            </AccordionBase>
        </Case>
    </Section>

    <Section title="States" :full-width="true">
        <Case title="Disabled Item" layout="columns">
            <AccordionBase>
                <AccordionItem id="dis-1" title="Enabled Item">
                    This item can be toggled normally.
                </AccordionItem>
                <AccordionItem id="dis-2" title="Disabled Item" is-disabled>
                    You should not be able to see this.
                </AccordionItem>
                <AccordionItem id="dis-3" title="Another Enabled Item">
                    This item also works fine.
                </AccordionItem>
            </AccordionBase>
        </Case>
    </Section>

    <Section title="Composition" :full-width="true">
        <Case title="Rich Content" layout="columns">
            <AccordionBase>
                <AccordionItem id="rich-1" title="User Details">
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <p style="margin: 0; display: flex; align-items: center; gap: 0.5rem;"><strong>Name:</strong> Alice Johnson</p>
                        <p style="margin: 0; display: flex; align-items: center; gap: 0.5rem;"><strong>Role:</strong> <BadgeBase variant="admin" label="Admin" /></p>
                        <p style="margin: 0; display: flex; align-items: center; gap: 0.5rem;"><strong>Status:</strong> <BadgeBase variant="accepted" label="Active" /></p>
                        <ButtonBase variant="secondary" size="small" icon="edit" label="Edit Profile" />
                    </div>
                </AccordionItem>
                <AccordionItem id="rich-2" title="Permissions">
                    <p style="margin: 0;">Full access to all dashboard features including user management, analytics, and settings.</p>
                </AccordionItem>
            </AccordionBase>
        </Case>
        <Case title="Trigger Slots" layout="columns">
            <AccordionBase allow-multiple>
                <AccordionItem id="slot-suffix" title="Pepper Signals">
                    <template #trigger-suffix>
                        <BadgeBase variant="danger" label="3" size="sm" />
                    </template>
                    Governance signals for this section. The badge in the header shows the count at a glance.
                </AccordionItem>
                <AccordionItem id="slot-multi" title="Validation">
                    <template #trigger-suffix>
                        <span style="display: flex; gap: 0.25rem;">
                            <BadgeBase variant="danger" label="2" size="sm" />
                            <BadgeBase variant="warning" label="5" size="sm" />
                        </span>
                    </template>
                    Multiple severity badges grouped in the suffix slot.
                </AccordionItem>
                <AccordionItem id="slot-prefix" title="Settings">
                    <template #trigger-prefix>
                        <span class="material-symbols-rounded" style="font-size: 1.125em;" aria-hidden="true">settings</span>
                    </template>
                    A prefix icon before the title text.
                </AccordionItem>
                <AccordionItem id="slot-both" title="Combined">
                    <template #trigger-prefix>
                        <span class="material-symbols-rounded" style="font-size: 1.125em;" aria-hidden="true">shield</span>
                    </template>
                    <template #trigger-suffix>
                        <BadgeBase variant="success" label="OK" size="sm" />
                    </template>
                    Both prefix icon and suffix badge.
                </AccordionItem>
            </AccordionBase>
        </Case>
        <Case title="Trigger Slots — Compact" layout="columns">
            <div data-density="compact">
                <AccordionBase allow-multiple>
                    <AccordionItem id="cslot-1" title="Compact with Badge">
                        <template #trigger-suffix>
                            <BadgeBase variant="warning" label="7" size="sm" />
                        </template>
                        Density-scaled margins on slot wrappers.
                    </AccordionItem>
                    <AccordionItem id="cslot-2" title="Compact with Icon">
                        <template #trigger-prefix>
                            <span class="material-symbols-rounded" style="font-size: 1.125em;" aria-hidden="true">lock</span>
                        </template>
                        Prefix icon at compact density.
                    </AccordionItem>
                </AccordionBase>
            </div>
        </Case>
    </Section>

    <Section title="Density" :full-width="true">
        <Case title="Compact" layout="columns">
            <div data-density="compact">
                <AccordionBase>
                    <AccordionItem id="compact-1" title="Compact Section A">
                        Tighter padding via density-scale: 0.85. Compare with default above.
                    </AccordionItem>
                    <AccordionItem id="compact-2" title="Compact Section B">
                        Content area also uses reduced spacing.
                    </AccordionItem>
                    <AccordionItem id="compact-3" title="Compact Section C">
                        Suitable for inspector panels and sidebars.
                    </AccordionItem>
                </AccordionBase>
            </div>
        </Case>
    </Section>

    <Section title="Accessibility">
        <Case title="Keyboard Navigation" layout="columns">
            <p>Enter/Space toggles the focused accordion item. Arrow keys move between headers. Home/End jump to first/last header. Disabled items are skipped.</p>
        </Case>
    </Section>
</template>

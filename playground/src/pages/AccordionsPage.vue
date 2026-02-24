<script setup lang="ts">
import { AccordionBase, AccordionItem, BadgeBase, ButtonBase, CardBase } from '@lib'
</script>

<template>
    <div class="page" data-testid="page-accordions">
        <h1>Accordions</h1>

        <CardBase title="Single Expand (Default)">
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
        </CardBase>

        <CardBase title="Multiple Expand">
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
        </CardBase>

        <CardBase title="Disabled Item">
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
        </CardBase>

        <CardBase title="Rich Content">
            <AccordionBase>
                <AccordionItem id="rich-1" title="User Details">
                    <div class="rich-content">
                        <p><strong>Name:</strong> Alice Johnson</p>
                        <p><strong>Role:</strong> <BadgeBase variant="admin" label="Admin" /></p>
                        <p><strong>Status:</strong> <BadgeBase variant="accepted" label="Active" /></p>
                        <ButtonBase variant="secondary" size="small" label="Edit Profile" />
                    </div>
                </AccordionItem>
                <AccordionItem id="rich-2" title="Permissions">
                    <div class="rich-content">
                        <p>Full access to all dashboard features including user management, analytics, and settings.</p>
                    </div>
                </AccordionItem>
            </AccordionBase>
        </CardBase>
    </div>
</template>

<style scoped>
.rich-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.rich-content p {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
</style>

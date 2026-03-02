<script setup lang="ts">
import { ref } from 'vue'
import { TooltipBase, ButtonBase, BadgeBase } from '@lib'
import Section from '../components/Section.vue'
import Case from '../components/Case.vue'
import { definePlaygroundPage } from '../composables/usePageContract'

definePlaygroundPage({ sections: ['Variants', 'States', 'Composition', 'Density', 'Accessibility'], isInteractive: true })

const placements = ['top', 'bottom', 'left', 'right'] as const
const isDisabled = ref(false)
</script>

<template>
    <Section title="Variants">
        <Case title="Placement" layout="row">
            <TooltipBase
                v-for="p in placements"
                :key="p"
                :content="`Tooltip on ${p}`"
                :placement="p"
            >
                <ButtonBase :label="p" variant="secondary" />
            </TooltipBase>
        </Case>

        <Case title="Custom Content Slot" layout="row">
            <TooltipBase placement="bottom">
                <ButtonBase label="Rich content" variant="secondary" />
                <template #content>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        <strong>Custom Tooltip</strong>
                        <span>With multiple lines and <em>formatting</em>.</span>
                    </div>
                </template>
            </TooltipBase>
        </Case>

        <Case title="No Arrow" layout="row">
            <TooltipBase content="No arrow tooltip" :has-arrow="false">
                <ButtonBase label="No arrow" variant="secondary" />
            </TooltipBase>
        </Case>

        <Case title="Long Content" layout="row">
            <TooltipBase content="This is a longer tooltip message that demonstrates how text wraps inside a tooltip when the content exceeds the default max width." placement="bottom">
                <ButtonBase label="Long text" variant="secondary" />
            </TooltipBase>
        </Case>
    </Section>

    <Section title="States">
        <Case title="Disabled Toggle" layout="row">
            <ButtonBase
                :label="isDisabled ? 'Enable tooltip' : 'Disable tooltip'"
                variant="ghost"
                @click="isDisabled = !isDisabled"
            />
            <TooltipBase content="I can be disabled" :is-disabled="isDisabled">
                <ButtonBase label="Hover me" variant="secondary" />
            </TooltipBase>
        </Case>

        <Case title="On Different Elements" layout="row">
            <TooltipBase content="Tooltip on a badge">
                <BadgeBase variant="admin" label="Admin" />
            </TooltipBase>
            <TooltipBase content="Tooltip on plain text">
                <span style="cursor: default; text-decoration: underline dotted;">Hover this text</span>
            </TooltipBase>
        </Case>
    </Section>

    <Section title="Composition">
        <Case title="With Custom Delay" layout="row">
            <TooltipBase content="Slow open (500ms)" :open-delay-ms="500" placement="top">
                <ButtonBase label="Slow open" variant="secondary" />
            </TooltipBase>
            <TooltipBase content="No delay" :open-delay-ms="0" :close-delay-ms="0" placement="top">
                <ButtonBase label="Instant" variant="secondary" />
            </TooltipBase>
        </Case>

        <Case title="Custom Max Width" layout="row">
            <TooltipBase content="Narrow tooltip" max-width="120px" placement="bottom">
                <ButtonBase label="120px wide" variant="secondary" />
            </TooltipBase>
            <TooltipBase content="This tooltip has a wider max width of 400px for more content." max-width="400px" placement="bottom">
                <ButtonBase label="400px wide" variant="secondary" />
            </TooltipBase>
        </Case>
    </Section>

    <Section title="Density">
        <Case title="Compact" layout="row">
            <div data-density="compact" style="display: flex; gap: 0.5rem;">
                <TooltipBase content="Compact tooltip trigger" placement="top">
                    <ButtonBase label="Compact" variant="secondary" />
                </TooltipBase>
                <TooltipBase content="Another compact trigger" placement="bottom">
                    <ButtonBase label="Hover me" variant="primary" />
                </TooltipBase>
            </div>
        </Case>
    </Section>

    <Section title="Accessibility">
        <Case title="Keyboard Focus" layout="row">
            <TooltipBase content="Tab to me and I'll appear" placement="top">
                <ButtonBase label="Focus me with Tab" variant="primary" />
            </TooltipBase>
            <TooltipBase content="Escape key closes me" placement="top">
                <ButtonBase label="Then press Escape" variant="secondary" />
            </TooltipBase>
        </Case>
    </Section>
</template>

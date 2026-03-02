<script setup lang="ts">
import { ref } from 'vue'
import { ModalBase, ButtonBase } from '@lib'
import Section from '../components/Section.vue'
import Case from '../components/Case.vue'
import { definePlaygroundPage } from '../composables/usePageContract'

definePlaygroundPage({ sections: ['Variants', 'Sizes', 'States', 'Composition', 'Density', 'Accessibility'], isInteractive: true })

const showBasic = ref(false)
const showSmall = ref(false)
const showLarge = ref(false)
const showFull = ref(false)
const showBeforeClose = ref(false)
const showNested = ref(false)
const showNestedInner = ref(false)
const showCustomSlots = ref(false)

async function confirmClose(): Promise<boolean> {
    return window.confirm('Are you sure you want to close?')
}
</script>

<template>
    <Section title="Variants">
        <Case title="Basic Modal" layout="row">
            <ButtonBase
                variant="primary"
                icon="open_in_new"
                label="Open Basic Modal"
                data-testid="open-basic-modal"
                @click="showBasic = true"
            />
            <ModalBase v-model="showBasic" title="Basic Modal">
                <p>This is a basic modal with default settings.</p>
                <template #footer="{ close }">
                    <ButtonBase variant="secondary" label="Cancel" @click="close" />
                    <ButtonBase variant="primary" label="Confirm" @click="close" />
                </template>
            </ModalBase>
        </Case>
    </Section>

    <Section title="Sizes">
        <Case title="Small, Large, Fullscreen" layout="row">
            <ButtonBase variant="secondary" icon="crop_square" label="Small" @click="showSmall = true" />
            <ButtonBase variant="secondary" icon="aspect_ratio" label="Large" @click="showLarge = true" />
            <ButtonBase variant="secondary" icon="fullscreen" label="Fullscreen" @click="showFull = true" />

            <ModalBase v-model="showSmall" size="small" title="Small Modal">
                <p>This is a small modal.</p>
                <template #footer="{ close }">
                    <ButtonBase variant="secondary" label="Close" @click="close" />
                </template>
            </ModalBase>
            <ModalBase v-model="showLarge" size="large" title="Large Modal">
                <p>This is a large modal with more space for content.</p>
                <template #footer="{ close }">
                    <ButtonBase variant="secondary" label="Cancel" @click="close" />
                    <ButtonBase variant="primary" label="Save" @click="close" />
                </template>
            </ModalBase>
            <ModalBase v-model="showFull" size="full" title="Fullscreen Modal">
                <p>This modal takes the full screen.</p>
                <template #footer="{ close }">
                    <ButtonBase variant="secondary" label="Close" @click="close" />
                </template>
            </ModalBase>
        </Case>
    </Section>

    <Section title="States">
        <Case title="Before Close (Confirm Dialog)" layout="row">
            <ButtonBase
                variant="danger"
                icon="warning"
                label="Open with Confirm"
                data-testid="open-confirm-modal"
                @click="showBeforeClose = true"
            />
            <ModalBase
                v-model="showBeforeClose"
                title="Unsaved Changes"
                :before-close="confirmClose"
            >
                <p>Try closing this modal — you'll get a confirm dialog.</p>
                <template #footer="{ close }">
                    <ButtonBase variant="secondary" label="Discard" @click="close" />
                    <ButtonBase variant="primary" label="Save Changes" @click="close" />
                </template>
            </ModalBase>
        </Case>
    </Section>

    <Section title="Composition">
        <Case title="Nested Modals" layout="row">
            <ButtonBase
                variant="primary"
                icon="layers"
                label="Open Outer Modal"
                data-testid="open-nested-modal"
                @click="showNested = true"
            />
            <ModalBase v-model="showNested" title="Outer Modal">
                <p>This is the outer modal.</p>
                <ButtonBase
                    variant="secondary"
                    label="Open Inner Modal"
                    @click="showNestedInner = true"
                />
                <ModalBase v-model="showNestedInner" size="small" title="Inner Modal">
                    <p>This is a nested modal inside the outer one.</p>
                    <template #footer="{ close }">
                        <ButtonBase variant="secondary" label="Close" @click="close" />
                    </template>
                </ModalBase>
                <template #footer="{ close }">
                    <ButtonBase variant="secondary" label="Cancel" @click="close" />
                    <ButtonBase variant="primary" label="Done" @click="close" />
                </template>
            </ModalBase>
        </Case>
        <Case title="Custom Header and Footer Slots" layout="row">
            <ButtonBase
                variant="secondary"
                icon="tune"
                label="Custom Header & Footer"
                @click="showCustomSlots = true"
            />
            <ModalBase v-model="showCustomSlots">
                <template #header="{ close }">
                    <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; border-bottom: 1px solid var(--general-card-border);">
                        <h3 style="margin: 0; font-size: 1.125rem;">Custom Header</h3>
                        <ButtonBase variant="ghost" icon="close" @click="close" />
                    </div>
                </template>
                <p>Modal with custom header and footer slots.</p>
                <template #footer="{ close }">
                    <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                        <span style="font-size: 0.8125rem; color: var(--form-field-description-color);">Step 1 of 3</span>
                        <ButtonBase variant="primary" label="Next" @click="close" />
                    </div>
                </template>
            </ModalBase>
        </Case>
    </Section>

    <Section title="Density">
        <Case title="Compact Trigger" layout="row">
            <div data-density="compact" style="display: flex; gap: 0.75rem;">
                <ButtonBase variant="primary" label="Compact Primary" />
                <ButtonBase variant="secondary" label="Compact Secondary" />
            </div>
        </Case>
    </Section>

    <Section title="Accessibility">
        <Case title="Focus Trap" layout="columns">
            <p>Modals implement focus trapping. Tab cycles through focusable elements within the modal. Escape closes the modal. Focus returns to the trigger element on close.</p>
        </Case>
    </Section>
</template>

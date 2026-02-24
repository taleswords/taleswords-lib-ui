<script setup lang="ts">
import { ref } from 'vue'
import { ModalBase, ButtonBase, CardBase } from '@lib'

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
    <div class="page" data-testid="page-modals">
        <h1>Modals</h1>

        <CardBase title="Basic Modal">
            <ButtonBase
                variant="primary"
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
        </CardBase>

        <CardBase title="Sizes">
            <div class="demo-row">
                <ButtonBase variant="secondary" label="Small" @click="showSmall = true" />
                <ButtonBase variant="secondary" label="Large" @click="showLarge = true" />
                <ButtonBase variant="secondary" label="Fullscreen" @click="showFull = true" />
            </div>

            <ModalBase v-model="showSmall" size="small" title="Small Modal">
                <p>This is a small modal.</p>
            </ModalBase>
            <ModalBase v-model="showLarge" size="large" title="Large Modal">
                <p>This is a large modal with more space for content.</p>
            </ModalBase>
            <ModalBase v-model="showFull" size="full" title="Fullscreen Modal">
                <p>This modal takes the full screen.</p>
            </ModalBase>
        </CardBase>

        <CardBase title="Before Close (Confirm)">
            <ButtonBase
                variant="danger"
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
            </ModalBase>
        </CardBase>

        <CardBase title="Nested Modals">
            <ButtonBase
                variant="primary"
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
                </ModalBase>
            </ModalBase>
        </CardBase>

        <CardBase title="Custom Slots">
            <ButtonBase
                variant="secondary"
                label="Custom Header & Footer"
                @click="showCustomSlots = true"
            />
            <ModalBase v-model="showCustomSlots">
                <template #header="{ close }">
                    <div class="custom-header">
                        <h3>Custom Header</h3>
                        <ButtonBase variant="ghost" icon="close" @click="close" />
                    </div>
                </template>
                <p>Modal with custom header and footer slots.</p>
                <template #footer="{ close }">
                    <div class="custom-footer">
                        <span class="custom-footer__hint">Step 1 of 3</span>
                        <ButtonBase variant="primary" label="Next" @click="close" />
                    </div>
                </template>
            </ModalBase>
        </CardBase>
    </div>
</template>

<style scoped>
.demo-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.custom-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid var(--general-card-border);
}

.custom-header h3 {
    margin: 0;
    font-size: 1.125rem;
}

.custom-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.custom-footer__hint {
    font-size: 0.8125rem;
    color: var(--form-field-description-color);
}
</style>

<script setup lang="ts">
import { ButtonBase, BannerArea, CardBase, useToast, useBanner } from '@lib'

const { addToast } = useToast()
const { addBanner } = useBanner()

function fireToast(variant: 'info' | 'success' | 'warning' | 'error'): void {
    addToast({ message: `This is a ${variant} toast`, variant })
}

function firePersistentToast(): void {
    addToast({ message: 'This toast stays until dismissed', variant: 'info', isPersistent: true })
}

function fireBanner(variant: 'info' | 'success' | 'warning' | 'error'): void {
    addBanner({ message: `This is a ${variant} banner`, variant })
}

function fireDontShowAgainBanner(): void {
    addBanner({
        message: 'This banner has a "don\'t show again" option',
        variant: 'info',
        hasDontShowAgain: true,
    })
}
</script>

<template>
    <div class="page" data-testid="page-notifications">
        <h1>Notifications</h1>

        <CardBase title="Toast Triggers">
            <p class="demo-hint">Toasts appear in the top-right corner (via ToastArea in App.vue).</p>
            <div class="demo-row">
                <ButtonBase variant="secondary" label="Info Toast" @click="fireToast('info')" />
                <ButtonBase variant="primary" label="Success Toast" @click="fireToast('success')" />
                <ButtonBase variant="ghost-danger" label="Warning Toast" @click="fireToast('warning')" />
                <ButtonBase variant="danger" label="Error Toast" @click="fireToast('error')" />
            </div>
        </CardBase>

        <CardBase title="Persistent Toast">
            <p class="demo-hint">This toast won't auto-dismiss.</p>
            <ButtonBase variant="secondary" label="Add Persistent Toast" @click="firePersistentToast" />
        </CardBase>

        <CardBase title="Banner Triggers">
            <div class="demo-row">
                <ButtonBase variant="secondary" label="Info Banner" @click="fireBanner('info')" />
                <ButtonBase variant="primary" label="Success Banner" @click="fireBanner('success')" />
                <ButtonBase variant="ghost-danger" label="Warning Banner" @click="fireBanner('warning')" />
                <ButtonBase variant="danger" label="Error Banner" @click="fireBanner('error')" />
            </div>
        </CardBase>

        <CardBase title="Don't Show Again Banner">
            <ButtonBase variant="secondary" label="Add Banner with Don't Show Again" @click="fireDontShowAgainBanner" />
        </CardBase>

        <CardBase title="Banner Area (Inline)">
            <p class="demo-hint">Banners added above will appear here:</p>
            <BannerArea />
        </CardBase>
    </div>
</template>

<style scoped>
.demo-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.demo-hint {
    margin-bottom: 0.75rem;
    font-size: 0.8125rem;
    color: var(--form-field-description-color);
}
</style>

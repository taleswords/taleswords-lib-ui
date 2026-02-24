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
                <ButtonBase variant="secondary" label="Info Toast" data-testid="toast-info" @click="fireToast('info')" />
                <ButtonBase variant="primary" label="Success Toast" data-testid="toast-success" @click="fireToast('success')" />
                <ButtonBase variant="ghost-danger" label="Warning Toast" data-testid="toast-warning" @click="fireToast('warning')" />
                <ButtonBase variant="danger" label="Error Toast" data-testid="toast-error" @click="fireToast('error')" />
            </div>
        </CardBase>

        <CardBase title="Persistent Toast">
            <p class="demo-hint">This toast won't auto-dismiss.</p>
            <ButtonBase variant="secondary" label="Add Persistent Toast" data-testid="toast-persistent" @click="firePersistentToast" />
        </CardBase>

        <CardBase title="Banner Triggers">
            <div class="demo-row">
                <ButtonBase variant="secondary" label="Info Banner" data-testid="banner-info" @click="fireBanner('info')" />
                <ButtonBase variant="primary" label="Success Banner" data-testid="banner-success" @click="fireBanner('success')" />
                <ButtonBase variant="ghost-danger" label="Warning Banner" data-testid="banner-warning" @click="fireBanner('warning')" />
                <ButtonBase variant="danger" label="Error Banner" data-testid="banner-error" @click="fireBanner('error')" />
            </div>
        </CardBase>

        <CardBase title="Don't Show Again Banner">
            <ButtonBase variant="secondary" label="Add Banner with Don't Show Again" data-testid="banner-dont-show" @click="fireDontShowAgainBanner" />
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

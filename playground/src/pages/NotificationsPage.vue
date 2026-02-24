<script setup lang="ts">
import { ButtonBase, BannerArea, useToast, useBanner } from '@lib'
import Section from '../components/Section.vue'
import Case from '../components/Case.vue'
import { definePlaygroundPage } from '../composables/usePageContract'

definePlaygroundPage({ sections: ['Variants', 'States', 'Composition', 'Accessibility'], isInteractive: true })

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
    <Section title="Variants">
        <Case title="Toast Variants" layout="row">
            <ButtonBase variant="secondary" icon="info" label="Info Toast" data-testid="toast-info" @click="fireToast('info')" />
            <ButtonBase variant="primary" icon="check_circle" label="Success Toast" data-testid="toast-success" @click="fireToast('success')" />
            <ButtonBase variant="ghost-danger" icon="warning" label="Warning Toast" data-testid="toast-warning" @click="fireToast('warning')" />
            <ButtonBase variant="danger" icon="error" label="Error Toast" data-testid="toast-error" @click="fireToast('error')" />
        </Case>
        <Case title="Banner Variants" layout="row">
            <ButtonBase variant="secondary" icon="info" label="Info Banner" data-testid="banner-info" @click="fireBanner('info')" />
            <ButtonBase variant="primary" icon="check_circle" label="Success Banner" data-testid="banner-success" @click="fireBanner('success')" />
            <ButtonBase variant="ghost-danger" icon="warning" label="Warning Banner" data-testid="banner-warning" @click="fireBanner('warning')" />
            <ButtonBase variant="danger" icon="error" label="Error Banner" data-testid="banner-error" @click="fireBanner('error')" />
        </Case>
    </Section>

    <Section title="States">
        <Case title="Persistent Toast" layout="row">
            <ButtonBase variant="secondary" icon="push_pin" label="Add Persistent Toast" data-testid="toast-persistent" @click="firePersistentToast" />
        </Case>
        <Case title="Don't Show Again Banner" layout="row">
            <ButtonBase variant="secondary" icon="visibility_off" label="Add Banner with Don't Show Again" data-testid="banner-dont-show" @click="fireDontShowAgainBanner" />
        </Case>
    </Section>

    <Section title="Composition" :full-width="true">
        <Case title="Inline Banner Area" layout="columns">
            <p style="margin-bottom: 0.5rem; font-size: 0.8125rem; color: var(--form-field-description-color);">Banners triggered above appear here:</p>
            <BannerArea />
        </Case>
    </Section>

    <Section title="Accessibility">
        <Case title="Announcements" layout="columns">
            <p>Toasts use role="alert" for screen reader announcements. Banners are dismissible via keyboard (Escape or close button). Persistent toasts require explicit dismissal.</p>
        </Case>
    </Section>
</template>

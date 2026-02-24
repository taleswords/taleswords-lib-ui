<script setup lang="ts">
import { ToastArea } from '@lib'
import Body from './layout/Body.vue'
</script>

<template>
    <Body>
        <router-view />
    </Body>
    <ToastArea />
</template>

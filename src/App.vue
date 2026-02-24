<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AuthLayout from './components/layouts/AuthLayout.vue'
import DefaultLayout from './components/layouts/DefaultLayout.vue'

const route = useRoute()

const layouts = {
    default: DefaultLayout,
    auth: AuthLayout,
}

const currentLayout = computed(() => {
    const layoutName = (route.meta.layout as string) || 'default'
    return layouts[layoutName as keyof typeof layouts]
})
</script>

<template>
    <component :is="currentLayout">
        <RouterView />
    </component>
</template>

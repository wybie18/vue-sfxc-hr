<script setup lang="ts">
import { computed } from 'vue'

interface SchoolLogoProps {
    // 1. Add 'responsive' to the type definition
    variant?: 'horizontal' | 'vertical' | 'logo-only' | 'text-only' | 'responsive'
    logoSrc: string
    textSrc: string
    alt?: string
    logoClass?: string
    textClass?: string
}

const props = withDefaults(defineProps<SchoolLogoProps>(), {
    variant: 'horizontal',
    alt: 'SFXC Logo',
    logoClass: '',
    textClass: '',
})

const containerClasses = computed(() => {
    const baseClasses = 'inline-flex items-center'

    switch (props.variant) {
        case 'horizontal':
            return `${baseClasses} flex-row gap-3`
        case 'vertical':
            return `${baseClasses} flex-col gap-2`
        // 2. Add the responsive case
        // default (mobile) = flex-col & gap-2
        // lg (desktop)   = flex-row & gap-3
        case 'responsive':
            return `${baseClasses} flex-col gap-2 lg:flex-row lg:gap-3`
        case 'logo-only':
        case 'text-only':
            return baseClasses
        default:
            return baseClasses
    }
})

// 3. Update visibility checks to include 'responsive'
// Using .includes() is cleaner than multiple || checks
const showLogo = computed(() =>
    ['horizontal', 'vertical', 'logo-only', 'responsive'].includes(props.variant),
)

const showText = computed(() =>
    ['horizontal', 'vertical', 'text-only', 'responsive'].includes(props.variant),
)
</script>

<template>
    <div :class="containerClasses">
        <img
            v-if="showLogo"
            :src="logoSrc"
            :alt="alt"
            :class="['object-contain h-auto', props.logoClass]"
        />
        <img
            v-if="showText"
            :src="textSrc"
            :alt="`${alt} Text`"
            :class="['object-contain h-auto', props.textClass]"
        />
    </div>
</template>

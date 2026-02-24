<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SchoolLogo from '@/components/ui/custom/logo/SchoolLogo.vue'
import SFXCLogoOnly from '@/assets/images/logo/sfxc-logo-only.png'
import SFXCTextOnly from '@/assets/images/logo/sfxc-text-only.png'
import { useAuthStore } from '@/stores/auth'

const backgroundImages = [
    new URL('@/assets/images/login/login-image-01.jpg', import.meta.url).href,
    new URL('@/assets/images/login/login-image-02.jpg', import.meta.url).href,
    new URL('@/assets/images/login/login-image-03.jpg', import.meta.url).href,
]

const currentImageIndex = ref(0)
let slideshowInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
    slideshowInterval = setInterval(() => {
        currentImageIndex.value = (currentImageIndex.value + 1) % backgroundImages.length
    }, 5000)
})

onUnmounted(() => {
    if (slideshowInterval) clearInterval(slideshowInterval)
})

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
    errorMessage.value = ''
    isLoading.value = true

    try {
        const success = await authStore.login({
            email: email.value,
            password: password.value,
        })

        if (success) {
            router.push('/dashboard')
        } else {
            throw new Error('Invalid Email or Password.')
        }
    } catch (err: any) {
        errorMessage.value = err.message
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <div class="min-h-screen w-full flex items-center justify-center bg-slate-100 p-4 md:p-8">
        <div
            class="flex flex-col lg:flex-row w-100px max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5"
        >
            <div class="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <div class="w-full max-w-sm mx-auto space-y-8">
                    <div class="text-center lg:text-left space-y-3">
                        <SchoolLogo
                            :logo-src="SFXCLogoOnly"
                            :text-src="SFXCTextOnly"
                            variant="responsive"
                            alt="St. Francis Xavier College Logo"
                            logo-class="w-18"
                            text-class="w-58"
                        />
                    </div>

                    <div class="space-y-6">
                        <div class="space-y-2">
                            <h2 class="text-xl font-semibold">Welcome Back!</h2>
                            <p class="text-sm text-muted-foreground">
                                Please enter your school credentials to access your account.
                            </p>
                        </div>

                        <div
                            v-if="errorMessage"
                            class="p-3 text-sm font-medium text-destructive bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            {{ errorMessage }}
                        </div>

                        <form @submit.prevent="handleLogin" class="space-y-4">
                            <div class="space-y-1.5">
                                <Label for="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    v-model="email"
                                    class="h-12"
                                    :disabled="isLoading"
                                    tabindex="1"
                                    required
                                />
                            </div>
                            <div class="space-y-1.5">
                                <div class="flex items-center justify-between">
                                    <Label for="password">Password</Label>
                                    <a
                                        href="#"
                                        class="text-xs font-medium text-primary hover:underline"
                                        tabindex="3"
                                        >Forgot password?</a
                                    >
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    v-model="password"
                                    class="h-12"
                                    :disabled="isLoading"
                                    tabindex="2"
                                    required
                                />
                            </div>

                            <Button type="submit" class="w-full h-12" :disabled="isLoading">
                                <template v-if="isLoading">
                                    <svg
                                        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            class="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            stroke-width="4"
                                        ></circle>
                                        <path
                                            class="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Verifying...
                                </template>
                                <span v-else>Sign In</span>
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            <div
                class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900 p-12 text-white items-center justify-center"
            >
                <div class="absolute inset-0 z-0">
                    <div
                        v-for="(imgUrl, index) in backgroundImages"
                        :key="imgUrl"
                        class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                        :class="index === currentImageIndex ? 'opacity-40' : 'opacity-0'"
                        :style="{ backgroundImage: `url('${imgUrl}')` }"
                    />
                    <div
                        class="absolute inset-0 bg-linear-to-br from-green-900/40 to-blue-900/40 z-10"
                    />
                </div>

                <div class="relative z-20 flex flex-col h-full w-full">
                    <div class="text-sm font-bold tracking-widest uppercase opacity-70">
                        SFXC • Since 1991
                    </div>

                    <div class="flex-1 flex flex-col justify-center">
                        <h2 class="text-5xl font-black leading-tight italic">
                            <span
                                class="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-200"
                            >
                                EXCELLENCE
                            </span>
                            <br />IN EDUCATION
                        </h2>
                        <p class="mt-6 text-xl text-slate-200 font-light max-w-md">
                            Nurturing minds, building futures, and shaping the leaders of tomorrow.
                        </p>
                    </div>

                    <div class="mt-auto">
                        <blockquote class="border-l-4 border-emerald-500 pl-6">
                            <p class="text-lg italic font-light">
                                "The beautiful thing about learning is that no one can take it away
                                from you."
                            </p>
                            <footer class="mt-2 text-sm font-bold text-emerald-400">
                                — B.B. KING
                            </footer>
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

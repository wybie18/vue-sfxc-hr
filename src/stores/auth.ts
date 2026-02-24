import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/authService'
import type { User, LoginCredentials } from '@/types/user'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
    // State
    const user = ref<User | null>(null)
    const token = ref<string | null>(localStorage.getItem('auth_token'))
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    // Getters
    const isAuthenticated = computed(() => !!token.value && !!user.value)
    const isAdmin = computed(() => user.value?.role === 'admin')

    async function login(credentials: LoginCredentials): Promise<boolean> {
        isLoading.value = true
        error.value = null

        try {
            const response = await authService.login(credentials)

            // Store token
            token.value = response.token
            localStorage.setItem('auth_token', response.token)

            // Store user data
            user.value = response.user

            return true
        } catch (err: unknown) {
            const axiosError = err as { response?: { data?: { message?: string } } }
            error.value = axiosError.response?.data?.message || 'Login failed. Please try again.'
            return false
        } finally {
            isLoading.value = false
        }
    }

    async function logout(): Promise<void> {
        isLoading.value = true

        try {
            await authService.logout()
        } catch (err) {
            console.error('Logout API error:', err)
        } finally {
            // Clear state
            user.value = null
            token.value = null
            localStorage.removeItem('auth_token')
            isLoading.value = false

            router.push('/')
        }
    }

    async function fetchUser(): Promise<boolean> {
        if (!token.value) {
            return false
        }

        isLoading.value = true
        error.value = null

        try {
            const response = await authService.me()
            user.value = response

            return true
        } catch (err) {
            // Token is invalid or expired
            user.value = null
            token.value = null
            localStorage.removeItem('auth_token')
            return false
        } finally {
            isLoading.value = false
        }
    }

    function clearError(): void {
        error.value = null
    }

    // Check if user has a specific role
    function hasRole(role: 'admin' | 'user'): boolean {
        return user.value?.role === role
    }

    return {
        // State
        user,
        token,
        isLoading,
        error,

        // Getters
        isAuthenticated,
        isAdmin,

        // Actions
        login,
        logout,
        fetchUser,
        clearError,
        hasRole,
    }
})

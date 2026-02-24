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

    /**
     * Returns an array of role slugs assigned to the user
     * Example: ['admin', 'program-head']
     */
    const activeRoles = computed<string[]>(() => {
        if (!user.value || !user.value.roles) return []
        return user.value.roles.map((role) => role.slug)
    })

    /**
     * Returns a Set of all unique permission slugs the user has
     * Flattens User -> Roles -> Permissions
     */
    const activePermissions = computed<Set<string>>(() => {
        const permissions = new Set<string>()

        if (!user.value || !user.value.roles) return permissions

        user.value.roles.forEach((role) => {
            if (role.permissions) {
                role.permissions.forEach((permission) => {
                    permissions.add(permission.slug)
                })
            }
        })

        return permissions
    })

    /**
     * Check if user has a specific role
     */
    function hasRole(roleSlug: string): boolean {
        return activeRoles.value.includes(roleSlug)
    }

    /**
     * Check if user has a specific permission
     * Automatically returns TRUE if user is a 'super-admin'
     */
    function can(permissionSlug: string): boolean {
        // 1. Super Admin bypass
        if (activeRoles.value.includes('super-admin')) {
            return true
        }

        // 2. Check actual permission list
        return activePermissions.value.has(permissionSlug)
    }

    /**
     * Check if user has ANY of the provided permissions
     * Useful for combined views (e.g. "can('users.view') || can('users.create')")
     */
    function canAny(permissions: string[]): boolean {
        if (activeRoles.value.includes('super-admin')) return true
        return permissions.some((p) => activePermissions.value.has(p))
    }

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

    return {
        // State
        user,
        token,
        isLoading,
        error,

        // Getters
        isAuthenticated,
        activeRoles,
        activePermissions,
        hasRole,
        can,
        canAny,

        // Actions
        login,
        logout,
        fetchUser,
        clearError,
    }
})

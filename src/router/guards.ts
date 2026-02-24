import type { RouteLocationNormalized, RouteLocationRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

/**
 * Authentication guard - ensures user is logged in
 */
export async function authGuard(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
): Promise<RouteLocationRaw | void> {
    const authStore = useAuthStore()

    // If no token, redirect to login
    if (!authStore.token) {
        return { name: 'Login', query: { redirect: to.fullPath } }
    }

    // If we have a token but no user data, try to fetch it
    if (!authStore.user) {
        const isValid = await authStore.fetchUser()
        if (!isValid) {
            return { name: 'Login', query: { redirect: to.fullPath } }
        }
    }

    if (!authStore.isAdmin) {
        return { name: 'Forbidden' }
    }
}

/**
 * Guest guard - only allows unauthenticated users (for login page)
 */
export async function guestGuard(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
): Promise<RouteLocationRaw | void> {
    const authStore = useAuthStore()

    if (!authStore.token || !authStore.isAdmin) {
        return
    }

    if (!authStore.user) {
        const isValid = await authStore.fetchUser()
        if (!isValid) {
            return
        }
    }

    return { name: 'AdminDashboard' }
}

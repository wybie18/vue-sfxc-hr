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

    if (!authStore.token) {
        return { name: 'Login', query: { redirect: to.fullPath } }
    }

    if (!authStore.user) {
        const isValid = await authStore.fetchUser()
        if (!isValid) {
            return { name: 'Login', query: { redirect: to.fullPath } }
        }
    }

    // Check for specific ROLE requirement
    // Example: meta: { role: 'admin' }
    if (to.meta.role) {
        const requiredRole = to.meta.role as string
        if (!authStore.hasRole(requiredRole)) {
            return { name: 'Forbidden' }
        }
    }

    // Check for specific PERMISSION requirement
    // Example: meta: { permission: 'users.view' }
    if (to.meta.permission) {
        const requiredPermission = to.meta.permission as string
        if (!authStore.can(requiredPermission)) {
            return { name: 'Forbidden' }
        }
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

    if (!authStore.token) {
        return
    }

    if (!authStore.user) {
        const isValid = await authStore.fetchUser()
        if (!isValid) {
            return
        }
    }

    return { name: 'Dashboard' }
}

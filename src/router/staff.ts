import type { RouteRecordRaw } from 'vue-router'
import { authGuard } from './guards'

export const staffRoutes: RouteRecordRaw[] = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        beforeEnter: authGuard,
        meta: {
            Layout: 'AuthLayout',
            role: 'admin',
        },
    },
]

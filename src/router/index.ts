import { createRouter, createWebHistory } from 'vue-router'
import { guestGuard } from './guards'
import { staffRoutes } from './staff'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/Login.vue'),
            beforeEnter: guestGuard,
        },
        {
            path: '/forbidden',
            name: 'Forbidden',
            component: () => import('@/views/errors/Forbidden.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('@/views/errors/NotFound.vue'),
        },

        ...staffRoutes,
    ],
})

// Global navigation guard for setting page title
router.beforeEach((to, from, next) => {
    const title = to.meta.title as string | undefined
    document.title = title ? `${title} | St. Francis Xavier College` : 'St. Francis Xavier College'
    next()
})

export default router

import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
        path: '/',
        name: 'Login',
        component: () =>
            import ('../views/Login.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import ('../views/Register.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () =>
            import ('../views/Dashboard.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/face-recognition',
        name: 'FaceRecognition',
        component: () =>
            import ('../views/FaceRecognition.vue'),
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token')

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'Login' })
    } else {
        next()
    }
})

export default router
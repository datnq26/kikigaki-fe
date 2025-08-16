import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/commons/HomeView.vue'
import { PATHS } from '@/router/paths'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import LoginView from '@/views/commons/LoginView.vue'
import RegisterView from '@/views/commons/RegisterView.vue'
import ProfileView from '@/views/commons/ProfileView.vue'
import NotAuthenticationLayout from '@/layouts/NotAuthenticationLayout.vue'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'

const router = createRouter({
    // @ts-ignore
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: PATHS.HOME,
            component: DefaultLayout,
            children: [
                {
                    path: PATHS.HOME,
                    component: HomeView,
                    name: 'home',
                },
                {
                    path: PATHS.PROFILE,
                    component: ProfileView,
                    name: 'profile',
                },
            ],
        },
        {
            path: PATHS.HOME,
            component: NotAuthenticationLayout,
            children: [
                {
                    path: PATHS.LOGIN,
                    component: LoginView,
                    name: 'login',
                },
                {
                    path: PATHS.REGISTER,
                    component: RegisterView,
                    name: 'register',
                },
            ],
        },
    ],
})

router.beforeEach(async (to, from, next) => {
    const authenticationStore = useAuthenticationStore()
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

    if (requiresAuth && !authenticationStore.authenticated) {
        next({ name: 'login' })
    } else if (
        (to.name === 'login' || to.name === 'register') &&
        authenticationStore.authenticated
    ) {
        next({ name: 'home' })
    } else {
        next()
    }
})

export { router }

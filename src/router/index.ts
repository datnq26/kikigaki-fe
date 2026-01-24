import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/commons/HomeView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import LoginView from '@/views/commons/LoginView.vue'
import RegisterView from '@/views/commons/RegisterView.vue'
import ProfileView from '@/views/commons/ProfileView.vue'
import NotAuthenticationLayout from '@/layouts/NotAuthenticationLayout.vue'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
import { PATHS } from '@/router/paths'
import ListCoursesView from '@/views/commons/ListCoursesView.vue'
import CourseDetailView from '@/views/commons/CourseDetailView.vue'
import AccountSettingView from '@/views/commons/AccountSettingView.vue'
import TopUserView from '@/views/commons/TopUserView.vue'

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
                    meta: { requiresAuth: true },
                },
                {
                    path: PATHS.TOP_USERS,
                    component: TopUserView,
                    name: 'top-users',
                    meta: { requiresAuth: true },
                },
                {
                    path: PATHS.PROFILE,
                    component: ProfileView,
                    name: 'profile',
                    meta: { requiresAuth: true },
                },
                {
                    path: PATHS.COURSES,
                    component: ListCoursesView,
                    name: 'courses',
                    meta: { requiresAuth: true },
                },
                {
                    path: PATHS.COURSE_DETAIL,
                    component: CourseDetailView,
                    name: 'course-detail',
                    meta: { requiresAuth: true },
                },
                {
                    path: PATHS.ACCOUNT_SETTINGS,
                    component: AccountSettingView,
                    name: 'account-settings',
                    meta: { requiresAuth: true },
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

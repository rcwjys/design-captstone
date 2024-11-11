import { createRouter, createWebHistory } from 'vue-router'
import Login from '../view/auth/AuthPage.vue'

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
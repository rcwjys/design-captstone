import { createRouter, createWebHistory } from 'vue-router'
import Login from '../view/AuthPage.vue'
import Home from '../view/HomePage.vue'
import Report from '../view/ReportPage.vue'
import FormReport from '../view/FormReportPage.vue'
import { isAuthenticated } from '../services/authService/signupService'
import Notification from '../view/Notification.vue'
import StaffLogin from '../view/staff/StaffLogin.vue'
import StaffHomePage from '../view/staff/StaffHomePage.vue'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { requiresAuth: true },
    },
    {
        path: '/camera',
        name: 'report',
        component: Report,
        meta: { requiresAuth: true },
    },
    {
        path: '/form-report',
        name: 'form-report',
        component: FormReport,
        meta: { requiresAuth: true },
    },
    {
        path: '/notification',
        name: 'notification',
        component: Notification,
        meta: { requiresAuth: true },
    },
    {
        path: '/reward',
        name: 'reward',
        component: Notification,
        meta: { requiresAuth: true },
    },
    {
        path: '/profile',
        name: 'profile',
        component: Notification,
        meta: { requiresAuth: true },
    },
    {
      path: '/staff/login',
      name: 'staff-login',
      component: StaffLogin,
    },
    {
        path: '/staff/home',
        name: 'staff-home',
        component: StaffHomePage,
        // meta: { requiresAuth: true },
    },
  ]


const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticated()) {
      next("/login");
    } else if ((to.path === "/login" || to.path === "/register") && isAuthenticated()) {
      next("/");
    } else {
      next();
    }
  });

export default router;
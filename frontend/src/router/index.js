import { createRouter, createWebHistory } from 'vue-router'
import Login from '../view/AuthPage.vue'
import Home from '../view/HomePage.vue'
import Report from '../view/ReportPage.vue'
import FormReport from '../view/FormReportPage.vue'
import { isAuthenticated } from '../services/authService/signupService'
import Notification from '../view/Notification.vue'
import StaffLogin from '../view/staff/StaffLogin.vue'
import StaffHomePage from '../view/staff/StaffHomePage.vue'
import SuccessReport from '../components/SuccessReport.vue'
import Status from '../view/Status.vue'
import ProfilePage from '../view/ProfilePage.vue'
import ReportDetail from '../view/ReportDetail.vue'
import RewardPage from '../view/RewardPage.vue'

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
        component: RewardPage,
        meta: { requiresAuth: true },
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfilePage,
        meta: { requiresAuth: true },
    },
    {
        path: '/success-report',
        name: 'success-report',
        component: SuccessReport,
        meta: { requiresAuth: true },
    },
    {
        path: '/report-detail/:reportId',
        name: 'report-detail',
        component: ReportDetail,
        meta: { requiresAuth: true },
    },
    {
        path: '/status',
        name: 'status',
        component: Status,
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
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewsView from '../views/NewsView.vue'
import LoginView from '../views/LoginView.vue'
import CrowdfundPage from '../views/CrowdfundPage.vue'
import AdminLandingPage from '../views/AdminLandingPage.vue'
import AdminCrowdfundCreate from '../views/AdminCrowdfundCreate.vue'
import AdminCrowdfundDetail from '../views/AdminCrowdfundDetail.vue'
import AdminCrowdfundEdit from '../views/AdminCrowdfundEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: "/news",
      name: "news",
      component: NewsView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: '/crowdfund',
      name: 'CrowdfundPage',
      component: CrowdfundPage,
    },
    {
      path: '/admin',
      name: 'AdminLandingPage',
      component: AdminLandingPage,
    },
    {
      path: '/admin/create',
      name: 'AdminCrowdfundCreate',
      component: AdminCrowdfundCreate,
    },
    {
      path: '/admin/:admin_id',
      name: 'AdminCrowdfundDetail',
      component: AdminCrowdfundDetail,
    },
    {
      path: '/admin/:admin_id/edit',
      name: 'AdminCrowdfundEdit',
      component: AdminCrowdfundEdit,
    }
  ],
})

export default router
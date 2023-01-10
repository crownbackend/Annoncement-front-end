import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from "@/views/Home.vue";
import Login from "@/views/security/Login.vue";
import AuthService from "@/service/AuthService";
import Ads from "@/views/search/Ads.vue";
import Ad from "@/views/ad/Ad.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/connexion',
    name: 'login',
    component: Login
  },
  {
    path: '/recherche',
    name: 'adsSearch',
    component: Ads
  },
  {
    path: '/annonce/:id.html',
    name: 'ad',
    component: Ad
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!AuthService.getUser()) {
      next({
        path: '/connexion'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router

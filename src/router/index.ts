import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from "@/views/Home.vue";
import Login from "@/views/security/Login.vue";
import AuthService from "@/service/AuthService";
import Ads from "@/views/search/Ads.vue";
import Ad from "@/views/ad/Ad.vue";
import Reply from "@/views/chat/Reply.vue";
import Discussion from "@/views/chat/Discussion.vue";

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
  {
    path: '/replay/:id.html',
    name: 'reply',
    component: Reply,
    meta: {requiresAuth: true}
  },
  {
    path: '/discussion/',
    name: 'discussion',
    component: Discussion,
    meta: {requiresAuth: true}
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

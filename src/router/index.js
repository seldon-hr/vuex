import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import login from '../views/login.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: ':id(\\d+)',
          component: () => import('../views/MessagesView.vue')
        },
        {
          path: ':(.*)',
          component: () => import('../views/VoidMessagesView.vue')
        }
      ]
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router

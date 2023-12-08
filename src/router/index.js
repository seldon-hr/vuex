import { createRouter, createWebHistory } from 'vue-router';
/* import HomeView from '../views/HomeView.vue'; */
import login from '../views/login.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
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
      path: '/home',
      name: 'homeView',
      component: () => import('../views/HomeView.vue')
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

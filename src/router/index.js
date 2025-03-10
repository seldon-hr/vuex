import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import login from '../views/login.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      /* Redirección del path default al /login */
      redirect: '/login'
    },
    /* Cuando realizamos la redirecciòn, ocurre que dejamos de tener la barra vacia para el uso de la app,
        de manera que, entonces ahora no podemos alcanzar un canal de esta forma, /1, por decir el canal con id 1, sino
        que ahora es necesario alcanzarlo de esta forma /home/1. */
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: ':id(\\d+)',
          name: 'channel',
          component: () => import('../views/MessagesView.vue')
        },
        {
          path: '(.*)', 
          component: () => import('../views/VoidMessagesView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login,
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

import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Hakim from '../views/Hakim.vue'
import Client from '../views/Client.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/hakim',
    name: 'hakim',
    component: Hakim
  },
  {
    path: '/client',
    name: 'client',
    component: Client
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
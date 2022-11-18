import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Hakim from '../views/Hakim.vue'
import Client from '../views/Client.vue'
import Gugatan from '../views/Gugatan.vue'

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
  {
    path: '/gugatan',
    name: 'gugatan',
    component: Gugatan
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
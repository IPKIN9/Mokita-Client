import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Hakim from '../views/Hakim.vue'

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
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
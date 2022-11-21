import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Hakim from '../views/Hakim.vue'
import Client from '../views/Client.vue'
import Gugatan from '../views/Gugatan.vue'
import Anak from '../views/Anak.vue'
import JadwalSidang from '../views/JadwalSidang.vue'
import NotFound from '../error/NotFound.vue'

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
  {
    path: '/anak',
    name: 'anak',
    component: Anak
  },
  {
    path: '/sidang',
    name: 'sidang',
    component: JadwalSidang
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
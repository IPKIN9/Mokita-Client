import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Hakim from '../views/Hakim.vue'
import Client from '../views/Client.vue'
import Gugatan from '../views/Gugatan.vue'
import Anak from '../views/Anak.vue'
import JadwalSidang from '../views/JadwalSidang.vue'
import Perkara from '../views/Perkara.vue'
import Login from '../views/Login.vue'
import NotFound from '../error/NotFound.vue'
import utils from '../utils/AuthCheck'

const adminGuard = (to, from, next) => {
  let scope = utils.rolesCheck()

  if(scope === 'crud-list'){
    next()
  } else {
    next('/404_not_found')
  }
}

const staffGuard = (to, from, next) => {
  let scope = utils.rolesCheck()

  if(scope === 'crud-list' || 'crud-list'){
    next()
  } else {
    next('/404_not_found')
  }
}

const routes = [
  {
    path: '/',
    name: 'dashboard',
    beforeEnter: adminGuard,
    component: Dashboard
  },
  {
    path: '/hakim',
    name: 'hakim',
    beforeEnter: adminGuard,
    component: Hakim
  },
  {
    path: '/client',
    name: 'client',
    beforeEnter: adminGuard,
    component: Client,
  },
  {
    path: '/gugatan',
    name: 'gugatan',
    beforeEnter: adminGuard,
    component: Gugatan
  },
  {
    path: '/anak',
    name: 'anak',
    beforeEnter: adminGuard,
    component: Anak
  },
  {
    path: '/sidang',
    name: 'sidang',
    beforeEnter: staffGuard,
    component: JadwalSidang
  },
  {
    path: '/perkara',
    name: 'perkara',
    beforeEnter: staffGuard,
    component: Perkara
  },
  {
    path: '/login',
    name: 'login',
    component: Login
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
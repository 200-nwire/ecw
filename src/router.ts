import { createRouter, createWebHistory, type Router, type RouteRecordRaw } from 'vue-router'
import { pausableWatch } from '@vueuse/core'

import { auth, fireBaseUser } from '@/Firebase'
import useGlobalStore from './store/global'
import { useAuth } from '@/composables/useAuth'
import Home from '@/pages/Home/Home.vue'
import Login from '@/pages/Login/Login.vue'
import Components from '@/pages/UILibrary/Components.vue'

const routes: RouteRecordRaw[] = [
  { path: '/login', name: 'app-login', component: Login },
  { path: '/components', component: Components },
  {
    path: '/',
    name: 'home',
    redirect: '/stations',
    component: Home,
    children: [
      {
        path: 'stations',
        name: 'stations',
        component: () => import('@/pages/Home/views/Stations.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'clients',
        name: 'clients',
        component: () => import('@/pages/Home/views/Clients.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
]

const routerOptions: any = {
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { el: to.hash, top: 100, behavior: 'smooth' }
    } else {
      const layoutId = document.getElementById('app')
      if (layoutId) {
        return layoutId.scrollIntoView({ behavior: 'smooth' })
      }
    }
  },
}

const router: Router = createRouter(routerOptions)

let token: any

auth.onAuthStateChanged(async user => {
  await fireBaseUser.setUser(user)
  const { getToken } = useAuth()
  token = await getToken()
})

const canUserAccess = async (to: any) => {
  const { isAuthenticated } = useAuth()
  return await new Promise(resolve => {
    const timer = setTimeout(() => {
      console.warn('[router timer fallback]')
      resolve(!to.meta.requiresAuth || isAuthenticated)
    }, 3000)
    const { stop } = pausableWatch(token, () => {
      stop()
      clearTimeout(timer)
      resolve(!to.meta.requiresAuth || isAuthenticated)
    })
  })
}

router.beforeEach(async (to, from, next) => {
  const { setLoading } = useGlobalStore()
  if (!to.meta.requiresAuth) {
    next()
    return
  }
  setLoading(true)
  const canAccess = await canUserAccess(to)
  setLoading(false)
  if (!canAccess) {
    next({ path: '/login' })
    return
  } else next()
})

export default router

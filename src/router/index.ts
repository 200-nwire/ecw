import { auth } from '@/Firebase';
import { useAccountStore } from '@/store/account';
import { pausableWatch } from '@vueuse/core';
import { useLoading } from 'vue-loading-overlay';
import { createRouter, createWebHistory } from 'vue-router';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard' },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: 'dashboard',
          component: () => import('../pages/dashboard.vue'),
        },
        {
          path: 'clients',
          component: () => import('../pages/clients.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'clients/:clientId',
          component: () => import('../pages/ClientPage.vue'),
        },
        {
          path: 'account-settings',
          component: () => import('../pages/account-settings.vue'),
        },
        {
          path: 'typography',
          component: () => import('../pages/typography.vue'),
        },
        {
          path: 'icons',
          component: () => import('../pages/icons.vue'),
        },
        {
          path: 'cards',
          component: () => import('../pages/cards.vue'),
        },
        {
          path: 'tables',
          component: () => import('../pages/tables.vue'),
        },
        {
          path: 'form-layouts',
          component: () => import('../pages/form-layouts.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../pages/login.vue'),
        },
        {
          path: 'register',
          component: () => import('../pages/register.vue'),
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('../pages/[...all].vue'),
        },
      ],
    },
  ],
})

let token: any

auth.onAuthStateChanged(async (user) => {
  const { setAuthState } = useAccountStore()
  if(user) {
    token = await auth.currentUser?.getIdToken(true)
    setAuthState(true)
  } else  { 
    token = null
    setAuthState(false)
  }
})

const canUserAccess = async (to: any) => {
  const accountStore = useAccountStore();
  return await new Promise(resolve => {
     const timer = setTimeout(() => {
    console.warn('[router timer fallback]');
    resolve(!to.meta.requiresAuth || accountStore.isAuthenticated);
  }, 3000);
  const { stop } = pausableWatch(token, () => {
    stop();
    clearTimeout(timer);
    resolve(!to.meta.requiresAuth || accountStore.isAuthenticated);
  });
  })
}

router.beforeEach(async(to, from, next) => {
  const $loading = useLoading({})
  if (!to.meta.requiresAuth) {
    next()
    return
  }
  const loader = $loading.show({})
  const canAccess = await canUserAccess(to)
  loader.hide()
  if (!canAccess) {
    next({ path: '/login' })
    return
  }
  else next()
})

export default router
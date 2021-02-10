import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'
import AccountTabs from '../views/AccountTabs.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tabFeed'
  },
  {
    path: '/account',
    component: AccountTabs,
    children: [
      {
        path: '',
        redirect: '/account/signup'
      },
      {
        path: 'signup',
        component: () => import('@/views/TabsSignup.vue')
      },
      {
        path: 'login',
        component: () => import('@/views/TabsLogin.vue')
      }
    ]
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/tabFeed'
      },
      {
        path: 'tabFeed',
        component: () => import('@/views/TabFeed.vue')
      },
      {
        path: 'tabMe',
        component: () => import('@/views/TabMe.vue')
      },
      {
        path: 'tabLeagues',
        component: () => import('@/views/TabLeagues.vue')
      },
      {
        path: 'tabCreateLeague',
        component: () => import('@/views/TabCreateLeague.vue')
      },
      {
        path: 'tabLeagueView/:id',
        component: () => import('@/views/TabLeagueView.vue'),
        props: true
      },
      {
        path: 'tabRecord',
        component: () => import('@/views/TabRecord.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

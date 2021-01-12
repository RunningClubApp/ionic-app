import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tabFeed'
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

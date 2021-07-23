import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const backlog = () => import('@/modules/backlog/BacklogView.vue')
const dashboard = () => import('@/modules/dashboard/DashboardView.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/backlog',
    component: backlog
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

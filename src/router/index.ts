import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/learn',
    name: 'learn',
    component: () => import('../views/LearningHubView.vue'),
  },
  {
    path: '/learn/nestjs',
    name: 'learn-nestjs',
    component: () => import('../views/NestJsLearningView.vue'),
  },
  {
    path: '/learn/:course',
    name: 'learn-course',
    component: () => import('../views/CourseLearningView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80,
      }
    }
    return { top: 0, behavior: 'smooth' }
  },
})

export default router

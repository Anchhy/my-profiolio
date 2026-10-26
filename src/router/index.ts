import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getPageMeta, SITE_URL } from './meta'

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
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
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

const setMetaContent = (selector: string, content: string) => {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content)
}

router.afterEach((to) => {
  const { title, description, indexable } = getPageMeta(to.name, String(to.params.course))
  const canonicalUrl = `${SITE_URL}${to.path}`

  document.title = title
  document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', canonicalUrl)
  setMetaContent('meta[name="description"]', description)
  setMetaContent('meta[name="robots"]', indexable ? 'index, follow' : 'noindex, follow')
  setMetaContent('meta[property="og:title"]', title)
  setMetaContent('meta[property="og:description"]', description)
  setMetaContent('meta[property="og:url"]', canonicalUrl)
  setMetaContent('meta[name="twitter:title"]', title)
  setMetaContent('meta[name="twitter:description"]', description)
})

export default router

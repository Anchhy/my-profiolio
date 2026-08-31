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

const courseNames: Record<string, string> = {
  html: 'HTML',
  css: 'CSS',
  javascript: 'JavaScript',
  vue: 'Vue 3',
  angular: 'Angular',
  nestjs: 'NestJS',
  java: 'Java',
}

const setMetaContent = (selector: string, content: string) => {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content)
}

router.afterEach((to) => {
  let title = 'Et Anchhy — Full-Stack Web Developer'
  let description = 'Fifth-year ICE student and full-stack developer building dependable interfaces, APIs, and workflow-driven systems.'

  if (to.name === 'learn') {
    title = 'Learn Web Development — Et Anchhy'
    description = 'Free practical courses for HTML, CSS, JavaScript, Vue, Angular, NestJS, and Java, with examples, quizzes, projects, and cheat sheets.'
  } else if (to.name === 'learn-nestjs') {
    title = 'Learn NestJS — Et Anchhy'
    description = 'A practical NestJS learning path covering modules, controllers, services, DTOs, authentication, databases, testing, and deployment.'
  } else if (to.name === 'learn-course') {
    const course = courseNames[String(to.params.course)] || 'Web Development'
    title = `Learn ${course} — Et Anchhy`
    description = `Learn ${course} through structured lessons, working examples, a quiz, a practical project, and a concise cheat sheet.`
  } else if (to.name === 'not-found') {
    title = 'Page Not Found — Et Anchhy'
    description = 'The requested page could not be found. Return to Et Anchhy’s portfolio or explore the free developer learning center.'
  }

  const canonicalUrl = `https://et-anchhy.me${to.path === '/' ? '/' : to.path}`
  document.title = title
  document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', canonicalUrl)
  setMetaContent('meta[name="description"]', description)
  setMetaContent('meta[name="robots"]', to.name === 'not-found' ? 'noindex, follow' : 'index, follow')
  setMetaContent('meta[property="og:title"]', title)
  setMetaContent('meta[property="og:description"]', description)
  setMetaContent('meta[property="og:url"]', canonicalUrl)
  setMetaContent('meta[name="twitter:title"]', title)
  setMetaContent('meta[name="twitter:description"]', description)
})

export default router

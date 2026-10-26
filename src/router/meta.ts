// Shared by the router (runtime) and vite.config.ts (build), so it must stay free of browser and Vue imports.

export const SITE_URL = 'https://et-anchhy.me'

export const courseNames: Record<string, string> = {
  html: 'HTML',
  css: 'CSS',
  javascript: 'JavaScript',
  vue: 'Vue 3',
  angular: 'Angular',
  nestjs: 'NestJS',
  java: 'Java',
}

export interface PageMeta {
  title: string
  description: string
  indexable: boolean
}

export const getPageMeta = (name: string | symbol | null | undefined, course?: string): PageMeta => {
  if (name === 'learn') {
    return {
      title: 'Learn Web Development — Et Anchhy',
      description: 'Free practical courses for HTML, CSS, JavaScript, Vue, Angular, NestJS, and Java, with examples, quizzes, projects, and cheat sheets.',
      indexable: true,
    }
  }
  if (name === 'learn-nestjs') {
    return {
      title: 'Learn NestJS — Et Anchhy',
      description: 'A practical NestJS learning path covering modules, controllers, services, DTOs, authentication, databases, testing, and deployment.',
      indexable: true,
    }
  }
  if (name === 'learn-course') {
    const courseName = (course && courseNames[course]) || 'Web Development'
    return {
      title: `Learn ${courseName} — Et Anchhy`,
      description: `Learn ${courseName} through structured lessons, working examples, a quiz, a practical project, and a concise cheat sheet.`,
      indexable: true,
    }
  }
  if (name === 'not-found') {
    return {
      title: 'Page Not Found — Et Anchhy',
      description: 'The requested page could not be found. Return to Et Anchhy’s portfolio or explore the free developer learning center.',
      indexable: false,
    }
  }
  return {
    title: 'Et Anchhy — Full-Stack Web Developer',
    description: 'Fifth-year ICE student and full-stack developer building dependable interfaces, APIs, and workflow-driven systems.',
    indexable: true,
  }
}

// Routes that get their own HTML file at build time and an entry in the sitemap.
export const staticRoutes = [
  { path: '/', name: 'home' },
  { path: '/learn', name: 'learn' },
  ...Object.keys(courseNames).map((course) => ({
    path: `/learn/${course}`,
    name: course === 'nestjs' ? 'learn-nestjs' : 'learn-course',
    course,
  })),
]

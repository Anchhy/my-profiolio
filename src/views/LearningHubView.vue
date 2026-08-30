<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { ArrowRight, BookOpen, Braces, Check, ChevronRight, Code2, FileText, GraduationCap, Layers3, Route, Search, Sparkles } from 'lucide-vue-next'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { courses, coursesBySlug, recommendedPath } from '../data/learning'

const previousTitle = document.title
const activeCategory = ref('All')
const searchQuery = ref('')
const categories = ['All', 'Foundation', 'Frontend', 'Backend', 'Language']

const visibleCourses = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return courses.filter((course) => {
    const categoryMatches = activeCategory.value === 'All' || course.category === activeCategory.value
    const queryMatches = !query || `${course.title} ${course.description} ${course.lessons.flatMap((lesson) => lesson.topics).join(' ')}`.toLowerCase().includes(query)
    return categoryMatches && queryMatches
  })
})

const pathCourses = recommendedPath.map((slug) => coursesBySlug[slug])

onMounted(() => {
  document.title = 'Learn Web Development — Et Anchhy'
})

onUnmounted(() => {
  document.title = previousTitle
})
</script>

<template>
  <DefaultLayout>
    <div class="learning-hub">
      <section class="hub-hero">
        <div class="hub-pattern" aria-hidden="true"></div>
        <div class="mx-auto max-w-7xl px-4 pb-20 pt-36 sm:px-6 lg:px-8 lg:pb-28 lg:pt-44">
          <p class="hub-kicker"><GraduationCap :size="15" /> Free developer learning center</p>
          <div class="hub-hero-grid">
            <div>
              <h1>Learn the stack.<br /><span>Understand the code.</span></h1>
              <p>Seven practical courses—from your first HTML page to structured Vue, Angular, NestJS, and Java applications. Every course includes examples, a quiz, a project, and a cheat sheet.</p>
              <div class="hub-actions">
                <a href="#courses" class="hub-primary">Explore courses <ArrowRight :size="17" /></a>
                <a href="#learning-path" class="hub-secondary">Follow the learning path</a>
              </div>
            </div>
            <div class="hub-summary" aria-label="Learning center summary">
              <div><strong>7</strong><span>complete courses</span></div>
              <div><strong>42</strong><span>guided lessons</span></div>
              <div><strong>7</strong><span>cheat sheets</span></div>
              <div><strong>21</strong><span>quiz questions</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="learning-path" class="path-section">
        <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div class="hub-heading">
            <div><p>Recommended order</p><h2>Start with the web foundations.</h2></div>
            <p>Learn HTML, CSS, and JavaScript first. Then choose Vue or Angular for interfaces and NestJS for APIs. Java is an independent programming-language path.</p>
          </div>
          <div class="path-flow">
            <template v-for="(course, index) in pathCourses" :key="course.slug">
              <RouterLink :to="`/learn/${course.slug}`" :style="{ '--course': course.accent, '--course-soft': course.softAccent }">
                <span>{{ String(index + 1).padStart(2, '0') }}</span><strong>{{ course.title }}</strong><small>{{ course.category }}</small>
              </RouterLink>
              <ChevronRight v-if="index < pathCourses.length - 1" :size="18" aria-hidden="true" />
            </template>
          </div>
          <div class="path-note"><Sparkles :size="19" /><p><strong>Two frontend frameworks?</strong> Learn one deeply first. Vue is a gentle starting point; Angular teaches a larger, strongly structured application platform.</p></div>
        </div>
      </section>

      <section id="courses" class="courses-section">
        <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div class="hub-heading">
            <div><p>Course catalog</p><h2>Choose what you want to understand.</h2></div>
            <p>Each course focuses on the concepts you use in real projects, with plain explanations and copyable examples.</p>
          </div>

          <div class="course-toolbar">
            <label class="course-search"><Search :size="16" /><span class="sr-only">Search courses</span><input v-model="searchQuery" type="search" placeholder="Search courses or topics…" /></label>
            <div class="category-filters" aria-label="Filter courses by category">
              <button v-for="category in categories" :key="category" type="button" :class="{ active: activeCategory === category }" :aria-pressed="activeCategory === category" @click="activeCategory = category">{{ category }}</button>
            </div>
          </div>

          <div v-if="visibleCourses.length" class="course-grid">
            <article v-for="course in visibleCourses" :key="course.slug" class="course-card" :style="{ '--course': course.accent, '--course-soft': course.softAccent }">
              <div class="course-card-top">
                <span class="course-mark">{{ course.title.slice(0, 2) }}</span>
                <span class="course-category">{{ course.category }}</span>
              </div>
              <p class="course-eyebrow">{{ course.eyebrow }}</p>
              <h3>{{ course.title }}</h3>
              <p class="course-description">{{ course.description }}</p>
              <div class="course-meta"><span><BookOpen :size="14" /> {{ course.lessons.length }} lessons</span><span><FileText :size="14" /> Cheat sheet</span></div>
              <div class="course-topics"><span v-for="topic in course.lessons.flatMap((lesson) => lesson.topics).slice(0, 5)" :key="topic">{{ topic }}</span></div>
              <RouterLink :to="`/learn/${course.slug}`" class="course-link">Start {{ course.title }} <ArrowRight :size="16" /></RouterLink>
            </article>
          </div>
          <div v-else class="empty-courses"><Search :size="24" /><h3>No courses found</h3><p>Try another search or choose “All”.</p><button type="button" @click="searchQuery = ''; activeCategory = 'All'">Clear filters</button></div>
        </div>
      </section>

      <section class="included-section">
        <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div class="included-panel">
            <div><p class="included-kicker">Inside every course</p><h2>More than a list of definitions.</h2><p>Learn the concept, see it in code, check your understanding, and keep the syntax nearby.</p></div>
            <div class="included-grid">
              <article><span><Layers3 :size="20" /></span><strong>Structured lessons</strong><small>Learn concepts in a useful order.</small></article>
              <article><span><Code2 :size="20" /></span><strong>Working examples</strong><small>Copy and study practical code.</small></article>
              <article><span><Braces :size="20" /></span><strong>Cheat sheets</strong><small>Find essential syntax quickly.</small></article>
              <article><span><Check :size="20" /></span><strong>Knowledge checks</strong><small>Get immediate quiz feedback.</small></article>
              <article><span><Route :size="20" /></span><strong>Final project</strong><small>Apply the course in one build.</small></article>
              <article><span><BookOpen :size="20" /></span><strong>Official sources</strong><small>Continue with primary documentation.</small></article>
            </div>
          </div>
        </div>
      </section>
    </div>
  </DefaultLayout>
</template>

<style scoped>
.hub-hero { position: relative; overflow: hidden; border-bottom: 1px solid var(--border); background: var(--surface); }
.hub-pattern { position: absolute; inset: 0; opacity: 0.6; background-image: radial-gradient(color-mix(in srgb, var(--accent) 22%, transparent) 0.8px, transparent 0.8px); background-size: 20px 20px; mask-image: linear-gradient(to bottom right, black, transparent 78%); }
.hub-hero::after { position: absolute; width: 38rem; height: 38rem; right: -19rem; top: -20rem; border: 1px solid color-mix(in srgb, var(--accent) 24%, transparent); border-radius: 999px; box-shadow: 0 0 0 6rem color-mix(in srgb, var(--highlight) 7%, transparent); content: ''; }
.hub-kicker { position: relative; z-index: 1; display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.48rem 0.72rem; border: 1px solid var(--border); border-radius: 99px; background: var(--nav-bg); color: var(--accent-strong); font-size: 0.67rem; font-weight: 850; letter-spacing: 0.1em; text-transform: uppercase; }
.hub-hero-grid { position: relative; z-index: 1; display: grid; align-items: end; gap: 3rem; margin-top: 1.25rem; }
.hub-hero h1 { max-width: 53rem; font-size: clamp(3.3rem, 8vw, 7rem); font-weight: 850; letter-spacing: -0.075em; line-height: 0.92; }.hub-hero h1 span { color: var(--accent-strong); }
.hub-hero-grid > div:first-child > p { max-width: 46rem; margin-top: 1.5rem; color: var(--text-secondary); font-size: clamp(1rem, 1.6vw, 1.14rem); line-height: 1.8; }
.hub-actions { display: flex; flex-wrap: wrap; gap: 0.65rem; margin-top: 1.8rem; }.hub-primary, .hub-secondary { display: inline-flex; min-height: 3.1rem; align-items: center; justify-content: center; gap: 0.45rem; padding: 0.8rem 1.1rem; border-radius: 0.78rem; font-size: 0.77rem; font-weight: 850; }.hub-primary { background: var(--accent-strong); color: white; box-shadow: 0 12px 30px color-mix(in srgb, var(--accent) 24%, transparent); }.hub-secondary { border: 1px solid var(--border); background: var(--surface); color: var(--text-primary); }
.hub-summary { display: grid; grid-template-columns: repeat(2, 1fr); overflow: hidden; border: 1px solid var(--border); border-radius: 1rem; background: var(--nav-bg); box-shadow: var(--shadow); backdrop-filter: blur(15px); }.hub-summary div { padding: 1.25rem; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); }.hub-summary div:nth-child(2n) { border-right: 0; }.hub-summary div:nth-last-child(-n + 2) { border-bottom: 0; }.hub-summary strong, .hub-summary span { display: block; }.hub-summary strong { font-size: 1.45rem; letter-spacing: -0.04em; }.hub-summary span { margin-top: 0.25rem; color: var(--text-muted); font-size: 0.58rem; font-weight: 750; text-transform: uppercase; }
.path-section, .included-section { background: var(--bg); }.courses-section { border-block: 1px solid var(--border); background: var(--surface); }
.hub-heading { display: grid; align-items: end; gap: 1.3rem; }.hub-heading > div > p, .included-kicker { margin-bottom: 0.75rem; color: var(--accent-strong); font-size: 0.65rem; font-weight: 850; letter-spacing: 0.13em; text-transform: uppercase; }.hub-heading h2, .included-panel h2 { max-width: 44rem; font-size: clamp(2.1rem, 5vw, 4rem); font-weight: 830; letter-spacing: -0.06em; line-height: 1.04; }.hub-heading > p { max-width: 32rem; color: var(--text-secondary); font-size: 0.82rem; line-height: 1.75; }
.path-flow { display: flex; overflow-x: auto; align-items: center; gap: 0.5rem; margin-top: 2.5rem; padding-bottom: 0.5rem; }.path-flow > a { display: flex; min-width: 8.5rem; flex: 1 0 8.5rem; flex-direction: column; padding: 1rem; border: 1px solid var(--border); border-radius: 0.8rem; background: var(--surface); transition: transform 0.2s ease, border-color 0.2s ease; }.path-flow > a:hover { transform: translateY(-3px); border-color: var(--course); }.path-flow > a > span { display: flex; width: 1.7rem; height: 1.7rem; align-items: center; justify-content: center; border-radius: 0.45rem; background: var(--course-soft); color: var(--course); font-size: 0.56rem; font-weight: 850; }.path-flow strong { margin-top: 1.2rem; font-size: 0.82rem; }.path-flow small { margin-top: 0.2rem; color: var(--text-muted); font-size: 0.56rem; }.path-flow > svg { flex: 0 0 auto; color: var(--text-muted); }
.path-note { display: flex; gap: 0.7rem; margin-top: 1rem; padding: 0.95rem 1rem; border-left: 3px solid var(--accent); border-radius: 0 0.7rem 0.7rem 0; background: var(--accent-soft); color: var(--text-secondary); font-size: 0.72rem; line-height: 1.6; }.path-note svg { flex: 0 0 auto; color: var(--accent-strong); }.path-note strong { color: var(--text-primary); }
.course-toolbar { display: grid; gap: 1rem; margin-top: 2.3rem; }.course-search { display: flex; min-height: 2.8rem; align-items: center; gap: 0.55rem; padding: 0 0.85rem; border: 1px solid var(--border); border-radius: 0.7rem; background: var(--bg); color: var(--text-muted); }.course-search:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 12%, transparent); }.course-search input { width: 100%; outline: none; background: transparent; color: var(--text-primary); font-size: 0.72rem; }.course-search input::placeholder { color: var(--text-muted); }.category-filters { display: flex; flex-wrap: wrap; gap: 0.4rem; }.category-filters button { padding: 0.55rem 0.8rem; border: 1px solid var(--border); border-radius: 99px; color: var(--text-secondary); font-size: 0.65rem; font-weight: 750; cursor: pointer; }.category-filters button.active { border-color: var(--text-primary); background: var(--text-primary); color: var(--bg); }
.course-grid { display: grid; gap: 0.9rem; margin-top: 1.3rem; }.course-card { display: flex; min-width: 0; flex-direction: column; padding: 1.3rem; border: 1px solid var(--border); border-radius: 1rem; background: var(--bg); transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease; }.course-card:hover { transform: translateY(-4px); border-color: color-mix(in srgb, var(--course) 55%, var(--border)); box-shadow: 0 18px 45px rgb(34 42 75 / 0.09); }.course-card-top { display: flex; align-items: center; justify-content: space-between; }.course-mark { display: flex; width: 2.7rem; height: 2.7rem; align-items: center; justify-content: center; border-radius: 0.75rem; background: var(--course); color: white; font-size: 0.72rem; font-weight: 900; text-transform: uppercase; }.course-category { padding: 0.35rem 0.5rem; border-radius: 99px; background: var(--course-soft); color: var(--course); font-size: 0.55rem; font-weight: 800; }.course-eyebrow { margin-top: 1.5rem; color: var(--course); font-size: 0.59rem; font-weight: 850; letter-spacing: 0.09em; text-transform: uppercase; }.course-card h3 { margin-top: 0.25rem; font-size: 1.35rem; font-weight: 850; letter-spacing: -0.04em; }.course-description { margin-top: 0.65rem; color: var(--text-secondary); font-size: 0.72rem; line-height: 1.65; }.course-meta { display: flex; flex-wrap: wrap; gap: 0.8rem; margin-top: 1rem; color: var(--text-muted); font-size: 0.6rem; font-weight: 750; }.course-meta span { display: inline-flex; align-items: center; gap: 0.35rem; }.course-topics { display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: 1rem; }.course-topics span { padding: 0.3rem 0.43rem; border: 1px solid var(--border); border-radius: 0.4rem; color: var(--text-muted); font-size: 0.55rem; }.course-link { display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 1.4rem; color: var(--course); font-size: 0.7rem; font-weight: 850; }
.empty-courses { margin-top: 1.3rem; padding: 3rem 1rem; border: 1px dashed var(--border); border-radius: 1rem; color: var(--text-muted); text-align: center; }.empty-courses svg { margin: 0 auto; }.empty-courses h3 { margin-top: 0.7rem; color: var(--text-primary); font-size: 1rem; }.empty-courses p { margin-top: 0.3rem; font-size: 0.7rem; }.empty-courses button { margin-top: 1rem; color: var(--accent-strong); font-size: 0.68rem; font-weight: 800; cursor: pointer; }
.included-panel { display: grid; gap: 2.5rem; padding: 1.5rem; border-radius: 1.3rem; background: #0d1220; color: white; box-shadow: var(--shadow); }.included-panel > div:first-child > p:last-child { max-width: 32rem; margin-top: 1rem; color: rgb(255 255 255 / 0.58); font-size: 0.8rem; line-height: 1.75; }.included-kicker { color: #aeb2ff; }.included-grid { display: grid; gap: 0.6rem; }.included-grid article { display: grid; grid-template-columns: auto 1fr; gap: 0 0.7rem; padding: 0.85rem; border: 1px solid rgb(255 255 255 / 0.1); border-radius: 0.7rem; background: rgb(255 255 255 / 0.035); }.included-grid span { display: flex; width: 2.2rem; height: 2.2rem; grid-row: span 2; align-items: center; justify-content: center; border-radius: 0.55rem; background: rgb(139 145 255 / 0.14); color: #aeb2ff; }.included-grid strong { font-size: 0.7rem; }.included-grid small { margin-top: 0.15rem; color: rgb(255 255 255 / 0.46); font-size: 0.58rem; }
@media (min-width: 640px) { .course-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }.included-grid { grid-template-columns: repeat(2, 1fr); }.course-toolbar { grid-template-columns: minmax(15rem, 1fr) auto; align-items: center; }.category-filters { justify-content: flex-end; } }
@media (min-width: 768px) { .hub-heading { grid-template-columns: minmax(0, 1.2fr) minmax(18rem, 0.8fr); }.hub-hero-grid { grid-template-columns: minmax(0, 1.25fr) minmax(20rem, 0.75fr); }.included-panel { grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); padding: 2.5rem; } }
@media (min-width: 1024px) { .course-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }.included-grid { grid-template-columns: repeat(3, 1fr); } }
</style>

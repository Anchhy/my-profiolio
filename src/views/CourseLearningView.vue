<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, ChevronDown, Clipboard, Code2, ExternalLink, FileText, GraduationCap, Lightbulb, ListChecks, Rocket, Sparkles } from 'lucide-vue-next'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { courses, coursesBySlug } from '../data/learning'

const route = useRoute()
const router = useRouter()
const openLessons = ref<number[]>([0])
const selectedAnswers = ref<Record<number, number>>({})
const copied = ref(false)

const course = computed(() => coursesBySlug[String(route.params.course)])
const quizScore = computed(() => course.value?.quiz.reduce((score, question, index) => score + (selectedAnswers.value[index] === question.correct ? 1 : 0), 0) ?? 0)

const toggleLesson = (index: number) => {
  openLessons.value = openLessons.value.includes(index)
    ? openLessons.value.filter((lesson) => lesson !== index)
    : [...openLessons.value, index]
}

const copyExample = async () => {
  if (!course.value) return
  try {
    await navigator.clipboard.writeText(course.value.example.code)
    copied.value = true
    window.setTimeout(() => (copied.value = false), 1800)
  } catch {
    copied.value = false
  }
}

watch(
  () => route.params.course,
  () => {
    if (!course.value) {
      void router.replace('/learn')
      return
    }
    openLessons.value = [0]
    selectedAnswers.value = {}
  },
  { immediate: true },
)
</script>

<template>
  <DefaultLayout>
    <div v-if="course" class="course-page" :style="{ '--course': course.accent, '--course-soft': course.softAccent }">
      <section class="course-hero">
        <div class="course-pattern" aria-hidden="true"></div>
        <div class="mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pb-24 lg:pt-40">
          <RouterLink to="/learn" class="back-link"><ArrowLeft :size="15" /> All courses</RouterLink>
          <div class="course-hero-grid">
            <div>
              <p class="course-kicker"><span>{{ course.title.slice(0, 2) }}</span>{{ course.eyebrow }} · {{ course.level }}</p>
              <h1>Learn <span>{{ course.title }}</span></h1>
              <h2>{{ course.tagline }}</h2>
              <p class="course-lead">{{ course.description }}</p>
              <div class="course-actions"><a href="#lessons" class="course-primary">Start course <ArrowRight :size="16" /></a><a href="#cheat-sheet" class="course-secondary"><FileText :size="16" /> Open cheat sheet</a></div>
            </div>
            <dl class="course-overview">
              <div><dt>{{ course.lessons.length }}</dt><dd>guided lessons</dd></div>
              <div><dt>{{ course.duration }}</dt><dd>estimated study</dd></div>
              <div><dt>{{ course.quiz.length }}</dt><dd>quiz questions</dd></div>
              <div><dt>1</dt><dd>capstone project</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <div class="course-layout mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <aside class="course-sidebar" aria-label="Course navigation">
          <p>Course contents</p>
          <nav><a href="#lessons">01 · Lessons</a><a href="#example">02 · Code example</a><a href="#cheat-sheet">03 · Cheat sheet</a><a href="#knowledge-check">04 · Quiz</a><a href="#project">05 · Final project</a></nav>
          <div class="prerequisite-box"><strong>Before you begin</strong><ul><li v-for="item in course.prerequisites" :key="item"><Check :size="13" />{{ item }}</li></ul></div>
          <a :href="course.officialUrl" target="_blank" rel="noopener noreferrer" class="official-link">Official documentation <ExternalLink :size="14" /></a>
        </aside>

        <div class="course-content">
          <section id="lessons" class="course-section">
            <p class="section-label">01 · Learning path</p><h2>Build your understanding step by step.</h2><p class="section-intro">Open a lesson to see the concepts you should be able to explain and use before moving forward.</p>
            <div class="lesson-list">
              <article v-for="(lesson, index) in course.lessons" :key="lesson.title" :class="{ open: openLessons.includes(index) }">
                <button type="button" :aria-expanded="openLessons.includes(index)" @click="toggleLesson(index)"><span>{{ String(index + 1).padStart(2, '0') }}</span><div><small>Lesson {{ index + 1 }}</small><strong>{{ lesson.title }}</strong></div><ChevronDown :size="19" /></button>
                <div v-if="openLessons.includes(index)" class="lesson-details"><p>{{ lesson.description }}</p><div><span v-for="topic in lesson.topics" :key="topic">{{ topic }}</span></div></div>
              </article>
            </div>
          </section>

          <section id="example" class="course-section">
            <p class="section-label">02 · Working example</p><h2>{{ course.example.title }}</h2><p class="section-intro">{{ course.example.explanation }}</p>
            <div class="example-card">
              <header><span><Code2 :size="16" />{{ course.example.file }}</span><button type="button" @click="copyExample"><Check v-if="copied" :size="14" /><Clipboard v-else :size="14" />{{ copied ? 'Copied' : 'Copy code' }}</button></header>
              <pre><code>{{ course.example.code }}</code></pre>
            </div>
            <div class="study-tip"><Lightbulb :size="19" /><p><strong>How to study this example:</strong> type it yourself, change one value, predict what will happen, run it, and explain each line aloud.</p></div>
          </section>

          <section id="cheat-sheet" class="course-section">
            <p class="section-label">03 · Quick reference</p><div class="cheat-heading"><div><h2>{{ course.title }} cheat sheet</h2><p class="section-intro">The syntax you will reach for most often. Bookmark this section while practicing.</p></div><span><FileText :size="19" /> {{ course.cheatSheet.reduce((total, group) => total + group.items.length, 0) }} essentials</span></div>
            <div class="cheat-grid">
              <article v-for="group in course.cheatSheet" :key="group.title"><h3>{{ group.title }}</h3><dl><div v-for="item in group.items" :key="item.syntax"><dt><code>{{ item.syntax }}</code></dt><dd>{{ item.meaning }}</dd></div></dl></article>
            </div>
            <div class="cheat-note"><Sparkles :size="18" /><p>A cheat sheet helps you remember syntax; the lessons and project teach you when and why to use it.</p></div>
          </section>

          <section id="knowledge-check" class="course-section">
            <p class="section-label">04 · Knowledge check</p><div class="quiz-heading"><div><h2>Test what you understand.</h2><p class="section-intro">Select an answer to receive immediate feedback.</p></div><div><strong>{{ quizScore }}/{{ course.quiz.length }}</strong><span>correct</span></div></div>
            <div class="quiz-list">
              <fieldset v-for="(question, questionIndex) in course.quiz" :key="question.question"><legend><span>{{ questionIndex + 1 }}</span>{{ question.question }}</legend><div class="quiz-options"><button v-for="(option, optionIndex) in question.options" :key="option" type="button" :class="{ selected: selectedAnswers[questionIndex] === optionIndex, correct: selectedAnswers[questionIndex] !== undefined && optionIndex === question.correct, wrong: selectedAnswers[questionIndex] === optionIndex && optionIndex !== question.correct }" @click="selectedAnswers[questionIndex] = optionIndex">{{ option }}</button></div><p v-if="selectedAnswers[questionIndex] !== undefined" class="quiz-feedback" aria-live="polite"><CheckCircle2 v-if="selectedAnswers[questionIndex] === question.correct" :size="16" /><Lightbulb v-else :size="16" />{{ question.explanation }}</p></fieldset>
            </div>
          </section>

          <section id="project" class="course-section project-section">
            <p class="section-label">05 · Put it together</p>
            <div class="project-panel"><div class="project-icon"><Rocket :size="25" /></div><div><p>Capstone project</p><h2>{{ course.project.title }}</h2><p>{{ course.project.description }}</p><ul><li v-for="item in course.project.requirements" :key="item"><Check :size="14" />{{ item }}</li></ul></div></div>
            <div class="finish-actions"><a :href="course.officialUrl" target="_blank" rel="noopener noreferrer">Continue in the official docs <ExternalLink :size="15" /></a><RouterLink to="/learn">Choose another course <ArrowRight :size="15" /></RouterLink></div>
          </section>

          <section class="more-courses" aria-labelledby="more-course-title"><p class="section-label">Keep learning</p><h2 id="more-course-title">Other courses</h2><div><RouterLink v-for="item in courses.filter((item) => item.slug !== course.slug).slice(0, 4)" :key="item.slug" :to="`/learn/${item.slug}`" :style="{ '--item': item.accent, '--item-soft': item.softAccent }"><span>{{ item.title.slice(0, 2) }}</span><strong>{{ item.title }}</strong><small>{{ item.category }}</small><ArrowRight :size="15" /></RouterLink></div></section>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped>
.course-hero { position: relative; overflow: hidden; border-bottom: 1px solid var(--border); background: var(--surface); }.course-pattern { position: absolute; inset: 0; opacity: 0.55; background-image: linear-gradient(color-mix(in srgb, var(--course) 9%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--course) 9%, transparent) 1px, transparent 1px); background-size: 36px 36px; mask-image: linear-gradient(to bottom right, black, transparent 80%); }.course-hero::after { position: absolute; width: 34rem; height: 34rem; right: -17rem; top: -18rem; border: 1px solid color-mix(in srgb, var(--course) 24%, transparent); border-radius: 999px; box-shadow: 0 0 0 5rem color-mix(in srgb, var(--course) 4%, transparent); content: ''; }
.back-link { position: relative; z-index: 2; display: inline-flex; align-items: center; gap: 0.4rem; color: var(--text-secondary); font-size: 0.68rem; font-weight: 800; }.back-link:hover { color: var(--course); }.course-hero-grid { position: relative; z-index: 1; display: grid; align-items: end; gap: 3rem; margin-top: 1.5rem; }.course-kicker { display: inline-flex; align-items: center; gap: 0.55rem; color: var(--course); font-size: 0.66rem; font-weight: 850; letter-spacing: 0.08em; text-transform: uppercase; }.course-kicker > span { display: flex; width: 2rem; height: 2rem; align-items: center; justify-content: center; border-radius: 0.55rem; background: var(--course); color: white; font-size: 0.58rem; }.course-hero h1 { margin-top: 1rem; font-size: clamp(3.3rem, 8vw, 6.5rem); font-weight: 850; letter-spacing: -0.075em; line-height: 0.92; }.course-hero h1 span { color: var(--course); }.course-hero h2 { max-width: 45rem; margin-top: 0.8rem; font-size: clamp(1.15rem, 2.5vw, 1.75rem); font-weight: 750; letter-spacing: -0.035em; }.course-lead { max-width: 46rem; margin-top: 1rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.8; }.course-actions { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 1.6rem; }.course-primary, .course-secondary { display: inline-flex; min-height: 3rem; align-items: center; justify-content: center; gap: 0.45rem; padding: 0.75rem 1rem; border-radius: 0.72rem; font-size: 0.72rem; font-weight: 850; }.course-primary { background: var(--course); color: white; box-shadow: 0 12px 28px color-mix(in srgb, var(--course) 22%, transparent); }.course-secondary { border: 1px solid var(--border); background: var(--surface); color: var(--text-primary); }
.course-overview { display: grid; grid-template-columns: repeat(2, 1fr); overflow: hidden; border: 1px solid var(--border); border-radius: 1rem; background: var(--nav-bg); box-shadow: var(--shadow); backdrop-filter: blur(15px); }.course-overview div { padding: 1.1rem; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); }.course-overview div:nth-child(2n) { border-right: 0; }.course-overview div:nth-last-child(-n + 2) { border-bottom: 0; }.course-overview dt { font-size: 1.05rem; font-weight: 850; }.course-overview dd { margin-top: 0.25rem; color: var(--text-muted); font-size: 0.55rem; font-weight: 750; text-transform: uppercase; }
.course-layout { display: grid; gap: 4rem; }.course-sidebar { display: none; }.course-sidebar > p { color: var(--text-muted); font-size: 0.6rem; font-weight: 850; letter-spacing: 0.12em; text-transform: uppercase; }.course-sidebar nav { display: grid; gap: 0.12rem; margin-top: 0.7rem; }.course-sidebar nav a { padding: 0.5rem 0.65rem; border-left: 2px solid var(--border); color: var(--text-secondary); font-size: 0.68rem; font-weight: 700; }.course-sidebar nav a:hover { border-color: var(--course); background: var(--course-soft); color: var(--course); }.prerequisite-box { margin-top: 1rem; padding: 0.8rem; border: 1px solid var(--border); border-radius: 0.65rem; background: var(--surface); }.prerequisite-box strong { font-size: 0.65rem; }.prerequisite-box ul { display: grid; gap: 0.4rem; margin-top: 0.55rem; }.prerequisite-box li { display: flex; gap: 0.35rem; color: var(--text-muted); font-size: 0.6rem; line-height: 1.4; }.prerequisite-box svg { flex: 0 0 auto; color: var(--course); }.official-link { display: flex; align-items: center; justify-content: space-between; margin-top: 0.6rem; padding: 0.7rem; border: 1px solid var(--border); border-radius: 0.6rem; color: var(--course); font-size: 0.62rem; font-weight: 800; }
.course-content { min-width: 0; }.course-section { padding: 0 0 6rem; scroll-margin-top: 7rem; }.course-section + .course-section, .more-courses { padding-top: 6rem; border-top: 1px solid var(--border); }.section-label { margin-bottom: 0.7rem; color: var(--course); font-size: 0.65rem; font-weight: 850; letter-spacing: 0.13em; text-transform: uppercase; }.course-section h2, .more-courses h2 { max-width: 47rem; font-size: clamp(2rem, 4.5vw, 3.5rem); font-weight: 830; letter-spacing: -0.055em; line-height: 1.05; }.section-intro { max-width: 47rem; margin-top: 0.9rem; color: var(--text-secondary); font-size: 0.82rem; line-height: 1.75; }
.lesson-list { display: grid; gap: 0.55rem; margin-top: 2rem; }.lesson-list article { overflow: hidden; border: 1px solid var(--border); border-radius: 0.8rem; background: var(--surface); }.lesson-list article.open { border-color: color-mix(in srgb, var(--course) 38%, var(--border)); }.lesson-list button { display: grid; width: 100%; grid-template-columns: auto 1fr auto; align-items: center; gap: 0.8rem; padding: 0.9rem; text-align: left; cursor: pointer; }.lesson-list button > span { display: flex; width: 2rem; height: 2rem; align-items: center; justify-content: center; border-radius: 0.55rem; background: var(--course-soft); color: var(--course); font-size: 0.57rem; font-weight: 850; }.lesson-list button small, .lesson-list button strong { display: block; }.lesson-list button small { color: var(--text-muted); font-size: 0.53rem; font-weight: 750; text-transform: uppercase; }.lesson-list button strong { margin-top: 0.18rem; font-size: 0.76rem; }.lesson-list button > svg { color: var(--text-muted); transition: transform 0.2s ease; }.lesson-list article.open button > svg { color: var(--course); transform: rotate(180deg); }.lesson-details { padding: 0 0.9rem 1rem 3.7rem; }.lesson-details p { color: var(--text-secondary); font-size: 0.7rem; line-height: 1.6; }.lesson-details div { display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: 0.7rem; }.lesson-details span { padding: 0.3rem 0.45rem; border-radius: 0.4rem; background: var(--course-soft); color: var(--course); font-size: 0.55rem; font-weight: 750; }
.example-card { overflow: hidden; margin-top: 1.6rem; border: 1px solid #2d3549; border-radius: 0.9rem; background: #0d111c; color: #dbe3f5; }.example-card header { display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 0.85rem; border-bottom: 1px solid #283044; background: #151b29; }.example-card header > span, .example-card header button { display: flex; align-items: center; gap: 0.4rem; font-size: 0.6rem; font-weight: 800; }.example-card header > span svg { color: var(--course); }.example-card header button { padding: 0.4rem 0.5rem; border: 1px solid #30394f; border-radius: 0.4rem; color: #aeb8cc; cursor: pointer; }.example-card pre { max-height: 34rem; overflow: auto; padding: 1.2rem; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.68rem; line-height: 1.75; tab-size: 2; }.study-tip, .cheat-note { display: flex; gap: 0.65rem; margin-top: 0.8rem; padding: 0.85rem; border-left: 3px solid var(--course); border-radius: 0 0.65rem 0.65rem 0; background: var(--course-soft); color: var(--text-secondary); font-size: 0.68rem; line-height: 1.6; }.study-tip svg, .cheat-note svg { flex: 0 0 auto; color: var(--course); }.study-tip strong { color: var(--text-primary); }
.cheat-heading { display: grid; gap: 1rem; }.cheat-heading > span { display: inline-flex; width: fit-content; align-items: center; gap: 0.4rem; padding: 0.55rem 0.65rem; border-radius: 99px; background: var(--course-soft); color: var(--course); font-size: 0.6rem; font-weight: 800; }.cheat-grid { display: grid; gap: 0.7rem; margin-top: 1.8rem; }.cheat-grid article { overflow: hidden; border: 1px solid var(--border); border-radius: 0.8rem; background: var(--surface); }.cheat-grid h3 { padding: 0.75rem 0.85rem; border-bottom: 1px solid var(--border); background: var(--course-soft); color: var(--course); font-size: 0.7rem; font-weight: 850; }.cheat-grid dl div { padding: 0.7rem 0.85rem; border-top: 1px solid var(--border); }.cheat-grid dl div:first-child { border: 0; }.cheat-grid code { display: block; overflow-wrap: anywhere; color: var(--text-primary); font-size: 0.62rem; font-weight: 750; }.cheat-grid dd { margin-top: 0.25rem; color: var(--text-muted); font-size: 0.58rem; line-height: 1.45; }
.quiz-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }.quiz-heading > div:last-child { min-width: 4.5rem; padding: 0.65rem; border-radius: 0.65rem; background: var(--course-soft); color: var(--course); text-align: center; }.quiz-heading > div:last-child strong, .quiz-heading > div:last-child span { display: block; }.quiz-heading > div:last-child strong { font-size: 1rem; }.quiz-heading > div:last-child span { font-size: 0.52rem; font-weight: 750; text-transform: uppercase; }.quiz-list { display: grid; gap: 0.7rem; margin-top: 1.6rem; }.quiz-list fieldset { padding: 1rem; border: 1px solid var(--border); border-radius: 0.8rem; background: var(--surface); }.quiz-list legend { display: flex; gap: 0.6rem; width: 100%; font-size: 0.72rem; font-weight: 800; line-height: 1.5; }.quiz-list legend span { display: flex; width: 1.5rem; height: 1.5rem; flex: 0 0 auto; align-items: center; justify-content: center; border-radius: 99px; background: var(--course-soft); color: var(--course); font-size: 0.55rem; }.quiz-options { display: grid; gap: 0.4rem; margin-top: 0.8rem; }.quiz-options button { padding: 0.65rem 0.7rem; border: 1px solid var(--border); border-radius: 0.5rem; color: var(--text-secondary); font-size: 0.64rem; font-weight: 700; text-align: left; cursor: pointer; }.quiz-options button:hover, .quiz-options button.selected { border-color: var(--course); color: var(--course); }.quiz-options button.correct { border-color: #35a269; background: #eaf9f0; color: #167344; }.quiz-options button.wrong { border-color: var(--course); background: var(--course-soft); color: var(--course); }.quiz-feedback { display: flex; gap: 0.45rem; margin-top: 0.7rem; padding: 0.65rem; border-radius: 0.5rem; background: var(--surface-2); color: var(--text-secondary); font-size: 0.62rem; line-height: 1.55; }.quiz-feedback svg { flex: 0 0 auto; color: var(--course); }
.project-section { padding-bottom: 6rem; }.project-panel { display: grid; gap: 1rem; padding: 1.3rem; border-radius: 1rem; background: #0d1220; color: white; }.project-icon { display: flex; width: 3rem; height: 3rem; align-items: center; justify-content: center; border-radius: 0.75rem; background: var(--course); }.project-panel > div:last-child > p:first-child { color: color-mix(in srgb, var(--course) 65%, white); font-size: 0.6rem; font-weight: 850; letter-spacing: 0.11em; text-transform: uppercase; }.project-panel h2 { margin-top: 0.4rem; font-size: clamp(1.8rem, 4vw, 2.8rem); }.project-panel h2 + p { max-width: 40rem; margin-top: 0.7rem; color: rgb(255 255 255 / 0.62); font-size: 0.75rem; line-height: 1.65; }.project-panel ul { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 1rem; }.project-panel li { display: inline-flex; align-items: center; gap: 0.3rem; padding: 0.4rem 0.5rem; border: 1px solid rgb(255 255 255 / 0.12); border-radius: 0.45rem; color: rgb(255 255 255 / 0.75); font-size: 0.58rem; }.finish-actions { display: flex; flex-wrap: wrap; gap: 0.55rem; margin-top: 0.8rem; }.finish-actions a { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.7rem 0.8rem; border: 1px solid var(--border); border-radius: 0.6rem; background: var(--surface); color: var(--course); font-size: 0.64rem; font-weight: 800; }
.more-courses { padding-bottom: 0; }.more-courses > div { display: grid; gap: 0.5rem; margin-top: 1.3rem; }.more-courses a { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 0.7rem; padding: 0.75rem; border: 1px solid var(--border); border-radius: 0.65rem; background: var(--surface); }.more-courses a > span { display: flex; width: 2rem; height: 2rem; grid-row: span 2; align-items: center; justify-content: center; border-radius: 0.5rem; background: var(--item-soft); color: var(--item); font-size: 0.55rem; font-weight: 900; text-transform: uppercase; }.more-courses a strong { font-size: 0.7rem; }.more-courses a small { grid-column: 2; color: var(--text-muted); font-size: 0.54rem; }.more-courses a svg { grid-column: 3; grid-row: 1 / span 2; color: var(--item); }
@media (min-width: 640px) { .cheat-grid { grid-template-columns: repeat(3, 1fr); }.quiz-options { grid-template-columns: repeat(2, 1fr); }.project-panel { grid-template-columns: auto 1fr; padding: 1.8rem; }.more-courses > div { grid-template-columns: repeat(2, 1fr); }.cheat-heading { grid-template-columns: 1fr auto; align-items: start; } }
@media (min-width: 768px) { .course-hero-grid { grid-template-columns: minmax(0, 1.25fr) minmax(20rem, 0.75fr); } }
@media (min-width: 1024px) { .course-layout { grid-template-columns: 13.5rem minmax(0, 1fr); align-items: start; gap: 4.5rem; }.course-sidebar { position: sticky; top: 7rem; display: block; } }
@media (max-width: 520px) { .course-section { padding-bottom: 4.5rem; }.course-section + .course-section, .more-courses { padding-top: 4.5rem; }.quiz-heading { display: block; }.quiz-heading > div:last-child { width: fit-content; margin-top: 0.9rem; } }
</style>

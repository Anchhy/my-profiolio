<script setup lang="ts">
import { Database, Monitor, Server, Wrench } from 'lucide-vue-next'
import { skillCategories } from '../data/portfolio'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { elementRef } = useScrollAnimation()
const iconMap: Record<string, typeof Monitor> = { monitor: Monitor, server: Server, database: Database, wrench: Wrench }
</script>

<template>
  <section id="skills" class="section-shell">
    <div ref="elementRef" class="reveal mx-auto max-w-7xl">
      <div class="section-heading-row">
        <div>
          <p class="section-kicker">03 / Capabilities</p>
          <h2 class="section-title">A practical stack for <span class="accent-underline">shipping.</span></h2>
        </div>
        <p class="section-copy">
          I choose tools based on the problem, with most of my recent work centered on Vue, NestJS, Spring Boot, and relational databases.
        </p>
      </div>

      <div class="skills-grid">
        <article v-for="(category, index) in skillCategories" :key="category.title" class="skill-card">
          <header>
            <div class="skill-icon"><component :is="iconMap[category.icon]" :size="20" /></div>
            <span>0{{ index + 1 }}</span>
          </header>
          <h3>{{ category.title }}</h3>
          <p>{{ category.skills.length }} tools & technologies</p>
          <ul class="skill-cloud">
            <li v-for="skill in category.skills" :key="skill.name">{{ skill.name }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

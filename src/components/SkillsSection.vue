<script setup lang="ts">
import { skillCategories } from '../data/portfolio'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import { Monitor, Server, Database, Wrench, ArrowUpRight } from 'lucide-vue-next'

const { elementRef } = useScrollAnimation()

const iconMap: Record<string, any> = {
  monitor: Monitor,
  server: Server,
  database: Database,
  wrench: Wrench,
}
</script>

<template>
  <section id="skills" class="section-shell section-tint">
    <div ref="elementRef" class="reveal mx-auto max-w-7xl">
      <div class="section-heading-row">
        <div>
          <p class="section-kicker">Toolkit</p>
          <h2 class="section-title text-left">Tools I use to <span class="gradient-text">ship ideas</span></h2>
        </div>
        <p class="section-copy">
          A practical stack for building responsive interfaces, reliable APIs, and data-driven products.
        </p>
      </div>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="(category, index) in skillCategories"
          :key="category.title"
          class="skill-card group"
        >
          <div class="mb-7 flex items-center justify-between">
            <div class="icon-box">
              <component :is="iconMap[category.icon]" :size="21" />
            </div>
            <span class="text-xs font-bold" style="color: var(--text-muted)">0{{ index + 1 }}</span>
          </div>
          <h3 class="mb-5 text-lg font-bold">{{ category.title }}</h3>
          <ul class="space-y-3">
            <li
              v-for="skill in category.skills"
              :key="skill.name"
              class="flex items-center justify-between text-sm"
              style="color: var(--text-secondary)"
            >
              <span>{{ skill.name }}</span>
              <ArrowUpRight :size="14" class="opacity-0 transition-opacity group-hover:opacity-50" />
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

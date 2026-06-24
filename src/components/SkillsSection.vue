<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { skillCategories } from '../data/portfolio'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import { Monitor, Server, Database, Wrench } from 'lucide-vue-next'

const { elementRef, isVisible } = useScrollAnimation()
const animated = ref(false)

const iconMap: Record<string, any> = {
  monitor: Monitor,
  server: Server,
  database: Database,
  wrench: Wrench,
}

onMounted(() => {
  // Watch for visibility to trigger progress bar animation
  const interval = setInterval(() => {
    if (isVisible.value && !animated.value) {
      animated.value = true
      clearInterval(interval)
    }
  }, 100)
})
</script>

<template>
  <section id="skills" class="py-24 px-4 sm:px-6 lg:px-8" style="background: var(--surface)">
    <div ref="elementRef" class="reveal max-w-6xl mx-auto">
      <h2 class="section-title">
        My <span class="gradient-text">Skills</span>
      </h2>
      <p class="section-subtitle">Technologies and tools I work with</p>

      <div class="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <div
          v-for="(category, catIdx) in skillCategories"
          :key="category.title"
          class="card p-6"
          :style="{ transitionDelay: `${catIdx * 100}ms` }"
        >
          <!-- Category Header -->
          <div class="flex items-center gap-3 mb-5">
            <div
              class="w-11 h-11 rounded-xl flex items-center justify-center"
              style="
                background: linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500));
              "
            >
              <component :is="iconMap[category.icon]" :size="22" class="text-white" />
            </div>
            <h3 class="text-lg font-bold" style="color: var(--text-primary)">
              {{ category.title }}
            </h3>
          </div>

          <!-- Skills List -->
          <div class="space-y-4">
            <div v-for="skill in category.skills" :key="skill.name">
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-sm font-medium" style="color: var(--text-primary)">
                  {{ skill.name }}
                </span>
                <span class="text-xs font-semibold" style="color: var(--color-primary-500)">
                  {{ skill.level }}%
                </span>
              </div>
              <div class="progress-bar">
                <div
                  class="progress-fill"
                  :style="{ width: animated ? `${skill.level}%` : '0%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { projects } from '../data/portfolio'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import { Github, ExternalLink, ArrowUpRight, Users } from 'lucide-vue-next'

const { elementRef } = useScrollAnimation()

const gradients = [
  'linear-gradient(135deg, #4f46e5, #7c3aed)',
  'linear-gradient(135deg, #0f766e, #0891b2)',
  'linear-gradient(135deg, #b45309, #e11d48)',
]
</script>

<template>
  <section id="projects" class="section-shell">
    <div ref="elementRef" class="reveal mx-auto max-w-7xl">
      <div class="section-heading-row">
        <div>
          <p class="section-kicker">Selected work</p>
          <h2 class="section-title text-left">Projects with <span class="gradient-text">purpose</span></h2>
        </div>
        <p class="section-copy">
          Products that helped me practice full-stack architecture, teamwork, and solving real workflow problems.
        </p>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <article
          v-for="(project, idx) in projects"
          :key="project.title"
          class="project-card group"
          :class="{ 'lg:col-span-2 lg:grid lg:grid-cols-[0.85fr_1.15fr]': idx === 0 }"
        >
          <div class="project-visual" :style="{ background: gradients[idx % gradients.length] }">
            <span class="project-number">0{{ idx + 1 }}</span>
            <div class="relative z-10">
              <p class="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/70">{{ project.eyebrow }}</p>
              <h3 class="max-w-lg text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
                {{ project.title }}
              </h3>
            </div>
            <div class="project-orb project-orb-one"></div>
            <div class="project-orb project-orb-two"></div>
          </div>

          <div class="flex flex-col p-6 sm:p-8">
            <div class="mb-5 flex flex-wrap items-center gap-2">
              <span v-if="project.isGroupProject" class="meta-chip"><Users :size="13" /> Team project</span>
              <span v-if="project.teamInfo" class="meta-chip">{{ project.teamInfo }}</span>
            </div>

            <p class="mb-5 leading-7" style="color: var(--text-secondary)">{{ project.description }}</p>

            <div class="contribution-block mb-6">
              <p class="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-primary-500)]">My contribution</p>
              <p class="text-sm leading-6" style="color: var(--text-primary)">{{ project.contribution }}</p>
            </div>

            <div class="mb-7 flex flex-wrap gap-2">
              <span v-for="tech in project.techStack" :key="tech" class="tech-chip">{{ tech }}</span>
            </div>

            <div class="mt-auto flex flex-wrap gap-4 border-t pt-5" style="border-color: var(--border)">
              <a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" rel="noopener noreferrer" class="project-link">
                <ExternalLink :size="16" /> Live demo <ArrowUpRight :size="14" />
              </a>
              <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" rel="noopener noreferrer" class="project-link">
                <Github :size="16" /> Source code <ArrowUpRight :size="14" />
              </a>
              <a v-if="project.githubBackendUrl" :href="project.githubBackendUrl" target="_blank" rel="noopener noreferrer" class="project-link">
                <Github :size="16" /> Backend <ArrowUpRight :size="14" />
              </a>
              <a v-if="project.githubFrontendUrl" :href="project.githubFrontendUrl" target="_blank" rel="noopener noreferrer" class="project-link">
                <Github :size="16" /> Frontend <ArrowUpRight :size="14" />
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

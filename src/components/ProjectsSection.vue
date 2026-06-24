<script setup lang="ts">
import { projects } from '../data/portfolio'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import { Github, ExternalLink, CheckCircle2, Users } from 'lucide-vue-next'

const { elementRef } = useScrollAnimation()

// Alternate gradient colors for project cards
const gradients = [
  'linear-gradient(135deg, var(--color-primary-500), var(--color-accent-600))',
  'linear-gradient(135deg, #059669, #0891b2)',
  'linear-gradient(135deg, #d97706, #dc2626)',
]
</script>

<template>
  <section id="projects" class="py-24 px-4 sm:px-6 lg:px-8">
    <div ref="elementRef" class="reveal max-w-6xl mx-auto">
      <h2 class="section-title">
        Featured <span class="gradient-text">Projects</span>
      </h2>
      <p class="section-subtitle">Highlights of my recent work</p>

      <div class="space-y-10 max-w-4xl mx-auto">
        <div v-for="(project, idx) in projects" :key="project.title">
          <div class="card overflow-hidden">
            <!-- Project Header with gradient banner -->
            <div
              class="relative h-48 sm:h-56 flex items-center justify-center"
              :style="{ background: gradients[idx % gradients.length] }"
            >
              <div class="text-center text-white px-6">
                <h3 class="text-2xl sm:text-3xl md:text-4xl font-black mb-2">{{ project.title }}</h3>
                <!-- Badges row -->
                <div class="flex items-center justify-center gap-2 flex-wrap mb-3">
                  <span
                    v-if="project.isGroupProject"
                    class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm"
                  >
                    👥 Group Project
                  </span>
                  <span
                    v-if="project.teamInfo"
                    class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/15 backdrop-blur-sm"
                  >
                    {{ project.teamInfo }}
                  </span>
                </div>
                <p class="text-white/80 text-sm sm:text-base max-w-lg mx-auto">
                  {{ project.description }}
                </p>
              </div>
              <!-- Decorative circles -->
              <div
                class="absolute top-4 left-4 w-20 h-20 rounded-full border-2 border-white/10"
              ></div>
              <div
                class="absolute bottom-4 right-4 w-32 h-32 rounded-full border-2 border-white/10"
              ></div>
            </div>

            <!-- Project Body -->
            <div class="p-6 sm:p-8">
              <!-- Tech Stack Badges -->
              <div class="mb-6">
                <h4
                  class="text-xs font-bold uppercase tracking-widest mb-3"
                  style="color: var(--text-secondary)"
                >
                  Technology Stack
                </h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tech in project.techStack"
                    :key="tech"
                    class="px-3 py-1.5 rounded-lg text-xs font-semibold"
                    style="
                      background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1));
                      color: var(--color-primary-500);
                      border: 1px solid rgba(99,102,241,0.2);
                    "
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <!-- Features -->
              <div class="mb-6">
                <h4
                  class="text-xs font-bold uppercase tracking-widest mb-3"
                  style="color: var(--text-secondary)"
                >
                  Key Features
                </h4>
                <div class="grid sm:grid-cols-2 gap-2">
                  <div
                    v-for="feature in project.features"
                    :key="feature"
                    class="flex items-center gap-2.5 py-2 px-3 rounded-lg text-sm"
                    style="color: var(--text-primary)"
                  >
                    <CheckCircle2
                      :size="16"
                      class="flex-shrink-0"
                      style="color: var(--color-primary-500)"
                    />
                    {{ feature }}
                  </div>
                </div>
              </div>

              <!-- Actions — dynamic based on project URLs -->
              <div class="flex flex-wrap gap-3 pt-2">
                <!-- Single repo button -->
                <a
                  v-if="project.githubUrl"
                  :href="project.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-primary text-sm"
                >
                  <Github :size="16" />
                  View on GitHub
                </a>
                <!-- Multi-repo: Backend -->
                <a
                  v-if="project.githubBackendUrl"
                  :href="project.githubBackendUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-primary text-sm"
                >
                  <Github :size="16" />
                  Backend Repo
                </a>
                <!-- Multi-repo: Frontend -->
                <a
                  v-if="project.githubFrontendUrl"
                  :href="project.githubFrontendUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-outline text-sm"
                >
                  <Github :size="16" />
                  Frontend Repo
                </a>
                <!-- Live Demo -->
                <a
                  v-if="project.liveUrl"
                  :href="project.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-outline text-sm"
                >
                  <ExternalLink :size="16" />
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

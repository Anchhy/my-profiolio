<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowUpRight, ExternalLink, Github, ListFilter, Users } from 'lucide-vue-next'
import ProjectModal from './ProjectModal.vue'
import { projects, type Project } from '../data/portfolio'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { elementRef } = useScrollAnimation()
const activeFilter = ref('All')
const selectedProject = ref<Project | null>(null)

const filters = ['All', ...new Set(projects.map((project) => project.category))]
const artVariantCount = 4

const visibleProjects = computed(() => {
  const showFeatured = activeFilter.value === 'All'
  const matching = projects
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => showFeatured || project.category === activeFilter.value)

  return matching.map((item, visibleIndex) => {
    // The featured card fills a whole row, so every card after it starts one slot later.
    const slot = showFeatured ? visibleIndex + 1 : visibleIndex
    const isLastAlone = visibleIndex === matching.length - 1 && slot % 2 === 0
    return { ...item, isWide: (showFeatured && visibleIndex === 0) || isLastAlone }
  })
})
</script>

<template>
  <section id="projects" class="section-shell section-tint">
    <div ref="elementRef" class="reveal mx-auto max-w-7xl">
      <div class="section-heading-row">
        <div>
          <p class="section-kicker">03 / Selected work</p>
          <h2 class="section-title">Proof through <span class="accent-underline">projects.</span></h2>
        </div>
        <p class="section-copy">
          Case studies showing how I approach product architecture, real-time behavior, secure workflows, and collaborative delivery.
        </p>
      </div>

      <div class="project-toolbar" aria-label="Filter projects">
        <span class="project-filter-label"><ListFilter :size="15" /> Filter by focus</span>
        <div class="project-filters">
          <button
            v-for="filter in filters"
            :key="filter"
            type="button"
            class="filter-button"
            :class="{ 'filter-button-active': activeFilter === filter }"
            :aria-pressed="activeFilter === filter"
            @click="activeFilter = filter"
          >
            {{ filter }}
          </button>
        </div>
      </div>

      <TransitionGroup name="project-grid" tag="div" class="projects-grid">
        <article
          v-for="{ project, index, isWide } in visibleProjects"
          :key="project.title"
          class="project-card"
          :class="{ 'project-card-wide': isWide }"
        >
          <div
            class="project-art"
            :class="[`project-art-${(index % artVariantCount) + 1}`, { 'project-art-with-image': project.imageUrl }]"
          >
            <img
              v-if="project.imageUrl"
              :src="project.imageUrl"
              :alt="`${project.title} interface preview`"
              class="project-preview-image"
              loading="lazy"
              decoding="async"
            />
            <div v-else class="project-browser" aria-hidden="true">
              <div class="browser-bar"><i></i><i></i><i></i><span>{{ project.eyebrow }}</span></div>
              <div class="browser-content">
                <span class="browser-label">PROJECT {{ String(index + 1).padStart(2, '0') }}</span>
                <strong>{{ project.title }}</strong>
                <div class="browser-lines"><i></i><i></i><i></i></div>
              </div>
            </div>
            <span class="project-category">{{ project.category }}</span>
          </div>

          <div class="project-body">
            <div class="mb-4 flex flex-wrap items-center gap-2">
              <span v-if="project.isGroupProject" class="meta-chip"><Users :size="13" /> Team project</span>
              <span v-if="project.teamInfo" class="meta-chip meta-chip-neutral">{{ project.teamInfo }}</span>
            </div>
            <h3>{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>

            <div class="project-tech-list">
              <span v-for="tech in project.techStack.slice(0, 5)" :key="tech">{{ tech }}</span>
              <span v-if="project.techStack.length > 5">+{{ project.techStack.length - 5 }}</span>
            </div>

            <div class="project-actions">
              <button
                type="button"
                class="project-detail-button"
                aria-haspopup="dialog"
                @click="selectedProject = project"
              >
                View details<span class="sr-only"> for {{ project.title }}</span> <ArrowUpRight :size="15" />
              </button>
              <a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" rel="noopener noreferrer" class="project-icon-link" :aria-label="`Open ${project.title} live demo`">
                <ExternalLink :size="17" />
              </a>
              <a
                v-if="project.githubUrl || project.githubFrontendUrl"
                :href="project.githubUrl || project.githubFrontendUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="project-icon-link"
                :aria-label="`Open ${project.title} source code on GitHub`"
              >
                <Github :size="17" />
              </a>
            </div>
          </div>
        </article>
      </TransitionGroup>
    </div>

    <ProjectModal :project="selectedProject" @close="selectedProject = null" />
  </section>
</template>

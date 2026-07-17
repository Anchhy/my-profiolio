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
const visibleProjects = computed(() =>
  projects
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => activeFilter.value === 'All' || project.category === activeFilter.value),
)
</script>

<template>
  <section id="projects" class="section-shell section-tint">
    <div ref="elementRef" class="reveal mx-auto max-w-7xl">
      <div class="section-heading-row">
        <div>
          <p class="section-kicker">02 / Selected work</p>
          <h2 class="section-title">Proof through <span class="accent-underline">projects.</span></h2>
        </div>
        <p class="section-copy">
          A selection of products where I practiced architecture, teamwork, and solving real workflow problems.
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
          v-for="({ project, index }, visibleIndex) in visibleProjects"
          :key="project.title"
          class="project-card"
          :class="{ 'project-card-featured': visibleIndex === 0 && activeFilter === 'All' }"
        >
          <div class="project-art" :class="`project-art-${index + 1}`">
            <div class="project-browser" aria-hidden="true">
              <div class="browser-bar"><i></i><i></i><i></i><span>{{ project.eyebrow }}</span></div>
              <div class="browser-content">
                <span class="browser-label">PROJECT 0{{ index + 1 }}</span>
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
              <button type="button" class="project-detail-button" @click="selectedProject = project">
                View details <ArrowUpRight :size="15" />
              </button>
              <a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" rel="noopener noreferrer" class="project-icon-link" aria-label="Open live demo">
                <ExternalLink :size="17" />
              </a>
              <a
                v-if="project.githubUrl || project.githubFrontendUrl"
                :href="project.githubUrl || project.githubFrontendUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="project-icon-link"
                aria-label="Open source code on GitHub"
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

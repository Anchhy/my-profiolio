<script setup lang="ts">
import { nextTick, onUnmounted, ref, watch } from 'vue'
import { ArrowUpRight, Check, ExternalLink, Github, X } from 'lucide-vue-next'
import type { Project } from '../data/portfolio'

const props = defineProps<{ project: Project | null }>()
const emit = defineEmits<{ close: [] }>()
const closeButton = ref<HTMLButtonElement | null>(null)
const modalElement = ref<HTMLElement | null>(null)
let previouslyFocused: HTMLElement | null = null

const close = () => emit('close')

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    close()
    return
  }

  if (event.key === 'Tab' && modalElement.value) {
    const focusable = Array.from(
      modalElement.value.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
    )
    const first = focusable[0]
    const last = focusable.at(-1)

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus()
    }
  }
}

watch(
  () => props.project,
  async (project) => {
    if (project) {
      previouslyFocused = document.activeElement as HTMLElement
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKeydown)
      await nextTick()
      closeButton.value?.focus()
    } else {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeydown)
      previouslyFocused?.focus()
    }
  },
)

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="project" class="modal-backdrop" @mousedown.self="close">
        <section ref="modalElement" class="project-modal" role="dialog" aria-modal="true" :aria-labelledby="`project-${project.title.replace(/\W/g, '-')}`">
          <button ref="closeButton" type="button" class="modal-close" aria-label="Close project details" @click="close">
            <X :size="20" />
          </button>

          <div class="modal-header">
            <p>{{ project.eyebrow }} · {{ project.category }}</p>
            <h2 :id="`project-${project.title.replace(/\W/g, '-')}`">{{ project.title }}</h2>
            <span v-if="project.teamInfo">{{ project.teamInfo }}</span>
          </div>

          <div class="modal-content">
            <div>
              <h3>Project overview</h3>
              <p>{{ project.description }}</p>
            </div>
            <div class="modal-contribution">
              <h3>My contribution</h3>
              <p>{{ project.contribution }}</p>
            </div>
            <div>
              <h3>Key features</h3>
              <ul class="modal-features">
                <li v-for="feature in project.features" :key="feature"><Check :size="15" /> {{ feature }}</li>
              </ul>
            </div>
            <div>
              <h3>Technology</h3>
              <div class="modal-tech"><span v-for="tech in project.techStack" :key="tech">{{ tech }}</span></div>
            </div>
          </div>

          <div class="modal-actions">
            <a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" rel="noopener noreferrer" class="btn-primary">
              <ExternalLink :size="17" /> Live demo <ArrowUpRight :size="14" />
            </a>
            <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" rel="noopener noreferrer" class="btn-secondary">
              <Github :size="17" /> Source code
            </a>
            <a v-if="project.githubFrontendUrl" :href="project.githubFrontendUrl" target="_blank" rel="noopener noreferrer" class="btn-secondary">
              <Github :size="17" /> Frontend
            </a>
            <a v-if="project.githubBackendUrl" :href="project.githubBackendUrl" target="_blank" rel="noopener noreferrer" class="btn-secondary">
              <Github :size="17" /> Backend
            </a>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-active .project-modal,
.modal-leave-active .project-modal { transition: transform 0.25s ease, opacity 0.2s ease; }
.modal-enter-from,
.modal-leave-to { opacity: 0; }
.modal-enter-from .project-modal,
.modal-leave-to .project-modal { opacity: 0; transform: translateY(18px) scale(0.985); }
</style>

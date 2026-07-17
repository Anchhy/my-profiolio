<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-vue-next'
import { useDarkMode } from '../composables/useDarkMode'

const { isDark, toggle } = useDarkMode()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeSection = ref('hero')
const scrollProgress = ref(0)

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
]

const sections = ['hero', 'about', 'projects', 'skills', 'education', 'contact']

const handleScroll = () => {
  isScrolled.value = window.scrollY > 24

  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0

  for (const id of [...sections].reverse()) {
    const element = document.getElementById(id)
    if (element && element.getBoundingClientRect().top <= 150) {
      activeSection.value = id
      break
    }
  }
}

const scrollTo = (href: string) => {
  isMobileMenuOpen.value = false
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  window.history.replaceState(null, '', href)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') isMobileMenuOpen.value = false
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
    <nav
      class="nav-shell mx-auto flex max-w-7xl items-center justify-between"
      :class="{ 'nav-shell-scrolled': isScrolled }"
      aria-label="Primary navigation"
    >
      <a href="#hero" class="brand-mark" aria-label="Et Anchhy, back to home" @click.prevent="scrollTo('#hero')">
        <span class="brand-monogram">EA</span>
        <span>
          <strong>Et Anchhy</strong>
          <small>Full-stack developer</small>
        </span>
      </a>

      <div class="hidden items-center gap-1 lg:flex">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="nav-link"
          :class="{ 'nav-link-active': activeSection === link.href.slice(1) }"
          :aria-current="activeSection === link.href.slice(1) ? 'page' : undefined"
          @click.prevent="scrollTo(link.href)"
        >
          {{ link.label }}
        </a>
      </div>

      <div class="flex items-center gap-2">
        <button
          class="icon-button"
          type="button"
          :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          :title="isDark ? 'Light theme' : 'Dark theme'"
          @click="toggle"
        >
          <Transition name="icon" mode="out-in">
            <Sun v-if="isDark" :size="18" />
            <Moon v-else :size="18" />
          </Transition>
        </button>

        <a href="#contact" class="nav-cta hidden sm:inline-flex" @click.prevent="scrollTo('#contact')">
          Let’s talk <ArrowUpRight :size="15" />
        </a>

        <button
          class="icon-button lg:hidden"
          type="button"
          aria-controls="mobile-navigation"
          :aria-expanded="isMobileMenuOpen"
          :aria-label="isMobileMenuOpen ? 'Close navigation' : 'Open navigation'"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <Transition name="icon" mode="out-in">
            <X v-if="isMobileMenuOpen" :size="20" />
            <Menu v-else :size="20" />
          </Transition>
        </button>
      </div>

      <span class="scroll-progress" :style="{ width: `${scrollProgress}%` }" aria-hidden="true"></span>
    </nav>

    <Transition name="menu">
      <div v-if="isMobileMenuOpen" id="mobile-navigation" class="mobile-menu mx-auto mt-2 max-w-7xl lg:hidden">
        <a href="#hero" class="mobile-link" @click.prevent="scrollTo('#hero')">Home</a>
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="mobile-link"
          :class="{ 'mobile-link-active': activeSection === link.href.slice(1) }"
          @click.prevent="scrollTo(link.href)"
        >
          {{ link.label }}
        </a>
        <a href="#contact" class="mobile-contact" @click.prevent="scrollTo('#contact')">
          Start a conversation <ArrowUpRight :size="16" />
        </a>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.icon-enter-active,
.icon-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.icon-enter-from,
.icon-leave-to { opacity: 0; transform: scale(0.75) rotate(-20deg); }
.menu-enter-active,
.menu-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.menu-enter-from,
.menu-leave-to { opacity: 0; transform: translateY(-8px); }
</style>

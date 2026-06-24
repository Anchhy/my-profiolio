<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useDarkMode } from '../composables/useDarkMode'
import { Sun, Moon, Menu, X } from 'lucide-vue-next'

const { isDark, toggle } = useDarkMode()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeSection = ref('hero')

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50

  // Scroll spy
  const sections = ['hero', 'about', 'skills', 'projects', 'education', 'contact']
  for (const id of sections.reverse()) {
    const el = document.getElementById(id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 120) {
        activeSection.value = id
        break
      }
    }
  }
}

const scrollTo = (href: string) => {
  isMobileMenuOpen.value = false
  const el = document.querySelector(href)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav
    id="navbar"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="isScrolled ? 'glass shadow-lg py-3' : 'py-5'"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <!-- Logo -->
      <a
        href="#hero"
        class="text-xl font-bold tracking-tight gradient-text"
        @click.prevent="scrollTo('#hero')"
      >
        &lt;EA /&gt;
      </a>

      <!-- Desktop Nav Links -->
      <div class="hidden md:flex items-center gap-1">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          :class="
            activeSection === link.href.slice(1)
              ? 'text-[var(--color-primary-500)] bg-[var(--color-primary-500)]/10'
              : 'hover:text-[var(--color-primary-500)]'
          "
          :style="{ color: activeSection !== link.href.slice(1) ? 'var(--text-secondary)' : undefined }"
          @click.prevent="scrollTo(link.href)"
        >
          {{ link.label }}
        </a>
      </div>

      <!-- Right Side: Dark Mode Toggle + Mobile Hamburger -->
      <div class="flex items-center gap-3">
        <button
          id="dark-mode-toggle"
          @click="toggle"
          class="p-2 rounded-lg transition-colors duration-200 cursor-pointer"
          style="color: var(--text-secondary); background: transparent"
          aria-label="Toggle dark mode"
        >
          <Transition name="icon" mode="out-in">
            <Moon v-if="!isDark" :size="20" />
            <Sun v-else :size="20" />
          </Transition>
        </button>

        <!-- Mobile Hamburger -->
        <button
          id="mobile-menu-toggle"
          class="md:hidden p-2 rounded-lg cursor-pointer"
          style="color: var(--text-secondary)"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          aria-label="Toggle mobile menu"
        >
          <Transition name="icon" mode="out-in">
            <X v-if="isMobileMenuOpen" :size="22" />
            <Menu v-else :size="22" />
          </Transition>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Drawer -->
    <Transition name="slide-down">
      <div v-if="isMobileMenuOpen" class="md:hidden glass mt-2 mx-4 rounded-xl overflow-hidden">
        <div class="py-3 px-2">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="block px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200"
            :class="
              activeSection === link.href.slice(1)
                ? 'text-[var(--color-primary-500)] bg-[var(--color-primary-500)]/10'
                : ''
            "
            :style="{ color: activeSection !== link.href.slice(1) ? 'var(--text-secondary)' : undefined }"
            @click.prevent="scrollTo(link.href)"
          >
            {{ link.label }}
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.icon-enter-active,
.icon-leave-active {
  transition: all 0.2s ease;
}
.icon-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.5);
}
.icon-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.5);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

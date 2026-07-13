<script setup lang="ts">
import { personalInfo } from '../data/portfolio'
import { Github, Mail, Heart, ArrowUp } from 'lucide-vue-next'

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer
    class="relative py-12 px-4 sm:px-6 lg:px-8"
    style="background: var(--surface); border-top: 1px solid var(--border)"
  >
    <div class="max-w-6xl mx-auto">
      <div class="grid sm:grid-cols-3 gap-8 mb-8">
        <!-- Brand -->
        <div>
          <a href="#hero" class="text-xl font-bold gradient-text" @click.prevent="scrollToTop">
            Et Anchhy
          </a>
          <p class="mt-3 text-sm leading-relaxed" style="color: var(--text-secondary)">
            Full-stack developer and Year 4 ICE student based in Phnom Penh.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-sm font-bold uppercase tracking-widest mb-4" style="color: var(--text-primary)">
            Quick Links
          </h4>
          <div class="space-y-2">
            <a
              v-for="link in ['About', 'Skills', 'Projects', 'Education', 'Contact']"
              :key="link"
              :href="`#${link.toLowerCase()}`"
              class="block text-sm transition-colors duration-200 hover:text-[var(--color-primary-500)]"
              style="color: var(--text-secondary)"
            >
              {{ link }}
            </a>
          </div>
        </div>

        <!-- Connect -->
        <div>
          <h4 class="text-sm font-bold uppercase tracking-widest mb-4" style="color: var(--text-primary)">
            Connect
          </h4>
          <div class="flex gap-3">
            <a
              :href="personalInfo.socialLinks.github"
              target="_blank"
              rel="noopener noreferrer"
              class="p-2.5 rounded-lg transition-all duration-300 hover:scale-110"
              style="color: var(--text-secondary); border: 1px solid var(--border)"
              aria-label="GitHub"
            >
              <Github :size="18" />
            </a>
            <a
              :href="`mailto:${personalInfo.socialLinks.email}`"
              class="p-2.5 rounded-lg transition-all duration-300 hover:scale-110"
              style="color: var(--text-secondary); border: 1px solid var(--border)"
              aria-label="Email"
            >
              <Mail :size="18" />
            </a>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="h-px w-full mb-6" style="background: var(--border)"></div>

      <!-- Bottom Row -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-xs flex items-center gap-1" style="color: var(--text-secondary)">
          &copy; {{ currentYear }} Et Anchhy. Made with
          <Heart :size="12" style="color: var(--color-primary-500)" />
          using Vue.js
        </p>

        <!-- Back to Top -->
        <button
          id="back-to-top"
          @click="scrollToTop"
          class="flex items-center gap-2 text-xs font-medium cursor-pointer transition-all duration-200 hover:text-[var(--color-primary-500)]"
          style="color: var(--text-secondary); background: transparent; border: none"
        >
          <ArrowUp :size="14" />
          Back to Top
        </button>
      </div>
    </div>
  </footer>
</template>

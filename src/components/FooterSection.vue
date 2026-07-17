<script setup lang="ts">
import { ArrowUp, Github, Mail } from 'lucide-vue-next'
import { personalInfo } from '../data/portfolio'

const currentYear = new Date().getFullYear()
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<template>
  <footer class="site-footer">
    <div class="mx-auto flex max-w-7xl flex-col gap-7 px-4 py-9 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
      <div class="footer-brand">
        <span class="brand-monogram">EA</span>
        <div><strong>Et Anchhy</strong><small>Designing and building for the web.</small></div>
      </div>

      <nav class="footer-links" aria-label="Footer navigation">
        <a href="#about">About</a>
        <a href="#projects">Work</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
      </nav>

      <div class="footer-actions">
        <a :href="personalInfo.socialLinks.github" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github :size="17" /></a>
        <a :href="`mailto:${personalInfo.socialLinks.email}`" aria-label="Email"><Mail :size="17" /></a>
        <button type="button" aria-label="Back to top" @click="scrollToTop"><ArrowUp :size="17" /></button>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <span>© {{ currentYear }} Et Anchhy</span>
        <span>Built with Vue 3 & TypeScript</span>
      </div>
    </div>
  </footer>
</template>

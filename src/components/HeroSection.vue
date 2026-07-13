<script setup lang="ts">
import { useTypewriter } from '../composables/useTypewriter'
import { personalInfo, typingTitles, particlesOptions } from '../data/portfolio'
import profilePhoto from '../assets/mypic.jpg'
import { ArrowDownRight, ArrowUpRight, Github, Mail, MapPin } from 'lucide-vue-next'

const { displayText } = useTypewriter(typingTitles, 70, 35, 1800)

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="hero" class="hero-section relative min-h-screen overflow-hidden px-4 pb-16 pt-32 sm:px-6 lg:px-8">
    <vue-particles id="hero-particles" class="pointer-events-none absolute inset-0" :options="particlesOptions" />
    <div class="hero-glow hero-glow-one" aria-hidden="true"></div>
    <div class="hero-glow hero-glow-two" aria-hidden="true"></div>

    <div class="relative z-10 mx-auto grid min-h-[calc(100vh-12rem)] max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <div class="availability-badge mb-7">
          <span class="relative flex h-2.5 w-2.5">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70"></span>
            <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
          </span>
          {{ personalInfo.availability }}
        </div>

        <p class="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[var(--color-primary-500)]">
          Hello, I’m
        </p>
        <h1 class="max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.055em] sm:text-6xl md:text-7xl xl:text-[5.5rem]">
          {{ personalInfo.name }}.<br />
          <span class="gradient-text">I build for the web.</span>
        </h1>

        <div class="mt-6 flex h-8 items-center text-lg font-semibold sm:text-xl" style="color: var(--text-secondary)">
          <span class="mr-2">Currently crafting</span>
          <span class="font-bold" style="color: var(--text-primary)">{{ displayText }}</span>
          <span class="cursor" aria-hidden="true"></span>
        </div>

        <p class="mt-5 max-w-2xl text-base leading-7 sm:text-lg" style="color: var(--text-secondary)">
          {{ personalInfo.intro }}
        </p>

        <div class="mt-9 flex flex-wrap items-center gap-3">
          <button class="btn-primary" @click="scrollTo('projects')">
            Explore my work
            <ArrowDownRight :size="18" />
          </button>
          <a
            :href="personalInfo.socialLinks.github"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary"
          >
            <Github :size="18" />
            GitHub
            <ArrowUpRight :size="15" />
          </a>
        </div>

        <div class="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium" style="color: var(--text-secondary)">
          <span class="inline-flex items-center gap-2"><MapPin :size="16" />{{ personalInfo.location }}</span>
          <a :href="`mailto:${personalInfo.socialLinks.email}`" class="inline-flex items-center gap-2 hover:text-[var(--color-primary-500)]">
            <Mail :size="16" />{{ personalInfo.socialLinks.email }}
          </a>
        </div>
      </div>

      <div class="relative mx-auto mt-3 w-full max-w-[22rem] sm:max-w-sm lg:mt-0 lg:max-w-md">
        <div class="portrait-backplate" aria-hidden="true"></div>
        <div class="portrait-frame">
          <img
            :src="profilePhoto"
            alt="Portrait of Et Anchhy"
            class="portrait-photo"
            width="827"
            height="1063"
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />
          <div class="portrait-shade" aria-hidden="true"></div>
          <div class="portrait-caption">
            <span class="block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/60">Full-stack developer</span>
            <span class="mt-1 block text-lg font-extrabold text-white">Et Anchhy</span>
          </div>
        </div>
        <div class="floating-tag absolute -left-3 bottom-14 sm:-left-10">Vue 3 · TypeScript</div>
        <div class="floating-tag absolute -right-3 top-12 sm:-right-10">NestJS · PostgreSQL</div>
        <div class="portrait-status">
          <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
          Available to work
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useTypewriter } from '../composables/useTypewriter'
import { personalInfo, typingTitles, particlesOptions } from '../data/portfolio'
import { Download, Mail, Github, ChevronDown } from 'lucide-vue-next'

const { displayText } = useTypewriter(typingTitles, 80, 40, 2000)

const scrollToContact = () => {
  const el = document.getElementById('contact')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const scrollDown = () => {
  const el = document.getElementById('about')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center justify-center overflow-hidden"
  >
    <!-- Particle Background -->
    <vue-particles
      id="tsparticles"
      class="absolute inset-0 z-0"
      :options="particlesOptions"
    />

    <!-- Gradient Overlay -->
    <div
      class="absolute inset-0 z-[1]"
      style="
        background: radial-gradient(
          ellipse at 30% 20%,
          rgba(99, 102, 241, 0.08) 0%,
          transparent 50%
        ),
        radial-gradient(
          ellipse at 70% 80%,
          rgba(139, 92, 246, 0.06) 0%,
          transparent 50%
        );
      "
    ></div>

    <!-- Content -->
    <div class="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
      <!-- Badge -->
      <div
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
        style="
          background: var(--color-primary-500);
          background: linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.12));
          color: var(--color-primary-500);
          border: 1px solid rgba(99,102,241,0.2);
        "
      >
        <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
        Available for Internship
      </div>

      <!-- Name -->
      <h1 class="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-4 leading-tight">
        Hi, I'm
        <span class="gradient-text block sm:inline">{{ personalInfo.name }}</span>
      </h1>

      <!-- Typing Effect -->
      <div class="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 h-10" style="color: var(--text-secondary)">
        <span>{{ displayText }}</span>
        <span class="cursor"></span>
      </div>

      <!-- Intro -->
      <p
        class="text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        style="color: var(--text-secondary)"
      >
        {{ personalInfo.intro }}
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
        <a :href="personalInfo.resumeUrl" class="btn-primary" download>
          <Download :size="18" />
          Download Resume
        </a>
        <button class="btn-outline" @click="scrollToContact">
          <Mail :size="18" />
          Contact Me
        </button>
      </div>

      <!-- Social Links -->
      <div class="flex items-center justify-center gap-5">
        <a
          :href="personalInfo.socialLinks.github"
          target="_blank"
          rel="noopener noreferrer"
          class="p-3 rounded-xl transition-all duration-300 hover:scale-110"
          style="color: var(--text-secondary); background: var(--surface); border: 1px solid var(--border)"
          aria-label="GitHub"
        >
          <Github :size="22" />
        </a>
        <a
          :href="`mailto:${personalInfo.socialLinks.email}`"
          class="p-3 rounded-xl transition-all duration-300 hover:scale-110"
          style="color: var(--text-secondary); background: var(--surface); border: 1px solid var(--border)"
          aria-label="Email"
        >
          <Mail :size="22" />
        </a>
      </div>
    </div>

    <!-- Scroll Down Indicator -->
    <button
      class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer"
      style="color: var(--text-secondary)"
      @click="scrollDown"
      aria-label="Scroll down"
    >
      <ChevronDown :size="28" />
    </button>
  </section>
</template>

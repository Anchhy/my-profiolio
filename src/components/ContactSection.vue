<script setup lang="ts">
import { ref } from 'vue'
import { personalInfo } from '../data/portfolio'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import { ArrowUpRight, Check, Copy, Github, Mail, MapPin, Phone } from 'lucide-vue-next'

const { elementRef } = useScrollAnimation()
const copied = ref(false)

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(personalInfo.socialLinks.email)
    copied.value = true
    window.setTimeout(() => (copied.value = false), 1800)
  } catch {
    window.location.href = `mailto:${personalInfo.socialLinks.email}`
  }
}

const contactLinks = [
  {
    icon: Github,
    label: 'GitHub',
    value: '@Anchhy',
    href: personalInfo.socialLinks.github,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: personalInfo.socialLinks.phone,
    href: `tel:${personalInfo.socialLinks.phone.replace(/\s/g, '')}`,
  },
]
</script>

<template>
  <section id="contact" class="section-shell">
    <div ref="elementRef" class="reveal mx-auto max-w-7xl">
      <div class="contact-panel">
        <div class="relative z-10 max-w-3xl">
          <p class="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-white/65">Let’s work together</p>
          <h2 class="text-4xl font-black leading-tight tracking-[-0.04em] text-white sm:text-5xl md:text-6xl">
            Have a role, project, or idea in mind?
          </h2>
          <p class="mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
            I’m currently open to web development internships and collaborations. The easiest way to reach me is by email.
          </p>

          <div class="mt-9 flex flex-wrap gap-3">
            <a :href="`mailto:${personalInfo.socialLinks.email}`" class="contact-primary">
              <Mail :size="18" /> Send me an email <ArrowUpRight :size="16" />
            </a>
            <button class="contact-secondary" @click="copyEmail">
              <Check v-if="copied" :size="18" />
              <Copy v-else :size="18" />
              {{ copied ? 'Email copied' : 'Copy email' }}
            </button>
          </div>
        </div>

        <div class="relative z-10 mt-14 grid gap-3 border-t border-white/15 pt-7 sm:grid-cols-3">
          <a
            v-for="item in contactLinks"
            :key="item.label"
            :href="item.href"
            :target="item.label === 'GitHub' ? '_blank' : undefined"
            rel="noopener noreferrer"
            class="contact-detail group"
          >
            <component :is="item.icon" :size="18" />
            <span><small>{{ item.label }}</small>{{ item.value }}</span>
            <ArrowUpRight :size="15" class="ml-auto opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <div class="contact-detail">
            <MapPin :size="18" />
            <span><small>Location</small>{{ personalInfo.location }}</span>
          </div>
        </div>

        <div class="contact-orb contact-orb-one" aria-hidden="true"></div>
        <div class="contact-orb contact-orb-two" aria-hidden="true"></div>
      </div>
    </div>
  </section>
</template>

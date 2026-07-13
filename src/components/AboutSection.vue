<script setup lang="ts">
import { aboutPoints, personalInfo } from '../data/portfolio'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import { Check, MapPin, GraduationCap, Layers3 } from 'lucide-vue-next'

const { elementRef } = useScrollAnimation()

const highlights = [
  { value: '3', label: 'Featured projects' },
  { value: '4th', label: 'Year at ITC' },
  { value: 'Full', label: 'Stack focus' },
]
</script>

<template>
  <section id="about" class="section-shell">
    <div ref="elementRef" class="reveal mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <div>
        <p class="section-kicker">About me</p>
        <h2 class="section-title text-left">An engineer in training, a <span class="gradient-text">builder at heart.</span></h2>
        <p class="mt-6 max-w-xl text-base leading-8" style="color: var(--text-secondary)">
          I’m an Information & Communication Engineering student who enjoys turning an idea into a complete, usable product. I care about clean interfaces, well-structured APIs, and learning the reasoning behind the tools I use.
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <span class="detail-chip"><MapPin :size="15" />{{ personalInfo.location }}</span>
          <span class="detail-chip"><GraduationCap :size="15" />ITC · Year 4</span>
          <span class="detail-chip"><Layers3 :size="15" />Frontend + Backend</span>
        </div>
      </div>

      <div>
        <div class="grid grid-cols-3 gap-3 sm:gap-4">
          <div v-for="item in highlights" :key="item.label" class="stat-card">
            <p class="text-2xl font-black sm:text-3xl">{{ item.value }}</p>
            <p class="mt-1 text-xs leading-5 sm:text-sm" style="color: var(--text-secondary)">{{ item.label }}</p>
          </div>
        </div>

        <div class="mt-4 rounded-3xl border p-5 sm:p-7" style="background: var(--surface); border-color: var(--border)">
          <div v-for="point in aboutPoints" :key="point" class="flex gap-3 border-b py-4 first:pt-0 last:border-0 last:pb-0" style="border-color: var(--border)">
            <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary-soft)] text-[var(--color-primary-500)]">
              <Check :size="14" :stroke-width="3" />
            </span>
            <p class="text-sm leading-6" style="color: var(--text-secondary)">{{ point }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

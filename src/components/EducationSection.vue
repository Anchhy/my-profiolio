<script setup lang="ts">
import { CalendarDays, GraduationCap, MapPin } from 'lucide-vue-next'
import { education } from '../data/portfolio'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { elementRef } = useScrollAnimation()
</script>

<template>
  <section id="education" class="section-shell section-tint">
    <div ref="elementRef" class="reveal mx-auto max-w-7xl">
      <div class="section-heading-row">
        <div>
          <p class="section-kicker">04 / Education</p>
          <h2 class="section-title">Engineering a strong <span class="accent-underline">foundation.</span></h2>
        </div>
        <p class="section-copy">
          Formal engineering study combined with hands-on product development and collaborative project work.
        </p>
      </div>

      <div v-for="edu in education" :key="edu.institution" class="education-card">
        <div class="education-mark"><GraduationCap :size="30" /></div>
        <div class="education-main">
          <div class="education-status">{{ edu.status }}</div>
          <h3>{{ edu.institution }}</h3>
          <p class="education-degree">{{ edu.degree }} · {{ edu.field }}</p>
          <p class="education-description">{{ edu.description }}</p>
        </div>
        <div class="education-meta">
          <span><CalendarDays :size="15" /> {{ edu.years }}</span>
          <span><MapPin :size="15" /> Phnom Penh, Cambodia</span>
        </div>
      </div>
    </div>
  </section>
</template>

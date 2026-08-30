<script setup lang="ts">
import { BriefcaseBusiness, CalendarDays, Check, MapPin } from 'lucide-vue-next'
import { experience } from '../data/portfolio'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { elementRef } = useScrollAnimation()
</script>

<template>
  <section id="experience" class="section-shell">
    <div ref="elementRef" class="reveal mx-auto max-w-7xl">
      <div class="section-heading-row">
        <div>
          <p class="section-kicker">02 / Experience</p>
          <h2 class="section-title">Building for a <span class="accent-underline">real organization.</span></h2>
        </div>
        <p class="section-copy">
          Applying backend engineering fundamentals to secure, workflow-driven services used by web and mobile clients.
        </p>
      </div>

      <article v-for="item in experience" :key="`${item.organization}-${item.role}`" class="experience-card">
        <div class="experience-mark" aria-hidden="true"><BriefcaseBusiness :size="29" /></div>

        <div class="experience-main">
          <div class="experience-labels">
            <span class="experience-status">{{ item.employmentType }}</span>
            <span class="experience-period"><CalendarDays :size="14" /> {{ item.period }}</span>
          </div>
          <h3>{{ item.role }}</h3>
          <p class="experience-organization">{{ item.organization }}</p>
          <p class="experience-summary">{{ item.summary }}</p>

          <ul class="experience-achievements">
            <li v-for="achievement in item.achievements" :key="achievement">
              <span><Check :size="13" /></span>
              {{ achievement }}
            </li>
          </ul>

          <ul class="experience-tech" aria-label="Technologies used">
            <li v-for="technology in item.techStack" :key="technology">{{ technology }}</li>
          </ul>
        </div>

        <div class="experience-location"><MapPin :size="15" /> {{ item.location }}</div>
      </article>
    </div>
  </section>
</template>

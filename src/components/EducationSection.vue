<script setup lang="ts">
import { education } from '../data/portfolio'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import { GraduationCap, Calendar, MapPin } from 'lucide-vue-next'

const { elementRef } = useScrollAnimation()
</script>

<template>
  <section
    id="education"
    class="py-24 px-4 sm:px-6 lg:px-8"
    style="background: var(--surface)"
  >
    <div ref="elementRef" class="reveal max-w-4xl mx-auto">
      <h2 class="section-title">
        <span class="gradient-text">Education</span>
      </h2>
      <p class="section-subtitle">My academic journey</p>

      <!-- Timeline -->
      <div class="relative">
        <!-- Timeline Line -->
        <div
          class="absolute left-6 top-0 bottom-0 w-0.5 hidden sm:block"
          style="background: linear-gradient(to bottom, var(--color-primary-500), var(--color-accent-500))"
        ></div>

        <!-- Education Items -->
        <div
          v-for="(edu, index) in education"
          :key="index"
          class="relative flex gap-6 sm:gap-8 mb-8 last:mb-0"
        >
          <!-- Timeline Dot -->
          <div class="hidden sm:flex flex-shrink-0 items-start pt-2">
            <div
              class="w-12 h-12 rounded-full flex items-center justify-center z-10"
              style="
                background: linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500));
              "
            >
              <GraduationCap :size="22" class="text-white" />
            </div>
          </div>

          <!-- Card -->
          <div class="card p-6 sm:p-8 flex-1">
            <!-- Mobile icon -->
            <div class="sm:hidden mb-4">
              <div
                class="w-12 h-12 rounded-full flex items-center justify-center"
                style="
                  background: linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500));
                "
              >
                <GraduationCap :size="22" class="text-white" />
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-3 mb-3">
              <span
                class="px-3 py-1 rounded-full text-xs font-bold"
                style="
                  background: linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.12));
                  color: var(--color-primary-500);
                "
              >
                {{ edu.status }}
              </span>
              <span
                class="flex items-center gap-1.5 text-xs"
                style="color: var(--text-secondary)"
              >
                <Calendar :size="13" />
                {{ edu.years }}
              </span>
            </div>

            <h3 class="text-xl font-bold mb-1" style="color: var(--text-primary)">
              {{ edu.institution }}
            </h3>
            <p class="text-sm font-semibold mb-1" style="color: var(--color-primary-500)">
              {{ edu.degree }}
            </p>
            <p class="text-sm mb-4 flex items-center gap-1.5" style="color: var(--text-secondary)">
              <MapPin :size="14" />
              {{ edu.field }}
            </p>
            <p class="text-sm leading-relaxed" style="color: var(--text-secondary)">
              {{ edu.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

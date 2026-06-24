<script setup lang="ts">
import { aboutPoints } from '../data/portfolio'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import { User, CheckCircle, Code, Briefcase } from 'lucide-vue-next'

const { elementRef } = useScrollAnimation()

const icons = [User, CheckCircle, Code, Briefcase]
</script>

<template>
  <section id="about" class="py-24 px-4 sm:px-6 lg:px-8">
    <div ref="elementRef" class="reveal max-w-6xl mx-auto">
      <h2 class="section-title">
        About <span class="gradient-text">Me</span>
      </h2>
      <p class="section-subtitle">Get to know me better</p>

      <div class="grid md:grid-cols-2 gap-10 items-center">
        <!-- Avatar / Visual -->
        <div class="flex justify-center">
          <div
            class="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden"
            style="
              background: linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500));
            "
          >
            <!-- Decorative initials -->
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-7xl sm:text-8xl font-black text-white/90 select-none">EA</span>
            </div>
            <!-- Decorative rings -->
            <div
              class="absolute -top-10 -right-10 w-40 h-40 rounded-full border-4 border-white/10"
            ></div>
            <div
              class="absolute -bottom-6 -left-6 w-32 h-32 rounded-full border-4 border-white/10"
            ></div>
          </div>
        </div>

        <!-- Text Content -->
        <div>
          <h3 class="text-2xl font-bold mb-2" style="color: var(--text-primary)">
            ET ANCHHY
          </h3>
          <p class="text-sm font-semibold mb-6" style="color: var(--color-primary-500)">
            Web Developer &bull; Full Stack Enthusiast
          </p>

          <div class="space-y-4">
            <div
              v-for="(point, index) in aboutPoints"
              :key="index"
              class="flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
              style="background: var(--surface); border: 1px solid var(--border)"
            >
              <div
                class="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                style="
                  background: linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.12));
                  color: var(--color-primary-500);
                "
              >
                <component :is="icons[index]" :size="20" />
              </div>
              <p class="text-sm leading-relaxed pt-2" style="color: var(--text-secondary)">
                {{ point }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

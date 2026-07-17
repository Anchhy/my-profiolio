<script setup lang="ts">
import { Check, CodeXml, Layers3, UsersRound } from 'lucide-vue-next'
import { aboutPoints } from '../data/portfolio'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { elementRef } = useScrollAnimation()

const principles = [
  {
    icon: Layers3,
    title: 'Think in systems',
    copy: 'I connect the interface, API, and database instead of treating them as separate pieces.',
  },
  {
    icon: CodeXml,
    title: 'Build for clarity',
    copy: 'Readable code and predictable user flows make products easier to use and maintain.',
  },
  {
    icon: UsersRound,
    title: 'Work as a team',
    copy: 'I’m comfortable with shared repositories, reviews, API contracts, and collaborative delivery.',
  },
]
</script>

<template>
  <section id="about" class="section-shell">
    <div ref="elementRef" class="reveal mx-auto max-w-7xl">
      <div class="about-grid">
        <div>
          <p class="section-kicker">01 / About</p>
          <h2 class="section-title">Curious by nature.<br /><span class="accent-underline">Practical by choice.</span></h2>
          <p class="section-copy mt-7">
            I’m an Information & Communication Engineering student who enjoys taking a product from a rough idea to a useful, working experience.
          </p>
        </div>

        <div class="about-content">
          <p class="about-lead">
            My favorite work lives where thoughtful interfaces meet well-structured backend systems.
          </p>
          <div class="about-checklist">
            <div v-for="point in aboutPoints" :key="point" class="about-check">
              <span><Check :size="14" :stroke-width="3" /></span>
              <p>{{ point }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="principles-grid">
        <article v-for="(item, index) in principles" :key="item.title" class="principle-card">
          <div class="principle-index">0{{ index + 1 }}</div>
          <component :is="item.icon" :size="22" class="principle-icon" />
          <h3>{{ item.title }}</h3>
          <p>{{ item.copy }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

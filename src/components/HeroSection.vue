<script setup lang="ts">
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Database,
  Github,
  Mail,
  MapPin,
  Printer,
} from 'lucide-vue-next'
import { personalInfo } from '../data/portfolio'
import profilePhoto from '../assets/mypic.jpg'

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
const printProfile = () => window.print()
</script>

<template>
  <section id="hero" class="hero-section">
    <div class="hero-noise" aria-hidden="true"></div>
    <div class="hero-orbit hero-orbit-one" aria-hidden="true"></div>
    <div class="hero-orbit hero-orbit-two" aria-hidden="true"></div>

    <div class="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-4 pb-20 pt-32 sm:px-6 sm:pt-40 lg:min-h-screen lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-36">
      <div>
        <div class="availability-badge">
          <span class="availability-dot" aria-hidden="true"></span>
          {{ personalInfo.availability }}
        </div>

        <p class="hero-kicker">Hello, I’m {{ personalInfo.name }}</p>
        <h1 class="hero-title">
          I build digital products that feel
          <span class="hero-title-accent">clear & dependable.</span>
        </h1>

        <p class="hero-copy">{{ personalInfo.intro }}</p>

        <div class="mt-9 flex flex-wrap gap-3">
          <button type="button" class="btn-primary" @click="scrollTo('projects')">
            Explore my work <ArrowDown :size="17" />
          </button>
          <a :href="personalInfo.socialLinks.github" target="_blank" rel="noopener noreferrer" class="btn-secondary">
            <Github :size="17" /> GitHub <ArrowUpRight :size="14" />
          </a>
          <button type="button" class="btn-quiet" title="Print or save this portfolio as a PDF" @click="printProfile">
            <Printer :size="17" /> Save as résumé
          </button>
        </div>

        <div class="hero-meta">
          <span><MapPin :size="15" /> {{ personalInfo.location }}</span>
          <a :href="`mailto:${personalInfo.socialLinks.email}`"><Mail :size="15" /> {{ personalInfo.socialLinks.email }}</a>
        </div>

        <div class="hero-proof" aria-label="Portfolio highlights">
          <div><strong>3</strong><span>Featured<br />projects</span></div>
          <div><strong>4th</strong><span>Year ICE<br />student</span></div>
          <div><strong>FE→BE</strong><span>End-to-end<br />thinking</span></div>
        </div>
      </div>

      <figure class="hero-portrait-wrap">
        <div class="portrait-accent" aria-hidden="true"></div>
        <div class="portrait-frame">
          <img
            :src="profilePhoto"
            alt="Et Anchhy, full-stack web developer"
            class="portrait-photo"
            width="827"
            height="1063"
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />
          <div class="portrait-overlay" aria-hidden="true"></div>
          <figcaption class="portrait-caption">
            <span>Based in Phnom Penh</span>
            <strong>{{ personalInfo.title }}</strong>
          </figcaption>
        </div>

        <div class="hero-tech-card hero-tech-card-left">
          <span><Code2 :size="17" /></span>
          <div><small>Frontend</small><strong>Vue · TypeScript</strong></div>
        </div>
        <div class="hero-tech-card hero-tech-card-right">
          <span><Database :size="17" /></span>
          <div><small>Backend</small><strong>NestJS · Spring</strong></div>
        </div>
      </figure>
    </div>

    <button class="hero-scroll-cue" type="button" aria-label="Scroll to about section" @click="scrollTo('about')">
      <span>Scroll to discover</span><ArrowDown :size="16" />
    </button>
  </section>
</template>

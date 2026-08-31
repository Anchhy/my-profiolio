<script setup lang="ts">
import { ArrowLeft, BookOpen, Home, SearchX } from 'lucide-vue-next'
import DefaultLayout from '../layouts/DefaultLayout.vue'
</script>

<template>
  <DefaultLayout>
    <section class="not-found-page">
      <div class="not-found-pattern" aria-hidden="true"></div>
      <div class="not-found-card">
        <div class="not-found-icon" aria-hidden="true"><SearchX :size="28" /></div>
        <p>404 · Page not found</p>
        <h1>This route went<br /><span>off the map.</span></h1>
        <p class="not-found-copy">
          The page may have moved or the address may be incorrect. Return to the portfolio or continue learning.
        </p>
        <div class="not-found-actions">
          <RouterLink to="/" class="btn-primary"><Home :size="17" /> Portfolio home</RouterLink>
          <RouterLink to="/learn" class="btn-secondary"><BookOpen :size="17" /> Learning center</RouterLink>
        </div>
        <button type="button" class="not-found-back" @click="$router.back()"><ArrowLeft :size="15" /> Go back</button>
      </div>
    </section>
  </DefaultLayout>
</template>

<style scoped>
.not-found-page { position: relative; display: grid; min-height: 78vh; overflow: hidden; place-items: center; padding: 9rem 1rem 5rem; background: var(--bg); }
.not-found-pattern { position: absolute; inset: 0; opacity: 0.7; background-image: radial-gradient(color-mix(in srgb, var(--accent) 18%, transparent) 0.8px, transparent 0.8px); background-size: 20px 20px; mask-image: radial-gradient(circle at center, black, transparent 70%); }
.not-found-card { position: relative; z-index: 1; width: min(100%, 47rem); padding: clamp(1.5rem, 5vw, 3.5rem); border: 1px solid var(--border); border-radius: 1.5rem; background: color-mix(in srgb, var(--surface) 92%, transparent); box-shadow: var(--shadow); text-align: center; backdrop-filter: blur(18px); }
.not-found-icon { display: flex; width: 3.6rem; height: 3.6rem; align-items: center; justify-content: center; margin: 0 auto; border-radius: 1rem; background: var(--accent-soft); color: var(--accent-strong); }
.not-found-card > p:first-of-type { margin-top: 1.3rem; color: var(--accent-strong); font-size: 0.68rem; font-weight: 850; letter-spacing: 0.15em; text-transform: uppercase; }
.not-found-card h1 { margin-top: 0.75rem; font-size: clamp(2.8rem, 8vw, 5.6rem); font-weight: 850; letter-spacing: -0.07em; line-height: 0.94; }
.not-found-card h1 span { color: var(--accent-strong); }
.not-found-copy { max-width: 36rem; margin: 1.25rem auto 0; color: var(--text-secondary); font-size: 0.88rem; line-height: 1.75; }
.not-found-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.6rem; margin-top: 1.8rem; }
.not-found-back { display: inline-flex; align-items: center; gap: 0.4rem; margin-top: 1.25rem; color: var(--text-muted); font-size: 0.7rem; font-weight: 750; cursor: pointer; }
.not-found-back:hover { color: var(--accent-strong); }
</style>

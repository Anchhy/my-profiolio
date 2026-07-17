<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
import FooterSection from '../components/FooterSection.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <NavBar />
    <main id="main-content" class="flex-1">
      <slot />
    </main>
    <FooterSection />
  </div>
</template>

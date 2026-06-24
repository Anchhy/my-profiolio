<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
import FooterSection from '../components/FooterSection.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />
    <main class="flex-1">
      <slot />
    </main>
    <FooterSection />
  </div>
</template>

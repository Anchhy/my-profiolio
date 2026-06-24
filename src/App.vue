<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 800)
})
</script>

<template>
  <!-- Loading Screen -->
  <Transition name="fade">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-[9999] flex items-center justify-center"
      style="background: var(--bg)"
    >
      <div class="text-center">
        <div class="loader mb-4"></div>
        <p class="gradient-text text-xl font-bold tracking-wide">ET ANCHHY</p>
      </div>
    </div>
  </Transition>

  <!-- Main App -->
  <RouterView v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style scoped>
.loader {
  width: 48px;
  height: 48px;
  border: 4px solid var(--border);
  border-top-color: var(--color-primary-500);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

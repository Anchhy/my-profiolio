import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollAnimation(options?: IntersectionObserverInit) {
  const elementRef = ref<HTMLElement | null>(null)
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true
            entry.target.classList.add('is-visible')
          }
        })
      },
      {
        // Long mobile sections can never place 15% of their full height in the viewport.
        // A small threshold keeps the reveal reliable without firing before content is nearby.
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px',
        ...options,
      }
    )

    if (elementRef.value) {
      observer.observe(elementRef.value)
    }
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })

  return { elementRef, isVisible }
}

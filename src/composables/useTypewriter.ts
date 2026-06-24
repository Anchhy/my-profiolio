import { ref, onMounted, onUnmounted } from 'vue'

export function useTypewriter(
  texts: string[],
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000
) {
  const displayText = ref('')
  const currentIndex = ref(0)
  let timeout: ReturnType<typeof setTimeout> | null = null
  let isDeleting = false
  let charIndex = 0

  const tick = () => {
    const currentText = texts[currentIndex.value]

    if (!isDeleting) {
      // Typing
      charIndex++
      displayText.value = currentText.slice(0, charIndex)

      if (charIndex === currentText.length) {
        // Pause before deleting
        timeout = setTimeout(() => {
          isDeleting = true
          tick()
        }, pauseDuration)
        return
      }
      timeout = setTimeout(tick, typingSpeed)
    } else {
      // Deleting
      charIndex--
      displayText.value = currentText.slice(0, charIndex)

      if (charIndex === 0) {
        isDeleting = false
        currentIndex.value = (currentIndex.value + 1) % texts.length
        timeout = setTimeout(tick, typingSpeed)
        return
      }
      timeout = setTimeout(tick, deletingSpeed)
    }
  }

  onMounted(() => {
    tick()
  })

  onUnmounted(() => {
    if (timeout) clearTimeout(timeout)
  })

  return { displayText }
}

import { ref, onMounted } from 'vue'

export function useDarkMode() {
  const isDark = ref(false)

  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggle = () => {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    applyTheme(isDark.value)
  }

  onMounted(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') {
      isDark.value = true
    } else if (saved === 'light') {
      isDark.value = false
    } else {
      // Default to system preference
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme(isDark.value)
  })

  return { isDark, toggle }
}

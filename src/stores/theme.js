import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // State
  const isDark = ref(false)
  
  // Initialize from localStorage or system preference
  const initializeTheme = () => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme')
    
    if (savedTheme === 'dark') {
      isDark.value = true
    } else if (savedTheme === 'light') {
      isDark.value = false
    } else {
      // Check system preference
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    
    applyTheme()
  }
  
  // Apply theme to document
  const applyTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
  
  // Toggle theme
  const toggleTheme = () => {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }
  
  // Watch for changes and update
  watch(isDark, () => {
    applyTheme()
  })
  
  // Return exposed state and functions
  return {
    isDark,
    toggleTheme,
    initializeTheme
  }
}) 
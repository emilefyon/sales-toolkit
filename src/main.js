import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import FloatingVue from 'floating-vue'
import Vue3Toastify, { toast } from 'vue3-toastify'
import './assets/css/main.css'

// Create app instance
const app = createApp(App)

// Initialize Pinia for state management
const pinia = createPinia()
app.use(pinia)

// Add router
app.use(router)

// Add floating tooltips and popovers
app.use(FloatingVue, {
  themes: {
    'tooltip': {
      placement: 'top',
      delay: {
        show: 200,
        hide: 100
      }
    }
  }
})

// Add toast notifications
app.use(Vue3Toastify, {
  autoClose: 3000,
  clearOnUrlChange: true,
  hideProgressBar: false,
  position: toast.POSITION.BOTTOM_RIGHT,
  theme: 'light'
})

// Global property for toast access
app.config.globalProperties.$toast = toast

// Initialize the application
app.mount('#app') 
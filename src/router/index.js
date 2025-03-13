import { createRouter, createWebHistory } from 'vue-router'

// Lazy loading routes for better initial load performance
const Dashboard = () => import('@/views/Dashboard.vue')
const PhoneCleaner = () => import('@/views/PhoneCleaner.vue')
const NameFormatter = () => import('@/views/NameFormatter.vue')
const TextTools = () => import('@/views/TextTools.vue')

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard - Sales Toolkit'
    }
  },
  {
    path: '/phone-cleaner',
    name: 'PhoneCleaner',
    component: PhoneCleaner,
    meta: {
      title: 'Phone Number Cleaner - Sales Toolkit'
    }
  },
  {
    path: '/name-formatter',
    name: 'NameFormatter',
    component: NameFormatter,
    meta: {
      title: 'Name Formatter - Sales Toolkit'
    }
  },
  {
    path: '/text-tools',
    name: 'TextTools',
    component: TextTools,
    meta: {
      title: 'Text Tools - Sales Toolkit'
    }
  },
  // Catch all route - redirect to home
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Update page title
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Sales Toolkit'
  next()
})

export default router 
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PhoneParser from '../views/PhoneParser.vue'
import LastNameCleaner from '../views/LastNameCleaner.vue'
import TextLowercaser from '../views/TextLowercaser.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/phone-parser',
    name: 'PhoneParser',
    component: PhoneParser
  },
  {
    path: '/last-name-cleaner',
    name: 'LastNameCleaner',
    component: LastNameCleaner
  },
  {
    path: '/text-lowercaser',
    name: 'TextLowercaser',
    component: TextLowercaser
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 
<template>
  <div class="flex h-screen overflow-hidden bg-surface-50 dark:bg-surface-900">
    <!-- Sidebar (mobile overlay) -->
    <div
      v-if="mobileMenuOpen"
      @click="mobileMenuOpen = false"
      class="fixed inset-0 z-20 bg-black/50 lg:hidden"
    ></div>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-30 w-64 transform overflow-y-auto bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 transition-transform lg:translate-x-0 lg:static lg:inset-0',
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <!-- Sidebar content -->
      <div class="flex flex-col h-full">
        <div class="px-4 py-5 border-b border-surface-200 dark:border-surface-700">
          <div class="flex items-center space-x-2">
            <img src="/favicon.svg" alt="Logo" class="h-8 w-8" />
            <h1 class="text-xl font-semibold text-surface-900 dark:text-white">Sales Toolkit</h1>
          </div>
        </div>
        
        <!-- Navigation -->
        <nav class="flex-1 px-2 py-4 space-y-1">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            v-tooltip="item.name"
            class="flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
            :class="{ 
              'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400': isCurrentRoute(item.path),
              'text-surface-700 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800/80': !isCurrentRoute(item.path)
            }"
          >
            <span class="material-icons-round mr-3 text-lg">{{ item.icon }}</span>
            <span>{{ item.name }}</span>
          </router-link>
        </nav>

        <!-- Footer -->
        <div class="px-4 py-4 border-t border-surface-200 dark:border-surface-700">
          <Button 
            icon="dark_mode" 
            variant="ghost" 
            size="sm" 
            class="w-full justify-start"
            @click="toggleTheme"
          >
            {{ isDark ? 'Light Mode' : 'Dark Mode' }}
          </Button>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <div class="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
      <!-- Top navigation -->
      <header class="sticky top-0 z-10 bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700">
        <div class="flex items-center justify-between px-4 h-16">
          <!-- Mobile menu button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-surface-500 hover:text-surface-700 hover:bg-surface-100 dark:text-surface-400 dark:hover:text-surface-200 dark:hover:bg-surface-800 lg:hidden"
          >
            <span class="sr-only">Open main menu</span>
            <span class="material-icons-round">menu</span>
          </button>

          <!-- Page title (mobile only) -->
          <div class="lg:hidden font-medium">{{ currentPageTitle }}</div>

          <!-- Right side controls -->
          <div class="flex items-center">
            <Button
              icon="help_outline"
              variant="ghost"
              size="sm"
              v-tooltip="'Help & Resources'"
              class="ml-2"
              @click="showHelp"
            />
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 px-4 py-6 lg:px-6">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useThemeStore } from '@/stores/theme';
import Button from '@/components/ui/Button.vue';

// Mobile sidebar state
const mobileMenuOpen = ref(false);

// Theme handling
const themeStore = useThemeStore();
const isDark = computed(() => themeStore.isDark);
const toggleTheme = () => themeStore.toggleTheme();

// Initialize theme
onMounted(() => {
  themeStore.initializeTheme();
});

// Navigation
const route = useRoute();
const router = useRouter();

const navItems = [
  {
    name: 'Dashboard',
    path: '/',
    icon: 'dashboard'
  },
  {
    name: 'Phone Number Cleaner',
    path: '/phone-cleaner',
    icon: 'phone'
  },
  {
    name: 'Name Formatter',
    path: '/name-formatter',
    icon: 'person'
  },
  {
    name: 'Text Tools',
    path: '/text-tools',
    icon: 'text_format'
  }
];

// Helpers
const isCurrentRoute = (path) => {
  if (path === '/') {
    return route.path === '/';
  }
  return route.path.startsWith(path);
};

const currentPageTitle = computed(() => {
  const found = navItems.find(item => isCurrentRoute(item.path));
  return found ? found.name : 'Sales Toolkit';
});

// Methods
const showHelp = () => {
  // Implement help modal or documentation
  alert('Help and documentation coming soon!');
};
</script> 
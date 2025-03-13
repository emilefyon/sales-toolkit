<template>
  <div>
    <h1 class="text-2xl font-semibold text-surface-900 dark:text-surface-100 mb-6">Dashboard</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card v-for="tool in tools" :key="tool.path" class="flex flex-col h-full hover:shadow-lg transition-shadow">
        <div class="flex flex-col h-full">
          <div class="flex items-center mb-4">
            <div class="p-3 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400">
              <span class="material-icons-round text-xl">{{ tool.icon }}</span>
            </div>
            <h2 class="text-lg font-medium ml-3 text-surface-800 dark:text-surface-200">{{ tool.name }}</h2>
          </div>
          
          <p class="text-surface-600 dark:text-surface-400 mb-6 flex-grow">{{ tool.description }}</p>
          
          <div class="mt-auto">
            <Button :to="tool.path" variant="outline" full-width icon="arrow_forward">
              Open Tool
            </Button>
          </div>
        </div>
      </Card>
    </div>
    
    <div class="mt-8">
      <Card class="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="flex items-center mb-4 md:mb-0">
            <span class="material-icons-round text-primary-600 dark:text-primary-400 text-3xl mr-4">code</span>
            <div>
              <h2 class="text-lg font-medium text-surface-800 dark:text-surface-200 mb-1">Open Source Project</h2>
              <p class="text-surface-600 dark:text-surface-400">This toolkit is open source and available on GitHub. We welcome your contributions!</p>
            </div>
          </div>
          <Button 
            variant="primary" 
            icon="open_in_new" 
            class="whitespace-nowrap" 
            @click="openGitHub"
          >
            View on GitHub
          </Button>
        </div>
      </Card>
    </div>
    
    <div class="mt-8">
      <Card>
        <template #header>
          <h2 class="text-lg font-medium text-surface-800 dark:text-surface-200">Recent Updates</h2>
        </template>
        
        <ul class="space-y-3">
          <li v-for="update in recentUpdates" :key="update.id" class="flex items-start">
            <span class="material-icons-round text-primary-500 mr-2 mt-0.5">{{ update.icon }}</span>
            <div>
              <p class="text-surface-800 dark:text-surface-300">{{ update.text }}</p>
              <p class="text-xs text-surface-500 dark:text-surface-500 mt-1">{{ update.date }}</p>
            </div>
          </li>
        </ul>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';

const tools = [
  {
    name: 'Phone Number Cleaner',
    path: '/phone-cleaner',
    icon: 'phone',
    description: 'Format phone numbers in E.164 format with optional leading apostrophe for Excel.'
  },
  {
    name: 'Name Formatter',
    path: '/name-formatter',
    icon: 'person',
    description: 'Properly format names with correct capitalization for consistent customer data.'
  },
  {
    name: 'Text Tools',
    path: '/text-tools',
    icon: 'text_format',
    description: 'Various text utilities including case conversion, line sorting, and more.'
  }
];

const recentUpdates = [
  {
    id: 1,
    text: 'New theme options and dark mode support added.',
    date: 'March 13, 2025',
    icon: 'dark_mode'
  },
  {
    id: 2,
    text: 'Phone Number Cleaner now supports international number formats.',
    date: 'March 12, 2025',
    icon: 'phone'
  },
  {
    id: 3,
    text: 'Improved performance and user interface across all tools.',
    date: 'March 10, 2025',
    icon: 'speed'
  }
];

const openGitHub = () => {
  window.open('https://github.com/emilefyon/sales-toolkit', '_blank');
};
</script> 
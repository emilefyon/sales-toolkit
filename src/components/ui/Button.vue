<template>
  <component :is="to ? 'router-link' : 'button'"
    :to="to"
    :class="[
      'inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-surface-900',
      sizeClasses,
      variantClasses,
      { 'opacity-50 cursor-not-allowed': disabled },
      { 'w-full': fullWidth }
    ]"
    :disabled="disabled"
    :type="!to ? type : undefined">
    <span 
      v-if="loading" 
      class="mr-2 animate-spin">
      <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </span>
    <span v-if="icon && !loading" class="mr-2">
      <span class="material-icons-round text-base leading-none">{{ icon }}</span>
    </span>
    <slot></slot>
  </component>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button'
  },
  icon: {
    type: String,
    default: ''
  },
  to: {
    type: [String, Object],
    default: null
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'text-sm px-3 py-1.5 h-8';
    case 'lg': return 'text-base px-5 py-2.5 h-12';
    default: return 'text-sm px-4 py-2 h-10'; // md
  }
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800';
    case 'secondary':
      return 'bg-secondary-600 text-white hover:bg-secondary-700 dark:bg-secondary-700 dark:hover:bg-secondary-800';
    case 'outline':
      return 'bg-transparent border border-primary-600 text-primary-600 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/30';
    case 'ghost':
      return 'bg-transparent text-surface-700 hover:bg-surface-100 dark:text-surface-200 dark:hover:bg-surface-800';
    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800';
    default:
      return 'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800';
  }
});
</script> 
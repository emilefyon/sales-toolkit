<template>
  <div :class="[
    'bg-white dark:bg-surface-800 rounded-xl transition-shadow animate-fade-in',
    shadows[shadow],
    { 'border border-surface-200 dark:border-surface-700': bordered },
    { 'overflow-hidden': !noPadding }
  ]">
    <div v-if="$slots.header" :class="['px-6 py-4 border-b border-surface-200 dark:border-surface-700', headerClass]">
      <slot name="header"></slot>
    </div>
    <div :class="{ 'p-6': !noPadding }">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" :class="['px-6 py-4 border-t border-surface-200 dark:border-surface-700', footerClass]">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  shadow: {
    type: String,
    default: 'md',
    validator: (val) => ['none', 'sm', 'md', 'lg', 'xl'].includes(val)
  },
  bordered: {
    type: Boolean,
    default: false
  },
  noPadding: {
    type: Boolean,
    default: false
  },
  headerClass: {
    type: String,
    default: ''
  },
  footerClass: {
    type: String,
    default: ''
  }
});

const shadows = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow',
  lg: 'shadow-lg',
  xl: 'shadow-soft-xl'
};
</script> 
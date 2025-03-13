<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="relative">
      <span 
        v-if="icon" 
        class="absolute left-3 top-1/2 -translate-y-1/2 material-icons-round text-surface-500 text-lg"
      >
        {{ icon }}
      </span>
      
      <textarea
        :id="id"
        :value="modelValue"
        :placeholder="placeholder"
        :rows="rows"
        :disabled="disabled"
        :readonly="readonly"
        :class="[
          'w-full rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-surface-800 dark:border-surface-700 dark:focus:ring-primary-600 dark:focus:border-primary-600',
          { 'pl-10': icon },
          { 'opacity-60 cursor-not-allowed': disabled },
          { 'border-red-500 focus:ring-red-500 focus:border-red-500': error },
          { 'resize-none': !resize }
        ]"
        :aria-invalid="!!error"
        @input="$emit('update:modelValue', $event.target.value)"
        v-bind="$attrs"
      ></textarea>
    </div>
    
    <div v-if="error" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ error }}</div>
    <div v-else-if="$slots.hint" class="mt-1 text-sm text-surface-500 dark:text-surface-400">
      <slot name="hint"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  rows: {
    type: Number,
    default: 4
  },
  id: {
    type: String,
    default: () => `textarea-${Math.random().toString(36).substr(2, 9)}`
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  resize: {
    type: Boolean,
    default: true
  },
  error: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  }
});

defineEmits(['update:modelValue']);
</script> 
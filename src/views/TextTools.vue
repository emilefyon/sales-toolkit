<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold text-surface-900 dark:text-surface-100">Text Tools</h1>
    </div>

    <div class="mb-4">
      <Card shadow="md">
        <div class="flex flex-wrap gap-2">
          <Button 
            v-for="tool in tools" 
            :key="tool.id"
            :variant="selectedTool === tool.id ? 'primary' : 'ghost'"
            :icon="tool.icon"
            @click="selectedTool = tool.id"
            class="flex-grow-0"
          >
            {{ tool.name }}
          </Button>
        </div>
      </Card>
    </div>

    <TextProcessor
      v-model="inputText"
      :processed-output="processedText"
      input-label="Text"
      :input-placeholder="currentTool.placeholder"
      :input-hint="currentTool.hint"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-medium text-surface-800 dark:text-surface-200">{{ currentTool.name }}</h2>
        </div>
      </template>
      
      <template #options>
        <component :is="currentTool.optionsComponent" v-if="currentTool.optionsComponent" v-bind="optionsProps" />
      </template>
      
      <template #sampleData v-if="currentTool.sampleData">
        <div v-if="false">{{ currentTool.sampleData }}</div>
      </template>
      
      <template #footer>
        <div class="flex justify-between items-center">
          <div class="text-sm text-surface-500 dark:text-surface-400">
            {{ currentTool.description }}
          </div>
        </div>
      </template>
    </TextProcessor>
  </div>
</template>

<script setup>
import { ref, computed, markRaw, defineAsyncComponent } from 'vue';
import TextProcessor from '@/components/tools/TextProcessor.vue';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';

// Lazy-loaded option components
const SortOptions = defineAsyncComponent(() => {
  return new Promise(resolve => {
    resolve({
      template: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card shadow="sm" class="p-4 bg-white dark:bg-surface-800">
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="sortReverse" 
                v-model="sortReverse"
                class="h-4 w-4 text-primary-600 dark:text-primary-400 border-surface-300 dark:border-surface-600 rounded focus:ring-primary-500"
              >
              <label for="sortReverse" class="ml-2 text-sm text-surface-700 dark:text-surface-300">
                Reverse sort (Z-A)
              </label>
            </div>
          </Card>
          
          <Card shadow="sm" class="p-4 bg-white dark:bg-surface-800">
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="caseSensitive" 
                v-model="caseSensitive"
                class="h-4 w-4 text-primary-600 dark:text-primary-400 border-surface-300 dark:border-surface-600 rounded focus:ring-primary-500"
              >
              <label for="caseSensitive" class="ml-2 text-sm text-surface-700 dark:text-surface-300">
                Case sensitive
              </label>
            </div>
          </Card>
        </div>
      `,
      props: ['sortReverse', 'caseSensitive'],
      components: { Card }
    });
  });
});

// State
const inputText = ref('');
const selectedTool = ref('lowercase');
const sortReverse = ref(false);
const caseSensitive = ref(false);

// Options for different tools
const optionsProps = computed(() => {
  return {
    sortReverse: sortReverse.value,
    caseSensitive: caseSensitive.value,
    'onUpdate:sortReverse': (val) => sortReverse.value = val,
    'onUpdate:caseSensitive': (val) => caseSensitive.value = val
  };
});

// Available tools
const tools = [
  {
    id: 'lowercase',
    name: 'Lowercase',
    icon: 'text_fields',
    description: 'Convert text to lowercase',
    placeholder: 'Enter text to convert to lowercase',
    hint: 'Will convert all characters to lowercase',
    sampleData: 'THIS IS SOME TEXT\nTo Be Converted to LOWERCASE',
    processor: (text) => text.toLowerCase(),
    optionsComponent: null
  },
  {
    id: 'uppercase',
    name: 'Uppercase',
    icon: 'text_fields',
    description: 'Convert text to UPPERCASE',
    placeholder: 'Enter text to convert to UPPERCASE',
    hint: 'Will convert all characters to UPPERCASE',
    sampleData: 'this is some text\nTo Be Converted to UPPERCASE',
    processor: (text) => text.toUpperCase(),
    optionsComponent: null
  },
  {
    id: 'titlecase',
    name: 'Title Case',
    icon: 'text_fields',
    description: 'Convert Text To Title Case',
    placeholder: 'Enter text to convert to Title Case',
    hint: 'Will capitalize the first letter of each word',
    sampleData: 'this is some text\nto be converted to title case',
    processor: (text) => {
      return text.split('\n').map(line => {
        return line.split('\t').map(part => {
          return part.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          });
        }).join('\t');
      }).join('\n');
    },
    optionsComponent: null
  },
  {
    id: 'trim',
    name: 'Trim Whitespace',
    icon: 'format_align_left',
    description: 'Remove leading and trailing whitespace',
    placeholder: 'Enter text to trim whitespace',
    hint: 'Removes spaces, tabs, and line breaks from start/end',
    sampleData: '   Text with extra spaces   \n  Before and after  ',
    processor: (text) => {
      return text.split('\n').map(line => {
        return line.split('\t').map(part => part.trim()).join('\t');
      }).join('\n');
    },
    optionsComponent: null
  },
  {
    id: 'sort',
    name: 'Sort Lines',
    icon: 'sort',
    description: 'Sort lines alphabetically',
    placeholder: 'Enter text with multiple lines to sort',
    hint: 'Each line will be sorted alphabetically',
    sampleData: 'zebra\napple\norange\nbanana',
    processor: (text, options) => {
      const lines = text.split('\n').filter(line => line.trim());
      
      // Sort based on options
      lines.sort((a, b) => {
        if (!options.caseSensitive) {
          a = a.toLowerCase();
          b = b.toLowerCase();
        }
        
        return a.localeCompare(b) * (options.sortReverse ? -1 : 1);
      });
      
      return lines.join('\n');
    },
    optionsComponent: markRaw(SortOptions)
  },
  {
    id: 'deduplicate',
    name: 'Remove Duplicates',
    icon: 'filter_alt',
    description: 'Remove duplicate lines',
    placeholder: 'Enter text with potential duplicate lines',
    hint: 'Each unique line will appear only once',
    sampleData: 'apple\nbanana\napple\norange\nbanana',
    processor: (text) => {
      const lines = text.split('\n').filter(line => line.trim());
      const uniqueLines = [...new Set(lines)];
      return uniqueLines.join('\n');
    },
    optionsComponent: null
  },
  {
    id: 'countLines',
    name: 'Count Lines',
    icon: 'format_list_numbered',
    description: 'Count and number lines',
    placeholder: 'Enter text to count lines',
    hint: 'Each line will be prefixed with a number',
    sampleData: 'First line\nSecond line\nThird line',
    processor: (text) => {
      const lines = text.split('\n').filter(line => line.trim());
      return lines.map((line, index) => `${index + 1}. ${line}`).join('\n');
    },
    optionsComponent: null
  }
];

// Current selected tool
const currentTool = computed(() => {
  return tools.find(tool => tool.id === selectedTool.value) || tools[0];
});

// Process text based on selected tool
const processedText = computed(() => {
  if (!inputText.value) return '';
  
  try {
    return currentTool.value.processor(inputText.value, {
      sortReverse: sortReverse.value,
      caseSensitive: caseSensitive.value
    });
  } catch (error) {
    return `Error processing text: ${error.message}`;
  }
});
</script> 
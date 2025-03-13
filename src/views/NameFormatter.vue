<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold text-surface-900 dark:text-surface-100">Name Formatter</h1>
    </div>

    <TextProcessor
      v-model="inputText"
      :processed-output="formattedText"
      input-label="Names"
      input-placeholder="Enter names here (separate multiple names with tabs or lines)"
      input-hint="Enter full names or just last names"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-medium text-surface-800 dark:text-surface-200">Format Names</h2>
        </div>
      </template>
      
      <template #options>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card shadow="sm" class="p-4 bg-white dark:bg-surface-800">
            <div class="flex items-center">
              <input 
                type="radio" 
                id="titleCase" 
                value="titleCase" 
                v-model="formatType"
                class="h-4 w-4 text-primary-600 dark:text-primary-400 border-surface-300 dark:border-surface-600 rounded-full focus:ring-primary-500"
              >
              <label for="titleCase" class="ml-2 text-sm text-surface-700 dark:text-surface-300">
                Title Case (John Smith)
              </label>
            </div>
          </Card>
          
          <Card shadow="sm" class="p-4 bg-white dark:bg-surface-800">
            <div class="flex items-center">
              <input 
                type="radio" 
                id="uppercase" 
                value="uppercase" 
                v-model="formatType"
                class="h-4 w-4 text-primary-600 dark:text-primary-400 border-surface-300 dark:border-surface-600 rounded-full focus:ring-primary-500"
              >
              <label for="uppercase" class="ml-2 text-sm text-surface-700 dark:text-surface-300">
                UPPERCASE (JOHN SMITH)
              </label>
            </div>
          </Card>
          
          <Card shadow="sm" class="p-4 bg-white dark:bg-surface-800">
            <div class="flex items-center">
              <input 
                type="radio" 
                id="lastNameFirst" 
                value="lastNameFirst" 
                v-model="formatType"
                class="h-4 w-4 text-primary-600 dark:text-primary-400 border-surface-300 dark:border-surface-600 rounded-full focus:ring-primary-500"
              >
              <label for="lastNameFirst" class="ml-2 text-sm text-surface-700 dark:text-surface-300">
                Last, First (Smith, John)
              </label>
            </div>
          </Card>
        </div>
        
        <div class="mt-4">
          <Card shadow="sm" class="p-4 bg-white dark:bg-surface-800">
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="handlePrefixes" 
                v-model="handlePrefixes"
                class="h-4 w-4 text-primary-600 dark:text-primary-400 border-surface-300 dark:border-surface-600 rounded focus:ring-primary-500"
              >
              <label for="handlePrefixes" class="ml-2 text-sm text-surface-700 dark:text-surface-300">
                Handle name prefixes (Dr., Mr., Mrs., etc.)
              </label>
            </div>
          </Card>
        </div>
      </template>
      
      <template #sampleData>
        <div v-if="false">john smith
JANE DOE
dR. James wilson
VAN DER MEER, jan</div>
      </template>
      
      <template #footer>
        <div class="flex justify-between items-center">
          <div class="text-sm text-surface-500 dark:text-surface-400">
            Format names consistently for better data quality
          </div>
        </div>
      </template>
    </TextProcessor>
    
    <Card class="mt-6 bg-surface-50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700">
      <h3 class="text-md font-medium mb-2 text-surface-800 dark:text-surface-200">What This Tool Does</h3>
      <p class="text-sm text-surface-600 dark:text-surface-400 mb-2">
        Consistently formats names to your preferred style, helping maintain clean and standardized customer data.
      </p>
      <p class="text-sm text-surface-600 dark:text-surface-400">
        The name prefix handling option properly formats prefixes like Dr., Mr., Mrs., etc. and handles compound last names
        like "Van Der", "Mac", "O'", etc.
      </p>
    </Card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import TextProcessor from '@/components/tools/TextProcessor.vue';
import Card from '@/components/ui/Card.vue';

// State
const inputText = ref('');
const formatType = ref('titleCase');
const handlePrefixes = ref(true);

// Name prefixes to preserve
const prefixes = ['Dr.', 'Dr', 'Mr.', 'Mr', 'Mrs.', 'Mrs', 'Ms.', 'Ms', 'Prof.', 'Prof'];
const compoundPrefixes = ['van', 'von', 'de', 'den', 'der', 'ten', 'ter', 'la', 'le', 'du', 'des', 'di', 'mac', 'mc', "o'"];

// Helper function for title case
const toTitleCase = (name) => {
  if (!name) return '';
  
  // Split the name into parts by spaces
  const parts = name.toLowerCase().split(' ');
  
  return parts.map(part => {
    // Check if this part is a prefix to handle specially
    if (handlePrefixes.value) {
      // Check for compound last name prefixes
      for (const prefix of compoundPrefixes) {
        if (part.toLowerCase() === prefix.toLowerCase()) {
          // Return the correctly capitalized prefix for compound names
          if (prefix === "o'") return "O'";
          if (prefix === 'mac' || prefix === 'mc') return prefix.charAt(0).toUpperCase() + prefix.slice(1);
          return prefix.toLowerCase();
        }
      }
      
      // Check for name prefixes (Dr., Mr., etc.)
      for (const prefix of prefixes) {
        if (part.toLowerCase() === prefix.toLowerCase().replace('.', '')) {
          // Return with proper capitalization and period
          return prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase();
        }
      }
    }
    
    // Default behavior for other parts: capitalize first letter
    return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
  }).join(' ');
};

// Formatted output
const formattedText = computed(() => {
  return inputText.value
    .split('\n')
    .map(line => {
      return line
        .split('\t')
        .map(name => {
          if (!name.trim()) return '';
          
          // Handle "Last, First" input format
          let firstName = '';
          let lastName = '';
          let namePartsArray = [];
          
          if (name.includes(',')) {
            const parts = name.split(',').map(part => part.trim());
            if (parts.length >= 2) {
              lastName = parts[0].trim();
              firstName = parts[1].trim();
              namePartsArray = [firstName, lastName];
            } else {
              namePartsArray = [name.trim()];
            }
          } else {
            namePartsArray = [name.trim()];
          }
          
          // Process the name based on selected format
          let formattedName = '';
          
          if (formatType.value === 'titleCase') {
            if (namePartsArray.length === 2) {
              formattedName = `${toTitleCase(namePartsArray[0])} ${toTitleCase(namePartsArray[1])}`;
            } else {
              formattedName = toTitleCase(namePartsArray[0]);
            }
          } else if (formatType.value === 'uppercase') {
            if (namePartsArray.length === 2) {
              formattedName = `${namePartsArray[0].toUpperCase()} ${namePartsArray[1].toUpperCase()}`;
            } else {
              formattedName = namePartsArray[0].toUpperCase();
            }
          } else if (formatType.value === 'lastNameFirst') {
            if (namePartsArray.length === 2) {
              // Already in last, first format
              formattedName = `${toTitleCase(namePartsArray[1])}, ${toTitleCase(namePartsArray[0])}`;
            } else {
              // Try to split into first and last
              const parts = namePartsArray[0].split(' ');
              if (parts.length >= 2) {
                // Assume last part is last name, everything else is first name(s)
                const lastName = parts.pop();
                const firstName = parts.join(' ');
                formattedName = `${toTitleCase(lastName)}, ${toTitleCase(firstName)}`;
              } else {
                // Can't split into first/last
                formattedName = toTitleCase(namePartsArray[0]);
              }
            }
          }
          
          return formattedName;
        })
        .join('\t');
    })
    .join('\n');
});
</script> 
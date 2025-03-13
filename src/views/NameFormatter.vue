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
      :sample-data="sampleNames"
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
      
      <template #footer>
        <div class="flex justify-between items-center">
          <div class="text-sm text-surface-500 dark:text-surface-400">
            Format names consistently for better data quality
          </div>
        </div>
      </template>
    </TextProcessor>
    
    <Card class="mt-6 bg-surface-50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700">
      <h3 class="text-md font-medium mb-2 text-surface-800 dark:text-surface-200">How the Name Formatter Works</h3>
      
      <div class="space-y-4 text-sm text-surface-600 dark:text-surface-400">
        <p>
          The Name Formatter tool standardizes names in your data using intelligent formatting rules. It handles various input formats and applies consistent styling based on your preferences.
        </p>
        
        <div>
          <h4 class="font-medium text-surface-700 dark:text-surface-300 mb-1">Formatting Options:</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li><strong>Title Case:</strong> Capitalizes the first letter of each name part while keeping the rest lowercase (e.g., "John Smith", "Van Der Meer")</li>
            <li><strong>UPPERCASE:</strong> Converts all letters to uppercase for maximum visibility (e.g., "JOHN SMITH", "VAN DER MEER")</li>
            <li><strong>Last, First:</strong> Reverses the name order and adds a comma, useful for alphabetical sorting (e.g., "Smith, John")</li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-medium text-surface-700 dark:text-surface-300 mb-1">Prefix Handling:</h4>
          <p>When the "Handle name prefixes" option is enabled, the formatter intelligently processes:</p>
          <ul class="list-disc pl-5 space-y-1">
            <li><strong>Professional/Personal Titles:</strong> Preserves proper capitalization for honorifics (Dr., Mr., Mrs., Ms., Prof.)</li>
            <li><strong>Compound Last Names:</strong> Properly formats compound name parts (van, von, de, den, der, etc.) according to naming conventions</li>
            <li><strong>Special Cases:</strong> Correctly formats special prefixes like "Mac", "Mc", and "O'" according to standard conventions</li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-medium text-surface-700 dark:text-surface-300 mb-1">Input Handling:</h4>
          <p>The formatter accepts names in various formats:</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Full names (e.g., "john smith")</li>
            <li>Names with prefixes (e.g., "dr. james wilson")</li>
            <li>Names already in "Last, First" format (e.g., "SMITH, JOHN")</li>
            <li>Compound names (e.g., "van der meer")</li>
            <li>Multiple names separated by tabs or new lines for batch processing</li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-medium text-surface-700 dark:text-surface-300 mb-1">Examples:</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
            <div class="bg-white dark:bg-surface-800 p-2 rounded border border-surface-200 dark:border-surface-700">
              <p class="font-medium mb-1 text-surface-800 dark:text-surface-200">Input:</p>
              <pre class="bg-surface-100 dark:bg-surface-900 p-1.5 rounded text-xs overflow-x-auto">john smith
dr. jane doe
VAN DER MEER, jan
O'SULLIVAN, mary</pre>
            </div>
            <div class="bg-white dark:bg-surface-800 p-2 rounded border border-surface-200 dark:border-surface-700">
              <p class="font-medium mb-1 text-surface-800 dark:text-surface-200">Output (Title Case):</p>
              <pre class="bg-surface-100 dark:bg-surface-900 p-1.5 rounded text-xs overflow-x-auto">John Smith
Dr. Jane Doe
Jan van der Meer
Mary O'Sullivan</pre>
            </div>
          </div>
        </div>
        
        <div>
          <h4 class="font-medium text-surface-700 dark:text-surface-300 mb-1">Best Practices:</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li>Use Title Case for most customer-facing communications</li>
            <li>Use Last, First format for alphabetical sorting and databases</li>
            <li>Enable prefix handling when working with formal names or academic titles</li>
            <li>Check a sample of results when processing large batches to ensure correct formatting</li>
          </ul>
        </div>
      </div>
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

// Sample data
const sampleNames = `john smith
JANE DOE
dR. James wilson
VAN DER MEER, jan`;

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
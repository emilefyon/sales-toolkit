<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold text-surface-900 dark:text-surface-100">Phone Number Cleaner</h1>
    </div>

    <TextProcessor
      v-model="inputText"
      :processed-output="parsedText"
      input-label="Phone Numbers"
      input-placeholder="Enter phone numbers here (separate multiple numbers with tabs, lines, or spaces)"
      input-hint="Supports any standard phone format"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-medium text-surface-800 dark:text-surface-200">Format Phone Numbers</h2>
          <div class="text-xs bg-primary-50 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 px-2 py-1 rounded">
            Powered by libphonenumber-js
          </div>
        </div>
      </template>
      
      <template #options>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card shadow="sm" class="p-4 bg-white dark:bg-surface-800">
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="leadingApostrophe" 
                v-model="leadingApostrophe"
                class="h-4 w-4 text-primary-600 dark:text-primary-400 border-surface-300 dark:border-surface-600 rounded focus:ring-primary-500"
              >
              <label for="leadingApostrophe" class="ml-2 text-sm text-surface-700 dark:text-surface-300">
                Add leading apostrophe (for Excel)
              </label>
            </div>
          </Card>
          
          <Card shadow="sm" class="p-4 bg-white dark:bg-surface-800">
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="keepCountryCode" 
                v-model="keepCountryCode"
                class="h-4 w-4 text-primary-600 dark:text-primary-400 border-surface-300 dark:border-surface-600 rounded focus:ring-primary-500"
              >
              <label for="keepCountryCode" class="ml-2 text-sm text-surface-700 dark:text-surface-300">
                Keep country code
              </label>
            </div>
          </Card>
          
          <Card shadow="sm" class="p-4 bg-white dark:bg-surface-800">
            <div class="flex items-center">
              <label for="defaultCountry" class="text-sm text-surface-700 dark:text-surface-300 mr-2">
                Default country:
              </label>
              <select 
                id="defaultCountry" 
                v-model="defaultCountry"
                class="h-8 text-sm rounded-md border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-800 dark:text-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-600 dark:focus:border-primary-600"
              >
                <option value="BE">Belgium</option>
                <option value="US">United States</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
                <option value="UK">United Kingdom</option>
              </select>
            </div>
          </Card>
        </div>
      </template>
      
      <template #sampleData>
        <div v-if="false">+32 2 555 12 12
0032 475 12 34 56
047512341234
001 555 123 4567</div>
      </template>
      
      <template #footer>
        <div class="flex justify-between items-center">
          <div class="text-sm text-surface-500 dark:text-surface-400">
            <span v-if="stats.total > 0">
              Processed {{ stats.total }} numbers ({{ stats.valid }} valid, {{ stats.invalid }} invalid)
            </span>
          </div>
        </div>
      </template>
    </TextProcessor>
    
    <Card class="mt-6 bg-surface-50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700">
      <h3 class="text-md font-medium mb-2 text-surface-800 dark:text-surface-200">What This Tool Does</h3>
      <p class="text-sm text-surface-600 dark:text-surface-400 mb-2">
        This tool formats phone numbers to the E.164 standard format, which is the international format used by many systems. 
        If a number doesn't include the country code, the default country is assumed.
      </p>
      <p class="text-sm text-surface-600 dark:text-surface-400">
        The optional leading apostrophe helps when pasting into Excel, as it prevents Excel from interpreting the number as a numeric value and removing leading zeros.
      </p>
    </Card>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import TextProcessor from '@/components/tools/TextProcessor.vue';
import Card from '@/components/ui/Card.vue';

// State
const inputText = ref('');
const leadingApostrophe = ref(true);
const keepCountryCode = ref(true);
const defaultCountry = ref('BE');

// Stats
const stats = ref({
  total: 0,
  valid: 0,
  invalid: 0
});

// Formatted output
const parsedText = computed(() => {
  const lines = inputText.value.split('\n');
  let totalCount = 0;
  let validCount = 0;
  let invalidCount = 0;
  
  const result = lines.map(line => {
    return line.split('\t').map(cell => {
      const phoneNumber = cell.trim();
      if (phoneNumber === '') {
        return '';
      }
      
      totalCount++;
      
      try {
        const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, defaultCountry.value);
        if (!parsedPhoneNumber) {
          invalidCount++;
          return 'Invalid number';
        }
        
        validCount++;
        
        let formattedNumber;
        if (keepCountryCode.value) {
          formattedNumber = parsedPhoneNumber.format('E.164').replace(/\s/g, '');
        } else {
          formattedNumber = parsedPhoneNumber.formatNational().replace(/\s/g, '');
        }
        
        if (leadingApostrophe.value) {
          formattedNumber = "'" + formattedNumber;
        }
        
        return formattedNumber;
      } catch (error) {
        invalidCount++;
        return 'Invalid number';
      }
    }).join('\t');
  }).join('\n');
  
  // Update stats
  stats.value = {
    total: totalCount,
    valid: validCount,
    invalid: invalidCount
  };
  
  return result;
});
</script> 
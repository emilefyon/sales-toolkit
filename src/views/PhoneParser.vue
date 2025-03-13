<template>
  <div class="card">
    <h1 class="text-2xl font-bold mb-6">Phone Number Cleaner 📱</h1>
    <TextProcessor
      :processed-text="parsedText"
      input-placeholder="Enter phone numbers here (separate multiple numbers with tabs, lines, or spaces)"
      @update:input="inputText = $event"
    >
      <template #options>
        <div class="mb-4">
          <input 
            type="checkbox" 
            id="leadingApostrophe" 
            v-model="leadingApostrophe"
            class="mr-2"
          >
          <label for="leadingApostrophe">Add leading apostrophe (for Excel)</label>
        </div>
      </template>
    </TextProcessor>
  </div>
</template>

<script>
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import TextProcessor from '@/components/TextProcessor.vue'

export default {
  name: 'PhoneParser',
  components: {
    TextProcessor
  },
  data() {
    return {
      inputText: '',
      leadingApostrophe: true
    }
  },
  computed: {
    parsedText() {
      return this.inputText.split('\n').map(line => {
        return line.split('\t').map(cell => {
          const phoneNumber = cell.trim();
          if (phoneNumber === '') {
            return '';
          }
          
          const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, 'BE');
          if (!parsedPhoneNumber) {
            return 'Invalid number';
          }
          
          let formattedNumber = parsedPhoneNumber.format('E.164').replace(/\s/g, '');
          if (this.leadingApostrophe) {
            formattedNumber = "'" + formattedNumber;
          }
          
          return formattedNumber;
        }).join('\t');
      }).join('\n');
    }
  }
}
</script>

<style scoped>
.card {
  @apply bg-white rounded-xl shadow-md p-6 max-w-5xl mx-auto;
}
</style> 
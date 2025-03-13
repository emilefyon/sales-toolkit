<template>
  <div class="card">
    <h1 class="text-2xl font-bold mb-6">Last Name Cleaner 📝</h1>
    <TextProcessor
      :processed-text="cleanedText"
      input-placeholder="Enter names here (separate multiple names with tabs or lines)"
      @update:input="inputText = $event"
    >
    </TextProcessor>
  </div>
</template>

<script>
import TextProcessor from '@/components/TextProcessor.vue'

export default {
  name: 'LastNameCleaner',
  components: {
    TextProcessor
  },
  data() {
    return {
      inputText: ''
    }
  },
  computed: {
    cleanedText() {
      return this.inputText.split('\n').map(line => {
        return line.split('\t').map(fullName => {
          return fullName.split(' ').map(name => {
            if (name.trim() === '') {
              return '';
            }
            return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
          }).join(' ');
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
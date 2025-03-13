<template>
  <div class="card">
    <h1 class="text-2xl font-bold mb-6">Text Lowercaser 🔤</h1>
    <TextProcessor
      :processed-text="lowercaseText"
      input-placeholder="Enter text here to convert to lowercase"
      @update:input="inputText = $event"
    >
    </TextProcessor>
  </div>
</template>

<script>
import TextProcessor from '@/components/TextProcessor.vue'

export default {
  name: 'TextLowercaser',
  components: {
    TextProcessor
  },
  data() {
    return {
      inputText: ''
    }
  },
  computed: {
    lowercaseText() {
      return this.inputText.toLowerCase();
    }
  }
}
</script>

<style scoped>
.card {
  @apply bg-white rounded-xl shadow-md p-6 max-w-5xl mx-auto;
}
</style> 
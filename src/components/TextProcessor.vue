<template>
  <div class="mb-4">
    <slot name="options"></slot>
  </div>
  <div class="flex flex-col md:flex-row gap-4">
    <div class="flex-1">
      <label class="block text-gray-700 font-medium mb-2">Input:</label>
      <textarea 
        v-model="inputText" 
        class="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
        :placeholder="inputPlaceholder" 
        rows="20"
      ></textarea>
    </div>
    <div class="flex-1">
      <label class="block text-gray-700 font-medium mb-2">Output:</label>
      <textarea 
        readonly 
        class="w-full p-3 border border-gray-300 rounded bg-gray-50" 
        :value="processedText" 
        rows="20"
      ></textarea>
    </div>
  </div>
  <div class="mt-4 flex justify-end space-x-2">
    <button @click="clearText" class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition">
      Clear
    </button>
    <button @click="copyToClipboard" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
      Copy Output
    </button>
  </div>
</template>

<script>
export default {
  name: 'TextProcessor',
  props: {
    processedText: {
      type: String,
      required: true
    },
    inputPlaceholder: {
      type: String,
      default: 'Enter text here...'
    }
  },
  data() {
    return {
      inputText: ''
    }
  },
  methods: {
    clearText() {
      this.inputText = '';
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.processedText)
        .then(() => {
          alert('Output copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
        });
    }
  },
  watch: {
    inputText() {
      this.$emit('update:input', this.inputText);
    }
  }
}
</script> 
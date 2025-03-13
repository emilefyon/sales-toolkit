<template>
  <Card class="animate-slide-in">
    <template v-if="$slots.header" #header>
      <slot name="header"></slot>
    </template>
    
    <div class="mb-4">
      <slot name="options"></slot>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <TextArea
          v-model="localInput"
          :label="inputLabel"
          :placeholder="inputPlaceholder"
          :rows="12"
          class="font-mono"
          resize
        >
          <template #hint>
            <div class="flex justify-between items-center mt-1">
              <span>{{ inputHint }}</span>
              <Button 
                v-if="sampleData" 
                size="sm" 
                variant="ghost" 
                icon="play_circle" 
                @click="loadSampleData"
              >
                Load example
              </Button>
            </div>
          </template>
        </TextArea>
      </div>
      
      <div>
        <TextArea
          v-model="outputValue"
          label="Output"
          :rows="12"
          class="font-mono"
          readonly
        >
          <template #hint>
            <div class="flex items-center justify-end">
              <Button
                v-if="hasOutputContent" 
                size="sm" 
                variant="outline" 
                icon="content_copy" 
                @click="copyToClipboard"
                class="mr-2"
              >
                Copy
              </Button>
              <Button
                size="sm" 
                variant="ghost" 
                icon="delete" 
                @click="clearAll"
                :disabled="!hasContent"
              >
                Clear all
              </Button>
            </div>
          </template>
        </TextArea>
      </div>
    </div>
    
    <template v-if="$slots.footer" #footer>
      <slot name="footer"></slot>
    </template>
  </Card>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { toast } from 'vue3-toastify';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';
import TextArea from '@/components/ui/TextArea.vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  processedOutput: {
    type: String,
    default: ''
  },
  inputLabel: {
    type: String,
    default: 'Input'
  },
  inputPlaceholder: {
    type: String,
    default: 'Enter your text here...'
  },
  inputHint: {
    type: String,
    default: ''
  },
  sampleData: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

// Local state
const localInput = ref(props.modelValue || '');
const outputValue = computed(() => props.processedOutput || '');

// Computed properties
const hasContent = computed(() => localInput.value.trim().length > 0);
const hasOutputContent = computed(() => outputValue.value.trim().length > 0);

// Methods
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(outputValue.value);
    toast.success('Copied to clipboard!');
  } catch (err) {
    toast.error('Failed to copy: ' + err.message);
  }
};

const clearAll = () => {
  localInput.value = '';
  emit('update:modelValue', '');
};

const loadSampleData = () => {
  if (props.sampleData) {
    localInput.value = props.sampleData;
    emit('update:modelValue', props.sampleData);
  }
};

// Watch for external changes
watch(
  () => props.modelValue,
  (newValue) => {
    localInput.value = newValue;
  }
);

// Watch for local changes
watch(
  localInput,
  (newValue) => {
    emit('update:modelValue', newValue);
  }
);
</script> 
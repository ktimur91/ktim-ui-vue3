<template>
  <div class="form-radio-group form-item__input flex ai-c ggap-5">
    <button
      v-for="item of items"
      :key="item.value"
      class="btn sm h-100 f-1 jc-c"
      :class="item.value === propValue ? 'primary' : ''"
      @click="propValue = item.value"
    >
      {{ item.text }}
    </button>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, toRefs, computed } from 'vue'

// Emits
const emits = defineEmits(['update:modelValue'])

// Props
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: [String, Number],
    default: 1
  }
})

// Data
const { items, modelValue } = toRefs(props)

// Computed
const propValue = computed({
  get: () => modelValue.value,
  set: (val) => emits('update:modelValue', val)
})
</script>

<style lang="scss" scoped>
.form-radio-group {
  padding: 3px;
}
</style>

<template>
  <div v-if="propValue" :data-dropdown-body="uniqId" class="drop-down">
    <slot />
  </div>
</template>

<script setup>
import { defineEmits, defineProps, toRefs, computed, watchEffect } from 'vue'
import { calcDropDown } from '@/plugins'

// Emits
const emits = defineEmits(['update:modelValue'])

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  uniqId: {
    type: String,
    default: 'drop-down'
  },
  direction: {
    type: String,
    default: ''
  }
})

// Data
const { modelValue, uniqId, direction } = toRefs(props)

// Computed
const propValue = computed({
  get: () => modelValue.value,
  set: (val) => emits('update:modelValue', val)
})

// Watch
watchEffect(() => {
  if (propValue.value) calcDropDown(uniqId.value, direction.value)
})
</script>

<style lang="scss" scoped>
.drop-down {
  position: fixed;
  z-index: 1;
}
</style>

<template>
  <div class="form-item grid">
    <label v-if="label" class="form-item__label" :class="required && 'required'">
      {{ label }}
    </label>
    <select :name="'form-item-' + uid" class="form-item__select" :required="required" v-model="propValue">
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <option v-for="option of options" :key="option.value" :value="option.value">{{ option.text }}</option>
    </select>
  </div>
</template>

<script setup>
import { getCurrentInstance, defineEmits, defineProps, toRefs, computed } from 'vue'

// Emits
const emits = defineEmits(['update:modelValue'])

// Props
const props = defineProps({
  label: {
    type: String,
    default: 'Label'
  },
  placeholder: {
    type: String,
    default: 'Выберите'
  },
  required: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: [String, Number],
    default: ''
  }
})

const uid = getCurrentInstance().uid
const { label, placeholder, required, options, modelValue } = toRefs(props)

// Computed
const propValue = computed({
  get: () => modelValue.value,
  set: (val) => emits('update:modelValue', val)
})
</script>

<style lang="scss" scoped></style>

<template>
  <div class="form-item grid">
    <label v-if="label" class="form-item__label" :class="required && 'required'">
      {{ label }}
    </label>
    <input
      :type="type"
      :name="'form-item-' + uid"
      class="form-item__input pl-10 pr-10"
      :placeholder="placeholder"
      :required="required"
      v-model="propValue"
    />
  </div>
</template>

<script setup>
import { getCurrentInstance, defineProps, defineEmits, toRefs, computed } from 'vue'

// Emits
const emits = defineEmits(['update:modelValue'])

// Props
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: 'placeholder'
  },
  required: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: String,
    default: ''
  }
})

// Data
const { label, type, placeholder, required, modelValue } = toRefs(props)
const uid = getCurrentInstance().uid

// Computed
const propValue = computed({
  get: () => modelValue.value,
  set: (val) => emits('update:modelValue', val)
})
</script>

<style lang="scss" scoped></style>

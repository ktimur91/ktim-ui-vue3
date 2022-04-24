<template>
  <div class="form-item grid">
    <label v-if="label" class="form-item__label" :class="required && 'required'">
      {{ label }}
    </label>

    <div class="textarea form-item__input grid pl-10 pr-10" :class="focused && 'focused'">
      <textarea
        :name="'form-item-' + uid"
        :id="'textarea-' + uid"
        cols="30"
        :rows="rows"
        class="textarea__input"
        :placeholder="placeholder"
        :required="required"
        v-model="propValue"
        @focus="focused = true"
        @blur="focused = false"
      />
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, defineProps, defineEmits, toRefs, computed, watch, ref } from 'vue'

// Emits
const emits = defineEmits(['update:modelValue'])

// Props
const props = defineProps({
  label: {
    type: String,
    default: 'Label'
  },
  rows: {
    type: String,
    default: '1'
  },
  placeholder: {
    type: String,
    default: 'Placeholder'
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
const { label, placeholder, required, modelValue } = toRefs(props)
const uid = getCurrentInstance().uid
const focused = ref(false)

// Computed
const propValue = computed({
  get: () => modelValue.value,
  set: (val) => emits('update:modelValue', val)
})

// Watch
watch(modelValue, resizer)

// Methods
function resizer() {
  const el = document.querySelector('#textarea-' + uid)
  if (el) {
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  }
}
</script>

<style lang="scss" scoped>
.textarea {
  max-height: 200px;
  overflow: auto;

  &__input {
    width: 100%;
    resize: none;
    border: 0;
    background-color: transparent;
    margin: 8px 0;
  }
}
</style>

<template>
  <div class="form-checkbox">
    <input
      type="checkbox"
      :name="'form-checkbox-' + uid"
      :id="'form-checkbox-' + uid"
      class="form-checkbox__input"
      :required="required"
      v-model="propValue"
    />
    <label :for="'form-checkbox-' + uid" class="form-checkbox__label flex ai-c ggap-10">
      <span class="form-checkbox__label-check flex ai-c jc-c">
        <BaseIcon class="ic-14 white" icon="check" />
      </span>
      <slot>
        <span v-if="label">{{ label }}</span>
      </slot>
    </label>
  </div>
</template>

<script setup>
import { getCurrentInstance, defineProps, defineEmits, toRefs, computed } from 'vue'
import { BaseIcon } from '@/components'

// Emits
const emits = defineEmits(['update:modelValue'])

// Props
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: Boolean,
    default: false
  }
})

// Data
const { label, required, modelValue } = toRefs(props)
const uid = getCurrentInstance().uid

// Computed
const propValue = computed({
  get: () => modelValue.value,
  set: (val) => emits('update:modelValue', val)
})
</script>

<style lang="scss" scoped>
.form-checkbox {
  $parent: &;

  &__input {
    display: none;
  }

  &__label {
    &-check {
      width: 20px;
      height: 20px;
      background-color: var(--form);
      border: var(--b1);
      border-radius: var(--br);

      & > svg {
        opacity: 0;
      }
    }

    &:hover > &-check {
      box-shadow: 0 0 0 2px var(--bcolor);
    }

    #{$parent}__input:checked + & > &-check {
      background-color: var(--primary);
      border-color: var(--primary);

      & > svg {
        opacity: 1;
      }
    }
  }
}
</style>

<template>
  <div class="form-summ form-item grid">
    <label v-if="label" class="form-item__label" :class="required && 'required'">
      {{ label }}
    </label>
    <div class="form-summ__grid grid gtc-1-auto">
      <input
        type="number"
        :name="'form-item-' + uid"
        class="form-summ__input form-item__input pl-10 pr-10"
        :placeholder="placeholder"
        :required="required"
        v-model.number="propValue"
      />

      <div class="form-summ__money" v-click-outside="closeAction">
        <button
          class="form-summ__money-btn btn pl-10 pr-10"
          :class="isOpen && 'active'"
          :data-btn="uniqId"
          @click="toggleAction"
        >
          <BaseIcon class="ic-24 primary" :icon="currentMoney" />
        </button>

        <div v-if="isOpen" class="form-summ__money-body box grid p-5" :data-body="uniqId">
          <button
            class="btn transparent-primary br-5 sm pl-10"
            :class="{ active: currentMoney === 'kzt' }"
            @click="setCurrentMoney('kzt')"
          >
            <BaseIcon class="ic-20 primary" icon="kzt" />
            Тенге
          </button>
          <button
            class="btn transparent-primary br-5 sm pl-10"
            :class="{ active: currentMoney === 'usd' }"
            @click="setCurrentMoney('usd')"
          >
            <BaseIcon class="ic-20 primary" icon="usd" />
            Доллар
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, defineProps, defineEmits, toRefs, ref, computed } from 'vue'
import { BaseIcon } from '@/components'
import { calcCoords, $busOn } from '@/plugins'

// Emits
const emits = defineEmits(['update:modelValue'])

// Props
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Сумма'
  },
  required: {
    type: Boolean,
    default: false
  },
  direction: {
    type: String,
    default: 'rtl'
  },
  modelValue: {
    type: Number,
    default: 0
  }
})

// Data
const { label, placeholder, required, direction, modelValue } = toRefs(props)
const isOpen = ref(false)
const uid = getCurrentInstance().uid
const uniqId = 'summ-' + uid
const currentMoney = ref('kzt')

// Computed
const propValue = computed({
  get: () => modelValue.value,
  set: (val) => emits('update:modelValue', val)
})

// Created
$busOn('scrollAction', () => {
  if (isOpen.value) closeAction()
})

// Methods
function toggleAction() {
  isOpen.value = !isOpen.value
  calcCoords(uniqId, direction.value)
}
function closeAction() {
  isOpen.value = false
}
function setCurrentMoney(money) {
  currentMoney.value = money
  closeAction()
}
</script>

<style lang="scss" scoped>
.form-summ {
  &__input {
    border-radius: var(--br) 0 0 var(--br);
  }

  &__money {
    &-btn {
      border-radius: 0 var(--br) var(--br) 0;
      box-shadow: inset 0 0 0 1px var(--bcolor);

      &.active {
        background-color: var(--primary);
        box-shadow: inset 0 0 0 2px var(--primary);

        & > svg {
          fill: #fff;
        }
      }
    }

    &-body {
      position: fixed;
      z-index: 1;
      width: fit-content;
      box-shadow: var(--box-shadow);
    }
  }
}
</style>

<template>
  <div class="form-item grid" :class="disabled && 'disabled'">
    <!-- Label -->
    <label class="form-item__label" :class="required && 'required'">
      {{ label }}
    </label>

    <!-- Autocomplete -->
    <div
      class="form-item__input autocomplete grid gtc-1-auto ai-c pl-5 pr-5"
      :class="{ focused: isOpen, empty: isEmpty }"
      :data-dropdown-btn="uniqId"
      @click="toggleAction"
      v-click-outside="closeAction"
    >
      <!-- Multiple -->
      <template v-if="isMultiple">
        <div class="autocomplete__tags flex fw ggap-5 pt-5 pb-5">
          <template v-if="propValue && propValue.length">
            <template v-for="item of propValue" :key="item.value">
              <slot name="tag" :item="item">
                <div class="autocomplete__tags-item flex ai-c ggap-10">
                  <span class="pl-10">
                    {{ item.text }}
                  </span>
                  <button type="button" class="btn xsm rounded cube-20" @click.prevent.stop="removeItem(item.value)">
                    <BaseIcon class="ic-12 black" icon="close" />
                  </button>
                </div>
              </slot>
            </template>
            <button v-if="isEmpty" class="btn primary-light md">
              <BaseIcon class="ic-16 primary" icon="plus-circle" />
              Добавить пользователя
            </button>
          </template>
          <template v-else>
            <button v-if="isEmpty" class="btn primary-light md m-auto">
              <BaseIcon class="ic-16 primary" icon="plus-circle" />
              Добавить пользователя
            </button>
            <div v-else class="form-item__placeholder pl-5 pr-5">{{ placeholder }}</div>
          </template>
        </div>
      </template>

      <!-- Single -->
      <template v-else>
        <div class="form-item__placeholder pl-5 pr-5">{{ propValue.text || placeholder }}</div>
        <button type="button" v-if="propValue.text" class="btn rounded cube-24" @click.prevent.stop="clearItem">
          <BaseIcon class="ic-14 black" icon="close" />
        </button>
      </template>

      <!-- List -->
      <div v-if="isOpen" class="autocomplete__list grid box" :data-dropdown-body="uniqId">
        <div v-if="isSearch" class="p-5">
          <input
            type="text"
            :name="'form-item-' + uid"
            :id="uniqId"
            class="autocomplete__input w-100"
            placeholder="Поиск"
            :required="required"
            autocomplete="off"
            @input="openAction"
            @click.stop
            v-model="searchText"
          />
        </div>
        <div class="autocomplete__list-scroll grid p-5">
          <template v-if="propOptions && propOptions.length">
            <button
              type="button"
              v-for="option of propOptions"
              :key="option.value"
              class="options__list-item btn sm link br-5"
              :class="isSelected(option.value) && 'active'"
              @click.stop.prevent="selectItem(option)"
            >
              {{ option.text }}
            </button>
          </template>
          <template v-else>
            <div class="flex ai-c jc-c">Ничего не найдено</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, defineEmits, defineProps, toRefs, ref, nextTick, computed } from 'vue'
import { BaseIcon } from '@/components'
import { calcDropDown, $busOn } from '@/plugins'

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
  disabled: {
    type: Boolean,
    default: false
  },
  isSearch: {
    type: Boolean,
    default: true
  },
  isMultiple: {
    type: Boolean,
    default: false
  },
  isEmpty: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: [String, Object, Array],
    default: ''
  }
})

// Data
const { label, placeholder, disabled, required, isSearch, isMultiple, options, modelValue } = toRefs(props)
const isOpen = ref(false)
const searchText = ref('')
const uid = getCurrentInstance().uid
const uniqId = 'autocomplete-' + uid

// Computed
const propValue = computed({
  get: () => modelValue.value,
  set: (val) => emits('update:modelValue', val)
})
const propOptions = computed(() => {
  const text = searchText.value.toLocaleLowerCase()
  return options.value?.filter((item) => item?.text?.toLocaleLowerCase().includes(text)) || []
})

// Created
$busOn('scrollAction', () => {
  if (isOpen.value) closeAction()
})

// Methods
function toggleAction() {
  isOpen.value = !isOpen.value
  calcDropDown(uniqId, 'full', true)
}
function openAction() {
  isOpen.value = true
  calcDropDown(uniqId, 'full', true)
}
function closeAction() {
  isOpen.value = false
  searchText.value = ''
}
async function selectItem(item) {
  searchText.value = ''
  if (!isMultiple.value) {
    propValue.value = { ...item }
    closeAction()
  } else {
    if (Array.isArray(propValue.value)) {
      const index = propValue.value.findIndex((obj) => obj.value === item.value)
      if (index === -1) propValue.value.push({ ...item })
      else propValue?.value.splice(index, 1)

      await nextTick()

      calcDropDown(uniqId, 'full', true)
    }
  }
}
function isSelected(value) {
  let res = false
  if (Array.isArray(propValue.value)) {
    res = propValue.value?.findIndex((item) => item.value === value) !== -1
  } else if (typeof propValue.value === 'object') {
    res = propValue.value?.value === value
  }
  return res
}
function clearItem() {
  propValue.value = {}
  openAction()
}
async function removeItem(value) {
  if (Array.isArray(propValue.value)) {
    const index = propValue?.value.findIndex((item) => item.value === value)
    if (index !== -1) propValue?.value.splice(index, 1)

    await nextTick()

    if (!isOpen.value) openAction()
    else calcDropDown(uniqId, 'full', true)
  }
}
</script>

<style lang="scss" scoped>
.autocomplete {
  $parent: &;

  &.empty {
    background-color: transparent;
    box-shadow: none;
    padding: 0;
  }

  &__input {
    border: 0;
    background-color: var(--form);
    padding: 6px 15px;
    border-radius: 6px;
  }

  &__list {
    position: fixed;
    z-index: 99999;
    box-shadow: var(--box-shadow);

    &-scroll {
      max-height: 200px;
      overflow: auto;
      grid-gap: 1px;
    }
  }

  &__tags {
    #{$parent}.empty & {
      padding: 0;
    }

    &-item {
      background: var(--box);
      border-radius: var(--br);
      padding: 2px;
      border: var(--b1);
    }
  }
}
</style>

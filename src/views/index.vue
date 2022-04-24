<template>
  <div class="content grid gtc-4 ggap-30">
    <!-- Drop down -->
    <div>
      <div
        class="drop-down-wrapper iflex"
        v-click-outside="
          () => {
            isOpen = false
          }
        "
      >
        <button class="btn primary" data-dropdown-btn="test" @click="isOpen = !isOpen">Drop down button target</button>
        <BaseDropDown class="grid ggap-1 box bsh p-5" uniqId="test" v-model="isOpen">
          <button class="btn sm link">
            <BaseIcon class="ic-16 primary" icon="home" />
            Link
          </button>
          <button class="btn sm link active">
            <BaseIcon class="ic-16 primary" icon="check-circle" />
            Active
          </button>
          <button class="btn sm link">
            <BaseIcon class="ic-16 primary" icon="globe" />
            Link
          </button>
          <button class="btn sm link">
            <BaseIcon class="ic-16 primary" icon="search" />
            Link
          </button>
          <button class="btn sm link" disabled>
            <BaseIcon class="ic-16 primary" icon="doc-1" />
            Disabled
          </button>
          <button class="btn sm link">
            <BaseIcon class="ic-16 primary" icon="lock" />
            Link
          </button>
          <hr />
          <button class="btn sm link">
            <BaseIcon class="ic-16 primary" icon="share" />
            Link
          </button>
          <button class="btn sm cancel">
            <BaseIcon class="ic-16 red" icon="delete" />
            Cancel
          </button>
        </BaseDropDown>
      </div>
    </div>

    <!-- Icon -->
    <BaseIcon class="ic-24 primary" icon="home" />

    <!-- Btns -->
    <div class="btns grid gtc-2 ggap-10 box p-20">
      <button class="btn primary">
        <BaseIcon class="ic-18 white" icon="home" />
        primary
      </button>
      <button class="btn secondary">
        <BaseIcon class="ic-18 primary" icon="home" />
        secondary
      </button>
      <button class="btn outline">
        <BaseIcon class="ic-18 primary" icon="home" />
        outline
      </button>
      <button class="btn link">
        <BaseIcon class="ic-18 primary" icon="home" />
        link
      </button>
      <button class="btn save">
        <BaseIcon class="ic-18 primary" icon="home" />
        save
      </button>
      <button class="btn cancel">
        <BaseIcon class="ic-18 red" icon="home" />
        cancel
      </button>
    </div>

    <!-- Autocomplete -->
    <div class="">
      <FormAutocomplete label="Проект" required :options="optionsProjects" isMultiple v-model="formData.projects" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { BaseIcon, BaseDropDown, FormAutocomplete } from '@/components'

// Data
const isOpen = ref(false)
const formData = reactive({
  orderType: {},
  projects: [],
  users: [],
  summType: 1,
  summ: 0
})
const optionsProjects = []
for (let i = 1; i < 100; i++) {
  optionsProjects.push({
    id: i,
    text: 'Some text - ' + i,
    value: i
  })
}
</script>

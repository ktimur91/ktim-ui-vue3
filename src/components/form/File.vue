<template>
  <div class="form-file grid ggap-10">
    <!-- List -->
    <div v-if="fileList.value.length" class="form-file__list grid">
      <ItemFile v-for="file of fileList.value" :key="file.lastModified" :item="file" @remove="removeItem" />
    </div>

    <input
      type="file"
      name="file"
      id="file"
      class="form-file__input"
      @change="setFiles($event.target.files)"
      multiple
    />
    <label for="file" class="form-file__label">
      <!-- Add -->
      <div v-if="fileList.value.length" class="flex jc-fs">
        <div class="btn primary-light sm">
          <BaseIcon class="ic-16 primary" icon="plus-circle" />
          Выбрать еще файлы
        </div>
      </div>

      <!-- Empty -->
      <div v-else class="form-file__empty flex fd-c ai-c ggap-5 p-20">
        <h4 class="title">Загрузите один или несколько файлов</h4>
        <small>pdf, doc, docx, xls, xlsx, jpg, png, gif</small>
        <div class="btn primary-light sm mt-10">
          <BaseIcon class="ic-16 primary" icon="plus-circle" />
          Выберите файлы
        </div>
      </div>
    </label>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { BaseIcon, ItemFile } from '@/components'

// Data
const fileList = reactive({ value: [] })

// Methods
function setFiles(files) {
  for (let i = 0; i < files.length; i++) {
    const item = files[i]
    fileList.value.push({
      lastModified: item.lastModified,
      name: item.name,
      type: item.type,
      size: item.size,
      file: item
    })
  }
}
function removeItem(lastModified) {
  const index = fileList.value.findIndex((item) => item.lastModified === lastModified)
  if (index !== -1) fileList.value.splice(index, 1)
}
</script>

<style lang="scss" scoped>
.form-file {
  &__input {
    display: none;
  }

  &__list {
    border-radius: var(--br);
    border: var(--b1);
  }

  &__empty {
    border: 2px var(--bcolor) dashed;
    border-radius: var(--br);
  }
}
</style>

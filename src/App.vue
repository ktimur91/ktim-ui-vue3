<template>
  <header class="app-header">
    <div class="content h-100 flex ai-c">
      <h2 class="title">ktim-ui-vue3</h2>
    </div>
  </header>

  <main class="app-main pt-30 pb-30">
    <router-view />
  </main>
</template>

<style lang="scss" scoped>
.app {
  &-header {
    background-color: #333;
    color: #fff;
    height: 50px;
  }
}
</style>

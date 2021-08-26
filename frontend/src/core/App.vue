<template>
  <div class="page-container">
    <sidebar></sidebar>
    <div class="content">
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Sidebar from '@/core/components/sidebar/Sidebar.vue'

export default defineComponent({
  name: 'App',
  components: {
    Sidebar
  }
})
</script>

<style lang="scss">
@use '@/styles/global';

.page-container {
  display: flex;
  position: relative;
}

.content {
  flex: 1;
  justify-content: center;
  margin-left: 164px;
}

.container {
  max-width: 1200px;
  min-height: 100vh;
  padding: 15px 30px;
  margin: 0 auto;
}
</style>

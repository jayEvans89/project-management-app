
<template>
  <nav class="sidebar">
    <ul class="nav">
      <li class="nav__item">
        <router-link class="nav__link" to="/">Dashboard</router-link>
      </li>
      <li class="nav__item">
        <router-link class="nav__link" to="/active-sprint">Active Sprint</router-link>
      </li>
      <li class="nav__item">
        <router-link class="nav__link" to="/backlog">Backlog</router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'Sidebar'
})
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100vh;
  position: fixed;
  background: var(--color-bg);
  padding: 0 30px;
}
</style>

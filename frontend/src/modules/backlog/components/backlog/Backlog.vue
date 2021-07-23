
<template>
  <issue v-for="n in 5" :key="n"></issue>
  <add-issue :dark="true"></add-issue>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import Issue from '@/modules/backlog/components/shared/Issue.vue'
import AddIssue from '@/modules/backlog/components/shared/AddIssueSprint.vue'

export default defineComponent({
  name: 'issue-backlog',
  components: {
    Issue,
    AddIssue
  }
})
</script>

<style lang="scss">
</style>

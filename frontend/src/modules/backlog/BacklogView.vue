
<template>
  <div class="page-title">
    <h1>Backlog</h1>
  </div>

  <div v-show="!gettingSprints">
    <div class="backlog-section">
      <h3>Active Sprint</h3>
      <p v-show="activeSprint === undefined">No sprints currently running</p>
      <sprint-component v-if="activeSprint !== undefined" :sprint="activeSprint"></sprint-component>
    </div>

    <div class="backlog-section">
      <h3>Sprints</h3>
      <sprint-list :sprints="inactiveSprints" @add-new-sprint="addNewSprint"></sprint-list>
    </div>
  </div>

  <div class="backlog-section">
    <h3 class="backlog-section__title--margin">Backlog</h3>
    <backlog></backlog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, Ref, ref } from '@vue/runtime-core'
import SprintList from '@/modules/backlog/components/sprint/SprintList.vue'
import Backlog from '@/modules/backlog/components/backlog/Backlog.vue'
import sprintService from '@/services/sprint/sprintService'
import { Sprint } from '../../../../backend/types/sprint/sprint'
import SprintComponent from '@/modules/backlog/components/sprint/Sprint.vue'

export default defineComponent({
  name: 'backlog-view',
  components: {
    SprintList,
    Backlog,
    SprintComponent
  },
  setup() {
    let sprints = ref([]) as Ref<Array<Sprint>>
    const gettingSprints = ref(false)

    const getSprints = async () => {
      gettingSprints.value = true
      const res = await sprintService.getSprints()
      console.log('Got sprints: ', res.data)
      sprints.value = res.data
      console.log('combined arrays: ', sprints)
      gettingSprints.value = false
    }

    const activeSprint = computed(() => {
      return sprints.value.find((sprint) => {
        return sprint.active
      })
    })

    const inactiveSprints = computed(() => {
      return sprints.value.filter(sprint => !sprint.active)
    })

    const addNewSprint = (sprint: Sprint) => {
      sprints.value.push(sprint)
    }

    onMounted(() => {
      getSprints()
    })

    return {
      activeSprint,
      inactiveSprints,
      sprints,
      gettingSprints,
      addNewSprint
    }
  }
})
</script>

<style lang="scss" scoped>
.backlog-section {
  margin-bottom: 45px;

  &__title {
    &--margin {
      margin-bottom: 15px;
    }
  }
}
</style>

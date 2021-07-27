
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
      <sprint-list
        :sprints="inactiveSprints"
        :active-sprint="activeSprint !== undefined"
        @add-new-sprint="addNewSprint"
        @sprint-started="updateSprint"
        @sprint-ended="updateSprint"
      ></sprint-list>
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
      sprints.value = res.data
      gettingSprints.value = false
    }

    const activeSprint = computed(() => {
      return sprints.value.find((sprint) => {
        return sprint.active && !sprint.complete
      })
    })

    const inactiveSprints = computed(() => {
      return sprints.value.filter(sprint => !sprint.active)
    })

    const addNewSprint = (sprint: Sprint) => {
      sprints.value.push(sprint)
    }

    const updateSprint = (sprint: Sprint) => {
      const index = sprints.value.map(s => {
        return s._id
      }).indexOf(sprint._id)

      sprints.value[index] = sprint
    }

    onMounted(() => {
      getSprints()
    })

    return {
      activeSprint,
      inactiveSprints,
      sprints,
      gettingSprints,
      addNewSprint,
      updateSprint
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

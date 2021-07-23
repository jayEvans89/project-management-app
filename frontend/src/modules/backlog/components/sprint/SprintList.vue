
<template>
    <sprint v-for="sprint in sprints" :key="sprint._id" :sprint="sprint"></sprint>
    <p v-show="noSprintsMessage">You have not created any sprints</p>
    <create-sprint type="sprint"></create-sprint>
    <create-sprint-modal @add-new-sprint="addNewSprint"></create-sprint-modal>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/runtime-core'
import Sprint from '@/modules/backlog/components/sprint/Sprint.vue'
import CreateSprint from '@/modules/backlog/components/shared/AddIssueSprint.vue'
import CreateSprintModal from '@/modules/backlog/components/sprint/CreateSprintModal.vue'
import { Sprint as SprintType } from '../../../../../../backend/types/sprint/sprint'

export default defineComponent({
  name: 'sprint-list',
  components: {
    Sprint,
    CreateSprint,
    CreateSprintModal
  },
  props: {
    sprints: {
      type: Array as PropType<Array<SprintType>>,
      required: true
    }
  },
  emits: ['add-new-sprint'],
  setup(props, { emit }) {
    const noSprintsMessage = computed(() => {
      return props.sprints.length === 0
    })

    const addNewSprint = (sprint: SprintType) => {
      emit('add-new-sprint', sprint)
    }

    return {
      noSprintsMessage,
      addNewSprint
    }
  }
})
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 10px;
}
</style>


<template>
  <modal modal-id="createSprintModal">
    <template v-slot:title>
      Create New Sprint
    </template>
    <template v-slot="scope">
      <form class="form">
        <div class="form__row">
          <div class="form__col">
            <text-input v-model="newSprint.name" name="sprintName" label="Sprint Name" placeholder="Sprint Name"></text-input>
          </div>
          <div class="form__col"></div>
        </div>
        <div class="form__row">
          <div class="form__col">
            <date-input v-model="newSprint.startDate" name="startDate" label="Start Date"></date-input>
          </div>
          <div class="form__col">
            <date-input v-model="newSprint.endDate" name="endDate" label="End Date"></date-input>
          </div>
        </div>

        <text-area-input v-model="newSprint.description" name="description" label="Description" placeholder="A description or goal the sprint should achieve"></text-area-input>
      </form>
      <div class="btn-container">
        <button class="btn btn--secondary" @click="scope.close">Cancel</button>
        <button class="btn btn--primary" @click="createSprint(scope.close)">Create Sprint</button>
      </div>
    </template>
  </modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from '@vue/runtime-core'
import Modal from '@/shared/Modal.vue'
import TextInput from '@/shared/form/components/TextInput/TextInput.vue'
import TextAreaInput from '@/shared/form/components/TextArea/TextArea.vue'
import DateInput from '@/shared/form/components/DateInput/DateInput.vue'
import sprintService from '@/services/sprint/sprintService'

export default defineComponent({
  name: 'create-sprint-modal',
  components: {
    Modal,
    TextInput,
    TextAreaInput,
    DateInput
  },
  emits: [
    'close-modal',
    'add-new-sprint'
  ],
  setup(props, { emit }) {
    const newSprint = reactive({
      name: '',
      description: '',
      startDate: '',
      endDate: ''
    })

    const createSprint = async (close: Function) => {
      try {
        const res = await sprintService.createSprint(newSprint)
        if (res.status === 'success') {
          // TODO: Show notification with success message
          close()
          emit('add-new-sprint', res.data)
          return
        }
      } catch (error) {
        // TODO: Needs to show notification with the error
        console.log(error)
      }
    }

    return {
      newSprint,
      createSprint
    }
  }
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/button';

.form {
  &__row {
    display: flex;
    width: 100%;

    > * {
      flex: 100%;

      + * {
        margin-left: 15px;
      }
    }
  }
}
</style>

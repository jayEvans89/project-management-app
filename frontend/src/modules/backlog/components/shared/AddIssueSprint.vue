
<template>
  <section :class="['create-issue', {'create-issue--dark' : dark}]" @click="create">
    <p>Add {{ type }}</p>
  </section>
</template>

<script lang="ts">
import { useVuexStore } from '@/core/store/store'
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'create-issue-or-sprint',
  props: {
    dark: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'issue'
    }
  },
  setup(props) {
    const store = useVuexStore()

    const create = () => {
      if (props.type === 'issue') {
        store.commit('addModal', 'createNewIssue')
      } else {
        store.commit('addModal', 'createSprintModal')
      }
    }

    return {
      create,
      store
    }
  }
})
</script>

<style lang="scss">
.create-issue {
  margin: 0 15px 15px;
  border: 1px solid var(--clr-text-tertiary);
  color: var(--clr-text-tertiary);
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  padding: 12px 0;
  font-size: 16px;
  font-weight: 500;
  transition: 250ms ease-in-out;

  &--dark {
    margin-left: 0;
    margin-right: 0;
  }

  &:hover {
    border-color: var(--clr-background-500);
    color: var(--clr-background-600);
  }

  &:active {
    opacity: 0.8;
  }

  p {
    text-transform: capitalize;
  }
}
</style>

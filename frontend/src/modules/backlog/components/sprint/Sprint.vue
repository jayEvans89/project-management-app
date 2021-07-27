
<template>
  <section class="active-sprint-container" ref="sprintContainer" :style="containerHeight">
    <div :class="['active-sprint', { 'active-sprint--open': showIssues }]">
      <div>
        <svg
          :class="['chevron-icon', { 'chevron-icon--active': showIssues }]"
          @click="toggleSprint"
          viewBox="0 0 20.73 34.21"
        >
          <path
            d="M20.73,17.07,4.32.66h0A2.53,2.53,0,0,0,.74,4.24h0l.05,0,0,0h0L13.56,17.07.74,29.88h0v0h0a2.54,2.54,0,0,0,3.58,3.59h0L20.73,17.08h0Z"
            style="fill: #1d1d1b;"
          />
        </svg>
      </div>
      <div class="active-sprint__details">
        <p class="active-sprint__name">{{ sprint.name }}</p>
        <p class="active-sprint__dates">{{ sprint.startDate }} - {{ sprint.endDate }}</p>
        <p
          class="active-sprint__total-issues"
          v-show="totalIssues === 0"
        >Total Issues: {{ totalIssues }}</p>
        <p
          class="active-sprint__total-issues"
          v-show="totalPoints === 0"
        >Story Points: {{ totalPoints }}</p>
        <p class="active-sprint__start" v-show="!sprint.active && !activeSprint" @click="startSprint">Start</p>
        <p class="active-sprint__start" v-show="sprint.active" @click="endSprint">End</p>
      </div>
      <!-- TODO: Start/Complete button -->
      <!-- TODO: Add menu for delete and edit -->
    </div>
    <div class="active-sprint__issues">
      <issue v-for="task in sprint.issues" :key="task._id"></issue>
    </div>
    <create-issue></create-issue>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref } from '@vue/runtime-core'
import CreateIssue from '@/modules/backlog/components/shared/AddIssueSprint.vue'
import Issue from '@/modules/backlog/components/shared/Issue.vue'
import { Sprint } from '../../../../../../backend/types/sprint/sprint'
import sprintService from '@/services/sprint/sprintService'

export default defineComponent({
  name: 'sprint-component',
  components: {
    CreateIssue,
    Issue
  },
  props: {
    sprint: {
      type: Object as PropType<Sprint>,
      required: true
    },
    activeSprint: {
      type: Boolean
    }
  },
  emits: [
    'sprint-started',
    'sprint-ended'
  ],
  setup(props, { emit }) {
    const sprintContainer = ref<null | HTMLElement>(null) // eslint-disable-line
    const containerHeight = ref('height: 55px;')
    const showIssues = ref(false)

    const totalIssues = computed(() => {
      if (props.sprint.issues) {
        return props.sprint.issues.length
      }
      return 0
    })

    const totalPoints = computed(() => {
      let count = 0
      if (props.sprint.issues) {
        for (const task of props.sprint.issues) {
          count + task.storyPoint
        }
      }
      return count
    })

    const toggleSprint = () => {
      showIssues.value = !showIssues.value
      if (showIssues.value) {
        containerHeight.value = `height: ${sprintContainer.value?.scrollHeight}px;`
      } else {
        containerHeight.value = 'height: 55px;'
      }
    }

    const startSprint = async () => {
      try {
        const res = await sprintService.startSprint(props.sprint._id)
        emit('sprint-started', res.data)
      } catch (error) {
        console.log(error)
      }
    }

    const endSprint = async () => {
      try {
        const res = await sprintService.endSprint(props.sprint._id)
        emit('sprint-ended', res.data)
      } catch (error) {
        console.log(error)
      }
    }

    return {
      sprintContainer,
      containerHeight,
      toggleSprint,
      showIssues,
      totalIssues,
      totalPoints,
      startSprint,
      endSprint
    }
  }
})
</script>

<style lang="scss" scoped>
@use '@/styles/tools/theme';

.active-sprint-container {
  margin: 15px 0;
  background: var(--color-bg-secondary);
  border-radius: 8px;
  overflow: hidden;
  height: 55px;
  transition: 250ms ease-in-out;
  padding: 0 15px;
}

.active-sprint {
  display: flex;
  min-height: 55px;
  align-items: stretch;
  padding: 0 20px;
  border-radius: 8px;
  background: var(--color-bg);
  margin: 0 -15px;

  &--open {
    @include theme.light {
      box-shadow: 0 2px 3px 0 var(--clr-background-400);
    }
  }

  > * {
    display: flex;
    align-items: center;
  }

  &__details {
    flex: 1 0 auto;
  }

  &__name {
    margin-right: 15px;
    font-weight: 600;
  }

  &__dates,
  &__total-issues,
  &__story-points {
    color: var(--clr-text-tertiary);
    font-size: 15px;
    margin-right: 15px;
  }

  &__issues {
    padding: 15px 0 0;
  }

  &__start {
    margin-left: auto;
    cursor: pointer;
  }
}

.chevron-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
  transition: 250ms ease-in-out;

  &--active {
    transform: rotate(90deg);
  }
}
</style>

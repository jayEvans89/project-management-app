
<template>
  <div class="issue">
    <div class="issue__type">Story</div>
    <div class="issue__col issue__col--left">
      <div class="issue__name-container">
        <router-link :to="link" class="issue__ticket-number">TEST-1234</router-link>
        <p class="issue__name">Test issue 1</p>
      </div>
      <div class="issue__label-container">
        <div class="label label--in-progress">In Progress</div>
        <div class="label">Frontend</div>
        <div class="label">Backend</div>
        <div class="label">Needs: Tests</div>
      </div>
    </div>
    <div class="issue__col issue__col--right">
      <div class="issue__progress">
        <p>0 of 5 tasks complete</p>
      </div>
      <div class="issue__assignee-list">
        <div class="issue__assignee">JE</div>
        <div class="issue__assignee">AB</div>
        <div class="issue__assignee">JS</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'Issue',
  setup() {
    const link = '/backlog'

    return {
      link
    }
  }
})
</script>

<style lang="scss">
@use '@/styles/tools/theme';

.issue {
  display: flex;
  min-height: 55px;
  align-items: stretch;
  padding: 0 20px;
  border-radius: 8px;
  background: var(--color-bg);
  margin-bottom: 15px;

  @include theme.light {
    box-shadow: 1px 2px 5px 0 var(--clr-background-400);
  }

  > * {
    display: flex;
    align-items: center;
  }

  &__type {
    border-right: 1px solid var(--color-bg-primary);
    margin-right: 10px;
    padding-right: 15px;
  }

  &__col {
    flex-direction: column;
    padding: 15px 0;

    &--left {
      flex: 1 0 auto;
      align-items: flex-start;
    }
  }

  &__name-container {
    display: flex;
    padding-bottom: 10px;
  }

  &__ticket-number {
    color: var(--clr-text-tertiary);
    margin-right: 10px;
    text-decoration: none;
    transition: 150ms ease-in-out;

    &:hover {
      text-decoration: underline;
    }
  }

  &__name {
    font-weight: 600;
  }

  &__label-container {
    display: flex;
    gap: 5px;
  }

  &__progress {
    padding-bottom: 5px;
  }

  &__assignee-list {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    gap: 5px;
  }

  &__assignee {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background: var(--color-bg-dark);
    color: var(--white);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }
}

.label {
  border: 1px solid var(--clr-background-400);
  border-radius: 1rem;
  padding: 1px 10px;
  font-size: 12px;

  &--in-progress {
    background: rgb(17, 194, 17);
    color: var(--color-bg);
    font-weight: 500;
  }
}
</style>

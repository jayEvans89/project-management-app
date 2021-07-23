
<template>
  <teleport to="body">
    <article :class="['modal', { 'modal--show': showModal }]" v-show="active">
      <h2 class="modal__title">
        <slot name="title"></slot>
      </h2>

      <slot :close="closeModal"></slot>
    </article>
    <div
      :class="['modal__backdrop', { 'modal__backdrop--show': showModal }]"
      v-show="active && backdrop"
      @click="backdropClose"
    ></div>
  </teleport>
</template>

<script lang="ts">
import { useVuexStore } from '@/core/store/store'
import { computed, defineComponent, onMounted, ref, watch } from '@vue/runtime-core'

export default defineComponent({
  name: 'modal',
  props: {
    modalId: {
      type: String,
      required: true
    },
    backdrop: {
      type: [String, Boolean],
      default: true
    },
    keyboard: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const store = useVuexStore()
    const active = computed(() => store.state.activeModals.includes(props.modalId))
    const showModal = ref(false)

    watch(active, (newVal) => {
      if (newVal) {
        setTimeout(() => {
          showModal.value = true
        })
      }
    })

    onMounted(() => {
      if (props.keyboard) {
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && active) {
            closeModal()
          }
        })
      }
    })

    const closeModal = () => {
      if (store.state.activeModals.includes(props.modalId)) {
        showModal.value = false
        setTimeout(() => {
          store.commit('removeModal', props.modalId)
        }, 250)
      }
    }

    const backdropClose = () => {
      if (props.backdrop !== 'static') {
        closeModal()
      }
    }

    return {
      active,
      closeModal,
      showModal,
      backdropClose
    }
  }
})
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: 250ms ease-in-out;
  background: var(--color-bg);
  z-index: 110;
  width: 50vw;
  padding: 15px;
  border-radius: 8px;

  &--show {
    opacity: 1;
  }

  &__title {
    text-align: center;
    font-size: 35px;
    line-height: 42px;
  }

  &__backdrop {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    transition: 250ms ease-in-out;
    z-index: 100;
    opacity: 0;

    &--show {
      opacity: 1;
    }
  }
}
</style>

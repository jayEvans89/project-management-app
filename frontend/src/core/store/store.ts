import { InjectionKey } from 'vue'
import { createStore, Store, useStore } from 'vuex'

const state: State = {
  activeModals: []
}

const mutations = {
  addModal(state: State, modalId: string) {
    if (!state.activeModals.includes(modalId)) {
      state.activeModals.push(modalId)
    }
  },
  removeModal(state: State, modalId: string) {
    if (state.activeModals.includes(modalId)) {
      const index = state.activeModals.indexOf(modalId)
      state.activeModals.splice(index, 1)
    }
  }
}

interface State {
  activeModals: Array<string>
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state,
  mutations
})

export function useVuexStore() {
  return useStore(key)
}

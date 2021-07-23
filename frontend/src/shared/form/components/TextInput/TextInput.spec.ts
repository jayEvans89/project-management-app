import { shallowMount } from '@vue/test-utils'
import TextInput from './TextInput.vue'

const wrapper = shallowMount(TextInput)
describe('is a Vue instance', () => {
  expect(wrapper.isVueInstance()).toBeTruthy()
})

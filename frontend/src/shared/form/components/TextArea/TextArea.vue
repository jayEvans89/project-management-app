
<template>
  <div class="form-group">
    <label class="form-group__label" :for="name">{{ label }}</label>
    <textarea
      :class="['form-group__input form-group__input--text-area', { 'form-group__input--error': errors[label] }]"
      :name="name"
      :id="name"
      v-model="input"
      :placeholder="placeholder"
      @keyup="validateInput(true)"
      @blur="validateInput()"
    ></textarea>
    <p class="form-group__error" v-show="errors[label]">{{ errors[label] }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/runtime-core'
import formValidation from '../../methods/formValidation'

export default defineComponent({
  name: 'text-area-input',
  props: {
    name: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String
    },
    required: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { emit }) {
    const input = ref(props.modelValue)

    const { validateTextInput, errors } = formValidation()

    const validateInput = (emitValue = false) => {
      if (props.required) {
        validateTextInput(props.label, input.value)
      }

      if (emitValue) {
        emit('update:modelValue', input.value)
      }
    }

    return {
      input,
      validateInput,
      errors
    }
  }
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/formGroup';
</style>

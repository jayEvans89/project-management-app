import { reactive } from 'vue';
import useValidators from './validators';

const errors: { [key: string]: string } = reactive({})

const { isEmpty, minLength } = useValidators()

export default function formValidation() {
  const validateTextInput = (name: string, value: string) => {
    errors[name] = !value ? isEmpty(name, value) : ''
  }

  return {
    errors,
    validateTextInput
  }
}

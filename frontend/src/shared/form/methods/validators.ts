
export default function useValidators() {
  const isEmpty = (name: string, value: string) => {
    return !value ? `The ${name} field is required` : ''
  }

  const minLength = (minLength: number, name: string, value: string) => {
    return value.length < minLength ? `The ${name} field needs to be a minimum length of ${minLength} characters` : ''
  }

  const isValidEmail = (name: string, value: string) => {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    return !regex.test(value) ? `Please enter a valid email address` : ''
  }

  return {
    isEmpty,
    minLength,
    isValidEmail
  }
}

import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASEURLAPI
console.log('axios base: ', baseUrl)
const http = axios.create({
  baseURL: baseUrl + '/api',
  headers: {
    'Content-type': 'application/json'
  }
})

// http.interceptors.response.use((res) => {
//   console.log('response interceptor: ', res.data)
//   if (res.data.token) {
//     store.dispatch('setToken', res.data.token)
//   }
//   return res
// })

export default http

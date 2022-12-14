import axios from 'axios'
import { store } from '@/store/index'

const ajax = axios.create({
  baseURL:
    process.env.VUE_APP_BASE_URL !== undefined
      ? process.env.VUE_APP_BASE_URL
      : 'http://localhost:3000/',
})

ajax.CancelToken = axios.CancelToken
ajax.isCancel = axios.isCancel
/*
 * The interceptor here ensures that we check for the token in local storage every time an ajax request is made
 */
ajax.interceptors.request.use(
  config => {
    const token = store.getters.token || JSON.parse(localStorage.getItem('token'))
    console.log(token)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log(token)
      config.headers.post['Content-Type'] = 'multipart/form-data'
    }

    return config
  },

  error => {
    return Promise.reject(error)
  },
)

export default ajax

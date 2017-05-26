import Axios from 'axios'
import Vue from 'vue'

const inBrowser = typeof window !== 'undefined'

const API_URL = inBrowser ? (process.env.API_URL_BROWSER || '') : (process.env.API_URL || 'http://localhost:3000')

// Try to get axios from components context, fallback to global Axios else
function getAxios() {
  return (this && this.$root && this.$root.$options.$axios) ? this.$root.$options.$axios : Axios
}

// Vue Component Mixins
Vue.mixin({
  computed: {
    $axios() {
      return getAxios.call(this)
    }
  },
  methods: {
    // opts
    $request(opts) {
      return getAxios.call(this).request(opts);
    },
    // url, opts
    $get(url, opts) {
      return getAxios.call(this).get(url, opts);
    },
    $delete(url, opts) {
      return getAxios.call(this).delete(url, opts);
    },
    $head(url, opts) {
      return getAxios.call(this).head(url, opts);
    },
    // url, data, opts
    $post(url, data, opts) {
      return getAxios.call(this).post(url, data, opts);
    },
    $put(url, data, opts) {
      return getAxios.call(this).put(url, data, opts);
    },
    $patch(url, data, opts) {
      return getAxios.call(this).patch(url, data, opts);
    }
  }
})

// Send credentials only to relative and API Backend requests
const withCredentials = config => {
  if (config.withCredentials === undefined) {
    if (!/^https?:\/\//i.test(config.url) || config.url.indexOf(process.env.API_URL_BROWSER) === 0 || config.url.indexOf(process.env.API_URL) === 0) {
      config.withCredentials = true
    }
  }
  return config
}

// Nuxt friendly http errors
const handleError = error => {
  // const response = error.response || {}
  // const config = error.config || {}
  // TODO: Add integration with vue notification and nuxt.$error
  // Avoid promise rejections in SSR context
  return inBrowser? Promise.reject(error) : error
}

// Set requests token
function setToken(token, type = 'Bearer') {
  if (!token) {
    delete this.defaults.headers.common.Authorization;
    return
  }
  this.defaults.headers.common.Authorization = (type ? type + ' ' : '') + token
}

export default ({app}) => {
  // Create new axios instance
  const axios = Axios.create({
    baseURL: API_URL + (process.env.API_PREFIX || '/api')
  })

  // Setup instance interceptors
  axios.interceptors.request.use(withCredentials);
  axios.interceptors.response.use(undefined, handleError);

  // Make accessible using {this,$nuxt}.$root.$options.$axios
  app.$axios = axios

  // setToken helper
  axios.setToken = setToken.bind(axios)
}

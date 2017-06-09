import Axios from 'axios'
import Vue from 'vue'

// Make `this.$axios` available
if (!Vue.prototype.hasOwnProperty('$axios')) {
  // Add mixin to add this._axios
  Vue.mixin({
    beforeCreate () {
      // Check if `axios` has been defined in App
      // Then fallback to $root.$axios
      // Finally use global instance of Axios
      this._axios = this.$options.axios || this.$root.$axios || Axios
    }
  })
  // Add this.$axios instance
  Object.defineProperty(Vue.prototype, '$axios', {
    get () {
      return this._axios
    }
  })
}

// Vue Component Mixins
Vue.mixin({
  methods: {
    // opts
    $request (opts) {
      return this.$axios.request(opts);
    },
    // url, opts
    $get (url, opts) {
      return this.$axios.get(url, opts);
    },
    $delete (url, opts) {
      return this.$axios.delete(url, opts);
    },
    $head (url, opts) {
      return this.$axios.head(url, opts);
    },
    // url, data, opts
    $post (url, data, opts) {
      return this.$axios.post(url, data, opts);
    },
    $put (url, data, opts) {
      return this.$axios.put(url, data, opts);
    },
    $patch (url, data, opts) {
      return this.$axios.patch(url, data, opts);
    }
  }
})

// Set requests token
function setToken (token, type = 'Bearer') {
  if (!token) {
    delete this.defaults.headers.common.Authorization;
    return
  }
  this.defaults.headers.common.Authorization = (type ? type + ' ' : '') + token
}

export default (ctx) => {
  const { app, store, redirect, req } = ctx

  // Create new axios instance
  const baseURL = process.env.browser
    ? (process.env.API_URL_BROWSER || '<%= options.API_URL_BROWSER %>')
    : (process.env.API_URL || '<%= options.API_URL %>')

  const axios = Axios.create({
    baseURL,
    <% if(options.AXIOS_SSR_HEADERS) { %>headers: (req && request.headers) ? request.headers : {} <% } %>
  })
  <% if(options.AXIOS_CREDENTIALS) { %>
  // Send credentials only to relative and API Backend requests
  axios.interceptors.request.use(config => {
    if (config.withCredentials === undefined) {
      if (!/^https?:\/\//i.test(config.url) || config.url.indexOf(baseURL) === 0) {
        config.withCredentials = true
      }
    }
    return config
  });
  <% } %>
  // Error handler
  axios.interceptors.response.use(undefined, (error) => {
    if (error.response && error.response.status === 401) {
      return redirect('/login')
    }
    console.log(error)
    return Promise.reject(error)
  });

  // Make accessible using app.$axios
  app.$axios = axios

  // Plugin $axios into store instance
  store.$axios = axios
  ctx.$axios = axios

  // token helper for authentication
  axios.setToken = setToken.bind(axios)
}

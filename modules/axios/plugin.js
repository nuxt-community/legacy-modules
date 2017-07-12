import Axios from 'axios'
import Vue from 'vue'

const axiosPlugin = {
  install() {
    if(Vue.__nuxt_axios_installed__) {
      return
    }
    Vue.__nuxt_axios_installed__ = true

    if (!Vue.prototype.hasOwnProperty('$axios')) {
      Object.defineProperty(Vue.prototype, '$axios', {
        get () {
          return this.$root.$options.$axios
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
  }
}

Vue.use(axiosPlugin)

// Sets a common header
function setHeader (name, value, scopes = 'common') {
  if(!Array.isArray(scopes)) {
    scopes = [scopes]
  }
  scopes.forEach(scope => {
    if (!value) {
      delete this.defaults.headers[scope][name];
      return
    }
    this.defaults.headers[scope][name] = value
  })
}
// Set requests token
function setToken (token, type, scopes = 'common') {
    value = !token ? null : (type ? type + ' ' : '') + token
    setHeader('Authorization', value, scopes)
}

// Nuxt friendly error handler
function errorHandler(error) {
  if (error.response) {
    // Error from backend (non 2xx status code)
    if (error.response.status === 401) {
      return this.redirect('/login')
    }
    error.statusCode = error.statusCode || parseInt(error.response.status) || 500
    error.message = error.message || error.response.statusText || (error.statusCode + ' (Internal Server Error)')
  } else if (error.request) {
    // Error while making request
    error.statusCode = error.statusCode || 500
    error.message = error.message || 'request error'
  } else {
    // Something happened in setting up the request that triggered an Error
    error.statusCode = 500
    error.message = error.message || 'axios error'
  }
  // Display error page on unhandled promises
  if(process.browser) {
    return Promise.reject(error)
  } else {
    // Don't throw unhandled promises in SSR context
    return this.app._nuxt.error.call({$options: this.app}, {
      message: error.message,
      statusCode: error.statusCode
    })
  }
}

function debug(level, messages) {
  if (!(console[level] instanceof Function)) {
    level = 'info'
    messages = arguments
  } else {
    level = arguments[0]
    messages = Array.prototype.slice.call(arguments, 1)
  }

  if (!messages.length) {
    console[level].call(null, '[@nuxtjs/axios] <empty debug message>')
  } else {
    for (var i = 0; i < messages.length; i++) {
      console[level].call(null, messages[i])
    }
  }
}

export default (ctx) => {
  const { app, store, req } = ctx

  // Create new axios instance
  const baseURL = process.browser
    ? (process.env.API_URL_BROWSER || '<%= options.browserBaseURL %>')
    : (process.env.API_URL || '<%= options.baseURL %>')

  const axios = Axios.create({
    baseURL,
    <% if(options.proxyHeaders) { %>headers: (req && req.headers) ? req.headers : {} <% } %>
  })
  <% if(options.credentials) { %>
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

  <% if(options.debug) { %>
  axios.interceptors.request.use(config => {
    debug('[@nuxtjs/axios] Request:', config)
    return config
  }, error => {
    debug('error', '[@nuxtjs/axios] Error:', error)
    return Promise.reject(error)
  });
  axios.interceptors.response.use(config => {
    debug('[@nuxtjs/axios] Response:', config)
    return config
  }, error => {
    debug('error', '[@nuxtjs/axios] Error:', error)
    return Promise.reject(error)
  });
  <% } %>

  // Error handler
  axios.interceptors.response.use(undefined, errorHandler.bind(ctx));

  // Make accessible using *.$axios
  app.$axios = axios
  ctx.$axios = axios
  if(store) {
    store.$axios = axios
  }

  // token helper for authentication
  axios.setToken = setToken.bind(axios)
}

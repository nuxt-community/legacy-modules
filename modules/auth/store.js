/**
 * User store
 * Keeps logged-in user's state
 */

import Cookie from 'cookie'
import Cookies from 'js-cookie'
import {setToken, $get, $post, $delete} from './axios' // Axios is a peer plugin dependency

const inBrowser = typeof window !== 'undefined'
const SSR = global.__VUE_SSR_CONTEXT__

function AuthStore (opts) {
  const self = this
  opts = opts || {}

    // ----------------------------------------
    // Default State
    // ----------------------------------------
  this.defaultState = {
    user: Object.assign({roles: [], scope: [], name: null}, opts.default_user),
    loggedIn: false,
    token: null
  }

    // ----------------------------------------
    // State
    // ----------------------------------------
  this.state = Object.assign({}, self.defaultState)

    // ----------------------------------------
    // Getters
    // ----------------------------------------
  this.getters = {}

    // ----------------------------------------
    // Mutations
    // ----------------------------------------
  this.mutations = {

    setUser (state, user) {
            // Fill user with defaults data
      state.user = Object.assign({}, self.defaultState.user, user)

            // Set actual loggedIn status
      state.loggedIn = Boolean(user)
    },

    setToken (state, token) {
      state.token = token

            // Setup axios
      setToken(token)

            // Store token in cookies
      if (inBrowser) {
        if (!token) {
          return Cookies.remove('token', opts.tokenCookie)
        }
        Cookies.set('token', token, opts.tokenCookie)
      }
    }

  }

    // ----------------------------------------
    // Actions
    // ----------------------------------------
  this.actions = {

    loadToken (ctx) {
            // Try to extract token from cookies
      const cookieStr = inBrowser ? document.cookie : SSR.req.headers.cookie
      const cookies = Cookie.parse(cookieStr || '') || {}
      const token = cookies.token

      ctx.commit('setToken', token)
    },

    fetch (ctx) {
            // Load user token
      ctx.dispatch('loadToken')

            // No token
      if (!ctx.state.token) {
        return
      }

            // Get user profile
      return $get('/auth/user').then(userData => {
        ctx.commit('setUser', userData.user)
      }).catch(() => {
        return ctx.dispatch('logout')
      })
    },

    login (ctx, {fields, endpoint = '/auth/login', session = false}) {
      return $post(endpoint, fields).then(tokenData => {
                // Session tokens
        if (session) {
          opts.tokenCookie = null
        }
        ctx.commit('setToken', tokenData.token || tokenData.id_token)
        return ctx.dispatch('fetch')
      })
    },

    logout (ctx, {endpoint = '/auth/logout', appendToken = false}) {
            // Unload user profile
      ctx.commit('setUser', null)

            // Create logout endpoint
      const endpoint = endpoint + appendToken ? `/${ctx.state.token}` : ''

            // Server side logout
      return $delete(endpoint).then(() => {
                // Unset token
        ctx.commit('setToken', null)
      }).catch(() => {
                // Unset token
        ctx.commit('setToken', null)
      })
    }
  }
}

export default AuthStore

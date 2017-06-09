const chalk = require('chalk')
const path = require('path')
const { URL } = require('url')

const port = process.env.PORT || process.env.npm_package_config_nuxt_port || 3000
const host = process.env.HOST || process.env.npm_package_config_nuxt_host || 'localhost'

module.exports = function nuxtAxios (options) {
  // Get options
  const getOpt = (key, default_val) => {
    return process.env[key] || options[key] || options[key.toLowerCase()] || this.options.env[key] || default_val
  }

  const API_URL = getOpt('API_URL', `http://${host}:${port}/api`)
  const url = new URL(API_URL)
  const sameHost = url.host === `${host}:${port}`

  const API_URL_BROWSER = getOpt('API_URL_BROWSER', sameHost ? url.pathname : API_URL)

  // Commit new values to all sources
  const setOpt = (key, val, env = true) => {
    process.env[key] = val
    options[key] = val
    if (env) {
      this.options.env[key] = val
    }
  }
  setOpt('API_URL', API_URL)
  setOpt('API_URL_BROWSER', API_URL_BROWSER)

  // Other options
  const ensureOpt = (key, default_val) => {
    setOpt(key, getOpt(key, default_val), false)
  }
  ensureOpt('AXIOS_CREDENTIALS', true)
  ensureOpt('AXIOS_SSR_HEADERS', true)

  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options
  })

  /* eslint-disable no-console */
  console.log(`[AXIOS] Base URL: ${chalk.green(API_URL)} | Browser: ${chalk.green(API_URL_BROWSER)}`)
}

module.exports.meta = require('./package.json')

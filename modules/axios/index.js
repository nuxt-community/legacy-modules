const chalk = require('chalk')
const path = require('path')
const { URL } = require('whatwg-url')

const isUrl = url => url.indexOf('http') === 0 || url.indexOf('//') === 0

const port = process.env.PORT || process.env.npm_package_config_nuxt_port || 3000
const host = process.env.HOST || process.env.npm_package_config_nuxt_host || 'localhost'

module.exports = function nuxtAxios (moduleOptions) {
  // Apply defaults
  const defaults = {
    baseURL: `http://${host}:${port}/api`,
    browserBaseURL: null,
    credentials: true,
    proxyHeaders: true
  }

  const options = Object.assign({}, defaults, this.options.axios, moduleOptions)

  // Override env
  if (process.env.API_URL) {
    options.baseURL = process.env.API_URL
  }

  if (process.env.API_URL_BROWSER) {
    options.browserBaseURL = process.env.API_URL_BROWSER
  }

  options.baseURL = new URL(options.baseURL, `http://${host}:${port}`)

  if (!options.browserBaseURL) {
    const sameHost = options.baseURL.host === `${host}:${port}`
    options.browserBaseURL = sameHost ? options.baseURL.pathname : options.baseURL
  }

  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options
  })

  /* eslint-disable no-console */
  console.log(`[AXIOS] Base URL: ${chalk.green(options.baseURL)} , Browser: ${chalk.green(options.browserBaseURL)}`)
}

module.exports.meta = require('./package.json')

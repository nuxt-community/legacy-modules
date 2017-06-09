const chalk = require('chalk')
const path = require('path')
const { URL } = require('url')

const port = process.env.PORT || process.env.npm_package_config_nuxt_port || 3000
const host = process.env.HOST || process.env.npm_package_config_nuxt_host || 'localhost'

module.exports = function nuxtAxios (moduleOptions) {
  // Apply defaults
  const options = Object.assign({
    baseURL: process.env.API_URL || `http://${host}:${port}/api`,
    browserBaseURL: null,
    credentials: true,
    proxyHeaders: true
  }, this.options.axios, moduleOptions)

  if (process.env.API_URL) {
    options.baseURL = process.env.API_URL
  }

  if (process.env.API_URL_BROWSER) {
    options.browserBaseURL = process.env.API_URL_BROWSER
  }

  if (!options.api_url_browser) {
    const url = new URL(options.url)
    const sameHost = url.host === `${host}:${port}`
    options.api_url_browser = sameHost ? url.pathname : options.url
  }

  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options
  })

  /* eslint-disable no-console */
  console.log(`[AXIOS] Base URL: ${chalk.green(API_URL)} | Browser: ${chalk.green(API_URL_BROWSER)}`)
}

module.exports.meta = require('./package.json')

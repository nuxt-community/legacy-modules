const chalk = require('chalk')
const path = require('path')

module.exports = function nuxtAxios(options) {
  // Register plugin
  this.addPlugin({src: path.resolve(__dirname, 'plugin.js'), options})

  // API URL
  const API_URL = options.API_URL || process.env.API_URL || 'http://localhost:3000'
  process.env.API_URL = API_URL

  // API URL for Browser
  const API_URL_BROWSER = options.API_URL_BROWSER || process.env.API_URL_BROWSER || API_URL
  process.env.API_URL_BROWSER = API_URL_BROWSER

  // Common API Prefix
  const API_PREFIX = options.API_PREFIX || process.env.API_PREFIX || '/api'
  process.env.API_PREFIX = API_PREFIX

  // Don't add env to production bundles
  if (process.env.NODE_ENV !== 'production') {
    this.options.env.API_URL = API_URL
    this.options.env.API_URL_BROWSER = API_URL_BROWSER
  }

  printURL('API URL', API_URL, API_PREFIX)

  if (API_URL_BROWSER !== API_URL) {
    printURL('API URL (Browser)', API_URL_BROWSER, API_PREFIX)
  }
}

function printURL(title, url, prefix) {
  /* eslint-disable no-console */
  console.log(chalk.bgMagenta.black(` ${title} `) + chalk.magenta(` ${url}${prefix}`) + '\r\n')
}

module.exports.meta = require('./package.json')

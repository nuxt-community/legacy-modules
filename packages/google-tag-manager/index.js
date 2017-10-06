const _ = require('lodash')
const path = require('path')
const defaults = {
  id: null,
  layer: 'dataLayer',
  env: {
    gtm_auth: null,
    gtm_preview: null,
    gtm_cookies_win: 'x'
  }
}

module.exports = function nuxtTagManager(options) {
  let currentOptions = _.defaultsDeep(options,defaults)

  // Don't include when no GTM id is given OR on dev mode
  if(!currentOptions.id || (this.options.dev && process.env.NODE_ENV !== 'production')) {
    return
  }

  // Build the <script> URL
  let queryParams    = currentOptions.env.gtm_auth && currentOptions.env.gtm_preview ? currentOptions.env : {}
      queryParams.id = currentOptions.id
  if (currentOptions.layer)
      queryParams.l  = currentOptions.layer

  let queryString =_.reduce(queryParams, function(result, value, key) {
		return (!_.isNull(value) && !_.isUndefined(value)) ? (result += key + '=' + value + '&') : result;
	}, '').slice(0, -1);

  // Add google tag manager script to head
  this.options.head.script.push({
    src: (currentOptions.scriptURL || '//www.googletagmanager.com/gtm.js') + '?' + queryString,
    async: true
  })

  // Register plugin
  this.addPlugin({src: path.resolve(__dirname, 'plugin.js'), ssr: false, options: currentOptions})
}

module.exports.meta = require('./package.json')

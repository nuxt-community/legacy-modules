const fs = require('fs-extra')
const path = require('path')
const defaults = {
  id: null,
  layer: null,
  env: {
    gtm_auth: null,
    gtm_preview: null,
    gtm_cookies_win: 'x'
  }
}

module.exports = function nuxtTagManager(options) {
  let options = _.defaultsDeep({}, defaults, options)

  // Don't include when no GTM id is given OR on dev mode
  if(!options.id || (this.options.dev && process.env.NODE_ENV !== 'production')) {
    return
  }

  // Build the <script> URL
  let queryParams    = options.env.gtm_auth && options.env.gtm_preview ? options.env : {}
      queryParams.id = options.id
  if (options.layer)
      queryParams.l  = options.layer

  let queryString =_.reduce(queryParams, function(result, value, key) {
		return (!_.isNull(value) && !_.isUndefined(value)) ? (result += key + '=' + value + '&') : result;
	}, '').slice(0, -1);

  // Add google tag manager script to head
  this.options.head.script.push({
    src: (options.scriptURL || '//www.googletagmanager.com/gtm.js') + '?' + queryString,
    async: true
  })

  // Register plugin
  this.addPlugin({src: path.resolve(__dirname, 'plugin.js'), ssr: false, options})
}

module.exports.meta = require('./package.json')

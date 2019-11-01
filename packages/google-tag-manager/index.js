const path = require('path')
const { defaultsDeep } = require('lodash')

module.exports = async function nuxtTagManager(_options) {
  const options = defaultsDeep({}, _options, this.options['google-tag-manager'], {
    id: null,
    layer: 'dataLayer',
    pageTracking: false,
    pageViewEventName: 'nuxtRoute',
    respectDoNotTrack: false,
    dev: true,
    query: {},
    scriptURL: '//www.googletagmanager.com/gtm.js',
    noscriptURL: '//www.googletagmanager.com/ns.html',
    env: {} // env is supported for backward compability and is alias of query
  })

  // Don't include when run in dev mode unless dev: true is configured
  if (this.options.dev && !options.dev) {
    return
  }

  // Don't include when no GTM id is given
  if (!options.id) {
    return
  }

  if (typeof (options.id) === 'function') {
    options.id = await options.id()
  }

  // Build the <script> URL
  const queryParams = Object.assign({}, options.env, options.query)

  queryParams.id = options.id

  if (options.layer) {
    queryParams.l = options.layer
  }

  const queryString = Object.keys(queryParams)
    .filter(key => queryParams[key] !== null && queryParams[key] !== undefined)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
    .join('&')

  // sanitization before to avoid errors like "cannot push to undefined"
  this.options.head = this.options.head || {}
  this.options.head.noscript = this.options.head.noscript || []
  this.options.head.script = this.options.head.script || []

  // Add google tag manager script to head
  this.options.head.script.push({
    src: (options.scriptURL || '//www.googletagmanager.com/gtm.js') + '?' + queryString,
    async: true
  })

  // prepend google tag manager <noscript> fallback to <body>
  this.options.head.noscript.push({
    hid: 'gtm-noscript',
    innerHTML: `<iframe src="${(options.noscriptURL || '//www.googletagmanager.com/ns.html')}?${queryString}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
    pbody: true
  })

  // disables sanitazion for gtm noscript as we're using .innerHTML
  this.options.head.__dangerouslyDisableSanitizersByTagID = this.options.head.__dangerouslyDisableSanitizersByTagID || {};
  this.options.head.__dangerouslyDisableSanitizersByTagID['gtm-noscript'] = ['innerHTML']

  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'google-tag-manager.js',
    ssr: false,
    options
  })
}

module.exports.meta = require('./package.json')

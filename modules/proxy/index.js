const Proxy = require('http-proxy-middleware')

// https://github.com/chimurai/http-proxy-middleware

module.exports = function nuxtProxy (options) {
  if (!this.options.proxy) {
    // No proxy defined
    return
  }

  // Defaults
  const defaults = Object.assign({
    // Needed for virtual hosted sites
    changeOrigin: true,
    // Proxy webSockets
    ws: true
  }, options)

  delete defaults.src

  // Normalize options.proxy to middleware arguments
  const applyDefaults = o => Object.assign({}, defaults, o)
  const normalizeTarget = o => typeof o === 'object' ? o : { target: o }

  const proxy = []
  if (Array.isArray(this.options.proxy)) {
    // Array mode
    this.options.proxy.forEach(p => {
      if (Array.isArray(p)) {
        proxy.push([p[0], applyDefaults(p[1])])
      } else {
        proxy.push([p, applyDefaults()])
      }
    })
  } else {
    // Object mode
    Object.keys(this.options.proxy).forEach(context => {
      proxy.push([context, applyDefaults(normalizeTarget(this.options.proxy[context]))])
    })
  }

  // Register middleware
  proxy.forEach(args => {
    this.options.serverMiddleware.push(Proxy.apply(undefined, args))
  })
}

module.exports.meta = require('./package.json')

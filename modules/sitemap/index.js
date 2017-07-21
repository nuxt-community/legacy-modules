const { Minimatch } = require('minimatch')
const sm = require('sitemap')
const isHTTPS = require('is-https')
const { uniq } = require('lodash')
const path = require('path')
const fs = require('fs-extra')
const AsyncCache = require('async-cache')
const pify = require('pify')
const { hostname } = require('os')

// Defaults
const defaults = {
  path: '/sitemap.xml',
  hostname: null,
  generate: false,
  exclude: [],
  routes: [],
  cacheTime: 1000 * 60 * 15
}

module.exports = function nuxtSitemap (moduleOptions) {
  const options = Object.assign({}, defaults, this.options.sitemap, moduleOptions)

  // Static Routes
  const staticRoutesPromise = new Promise((resolve, reject) => {
    this.extendRoutes(routes => {
      // Map to path
      routes = routes.map(r => r.path)

      // Apply excludes
      options.exclude.forEach(pattern => {
        const minimatch = new Minimatch(pattern)
        minimatch.negate = true
        routes = routes.filter(route => minimatch.match(route))
      })
      resolve(routes)
    })
  })

  // Create a cache for routes
  const cache = new AsyncCache({
    maxAge: options.cacheTime,
    load (_, callback) {
      Promise.all([staticRoutesPromise, promisifyRoute(options.routes)])
        .then(sources => Array.prototype.concat.apply([], sources))
        .then(routes => uniq(routes))
        .then(routes => {
          callback(null, routes)
        })
        .catch(err => {
          callback(err)
        })
    }
  })
  cache.get = pify(cache.get)

  // sitemap.xml is written to static dir on generate mode
  const xmlGeneratePath = path.resolve(this.options.srcDir, 'static' + options.path)

  if (options.generate) {
    // Generate static sitemap.xml
    cache.get('routes')
      .then(routes => createSitemap(options, routes))
      .then(sitemap => sitemap.toXML())
      .then(xml => fs.writeFile(xmlGeneratePath, xml))
  }

  // Ensure no generated file exists
  fs.removeSync(xmlGeneratePath)

  // Add server middleware
  this.addServerMiddleware({
    path: options.path,
    handler (req, res, next) {
      cache.get('routes')
        .then(routes => createSitemap(options, routes, req))
        .then(sitemap => sitemap.toXML())
        .then(xml => {
          res.setHeader('Content-Type', 'application/xml')
          res.end(xml)
        }).catch(err => {
          next(err)
        })
    }
  })
}

// Initialize a fresh sitemap instance
function createSitemap (options, routes, req) {
  const sitemapConfig = {}

  // Set sitemap hostname
  sitemapConfig.hostname = options.hostname ||
    (req && `${isHTTPS(req) ? 'https' : 'http'}://${req.headers.host}`) || `http://${hostname()}`

  // Set urls and ensure they are unique
  sitemapConfig.urls = uniq(routes)

  // Set cacheTime
  sitemapConfig.cacheTime = options.cacheTime || 0

  // Create promisified instance and return
  const sitemap = sm.createSitemap(sitemapConfig)
  sitemap.toXML = pify(sitemap.toXML)

  return sitemap
}

// Borrowed from nuxt/common/utils 
function promisifyRoute (fn) {
  // If routes is an array
  if (Array.isArray(fn)) {
    return Promise.resolve(fn)
  }
  // If routes is a function expecting a callback
  if (fn.length === 1) {
    return new Promise((resolve, reject) => {
      fn(function (err, routeParams) {
        if (err) {
          reject(err)
        }
        resolve(routeParams)
      })
    })
  }
  let promise = fn()
  if (!promise || (!(promise instanceof Promise) && (typeof promise.then !== 'function'))) {
    promise = Promise.resolve(promise)
  }
  return promise
}

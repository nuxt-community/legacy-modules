const {resolve} = require('path')
const pathToRegexp = require('path-to-regexp')

module.exports = function (moduleOptions) {
  const defaults = {
    languages: ['en']
  }
  moduleOptions = Object.assign({}, defaults, moduleOptions)

  // Add middleware
  this.addTemplate({
    src: resolve(__dirname, './templates/middleware.js'),
    fileName: 'i18n-routes.middleware.js',
    options: moduleOptions
  })
  this.options.router.middleware.push('i18n-routes')

  // Add plugin
  this.addPlugin({
    src: resolve(__dirname, './templates/plugin.js'),
    fileName: 'i18n-routes.plugin.js',
    options: moduleOptions
  })

  // Add routes for router
  this.extendRoutes(function (routes) {
    routes.sort((a, b) => {
      return b['path'].length - a['path'].length
    })
    routes.forEach(route => {
      const {path} = route
      route.path = `/:lang(\\w{2})?${path}`
    })
    return routes
  })

  // Add routes to generate
  function flatRoutes (router, path = '', routes = []) {
    router.forEach((r) => {
      if (r.children) {
        flatRoutes(r.children, path + r.path + '/', routes)
      } else {
        routes.push((r.path === '' && path[path.length - 1] === '/' ? path.slice(0, -1) : path) + r.path)
      }
    })
    return routes
  }
  this.nuxt.plugin('generator', generator => {
    generator.plugin('generateRoutes', ({generateRoutes}) => {
      let routes = flatRoutes(this.options.router.routes)
      routes = routes.filter((route) => {
        let tokens = pathToRegexp.parse(route)
        let params = tokens.filter((token) => typeof token === 'object')
        return params.length === 1 && params[0].name === 'lang'
      })
      routes.forEach((route) => {
        let toPath = pathToRegexp.compile(route)
        let languageParamList = moduleOptions.languages.concat(null)
        languageParamList.forEach((languageParam) => {
          generateRoutes.push(toPath({lang: languageParam}))
        })
      })
    })
  })
}

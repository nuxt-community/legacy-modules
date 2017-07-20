const sm = require('sitemap')

module.exports = function nuxtSitemap (options) {
  // Defaults
  const defaults = {
    path: '/sitemap.xml',
    hostname: null,
    routes: []
  }

  // Combine sources
  const sitemap = Object.assign({}, defaults, this.options.sitemap, options)

  const nuxt = this.nuxt

  // Server Middleware
  this.addServerMiddleware({
    path: sitemap.path,
    async handler (req, res, next) {

      let sitemapConfig = {}

      // Set sitemap hostname
      if (!sitemap.hostname) {
        const protocol = req.headers['x-forwarded-proto'] || (req.connection.encrypted ? 'https' : 'http')
        sitemapConfig.hostname = `${protocol}://${req.headers.host}/`
      } else {
        sitemapConfig.hostname = sitemap.hostname
      }

      // Set sitemap urls
      const generateRoutes = await nuxt.utils.promisifyRoute(sitemap.routes)
      sitemapConfig.urls = nuxt.routes.concat(generateRoutes)

      // Create & Stringify sitemap
      const sitemapSource = sm.createSitemap(sitemapConfig).toString()

      res.setHeader('Content-Type', 'application/xml')
      res.end(sitemapSource)
    }
  })
}

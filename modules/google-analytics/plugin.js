// Setup google analytics
window['GoogleAnalyticsObject'] = 'ga';
window['ga'] = window['ga'] || function () {
  (window['ga'].q = window['ga'].q || []).push(arguments)
}
window['ga'].l = 1 * new Date();

export default ({app: {router}}) => {
  if (!window['ga']) {
    console.warn('google analytics is not available')
    return
  }

  // Set the current page
  ga('create', '<%= options.ua %>', 'auto')

  // Every time the route changes (fired on initialization too)
  router.afterEach((to, from) => {
    // We tell Google Analytic to add a page view
    var settings = to.meta.analytics                  //TODO to.meta is undefined for the initial request
    if (settings && typeof settings === 'object') {
      for (var key in settings) {
        if (settings.hasOwnProperty(key)) {
          ga('set', key, settings[key])
        }
      }
    }
    ga('set', 'page', to.fullPath)
    ga('send', 'pageview')
  })
}

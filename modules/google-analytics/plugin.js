// Setup google analytics
window['GoogleAnalyticsObject'] = 'ga'
window['ga'] = window['ga'] || function () {
  (window['ga'].q = window['ga'].q || []).push(arguments)
}
window['ga'].l = 1 * new Date()

export default ({ app: { router } }) => {
  if (!window['ga']) {
    console.warn('google analytics is not available')
    return
  }

  // Set the current page
  ga('create', '<%= options.ua %>', 'auto')

  // Every time the route changes (fired on initialization too)
  router.afterEach((to, from) => {
    // Set page settings
    const settings = Object.assign({}, routeOption('analytics', from, to), to.meta && to.meta.analytics)
    Object.keys(settings).forEach(key => {
      ga('set', key, settings[key])
    })

    // We tell Google Analytics to add a page view
    ga('set', 'page', to.fullPath)
    ga('send', 'pageview')
  })
}

function routeOption(key, from, to) {
  let matched = to.matched[0]
  let matchedComponent = matched.components.default
  return componentOption(matchedComponent, key, from, to)
}

function componentOption(component, key, ...args) {
  if (!component || !component.options || !component.options[key]) {
    return {}
  }
  let option = component.options[key]
  if (typeof option === 'function') {
    option = option(...args)
  }
  return option
}

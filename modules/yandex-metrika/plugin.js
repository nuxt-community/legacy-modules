try {
  (w[c] = w[c] || []).push(function() {
    window['yaCounter<%= options.id %>'] = new Ya.Metrika(<%= JSON.stringify(options) %>);
  })(document, window, 'yandex_metrika_callbacks');
} catch (e) {}

export default ({app: {router}}) => {
  if (!window['Ya'] || window['yaCounter<%= options.id %>']) {
    console.warn('Yandex metrika is not available')
    return
  }

  router.afterEach((to, from) => {
    // We tell Yandex Metrika to add a page view
    window['yaCounter<%= options.id %>'].hit(to.fullPath)
  })
}

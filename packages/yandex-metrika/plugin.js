export default ({ app: { router } }) => {
  let ready = false

  router.onReady(() => {
    // Mark when the router has completed the initial navigation.
    ready = true
  })

  function create() {
    ym(<%= options.id %>, "init", <%= JSON.stringify(options) %>);
    router.afterEach((to, from) => {
      if (!ready) {
        // Don't record a duplicate hit for the initial navigation.
        return
      }
      ym(<%= options.id %>, 'hit', to.fullPath, {
        referer: from.fullPath
        // TODO: pass title: <new page title>
        // This will need special handling because router.afterEach is called *before* DOM is updated.
      })
    })
  }

  if (window.ym === undefined) {
    // Yandex.Metrika has not loaded yet, create ym method.
    (function (m, i, k, a) {
      m[i] = m[i] || function () {
        (m[i].a = m[i].a || []).push(arguments)
      }
      m[i].l = 1 * new Date()
    })
    (window, "ym")
  }
  create()
}

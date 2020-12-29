export default ({ app: { router }, $config }) => {

  const { useRuntimeConfig, metrikaUrl, ...options } = <%= JSON.stringify(options) %>
  if ($config && useRuntimeConfig) {
    Object.assign(options, $config[useRuntimeConfig])
  }
  const { id, ...metrikaOptions } = options

  let ready = false
  const basePath = (router.options.base || '/').replace(/\/$/, '')

  router.onReady(() => {
    // Mark when the router has completed the initial navigation.
    ready = true
  })

  function create() {

    if (!ready) {
      // Don't record a duplicate hit for the initial navigation.
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", metrikaUrl, "ym")

      ym(id, "init", metrikaOptions)
    }
    router.afterEach((to, from) => {
      ym(id, 'hit', basePath + to.fullPath, {
        referer: basePath + from.fullPath
        // TODO: pass title: <new page title>
        // This will need special handling because router.afterEach is called *before* DOM is updated.
      })
    })
  }

  if (window.ym === undefined) {
    create()
  }

}


// Google Tag Manager Class to be injected
class GTM {
  constructor(ctx, options) {
    this.ctx = ctx
    this.options = options
  }
  init() {

    // insert scripts on client side if it not preseted on server side
    if (!this.options.presetScriptsOnServerSide) {
      const headScriptId = 'google-tag-manager-script'
      const bodyScriptId = 'google-tag-manager-noscript'

      let headScript = document.querySelector(`script#${headScriptId}`)
      let bodyScript = document.querySelector(`script#${bodyScriptId}`)

      if (!headScript && !bodyScript) {
        headScript = document.createElement('script')
        headScript.id = headScriptId
        headScript.src = this.options.head.script[0].src
        headScript.async = this.options.head.script[0].async

        bodyScript = document.createElement('noscript')
        bodyScript.id = bodyScriptId
        bodyScript.innerHTML = this.options.head.noscript[0].innerHTML

        document.querySelector('head').append(headScript)
        document.querySelector('body').append(bodyScript)
      }
    }

    window[this.options.layer] = window[this.options.layer] || []

    this.pushEvent({
      event: 'gtm.js',
      'gtm.start': new Date().getTime()
    })

    if (this.options.pageTracking && (!this.options.respectDoNotTrack || !this.hasDNT())) {
      this.initPageTracking()
    }
  }

  initPageTracking() {
    this.ctx.app.router.afterEach((to, from) => {
      setTimeout(() => {
        window[this.options.layer]
          .push(to.gtm || {
            routeName: to.name,
            pageType: 'PageView',
            pageUrl: to.fullPath,
            event: this.options.pageViewEventName
          })
      }, 0)
    })
  }

  pushEvent(obj) {
    try {
      if (!window || !window[this.options.layer]) {
        throw new Error('missing GTM dataLayer')
      }
      if (typeof obj !== 'object') {
        throw new Error('event should be an object')
      }
      if (!obj.hasOwnProperty('event')) {
        throw new Error('missing event property')
      }
      window[this.options.layer].push(obj)
    } catch (err) {
      console.error('[ERROR] [GTM]', err)
    }
  }

  hasDNT() {
    return (
      window.doNotTrack === '1' ||
      navigator.doNotTrack === 'yes' ||
      navigator.doNotTrack === '1' ||
      navigator.msDoNotTrack === '1' ||
      (
        window.external &&
        window.external.msTrackingProtectionEnabled &&
        window.external.msTrackingProtectionEnabled()
      )
    )
  }
}

export default function(ctx, inject) {
  const options = <%= JSON.stringify(options) %>
  const autoInit = options.autoInitOnClientSide

  // Create a new Auth instance
  const $gtm = new GTM(ctx, options)
  inject('gtm', $gtm)

  if (!options.autoInitOnClientSide) {
    return
  }

  $gtm.init()
}

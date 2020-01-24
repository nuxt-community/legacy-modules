
// Google Tag Manager Class to be injected
class GTM {
  constructor(ctx, options) {
    this.ctx = ctx
    this.options = options
  }
  init() {

    if (!this.options.presetScriptsOnServerSide) {
      this.ctx.app.head.script.push(this.options.head.script[0])
      this.ctx.app.head.noscript.push(this.options.head.noscript[0])
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
        window[this.options.layer].push(to.gtm || { event: this.options.pageViewEventName, pageType: 'PageView', pageUrl: to.fullPath, routeName: to.name })
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
    return window.doNotTrack === '1' ||
      navigator.doNotTrack === 'yes' ||
      navigator.doNotTrack === '1' ||
      navigator.msDoNotTrack === '1' ||
      (window.external && window.external.msTrackingProtectionEnabled && window.external.msTrackingProtectionEnabled())
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

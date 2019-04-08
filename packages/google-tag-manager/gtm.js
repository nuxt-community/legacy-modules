export default class Gtm {
  constructor(ctx, options) {
    this.ctx = ctx
    this.options = options
  }
  init() {
    window[this.options.layer] = window[this.options.layer] || []

    this.pushEvent({
      event: 'gtm.js', 'gtm.start': new Date().getTime()
    })
    if (!this.options.respectDoNotTrack && !this.hasDNT() && this.options.pageTracking) {
      this.initPageTracking()
    }
  }

  initPageTracking() {
    this.ctx.app.router.afterEach((to, from) => {
      setTimeout(() => {
        window[this.options.layer].push(to.gtm || { event: 'nuxtRoute', pageType: 'PageView', pageUrl: to.fullPath, routeName: to.name })
      }, 0)
    })
  }

  pushEvent(obj) {
    try {
      if (!process.browser) {
        throw 'this should run in the browser'
      }
      if (!window || !window[this.options.layer]) {
        throw 'missing GTM dataLayer'
      }
      if (typeof obj !== 'object') {
        throw 'event should be an object'
      }
      if (!obj.hasOwnProperty('event')) {
        throw 'missing event property'
      }
      window[this.options.layer].push(obj)
    } catch (err) {
      if (process.browser) {
        console.error('[ERROR] [GTM]', err)
      }
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

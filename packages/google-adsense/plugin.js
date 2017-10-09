import Vue from 'vue'

// Custom AdSense ad Component
const adsbygoogle = {
  render (h) {
    return h(
      'ins',
      {
        'class': ['adsbygoogle'],
        style: this.adStyle,
        attrs: {
          'data-ad-client': this.adClient,
          'data-ad-slot': this.adSlot || null,
          'data-ad-format': this.adFormat,
          'data-ad-region': this.show ? this.adRegion() : null,
          'data-adtest': <%= options.test ? '\'on\'' : 'null' %>,
          'data-adsbygoogle-status': this.show ? null : ''
        },
        domProps: {
          innerHTML: this.show ? '' : ' '
        },
        key: Math.random()
      }
    )
  },
  props: {
    adClient: {
      type: String,
      default: '<%= options.id %>'
    },
    adSlot: {
      type: String
    },
    adFormat: {
      type: String,
      default: 'auto'
    },
    adStyle: {
      type: Object,
      default () {
        return {
          display: 'block'
        }
      }
    }
  },
  data () {
    return {
      show: true
    }
  },
  mounted () {
    this.showAd()
  },
  watch: {
    '$route' (to, from) {
      if (to.fullPath !== from.fullPath) {
        this.updateAd()
      }
    }
  },
  methods: {
    adRegion () {
      return 'page-' + Math.random()
    },
    updateAd () {
      if (this.isServer) {
        return
      }
      // Reset the INS element
      this.show = false
      // Show new ad on nextTick
      this.$nextTick(this.showAd)
    },
    showAd () {
      this.show = true
      this.$nextTick(() => {
        // Once ad container (<ins>) DOM has (re-)rendered, requesst a new advert
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      })
    }
  }
}

// Register our ad component under the desired tag name
Vue.component('<%= options.tag %>', adsbygoogle)

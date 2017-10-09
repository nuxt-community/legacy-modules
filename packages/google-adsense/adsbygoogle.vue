<template>
  <component :is="tag">
    <ins v-if="show"
         class="adsbygoogle"
         ref="ins"
         :data-ad-client="adClient"
         :data-ad-slot="adSlot"
         :data-ad-format="adFormat"
         :data-ad-region="adRegion"
         :data-adtest="adTest ? 'on' : null"
         :style="adStyle" />
  </component>
</template>

<style>
  /* add a border to test ads (as tehy usually appear blank) */
  ins.adsbygoogle[data-adtest] {
    margin: -1px;
    border: 1px solid red;
  }
</style>

<script>
export default {
  props: {
    adClient: {
      type: String,
      default: null
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
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  data () {
    return {
      show: true,
      adRegion: 'page-0'
    }
  },
  mounted () {
    this.showAd()
  },
  watch: {
    '$route' (to, from) {
      if (!this.isServer && to.fullPath !== from.fullPath) {
        this.updateAd()
      }
    }
  },
  methods: {
    updateAd () {
      if (this.isServer) {
        return
      }
      // Take the ad out of document (which removed teh inner content
      this.$refs['ins'].innerHTML = ''
      this.show = false
      // Show new ad on nextTick
      this.$nextTick(this.showAd)
    },
    showAd () {
      // Set the regions ID to a new random value.
      // https://github.com/leonardteo/google-ads-test-angularjs
      this.adRegion = `page-${Math.random()}`
      this.show = true
      this.$nextTick(() => {
        // Once ad container (<ins>) DOM has rendered, requesst a new advert
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      })
    }
  }
}
</script>

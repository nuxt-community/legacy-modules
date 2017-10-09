<template>
  <ins v-if"show" class="adsbygoogle"
       :data-ad-client="adClient"
       :data-ad-slot="adSlot"
       :data-ad-format="adFormat"
       :data-ad-region="`page-${Math.random()}`"
       :style="adStyle" />
</template>

<script>
export default {
  props: {
    adClient: {
      type: String,
      default: null,
      required: true
    },
    adSlot: {
      type: String,
      required: true
    },
    adFormat: {
      type: String,
      default: 'auto'
    },
    adStyle: {
      type: Object,
      default () { return { display: 'block' } }
    }
  },
  data () {
    return {
      show: true
    }
  },
  mounted() {
    this.showAd()
  },
  watch: {
    '$route' (to, from) {
      if (!this.isServer && to.fullPath !== from.fullPath ) {
         this.updateAd()
      }
    }
  },
  methods: {
    updateAd () {
      if (this.isServer) {
        return
      }
      this.show = false
      this.$nextTick(() => {
        this.show = true
        this.nextTick(() => this.showAd)
      })
    },
    showAd() {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    }
  }
}
</script>

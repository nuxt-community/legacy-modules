import Vue from 'vue'
import Headroom from 'headroom.js'

Vue.directive('headroom', {
  inserted: function (el) {
    new Headroom(el).init()
  }
})

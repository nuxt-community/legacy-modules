import Vue from 'vue'
import Toasted from 'vue-toasted'

const opts = <%= serialize(options) %>
var globals = []
if(opts.hasOwnProperty('register')) {
  globals = opts.register
  delete opts.register
}

Vue.use(Toasted, opts)

globals.forEach(global => {
  Vue.toasted.register(global.name, global.message, global.options)
})

export default function (ctx, inject) {
  inject('toast', Vue.toasted)
}

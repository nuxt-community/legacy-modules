import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, <%= JSON.stringify(options) %>)

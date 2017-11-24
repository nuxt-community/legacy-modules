import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify, <%= JSON.stringify(options.vuetifyOptions, null, 2) %>)

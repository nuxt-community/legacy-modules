import Vue from 'vue'
<% if (options.treeShake) { %>
import Vuetify from 'vuetify/lib';
<% } else { %>
import Vuetify from 'vuetify';
<% } %>

Vue.use(Vuetify, <%= JSON.stringify(options.vuetifyOptions, null, 2) %>)

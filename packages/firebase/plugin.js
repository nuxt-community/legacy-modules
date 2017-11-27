import Vue from 'vue'
import Firebase from 'firebase'
import 'firebase/firestore'

const firebasePlugin = {
  install () {
    if (Vue.__nuxt_firebase_installed__) {
      return
    }
    Vue.__nuxt_firebase_installed__ = true

    if (!Vue.prototype.$firebase) {
      Vue.prototype.$firebase = Firebase.initializeApp({
        apiKey: process.env.apiKey || '<%= options.apiKey %>',
        authDomain: process.env.authDomain || '<%= options.authDomain %>',
        databaseURL: process.env.databaseURL || '<%= options.databaseURL %>',
        projectId: process.env.projectId || '<%= options.projeectId %>',
        storageBucket: process.env.storageBucket || '<%= options.storageBucket %>'
      })
    }
  }

}

Vue.use(firebasePlugin)

export default (ctx) => {
  const { app, store } = ctx

  app.$firebase = Vue.prototype.$firebase
  ctx.$firebase = Vue.prototype.$firebase
  if (store) {
    store.$firebase = Vue.prototype.$firebase
  }
}

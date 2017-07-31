import Vue from 'vue'
import VuePouch from 'vue-pouch'
import PouchDB from 'pouchdb'
import Find from 'pouchdb-find'
import LiveFind from 'pouchdb-live-find'

PouchDB.plugin(Find)
PouchDB.plugin(LiveFind)
Vue.use(VuePouch, {
  pouch: PouchDB
})

export default (ctx) => {

}

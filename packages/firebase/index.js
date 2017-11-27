const path = require('path')

module.exports = function nuxtFirebase (moduleOptions) {
  let options = Object.assign({
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    projectId: process.env.projectId
  }, this.options.firebase, moduleOptions)

  if (process.env.API_KEY) {
    options.apiKey = process.env.API_KEY
  }

  if (process.env.AUTH_DOMAIN) {
    options.authDomain = process.env.AUTH_DOMAIN
  }

  if (process.env.DATABASE_URL) {
    options.databaseURL = process.env.DATABASE_URL
  }

  if (process.env.STORAGE_BUCKET) {
    options.storageBucket = process.env.STORAGE_BUCKET
  }

  if (process.env.MESSAGING_SENDER_ID) {
    options.messagingSenderId = process.env.MESSAGING_SENDER_ID
  }

  if (process.env.PROJECT_ID) {
    options.projectId = process.env.PROJECT_ID
  }

  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options
  })
}

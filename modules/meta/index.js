module.exports = (nuxt) => {
  nuxt.head.meta.push({charset: 'utf-8'})
  nuxt.head.meta.push({name: 'viewport', content: 'width=device-width, initial-scale=1'})
}

module.exports.meta = {
  name: 'nuxt-meta'
}

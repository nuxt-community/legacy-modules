function warn() {
  console.warn('[nuxt] please use individual nuxt module packages')
  console.warn('https://github.com/nuxt/modules')
}

module.exports = function wrap(a, b) {
  warn()
  return b || a || {};
}

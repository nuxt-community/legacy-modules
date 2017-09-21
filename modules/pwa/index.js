const sequence = (tasks, fn) => tasks.reduce((promise, task) => promise.then(() => fn(task)), Promise.resolve())

module.exports = function nuxtPWA (options) {
  const modules = ['icon', 'manifest', 'meta', 'workbox'].filter(module => options[module] !== false)

  return sequence(modules, module => {
    return this.requireModule({
      src: `@nuxtjs/${module}`,
      options: options[module]
    })
  })
}

module.exports.meta = require('./package.json')

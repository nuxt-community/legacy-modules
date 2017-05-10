const path = require('path')
const fs = require('fs-extra')
const _ = require('lodash')

function wrap(modules, nuxt) {
  if (!nuxt) {
    // If modules is passed directly into nuxt config
    nuxt = modules
    modules = nuxt.modules
  }

  // Fill defaults
  _.defaultsDeep(nuxt, {
    build: {
      postcss: [],
      vendor: [],
      plugins: []
    },
    css: [],
    modules: [],
    plugins: [],
    head: {
      meta: [],
      link: [],
      style: [],
      script: []
    },
    env: {}
  })

  // Explicit rootDir and srcDir
  nuxt.rootDir = nuxt.rootDir || path.resolve('')
  nuxt.srcDir = nuxt.srcDir || nuxt.rootDir

  // Cleanup & ensure .nuxt/modules dir exits
  nuxt.nuxtmodulesDir = path.resolve(nuxt.rootDir, '.nuxt-modules', 'modules')
  fs.ensureDirSync(nuxt.nuxtmodulesDir)

  // Install modules
  modules.forEach(module => {
    try {
      install.call(this, nuxt, module)
    } catch (e) {
      /* eslint-disable no-console */
      console.error(module, e)
    }
  })

  // Ensure uniques after modules install
  nuxt.plugins = _.uniq(nuxt.plugins)
  nuxt.build.vendor = _.uniq(nuxt.build.vendor)

  return nuxt
}

function install(nuxt, module) {
  if (!module) {
    return
  }

  // Extract options
  const options = module.options || {}
  module = module.src || module

  // Resolve module
  try {
    if (typeof module === 'string') {
      if (module.indexOf('~') === 0) {
        module = path.resolve(__dirname, 'modules', module.substr(1))
      }
      module = require(module)
    }
  } catch (e) {
    console.error('Unable to resolve module', module)
    console.error(e)
    return
  }

  // Extract meta
  let meta = module.meta

  if (!meta || !meta.name) {
    console.error('Invalid module or missing meta', module)
    return
  }

  // Vendors
  if (meta.vendor) {
    nuxt.build.vendor = nuxt.build.vendor.concat(meta.vendor)
  }

  [].concat(meta.plugin || []).forEach(plugin => {
    // Dynamic plugin
    if (plugin instanceof Function) {
      plugin = plugin.call(this, nuxt, options)
    }

    if (!plugin) {
      console.warn('[Nuxt]', meta.name, 'Plugin disabled', plugin)
      return
    }

    const ssr = Boolean(plugin.ssr)
    const copyOnly = Boolean(plugin.copyOnly)
    const src = plugin.src || plugin

    if (!src || typeof src !== 'string') {
      console.warn('[Nuxt]', meta.name, 'Ignoring plugin', plugin)
      return
    }

    // Copy plugin to project
    const fileName = meta.name.replace(/[ -]/g, '_').toLowerCase() + '_' + path.basename(src)
    const dst = path.resolve(nuxt.nuxtmodulesDir, fileName)
    fs.copySync(src, dst)

    // Add to nuxt plugins
    if (!copyOnly) {
      nuxt.plugins.push({src: dst, ssr})
    }
  })

  // Allows extending nuxt config
  const extend = module.extend || module

  if (extend instanceof Function) {
    extend.call(this, nuxt, options)
  }

  // Allows customizing Webpack config
  if (module.extendBuild instanceof Function) {
    const _extend = nuxt.build.extend
    nuxt.build.extend = function () {
      module.extendBuild.apply(this, arguments.concat(options))
      if (_extend) {
        _extend.apply(this, arguments.concat(options))
      }
    }
  }
}

module.exports = wrap

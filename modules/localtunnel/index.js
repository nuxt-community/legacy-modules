const localtunnel = require('localtunnel')

// https://github.com/localtunnel/localtunnel

module.exports = function nuxtLocaltunnel (options) {
  // Only include on dev mode
  if (!this.options.dev) {
    return
  }

  const port = process.env.PORT || process.env.npm_package_config_nuxt_port || 3000
  const host = process.env.HOST || process.env.npm_package_config_nuxt_host || 'localhost'

  const opts = {
    subdomain: this.options.subdomain || process.env.npm_package_name,
    local_host: host
  }

  const tunnel = localtunnel(port, opts, (err, tunnel) => {
    if (err) {
      console.error('[nuxt][local tunnel] ' + err);
      return
    }
    console.log('> Open ' + tunnel.url + ' for external access')
  });
}

module.exports.meta = require('./package.json')

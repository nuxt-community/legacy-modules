const localtunnel = require('localtunnel')
const { hostname } = require('os')

const port = process.env.PORT || process.env.npm_package_config_nuxt_port || 3000
let host = process.env.HOST || process.env.npm_package_config_nuxt_host || 'localhost'
if (host === '0.0.0.0') {
  host = hostname()
}

// https://github.com/localtunnel/localtunnel

module.exports = function nuxtLocaltunnel (options) {
  // Only include on dev mode
  if (!this.options.dev) {
    return
  }

  const opts = {
    subdomain: options.subdomain || process.env.npm_package_name,
    local_host: host,
    host: options.remote_host || process.env.localtunnel_host || 'https://localtunnel.me'
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

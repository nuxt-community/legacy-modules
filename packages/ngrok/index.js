const chalk = require('chalk')
const ngrok = require('ngrok')
const { hostname } = require('os')

const port = process.env.PORT || process.env.npm_package_config_nuxt_port || 3000
let host = process.env.HOST || process.env.npm_package_config_nuxt_host || 'localhost'
if (host === '0.0.0.0') {
  host = hostname()
}

// https://github.com/bubenshchykov/ngrok

module.exports = async function nuxtNgrok(options) {
  // Only include on dev mode
  if (!this.options.dev) {
    return
  }

  let connectedUrl = null

  let opts = {
    proto: 'http', // http|tcp|tls
    addr: `${host}:${port}`, // port or network address
  }

  opts = Object.assign({}, opts, this.options.ngrok, options)

  this.nuxt.hook('build:done', async () => {
    if (!connectedUrl) {
      try {
        const url = await ngrok.connect(opts)
        connectedUrl = url
        return console.log(chalk.bgGreen.black(' OPEN ') + chalk.green(` ${connectedUrl} for external access`))
      } catch (err) {
        return console.error('[nuxt][ngrok] ' + err)
      }
    }
    connectedUrl &&
      console.log(chalk.bgGreen.black(' OPEN ') + chalk.green(` ${connectedUrl} for external access`))
  })

  this.nuxt.hook('close', () => {
    ngrok.disconnect()
    connectedUrl &&
      console.log(chalk.bgGreen.black(' CLOSED NGROK '))
  })
}

module.exports.meta = require('./package.json')

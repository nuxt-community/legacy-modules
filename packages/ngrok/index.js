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

  if (this.options.ngrok && Object.keys(this.options.ngrok).length) {
    opts = Object.assign({}, opts, this.options.ngrok)
  }

  this.nuxt.plugin('build', async builder => {
    builder.plugin('compile', async ({ compiler }) => {
      compiler.plugin('done', async lll => {
        if (!connectedUrl) {
          ngrok.connect(opts, (err, url) => {
            if (err) return console.error('[nuxt][ngrock] ' + err)
            connectedUrl = url
            console.log('\n' + chalk.bgGreen.black(' OPEN ') + chalk.green(` ${connectedUrl} for external access\n`))
          })
        }

        connectedUrl &&
          console.log('\n' + chalk.bgGreen.black(' OPEN ') + chalk.green(` ${connectedUrl} for external access\n`))
      })
    })
  })

  this.nuxt.plugin('close', async nuxt => {
    ngrok.disconnect()
    connectedUrl && console.log('\n' + chalk.bgGreen.black(' CLOSED NGROK '))
  })
}

module.exports.meta = require('./package.json')

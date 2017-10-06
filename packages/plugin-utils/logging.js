if (process.env.NODE_ENV === 'production') {
  const log = () => () => null
  const error = () => () => null

  module.exports = { log, error }
} else {
  const Debug = require('debug')

  let instances = {}

  const log = (plugin_name) => {
    if (!instances['log_' + plugin_name]) {
      const log = Debug('plugin:' + plugin_name)
      log.enabled = true
      log.color = 5
      instances['log_' + plugin_name] = log
    }
    return instances['log_' + plugin_name]
  }

  const error = (plugin_name) => {
    if (!instances['err_' + plugin_name]) {
      const error = Debug('plugin:' + plugin_name)
      error.enabled = true
      error.color = 1
      instances['err_' + plugin_name] = error
    }
    return instances['err_' + plugin_name]
  }

  module.exports = { log, error }
}

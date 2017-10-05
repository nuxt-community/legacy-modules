const { log, error } = require('./logging.js')

module.exports = {
  log,
  error
}

module.exports.meta = require('./package.json')

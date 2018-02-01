module.exports = function PythonModule (moduleOptions) {
  this.nuxt.options.extensions.push('py')

  this.extendBuild((config, { isClient, isServer }) => {
    config.devtool = '#cheap-module-eval-source-map'
    config.resolve.extensions.push('.py')
    config.module.rules.push({
      test: /\.py$/,
      loader: 'py-loader',
      options: {
        compiler: 'pj'
      }
    })
  })
}

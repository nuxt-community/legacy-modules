import Gtm from './gtm'

export default function(ctx, inject) {
  const options = <%= JSON.stringify(options) %>

  // Create a new Auth instance
  const $gtm = new Gtm(ctx, options)
  inject('gtm', $gtm)

  $gtm.init()
}

window.onNuxtReady(() => {
  if (!'serviceWorker' in navigator) {
    log('serviceWorker is not supported')
    return
  }

  log('Installing')
  navigator.serviceWorker.register('<%= options.swURL %>',{
    scope: '<%= options.swScope %>'
  });
})

function log(msg) {
  console.log('[nuxt][workbox] ', msg) // eslint-disable-line no-console
}

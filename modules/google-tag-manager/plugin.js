// Include Google Tag Manager Script
(function(window, document, tag, layer, id, env, el, m, dataLayer, envLayer){
  window[layer] = window[layer]||[];
  window[layer].push({
    event:       'gtm.js',
    'gtm.start': new Date().getTime()
  });
  el = document.createElement(tag);
  m = document.getElementsByTagName(tag)[0];
  dataLayer = layer !== 'dataLayer' ? '&l=' + layer : '';
  envLayer = env.length ? '&gtm_auth='+env.auth+'&gtm_preview='+env.id+'&gtm_cookies_win=x' : '';
  el.async = true;
  el.src = '//www.googletagmanager.com/gtm.js?id=' + id + dataLayer + envLayer;
  m.parentNode.insertBefore(el, m);
})(window, document, 'script', options.layer, options.id, options.env || {})

// Every time the route changes (fired on initialization too)
export default ({app: {router}}) => {
  router.afterEach((to, from) => {
    window['<%= options.layer ?>'].push(to.gtm || {pageType: 'PageView', pageUrl: to.fullPath})
  })
}
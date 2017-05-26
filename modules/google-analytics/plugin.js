// Include Google Analytics Script
(function (window, document, tag, src, ga, el, m) {
  window['GoogleAnalyticsObject'] = ga;
  window[ga] = window[ga] || function () {
    (window[ga].q = window[ga].q || []).push(arguments)
  }
  window[ga].l = 1 * new Date();
  el = document.createElement(tag);
  m = document.getElementsByTagName(tag)[0];
  el.async = 1;
  el.src = src;
  m.parentNode.insertBefore(el, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

export default ({app: {router}}) => {
  // Set the current page
  ga('create', '<%= options.ua %>', 'auto')

  // Every time the route changes (fired on initialization too)
  router.afterEach((to, from) => {
    // We tell Google Analytic to add a page view
    ga('set', 'page', to.fullPath)
    ga('send', 'pageview')
  })
}

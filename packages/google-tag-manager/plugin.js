// Include Google Tag Manager Script
window['<%= options.layer %>'] = window['<%= options.layer %>'] || [];
window['<%= options.layer %>'].push({
  event: 'gtm.js', 'gtm.start': new Date().getTime()
});

// Every time the route changes (fired on initialization too)
export default ({app: {router}}) => {
  router.afterEach((to, from) => {
    window['<%= options.layer %>'].push(to.gtm || {pageType: 'PageView', pageUrl: to.fullPath})
  })
}

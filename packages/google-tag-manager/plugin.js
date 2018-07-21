// Include Google Tag Manager Script
window['<%= options.layer %>'] = window['<%= options.layer %>'] || [];
window['<%= options.layer %>'].push({
  event: 'gtm.js', 'gtm.start': new Date().getTime()
});

<% if (options.pageTracking) { %>
// Every time the route changes (fired on initialization too)
export default ({ app: { router } }) => {
    router.afterEach((to, from) => {
      window['<%= options.layer %>'].push(to.gtm || { event: 'nuxtRoute', pageType: 'PageView', pageUrl: to.fullPath, routeName: to.name })
    })
  }
<% } %>

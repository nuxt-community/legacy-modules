// Include Google Tag Manager Script
function setup() {
  window['<%= options.layer %>'] = window['<%= options.layer %>'] || [];
  window['<%= options.layer %>'].push({
    event: 'gtm.js', 'gtm.start': new Date().getTime()
  });
}

const shouldCheckDNT = <%= options.respectDoNotTrack %>
// Detect Do Not Track settings
const hasDNT = shouldCheckDNT && (window.doNotTrack === '1'
  || navigator.doNotTrack === 'yes'
  || navigator.doNotTrack === '1'
  || navigator.msDoNotTrack === '1'
  || (window.external && window.external.msTrackingProtectionEnabled && window.external.msTrackingProtectionEnabled())
)

if (!hasDNT) setup()

<% if (options.pageTracking) { %>
// Every time the route changes (fired on initialization too)
export default ({ app: { router } }) => {
    if (!hasDNT) {
      router.afterEach((to, from) => {
        setTimeout(() => {
          window['<%= options.layer %>'].push(to.gtm || { event: 'nuxtRoute', pageType: 'PageView', pageUrl: to.fullPath, routeName: to.name })
        }, 0)
      })
    }
  }
<% } %>

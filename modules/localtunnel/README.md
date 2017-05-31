# Local Tunnel
> localtunnel exposes your localhost to the world for easy testing and sharing!
No need to mess with DNS or deploy just to have others test out your changes. [learn more](https://github.com/localtunnel/localtunnel)
  
**Features**

- Secure https for all tunnels
- Show your work to anyone
- Use the API to test web hooks
- Test your UI in cloud browsers

**Note** This module is only enabled on dev mode.
  
## Setup
- Add `@nuxtjs/localtunnel` dependency using yarn or npm to your project
- Add `@nuxtjs/localtunnel` module to `nuxt.config.js`:
```js
  modules: [
   '@nuxtjs/localtunnel'
  ]
````

on next start, you will something like this in terminal that can be shared with the world:

> Open http://127.0.0.1:3000
> Open https://starter.localtunnel.me for external access


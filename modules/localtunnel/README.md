# Local Tunnel
[![npm](https://img.shields.io/npm/dt/@nuxtjs/localtunnel.svg?style=flat-square)](https://www.npmjs.com/package/@nuxtjs/localtunnel)
[![npm (scoped with tag)](https://img.shields.io/npm/v/@nuxtjs/localtunnel/latest.svg?style=flat-square)](https://www.npmjs.com/package/@nuxtjs/localtunnel)

> localtunnel exposes your localhost to the world for easy testing and sharing!
No need to mess with DNS or deploy just to have others test out your changes. [learn more](https://github.com/localtunnel/localtunnel)
  
**Features**

- Secure https for all tunnels
- Show your work to anyone
- Use the API to test web hooks
- Test your UI in cloud browsers

**Note** This module is only enabled in dev mode.
  
## Setup
- Add `@nuxtjs/localtunnel` dependency using yarn or npm to your project
- Add `@nuxtjs/localtunnel` to `modules` section of `nuxt.config.js`
```js
  modules: [
    // Simple usage
    '@nuxtjs/localtunnel',
    
    // With options
    [ '@nuxtjs/localtunnel', { subdomain: 'foobar' } ],
  ]
````

## Usage
(For more information see [here](https://github.com/localtunnel/localtunnel))

On next dev, you will something like this in terminal that can be shared with the world:
```
> Open http://127.0.0.1:3000
> Open https://starter.localtunnel.me for external access
```

## Options

### `subdomain`
- Default: `process.env.npm_package_name`

Request a named subdomain on the localtunnel server (default is random characters)

### `local_host`
- Default: nuxt listening ip (auto detected)

Proxy to a hostname other than localhost

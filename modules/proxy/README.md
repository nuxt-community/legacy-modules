# Proxy
> The one-liner node.js http-proxy middleware solution for Nuxt.js using
 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)

**Notice: As a limitation currently this module only works with nuxt internal server. For express,... you may have to 
manually register `nuxt.serverMiddleware`. (Will be fixed soon)**

## Features
- Path rewrites
- Host based router (useful for staging/test)
- Logs / Proxy Events
- WebSockets
- Auth / Cookie
- ... and more! (see [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) docs)

## Setup
- Add `@nuxtjs/proxy` dependency using yarn or npm to your project
- Add `@nuxtjs/proxy` module to `nuxt.config.js`:
```js
modules: [
 '@nuxtjs/proxy'
]
````
- [optional] You can also provide default options to all proxy targets:
  - By default `changeOrigin` and `ws` options are already enabled.
  - See [http-proxy-options](https://github.com/chimurai/http-proxy-middleware#http-proxy-options)
    for available options.
```js
modules: [
 {
   src: '@nuxtjs/proxy',
   pathRewrite: {
     '^/api' : '/api/v1' // Rewrite path
   }
 }
]
````
- Define as many as proxy middleware you want in `proxy` section of `nuxt.config.js`: (see section below)

## Proxy Options
You can provide options using either object or array form.

Array mode (You can use magic [shorthands](https://github.com/chimurai/http-proxy-middleware#shorthand))
```js
  proxy: [
    // Proxies /foo to http://example.com/foo
    'http://example.com/foo',
  
    // Proxies /api/books/*/**.json to http://example.com:8000
    'http://example.com:8000/api/books/*/**.json',

    // You can also pass more options
    [ 'http://example.com/foo', { ws: false } ]
  ]
```

Object mode (Keys are [context](https://github.com/chimurai/http-proxy-middleware#context-matching))
```js
  proxy: {
    // Simple proxy
    '/api': 'http://example.com',
    
    // With options
    '/api2': { target: 'http://example.com', ws: false }
  }
```

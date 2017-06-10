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
- Add `@nuxtjs/proxy` to `modules` section of `nuxt.config.js`
```js
{
  modules: [
    // Simple usage
   '@nuxtjs/proxy',
   
   // With options
   [ '@nuxtjs/proxy', { pathRewrite: { '^/api' : '/api/v1' } } ],
  ]
}
````
- Define as many as proxy middleware you want in `proxy` section of  `nuxt.config.js` (See [proxy](#proxy) section below)

## Options
- `changeOrigin` and `ws` options are enabled by default.

[optional] You can provide default options to all proxy targets by passing options to module options.

## `proxy`
You can provide proxy config using either object or array.

### Array mode
You can use magic [shorthands](https://github.com/chimurai/http-proxy-middleware#shorthand)

```js
{
  proxy: [
    // Proxies /foo to http://example.com/foo
    'http://example.com/foo',
    
    // Proxies /api/books/*/**.json to http://example.com:8000
    'http://example.com:8000/api/books/*/**.json',
    
    // You can also pass more options
    [ 'http://example.com/foo', { ws: false } ]
  ]
}
```

### Object mode
Keys are [context](https://github.com/chimurai/http-proxy-middleware#context-matching)

```js
{
  proxy: {
      // Simple proxy
      '/api': 'http://example.com',
      
      // With options
      '/api2': { target: 'http://example.com', ws: false }
  }
}
```

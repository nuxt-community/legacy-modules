# Google Tag Manager
[![npm](https://img.shields.io/npm/dt/@nuxtjs/google-tag-manager.svg?style=flat-square)](https://www.npmjs.com/package/@nuxtjs/google-tag-manager)
[![npm (scoped with tag)](https://img.shields.io/npm/v/@nuxtjs/google-tag-manager/latest.svg?style=flat-square)](https://www.npmjs.com/package/@nuxtjs/google-tag-manager)

> Add Google Tag Manager (GTM) to your nuxt.js application.
This plugins automatically sends first page and route change events to GTM.


## Setup
- Add `@nuxtjs/google-tag-manager` dependency using yarn or npm to your project
- Add `@nuxtjs/google-tag-manager` to `modules` section of `nuxt.config.js`
```js
  modules: [
   ['@nuxtjs/google-tag-manager', { id: 'GTM-XXXXXXX' }],
  ]
```

## Options

### `id`
- Required
- Can be String in form of `GTM-XXXXXXX`
- Can be function returning Promise or String:
```js
// Returns Promise
id: () => {
  return axios.get('http://example.com/')
    .then(({ data }) => {
      return data.gtm_id
    })
}

// Returns String
const code = '1234567'
id: () => {
  return 'GTM-' + code
}
```

### All options
```js
{
  id: 'GTM-XXXXXXX',
  layer: 'dataLayer',
  pageTracking: false,
  pageViewEventName: 'nuxtRoute',
  respectDoNotTrack: false,
  dev: true, // set to false to disable in dev mode
  query: {
    // query params...
    gtm_auth:        '...',
    gtm_preview:     '...',
    gtm_cookies_win: '...'
  },
  scriptDefer: false,
  scriptURL: '//example.com',
  noscriptURL: '//example.com',
  autoInitOnClientSide: true,
  presetScriptsOnServerSide: true
}
```
### GTM initialisation
You can optionally set `autoInitOnClientSide` and `presetScriptsOnServerSide`. It can be helpful for full blocking Google Tag Manager before direct user selection. For example GDPR realisation or other.

| Option name                 | Default value | Description                                                                                                                    |
|-----------------------------|---------------|--------------------------------------------------------------------------------------------------------------------------------|
| `autoInitOnClientSide`      | true          | Send GTM event automatically. Also it is inserting GTM script and noscript elements, if there aren't presetted on server side. |
| `presetScriptsOnServerSide` | true          | It is inserting GTM script on server side. It can be blocked with value `false`.                                               |

To initialize GTM programmatically you can use:
```js
this.$gtm.init()
```

### Router Integration

You can optionally set `pageTracking` option to `true` to track page views.

This is disabled by default to prevent double events when using alongside with Google Analytics so take care before enabling this option.

The default event name for page views is "nuxtRoute", you can change it by setting the `pageViewEventName` option.

## Usage

### Pushing events

You can push events into the configured `layer`:
```js
this.$gtm.pushEvent({ event: 'myEvent', ...someAttributes })
```

### Pushing data

You can push data into the configured `layer`:
```js
this.$gtm.pushData({ 'key': 'value', 'other-key': 'other-value'})
```

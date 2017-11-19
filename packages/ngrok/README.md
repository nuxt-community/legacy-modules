> ngrok exposes your localhost to the world for easy testing and sharing!
No need to mess with DNS or deploy just to have others test out your changes. [learn more](https://github.com/bubenshchykov/ngrok)

**Features**

- Secure https for all tunnels
- Show your work to anyone
- Use the API to test web hooks
- Test your UI in cloud browsers

**Note** This module is only enabled in dev mode.

## Setup
- Add `@nuxtjs/ngrok` dependency using yarn or npm to your project
- Add `@nuxtjs/ngrok` to `modules` section of `nuxt.config.js`
```js
  modules: [
    // Simple usage
    '@nuxtjs/ngrok',

    // With options
    ['@nuxtjs/ngrok', { subdomain: 'foobar' }],
  ]
````

## Usage
(For more information see [here](https://github.com/bubenshchykov/ngrok))

On next dev, you will something like this in terminal that can be shared with the world:
```
> Open http://127.0.0.1:3000
> Open https://starter.ngrok.me for external access
```

## Options

### `proto`
  - Default: `http`
  - `http` | `tcp` | `tls`

### `addr`
  - Default: `process.env.npm_package_name`

### `auth`
  - http basic authentication for tunnel

### `subdomain`
  - reserved tunnel name `https://EXAMPLE.ngrok.io`

### `authtoken`
  - your authtoken from ngrok.com

### `region`
  - Default: `us`
  - one of ngrok regions (`us`, `eu`, `au`, `ap`)

### `configPath`
  - `~/git/project/ngrok.yml`
  - custom path for ngrok config file

<hr/>

<small>Inspired by `@nuxtjs/localtunnel`

# Axios
This plugin is a wrapper around [axios](https://github.com/mzabriskie/axios). 

- Sets default base URL.
- Handles all HTTP exceptions and prevents server side unhandled promise exceptions.
- Injects `$get`,`$post`,... into vue context instances so requests can be done easily.
- Exposes `setToken` function to `$axios` so we can easily and globally set authentication tokens.
- Throws *nuxt-friendly* exceptions.
- Automatically enables `withCredentials` when requesting to default base URL.

## Setup
- Add `@nuxtjs/axios` dependency using yarn or npm to your project
- Add `@nuxtjs/axios` module to `nuxt.config.js`:
```js
  modules: [
    '@nuxtjs/axios'
  ]
````

## Usage

### Inside `asyncData`
```js
async asyncData({app: {$axios}}) {
  const {data} = await $axios.get('http://icanhazip.com')
  return {
    ip: data
  }
}
```

### Inside component methods
```js
async mounted() {
  const {data} = await this.$get('http://icanhazip.com')
  this.ip = data
}
```

## Customization

Customization can be done using shared environment variables.

Environment variable | Default                 | Description
---------------------|-------------------------|--------------------------------------------
API_URL              | http://localhost:3000   | Base url for ajax requests in server-side
API_URL_BROWSER      | [API_URL]               | Base url for ajax requests in client-side
API_PREFIX           | /api                    | Adds this prefix before all relative urls

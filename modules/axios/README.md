# Axios
This plugin is a wrapper around [axios](https://github.com/mzabriskie/axios). It tries to resolve and make easier lot's of ajax tasks specially with SSR.
So you can use **$get('profile')** instead of `(await Axios.get('http://server/api/profile')).data`.

- Uses optionally custom URL when executing requests in server-side.
- Handles all HTTP exceptions and prevents server side unhandled promise exceptions.
- Injects `$get`,`$post`,... into vue context instances so requests can be done out-of-the-box.
- Exposes `setToken` function so we can easily and globally set authentication tokens.
- Throws *nuxt-friendly* exceptions if needed.

## Setup
- Add `@nuxtjs/axios` dependency using yarn or npm to your project
- Add `@nuxtjs/axios` module to `nuxt.config.js`:
```js
  modules: [
    '@nuxtjs/axios'
  ]
````

## Usage

### Using inside `asyncData`
```js
async asyncData({app: {$axios}}) {
  const {data} = await $axios.get('http://icanhazip.com')
  return {
    ip: data
  }
}
```

### Using inside component methods
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

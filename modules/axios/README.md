# Axios
> Use [axios](https://github.com/mzabriskie/axios) with deep Nuxt integration and no pain! 

- Automatically set base URL for client & server side
- Injects `$get`,`$post`,... into vue context instances so requests can be done easily.
- Exposes `setToken` function to `$axios` so we can easily and globally set authentication tokens.
- Throws *nuxt-friendly* exceptions and prevent SSR crashes.
- Automatically enables `withCredentials` when requesting to base URL.
- Proxy request headers in SSR.

## Setup
- Add `@nuxtjs/axios` dependency using yarn or npm to your project
- Add `@nuxtjs/axios` module to `nuxt.config.js`:
```js
  modules: [
    '@nuxtjs/axios'
  ]
````

## Usage

### Component `asyncData`
```js
async asyncData({ app }) {
  const {data} = await app.$axios.get('http://icanhazip.com')
  return {
    ip: data
  }
}
```

### Component mixins
You can always access axios instance using `this.$axios`.
This mixins are available for easier usage: 
- `$request`
```js
this.$request({url: 'http://example.com')
```
- `$get`, `$delete`, `$head`
```js
this.$get('http://example.com')
```
- `$post`, `$put`, `$patch`
```js
this.$post('http://example.com', { foo: 'bar' })
````

Example:
```js
async mounted() {
  const {data} = await this.$get('http://icanhazip.com')
  this.ip = data
}
```

### Store `nuxtServerInit`
```js
async nuxtServerInit ({ commit }, { app }) {
  const { data } = await app.$axios.get('http://icanhazip.com')
  commit('SET_IP', data)
}
```

### Store actions
If you need axios instance in store actions, you may have to pass it when dispatching.

```js
// In components
export default {
  methods: {
    updateIP() {
      this.$store.dispatch('getIP', { $axios: this.$axios })
    }  
  }
}

// In store
{
  actions: {
    async getIP ({ commit }, { $axios }) {
      const { data } = await $axios.get('http://icanhazip.com')
      commit('SET_IP', data)
    }
  }
}
```

## Options
You can pass options using module options or `axios` section in `nuxt.config.js`:

### `baseURL`
- Default: `http://[HOST]:[PORT]/api`

Base URL is required for requests in server-side & SSR and prepended to all requests with relative path.
You can also use environment variable `API_URL` which **overrides** `baseURL`.

### `browserBaseURL` 
- Default: `/api`

Base URL which is used in client side prepended to all requests with relative path.
You can also use environment variable `API_URL_BROWSER` which **overrides** `browserBaseURL`.

- If `browserBaseURL` is not provided it defaults to `baseURL` value.
  - If hostname & port of `browserbaseURL` are equal to nuxt server, it defaults to relative part of `baseURL`.
    So if your nuxt application is being accessed under a different domain, requests go to same origin and prevents Cross-Origin problems.

### `credentials`
- Default: `true`

Adds an interceptor to automatically set `withCredentials` config of axios when requesting to `baseUrl`
which allows passing authentication headers to backend. 

### `proxyHeaders`
- Default: `true`

In SSR context, sets client request header as axios default request headers.
This is useful for making requests which need cookie based auth on server side.
Also helps making consistent requests in both SSR and Client Side code.

## Dynamic API Backend
Please notice that, `API_URL` is saved into bundle on build, CANNOT be changed
on runtime! You may use [proxy](../proxy) module for dynamically route api requests to different backend on test/staging/production.

**Example: (`nuxt.config.js`)**

```js
{
  modules: [
    '@nuxtjs/axios', 
    '@nuxtjs/proxy'
  ],
  proxy: [
    ['/api', { target: 'http://www.mocky.io', pathRewrite: { '^/api': '/v2' } }]
  ]
}
```

Start Nuxt
```
[AXIOS] Base URL: http://localhost:3000/api | Browser: /api
[HPM] Proxy created: /api  ->  http://www.mocky.io
[HPM] Proxy rewrite rule created: "^/api" ~> "/v2"
```

Now you can make requests to backend: (Works fine in both SSR and Browser)
```js
async asyncData({app}) {
  // Magically makes request to http://www.mocky.io/v2/59388bb4120000dc00a672e2
  const {data: {nuxt} } = await app.$axios.get('59388bb4120000dc00a672e2')

  return {
    nuxt // -> 'Works!'
  }
}
```

Details
- `'@nuxtjs/axios'`    
  - By default axios plugin sets base url to `http://[host]:[port]/api` which is `http://localhost:3000/api`

- `'/api': 'http://www.mocky.io/v2'` 
  - This line creates a server middleware to pass requests from `/api` to `http://www.mocky.io/v2`
  - We used `pathRewrite` to remove `/api` from starting of requests and change it to `/v2`
  - For more information and advanced usage please refer to [proxy](../proxy) docs.

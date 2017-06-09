# Axios
> Use [axios](https://github.com/mzabriskie/axios) with no pain! 

- Automatically set base URL for client & server side
- Injects `$get`,`$post`,... into vue context instances so requests can be done easily.
- Exposes `setToken` function to `$axios` so we can easily and globally set authentication tokens.
- Throws *nuxt-friendly* exceptions.
- Automatically enables `withCredentials` when requesting to base URL.

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
- `$request` :                 `this.$request({url: 'http://example.com')`
- `$get`, `$delete`, `$head` : `this.$get('http://example.com')`
- `$post`, `$put`, `$patch`  : `this.$post('http://example.com', { foo: 'bar' })`


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

## Config
Config can be done using environment variables (`proccess.env`), `options.env` or module options.

Environment variable | Default                           | Description
---------------------|-----------------------------------|--------------------------------------------
API_URL              | `http://[localhost]:[3000]/api`   | Base url for requests in server-side (SSR)
API_URL_BROWSER      | `/api` (relative API_URL)         | Base url for requests in client-side

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
[HPM] Proxy created: /api  ->  http://www.mocky.io
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

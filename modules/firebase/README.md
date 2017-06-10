# Firebase
Adds firebase to your application nuxt.

## Setup
- Add `@nuxtjs/firebase` dependency using yarn or npm to your project
- Add `@nuxtjs/firebird` module to `nuxt.config.js`:
```js
  modules: [
    {
      src: '@rafamaciel/firebase',
      options: {
        apiKey: '<API KEY>',
        authDomain: '<AUTH DOMAIN>',
        databaseURL: '<DATABASE URL>',
        projectId: '<PROJECT ID>',
        storageBucket: '<STORAGE BUCKET>',
        messagingSenderId: '<MESSAGING SENDER ID>'
      }
    }
  ]
````

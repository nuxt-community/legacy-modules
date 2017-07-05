# PouchDB
Adds pouchdb to your nuxt application.

## Setup
- Add `@nuxtjs/pouchdb` dependency using yarn or npm to your project
- Add `@nuxtjs/pouchdb` module to `nuxt.config.js`:

```js
  modules: [
    ['@nuxtjs/pouchdb', {
      defaultDB: 'https://user:pass@remote.couch.db/mydb'
    }]
  ]
````

## Usage
Example: Adding an item to database
```js
...
  this.$pouchdb.database().ref('path/to/data').set('value')
...
```

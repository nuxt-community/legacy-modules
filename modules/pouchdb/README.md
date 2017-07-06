# PouchDB (WIP)

Adds pouchdb to your nuxt application using [vue-pouch](http://www.github.com/buhrmi/vue-pouch), tightly integrating functionality from [pouch-find](http://nolanlawson.github.io/pouchdb-find/), [pouchdb-live-find](https://github.com/colinskow/pouchdb-live-find) and [pouchdb-authentication](https://github.com/pouchdb-community/pouchdb-authentication).

(Better docs coming soon)

## Setup
- Add `@nuxtjs/pouchdb` dependency using yarn or npm to your project
- Add `@nuxtjs/pouchdb` module to `nuxt.config.js`:

```js
  modules: [
    '@nuxtjs/pouchdb'
  ]
````

## Usage

```vue
<template>
  <div class="todo-list">
    <input v-model="message" placeholder="New Todo">
    <button @click="$pouch.post('todos', {message: message});message=''">Save Todo</button>
    <ol>
      <li v-for="todo in todos">
        <input v-model="todo.message" @change="$pouch.put('todos', todo)">
        <button @click="$pouch.remove('todos', todo)">Remove</button>
      </li>
    </ol>
  </div>
</template>

<script>
  export default {
    // VuePouch adds a `pouch` config option to all components.
    pouch: {
      // The simplest usage. queries all documents from the "todos" pouch database and assigns them to the "todos" vue property.
      todos: {/*empty selector*/}
    }
  }
</script>
```

See the [vue-pouch](http://www.github.com/buhrmi/vue-pouch) repo for documentation.

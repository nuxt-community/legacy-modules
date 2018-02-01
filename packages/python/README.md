# Nuxt Python
Using [python-webpack-loader](https://github.com/martim00/python-webpack-loader) and [javascripthon](https://github.com/metapensiero/metapensiero.pj)

## Setup 
- Add `@nuxtjs/python` dependency using yarn or npm to your project
- Add `@nuxtjs/python` to `modules` section of `nuxt.config.js`
```js
{
  modules: [
    '@nuxtjs/python'
  ]
}
```
- Install a Python transpiler (e.g. `pip install --user -r requirements.txt`)

## Usage

### Using `.vue` files
**TIP** If you use Vim you can get the full experience with https://github.com/posva/vim-vue/pull/97

`hello.vue`:
```html
<template>
  <div>
      Nuxt {{ best_lang }}
  </div>
</template>
<script lang="py?compiler=pj">
class Component:

    def __init__(self):
        self['data'] = lambda: { 'best_lang': 'Python' }

__all__ = Component()
</script>
```
Note: This syntax requires a specific branch of Javascripthon until patches get merged https://github.com/icarito/metapensiero.pj/tree/default_import - see alternative with `require` at https://github.com/martim00/python-webpack-loader/pull/8#issuecomment-359280782

### Using `.py` files for other nuxt files

`store/index.py`
```python
from vuex import Vuex


def increment(state):
    state.counter = state.counter + 1


def createStore():
    return Vuex.Store(state={'counter': 0},
                      mutations={'increment': increment})


__all__ = createStore
```

`pages/counter.vue`
```html
<template>
  <h2>{{ $store.state.counter }}</h2>
  <button @click="$store.commit('increment')">+1</button>
</template>
```

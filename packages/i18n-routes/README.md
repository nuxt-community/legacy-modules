# i18n-routes

Create language-specific routes when using [vue-i18n](https://github.com/kazupon/vue-i18n).

Given a page "foo":
```
└── pages
    └── foo.vue
```
This module will dynamically generate routes for a set of languages:
- **/en/foo**: English version of the "foo" page.
- **/de/foo**: German version of the "foo" page.
- **/foo**: This page will detect the user's language on the *client side* and redirect to the appropriate language-URL.

Those routes will also be generated when rendering in SSR mode.

## Compatibility

Tested with Nuxt *1.0.0-rc11*.

## Setup
- Add `@nuxtjs/i18n-routes` dependency using yarn or npm to your project
- Add `@nuxtjs/i18n-routes` to `modules` section of `nuxt.config.js` and define the languages to use:
```js
{
  modules: [
    ['@nuxtjs/i18n-routes', {
      languages: ['en', 'de']
    }]
  ]
}
```
- Create files `assets/locale/en.json` and `assets/locale/de.json` with your global translation phrases.
For example:
```json
{
  "hello-world": "Hallo Welt!"
}
```

## Usage in components
To point to a URL in the currently active language, use `localePath()`:
```html
<nuxt-link :to="localePath('/foo')">Foo</nuxt-link>
```

To translate a phrase, use vue-i18n's `$t()`:
```html
<h1>{{ $t('hello-world') }}</h1>
```

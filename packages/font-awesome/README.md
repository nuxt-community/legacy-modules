# Font Awesome
[![npm](https://img.shields.io/npm/dt/@nuxtjs/font-awesome.svg?style=flat-square)](https://www.npmjs.com/package/@nuxtjs/font-awesome)
[![npm (scoped with tag)](https://img.shields.io/npm/v/@nuxtjs/font-awesome/latest.svg?style=flat-square)](https://www.npmjs.com/package/@nuxtjs/font-awesome)

> Leverage [Font Awesome](http://fontawesome.io/) the iconic font and CSS toolkit.

#### NOTE: This module uses [Font Awesome 4.7](https://fontawesome.com/v4.7.0/)

## Setup

#### Overview:
1. Add `@nuxtjs/font-awesome` dependency using yarn or npm to your project
2. Add `@nuxtjs/font-awesome` to the `modules` section of `nuxt.config.js`


#### Detailed Setup:
Install @nuxtjs/font-awesome using either yarn or npm

**Npm**:
`npm i @nuxtjs/font-awesome`

**Yarn**:
`yarn add @nuxtjs/font-awesome`

Once installed, add `@nuxtjs/font-awesome` to the `modules` section of your `nuxt.config.js` file
```js
{
  modules: [
    '@nuxtjs/font-awesome',
  ]
}
````

## Example Usages

Once installed and added to the `modules` section of your `nuxt.config.js`, you can use icons using CSS classes.

Examples using a [smiley face](https://fontawesome.com/v4.7.0/icon/smile-o) icon:

```html
<!-- Regular icon -->
<i class="fa fa-smile-o"></i>

<!-- Larger icon -->
<i class="fa fa-smile-o fa-3x"></i>

<!-- Spinning icon -->
<i class="fa fa-smile-o fa-spin"></i>

<!-- Upside down icon -->
<i class="fa fa-smile-o fa-rotate-180"></i>
```

These are just _basic examples_ and don't fully cover what Font Awesome is capable of. **Many** more examples from Font Awesome are available [here](https://fontawesome.com/v4.7.0/examples/)!

## Configuration Options

None, Currently. 😢
This module simply injects the Font Awesome stylesheet into your site.

## References

[Font Awesome 4.7 documentation](https://fontawesome.com/v4.7.0/get-started/)
[Font Awesome 4.7 Icons](https://fontawesome.com/v4.7.0/icons/)
[Font Awesome 4.7 Examples](https://fontawesome.com/v4.7.0/examples/)
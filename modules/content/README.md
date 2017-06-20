# Nuxt Content Module

Nuxt Content grabs all content in a registered directory and converts each file into a Nuxt route component. The content's front-matter or the file name is used to automatically create the route data.

(Nuxt Content uses [vue-content-loader](https://github.com/alidcastano/vue-content-loader) to convert markdown files with front-matter into Vue components.)

## Installation

```
npm install nuxt-content

```
(*Please note:* `vue-content-loader` is a dev dependency, if you haven't already, please install it and save it to your `package.son`.)

Then, under `nuxt.config.js` install the module:

```
modules: [
   '@nuxtjs/content'
 ]
```

## Basic Setup

All content options can be configured under the `content` property in `nuxt.config.js`.

*Note: All paths are relative to Nuxt Source Directory.*

**Content Options**:

  - `srcDir`, String that specifies the directory where the content is located. By default, all content is placed in the "/content" directory.
  - `routePath`, String that specifies the parent route, which the content will be nested under. If the route is a dynamic route, the path must be prefixed with a colon, `:`. If you'd like a top level route to be created, then make the path a slash, `/`.
  - `permalink`, String that specifies url path configuration options. The possible options
  are `:slug`, `:section`, `:year`, `:month`, `:day`.
  - `isPost`, Boolean that specifies whether the content requires a date. The default is true.
  - `pages`, Array that specifies options for all content under a directory. A 2D array is also allowed to configure multiple content types. These configurations override any global options.

*Note: If the `routePath` is an existing page, the nested content will only appear if `<nuxt-child />` is present*


Here's an example:

```js
content: [
 // Global Options
 permalink: ":section/:slug"
 // Directory Options
 pages: [
  ["posts", { // content/blog/2013-01-10-HelloWorld.md -> localhost:3000/2013/hello-world
    routePath: ":post",
    permalink: ':year/:slug'
  }],
  ["projects", { // content/projects/NuxtContent.md -> localhost:3000/projects/nuxt-content
    routePath: "projects",
     permalink: ":section/:slug",
    isPost: false
  }]
 ]
]

```

### Page Options

By default, page specific data is extracted from the file name, but it can also be specified inside the front-matter of the respective file.

Front Matter Options:
  -  `slug`, String that overrides the content's url identification name.
  - `permalink`, String that overrides the content's entire url path.
  -  `date`, Date that overrides the date the post is identified by, in YYYY-MM-DD format.

```js
// `nuxt.config.js`
content: ['posts', {
  routePath: '/',
  permalink: ':year/:slug'
}]

// content/posts/2014-05-10-MyFirstPost.md -> localhost:3000/2014/1st
---
title: "My First Post!"
slug: "1st"
---

# Hello World!

```

## Sites built with using `nuxt-content` module  

* [alidcastano.com](http://alidcastano.com/)
[(source)](https://github.com/alidcastano/alidcastano.github.io)


### License

MIT

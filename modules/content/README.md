# Nuxt Content Module

Nuxt Content grabs all content in a registered directory and converts each file into a Nuxt route component. The content's front-matter or the file name is used to automatically create the route data.

(Nuxt Content uses [vue-content-loader](https://github.com/alidcastano/vue-content-loader) to convert markdown files with front-matter into Vue components.)

## Installation

```
npm install nuxt-content

```

## Basic Setup

There are three places where options can be configured: top level options can be specified under the `module options` that are passed when the plugin is installed, directory options can be specified under the `content property`, and page options
can be specified in the file's `front-matter`. See each section below for more details.

For options that can be specified in multiple places, the more specific the location,
the higher precedence it takes. Thus: a page's `front-matter` > a directory's options under the `content property` > top level options under `module property`.

*Note: All paths are relative to Nuxt Root Directory.*

### Module Options

Top level configurations can be done inside `nuxt.config.js` via the modules property
when the plugin is installed.

Top Level Module Options:
  - `srcDir`, String that specifies the directory where the content is located.
  - `routePath`, String that specifies the parent route, which the content will be nested under. If routePath is "/" then a new route will be created for each file.
  If it is "/," then a top level route will be created.
  will be nested under it.
  - `content`, Array that specifies options for all content under a directory. A 2D array is also allowed to configure multiple content types.

*Note: If the `routePath` is an existing page, the nested content will only appear if `<nuxt-child />` is present*

```js
modules: [
  [@nuxtjs/content, {
    srcDir: "content",
    routePath: "/"
    content: ["posts", {
      permalink: ":slug"
    }]
  }]
}
```

### Directory Options

Directory specific configurations can also be done under the `content property`.

Content Directory Options:
  - `permalink`, String that specifies url path configuration options. The possible options
  are `:slug`, `:section`, `:year`, `:month`, `:day`.
  - `isPost`, Boolean that specifies whether the content requires a date.

```js

modules: [@nuxtjs/content, { srcDir: "content"} ]

content: [
  ['posts', { // content/posts/2013-01-10-HelloWorld.md -> localhost:3000/2013/hello-world
    routePath: '/',
    permalink: ':year/:slug'
  }],
  ['projects', { // content/projects/NuxtContent.md -> localhost:3000/projects/nuxt-content
    routePath: 'projects',
    permalink: ':section/:slug',
    isPost: false
  }]
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

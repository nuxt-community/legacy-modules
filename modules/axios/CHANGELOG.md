# Change Log

All notable changes to this project will be documented in this file.
See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="3.0.1"></a>
## [3.0.1](https://github.com/nuxt/modules/compare/@nuxtjs/axios@3.0.0...@nuxtjs/axios@3.0.1) (2017-07-25)


### Bug Fixes

* **axios:** typo in default headers ([9697559](https://github.com/nuxt/modules/commit/9697559))




<a name="3.0.0"></a>
# [3.0.0](https://github.com/nuxt/modules/compare/@nuxtjs/axios@2.3.0...@nuxtjs/axios@3.0.0) (2017-07-25)


### Code Refactoring

* **axios:** remove $ shortcut mixins ([1ab2bd6](https://github.com/nuxt/modules/commit/1ab2bd6))


### BREAKING CHANGES

* **axios:** You have to explicitly use `this.$axios.[method]` instead of `this.$[method]`




<a name="2.3.0"></a>
# [2.3.0](https://github.com/nuxt/modules/compare/@nuxtjs/axios@2.2.4...@nuxtjs/axios@2.3.0) (2017-07-24)


### Features

* **axios:** optionally disable error handling (#74) ([a195feb](https://github.com/nuxt/modules/commit/a195feb))
* **axios:** redirectError ([4ce1a1c](https://github.com/nuxt/modules/commit/4ce1a1c))




<a name="2.2.4"></a>
## [2.2.4](https://github.com/nuxt/modules/compare/@nuxtjs/axios@2.2.3...@nuxtjs/axios@2.2.4) (2017-07-20)


### Bug Fixes

* **axios:** temporary fix for nuxt/nuxt.js#1127 ([499b639](https://github.com/nuxt/modules/commit/499b639)), closes [nuxt/nuxt.js#1127](https://github.com/nuxt/nuxt.js/issues/1127)




<a name="2.2.3"></a>
## [2.2.3](https://github.com/nuxt/modules/compare/@nuxtjs/axios@2.2.1...@nuxtjs/axios@2.2.3) (2017-07-19)


### Bug Fixes

* **axios:** don't proxy Host header from request (#72, #39) ([61462ca](https://github.com/nuxt/modules/commit/61462ca))




<a name="2.2.2"></a>
## [2.2.2](https://github.com/nuxt/modules/compare/@nuxtjs/axios@2.2.1...@nuxtjs/axios@2.2.2) (2017-07-19)


### Bug Fixes

* **axios:** don't proxy Host header from request (#72, #39) ([61462ca](https://github.com/nuxt/modules/commit/61462ca))




<a name="2.2.1"></a>
## [2.2.1](https://github.com/nuxt/modules/compare/@nuxtjs/axios@2.2.0...@nuxtjs/axios@2.2.1) (2017-07-15)


### Bug Fixes

* **axios:** problems related to #65 ([4e7dd3f](https://github.com/nuxt/modules/commit/4e7dd3f))




<a name="2.0.3"></a>
## [2.0.3](https://github.com/nuxt/modules/compare/@nuxtjs/axios@2.0.2...@nuxtjs/axios@2.0.3) (2017-06-10)


### Bug Fixes

* **axios:** Handle relative baseURL ([19b8453](https://github.com/nuxt/modules/commit/19b8453))
* handle 0.0.0.0 host ([610e0f5](https://github.com/nuxt/modules/commit/610e0f5))




<a name="2.0.2"></a>
## [2.0.2](https://github.com/nuxt/modules/compare/@nuxtjs/axios@2.0.1...@nuxtjs/axios@2.0.2) (2017-06-09)


### Bug Fixes

* **axios:** Node 6.x support ([54deac0](https://github.com/nuxt/modules/commit/54deac0))




<a name="2.0.1"></a>
## [2.0.1](https://github.com/nuxt/modules/compare/@nuxtjs/axios@2.0.0...@nuxtjs/axios@2.0.1) (2017-06-09)


### Bug Fixes

* **axios:** ensure store exists before injecting ([23ad7b7](https://github.com/nuxt/modules/commit/23ad7b7))




<a name="2.0.0"></a>
# [2.0.0](https://github.com/nuxt/modules/compare/@nuxtjs/axios@1.0.2...@nuxtjs/axios@2.0.0) (2017-06-09)


### Bug Fixes

* **axios:** install using Vue.use ([184651b](https://github.com/nuxt/modules/commit/184651b))
* **axios:** req typo ([16f28b1](https://github.com/nuxt/modules/commit/16f28b1))
* **axios:** use relative `API_URL` if same host and port else `API_URL` ([3421d19](https://github.com/nuxt/modules/commit/3421d19))


### Features

* **axios:** AXIOS_CREDENTIALS, AXIOS_SSR_HEADERS ([4dfdc2d](https://github.com/nuxt/modules/commit/4dfdc2d))
* **axios:** don't append optional config into env ([fe189e8](https://github.com/nuxt/modules/commit/fe189e8))
* **axios:** Easier API ([f54a434](https://github.com/nuxt/modules/commit/f54a434))
* **axios:** New API ([0194226](https://github.com/nuxt/modules/commit/0194226))
* **axios:** nuxt friendly errors for SSR ([65bc50f](https://github.com/nuxt/modules/commit/65bc50f))


### BREAKING CHANGES

* **axios:** API_PREFIX is deprecated.




<a name="1.0.2"></a>
## [1.0.2](https://github.com/nuxt/modules/compare/@nuxtjs/axios@1.0.0...@nuxtjs/axios@1.0.2) (2017-05-29)


### Bug Fixes

* **axios:** remove extra function call on computed prop ([cd9da0b](https://github.com/nuxt/modules/commit/cd9da0b))




<a name="1.0.1"></a>
## [1.0.1](https://github.com/nuxt/modules/compare/@nuxtjs/axios@1.0.0...@nuxtjs/axios@1.0.1) (2017-05-26)


### Bug Fixes

* **axios:** remove extra function call on computed prop ([cd9da0b](https://github.com/nuxt/modules/commit/cd9da0b))




<a name="1.0.0"></a>
# 1.0.0 (2017-05-26)


### Features

* initial migration to 1.0.0-alpha1 ([05c1b7a](https://github.com/nuxt/modules/commit/05c1b7a))


### BREAKING CHANGES

* New modules system is backward incompatible with nuxt-helpers style modules




<a name="0.0.1"></a>
## 0.0.1 (2017-05-10)

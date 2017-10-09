# Google AdSense 
> Google AdSense integration for Nuxt.js. Advertisements will update whenever the page route changes

The asynychronous add code (`//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`) is automatically
added to the `<head>` section of your pages.

## Setup
- Add `@nuxtjs/google-adsense` dependency using yarn or npm to your project
- Add `@nuxtjs/google-adsense` to `modules` section of `nuxt.config.js`

```js
{
  modules: [
    // Simple usage
    ['@nuxtjs/google-adsense', {
      id: 'ca-pub-###########'
    }]
 ]
}
```
using top level options

```js
{
  modules: [
    ['@nuxtjs/google-adsense']
  ],
 
 'google-adsense': {
    id: 'ca-pub-#########'
  }
}
```

## Configuration options:
| property | type |  description
| -------- | ---- | -----------
| id | String | Your Google Adsense Publihser client ID. Required When not in test mode
| tag | String | AdSense component tag name. Defaults to `adsbygoogle`
| test | Boolean | Force adsense into test mode

### Test mode
The AdSense module will automatically switch to `test` mode when runniung nuxt in `dev` mode.
But you can keep test mode on in production by setting the configuration option `test` to `true`.

Test mode uses a test publisher ID, so that you will not be violating AdSense TOS.

Note that test advertiements will typically appear as an empy space, but will have the
correct dimensions (i.e. will occupy the correct space needed by the rendered ad).

## Usage

Insert the `<adsbygoogle />`component wherever you would like an advertisment placed.

The ad defaults to `auto` size format (configurable by setting the prop `ad-format`). This mode
is responsive by nature. You should place the `<adsbygoogle>` component inside a container element
that has a specified (min/max) width and (min/max) height (which can be based on media queries),
or use style or classes on the `<adsbygoogle>` component to restrict the advertisement to a
specific size (or sizes).

Use the `ad-slot` property to specify your google adsense ad slot value (specified as a string)

**Component options:**
| prop | type | description
| `ad-slot` | String | Googel Adsense adslot
| `ad-format` | String | defaults to `auto`. Reger to adsense docs for otehr options
| `ad-style` | Object | styles applied to the `<ins>` element. Default: `{ display: 'block' }`

## Automatic updating of Ads
Whenever your route chnges, any disaplayed ads will update, just as they would on normal
page loads. 

Note AdSense limited you to a maximum of three ads per page.

Refer to Adsense for full terms of use.

## Background
This module uses a technique developed by the Angular team (with help from Google Adsense)
to handle updating ads on dynamic (client routed) pages:
https://github.com/leonardteo/google-ads-test-angularjs

Each time a new advertisement is requeted, the adsense parameter `data-ad-region` is updated to
a random value. For this reason, you cnnot set the `data-ad-region` attribute.

For test mode, the following blog was used asa reference:
https://www.thedev.blog/3087/test-adsense-ads-safely-without-violating-adsense-tos/

## This module is still a Work In Progress

## License

[MIT License](./LICENSE)

Copyright (c) -

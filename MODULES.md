# Modules Development Guide [WIP]

Each module is a separate npm package with an entry point that exports a function.
This function can be asynchronous and return a promise which is useful for fetching some API or others (Mongo connection...)

# Customizations

## Customize nuxt config
You can use `nuxt` argument to customize and add options to nuxt config. 

```js
module.exports = (nuxt) => {
    nuxt.head.meta.push({charset: 'utf-8'});
    nuxt.head.meta.push({name: 'viewport', content: 'width=device-width, initial-scale=1'});
};
```

## Customize nuxt core
You can use `this` context to access and hack nuxt core app. (webpack config files, client.js and server.js)

```js
// A module can be asynchronous
// Useful for fetching some API or others (Mongo connection...)
module.exports = async function (nuxt) {
	const render = this.render.bind(this)
	this.render = (req, res)=> {
		if (pages[req.url]) {
			return res.send(pages[req.url])
		}
		try {
			// render the page
			const html = await render(req, res)
			pages[req.url] = html
		} catch (e) {}
	}
}
```

# Meta
Meta option allows easily extending and adding more compatibilities to your module with simple options.
In order to use meta you can attach it to your module exports:

```js
module.exports.meta = {
    // Vendor packages will be added to vendor.js bundle file
    vendor: [],

    // Boolean indicating this module has a plugin (or a function (nuxt) => Boolean) 
    plugin: true,
    
    // Just copy plugin without adding to plugins option, see auth module
    copyOnly: false,
    
    // Don't add this plugin for SSR
    ssr: false,
    
    // Allows extending and customizing webpack config for Client and SSR 
    extendBuild: ({isClient, isServer}) => { }
}
````

# Plugins
Your modules may want to ship an out-of-the box plugin into project.
Plugin files are being copied to a temporary directory inside user's main project.

- Allows using ES5/ES6 features without Uglifyjs and Babel problems.
- Prevents webpack adding whole package into vendor.

const path = require('path');
const fs = require('fs-extra');
const _ = require('lodash');
const chalk = require('chalk');

function wrap(modules, nuxt) {
    if (!nuxt) {
        return;
    }

    if (!Array.isArray(modules)) {
        modules = [modules];
    }

    _.defaultsDeep(nuxt, {
        build: {
            postcss: [],
            vendor: [],
            plugins: []
        },
        css: [],
        plugins: [],
        head: {
            meta: [],
            link: [],
            style: [],
            script: []
        },
        env: {}
    });

    // Explicit rootDir and srcDir
    nuxt.rootDir = nuxt.rootDir || path.resolve('');
    nuxt.srcDir = nuxt.srcDir || nuxt.rootDir;

    // Cleanup & ensure .nuxt-modules dir exits
    nuxt.nuxtmodulesDir = path.resolve(nuxt.rootDir, '.nuxt-modules');
    fs.mkdirsSync(nuxt.nuxtmodulesDir);

    // Install modules
    modules.forEach(m => {
        const warns = install(m, nuxt);
        if (warns.length > 0) {
            console.log(chalk.yellow(`[Nuxt modules] ${m}:`));
            warns.forEach(warn => {
                console.log(`   - ${chalk.yellow(warn)}`);
            });
        }
    });

    // Ensure uniques after modules install
    nuxt.plugins = _.uniq(nuxt.plugins);
    nuxt.build.vendor = _.uniq(nuxt.build.vendor);

    return nuxt;
}

function install(moduleName, nuxt) {
    const modulePath = path.resolve(__dirname, moduleName);
    let module;
    const warns = [];

    try {
        /* eslint-disable import/no-dynamic-require */
        module = require(modulePath);
    } catch (err) {
        console.error(err);
    }

    if (!module) {
        warns.push('Cannot load module', moduleName);
        return warns;
    }

    if (module.vendor) {
        nuxt.build.vendor = nuxt.build.vendor.concat(module.vendor);

        // Check module vendors to be installed
        module.vendor.forEach(vendor => {
            try {
                require(vendor);
            } catch (err) {
                warns.push('Dependency not installed: ' + chalk.blue(vendor));
            }
        });
    }

    // Dynamic plugins
    let plugin = module.plugin;
    if (plugin instanceof Function) {
        plugin = plugin(nuxt);
    }

    if (plugin) {
        // Resolve plugin path
        if (plugin === true) {
            plugin = path.resolve(modulePath, 'plugin.js');
        }

        // Copy plugin to project
        const filename = moduleName + '.js';
        const dst = path.resolve(nuxt.nuxtmodulesDir, filename);
        fs.copySync(plugin, dst);

        if (module.copyOnly !== false) {
            nuxt.plugins.push({src: dst, ssr: (module.ssr !== false)});
        }
    }

    if (module.extend) {
        module.extend(nuxt);
    }

    if (module.extendBuild) {
        const _extend = nuxt.build.extend;
        nuxt.build.extend = function () {
            module.extendBuild.apply(this, arguments);
            if (_extend) {
                _extend.apply(this, arguments);
            }
        };
    }

    return warns;
}

module.exports = wrap;

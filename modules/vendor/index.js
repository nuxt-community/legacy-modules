const fs = require('fs-extra');
const path = require('path');

module.exports = (nuxt) => {
    if (!nuxt.vendor) {
        return;
    }

    const vendorDir = path.resolve(nuxt.rootDir, 'static', 'vendor');
    const nodeModulesDir = path.resolve(nuxt.rootDir, 'node_modules');

    // Ensure static/vendor directory exists
    fs.ensureDirSync(vendorDir);

    // Link vendors
    nuxt.vendor.forEach(vendor => {
        const src = path.resolve(nodeModulesDir, vendor);
        const dst = path.resolve(vendorDir, vendor);

        console.log('[vendor]', src, '->', dst);
        fs.ensureSymlinkSync(src, dst, 'junction');
    });
};

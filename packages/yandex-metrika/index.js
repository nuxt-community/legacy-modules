const path = require('path');

module.exports = function yandexMetrika(options) {
  // Don't include on dev mode
  if (this.options.dev && process.env.NODE_ENV !== 'production') {
    return;
  }

  const metrikaUrl = (options.useCDN ? 'https://cdn.jsdelivr.net/npm/yandex-metrica-watch' : 'https://mc.yandex.ru/metrika') + '/tag.js';

  // Script preload
  this.options.head.link.push({
    href: metrikaUrl,
    rel: 'preload',
    as: 'script'
  });

  // Add yandex metrika script to head
  this.options.head.script.push({
    src: metrikaUrl, // add https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js
    async: 'true'
  })

  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    ssr: false,
    options
  });
};

module.exports.meta = require('./package.json');

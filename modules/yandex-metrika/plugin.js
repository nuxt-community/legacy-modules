(function (d, w, c) {
  (w[c] = w[c] || []).push(function() {
    try {
      w['yaCounter<%= options.id %>'] = new Ya.Metrika(<%= JSON.stringify(options) %>);
    } catch (e) {}
  });
})(document, window, "yandex_metrika_callbacks");


  function create () {
    try {
      window['yaCounter<%= options.id %>'] = new Ya.Metrika(<%= JSON.stringify(options) %>)
      app.router.afterEach(to => {
        // We tell Yandex Metrika to add a page view
        window['yaCounter<%= options.id %>'].hit(to.fullPath)
      })
    } catch (e) { }
  }

  if (window.Ya && window.Ya.Metrika) {
    create()
  } else {
    (function (w, c) {
      (w[c] = w[c] || []).push(create)
    })(window, 'yandex_metrika_callbacks')
  }
}

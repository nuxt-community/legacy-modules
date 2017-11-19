import middleware from './middleware'

middleware['i18n-routes'] = function ({isHMR, app, store, route, params, error, redirect}) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) {
    return
  }

  const urlLanguage = params.lang
  if (urlLanguage) {
    if (options.languages.indexOf(urlLanguage) === -1) {
      return error({message: 'This page could not be found.', statusCode: 404})
    }
    store.commit('i18n-routes/setLanguage', urlLanguage)
  }
}

const options = <%= serialize(options) %>

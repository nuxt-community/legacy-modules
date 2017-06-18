require('vue-content-loader')
const join = require('path').join
const fs = require('fs')
const fm = require('front-matter')
const pathToRegexp = require('path-to-regexp')
const paramCase = require('param-case')

module.exports = function (options) {
  const nuxt = this.options

  // convert markdown files to vue component
  nuxt.build.loaders.push({
    test: /\.md$/,
    use: [{
      loader: 'vue-content-loader',
      options: options.loaderOptions || {}
    }]
  })

  // create content config
  const config = {}
  config.options = options
  config.options.rootPath = join(nuxt.rootDir, options.srcDir || "/")
  config.content = nuxt.content || options.content || ['/']
  if (!is2DArray(config.content)) config.content = [config.content]

  // create routes for registered content
  nuxt.router.extendRoutes = (routes, resolve) => {
    const contentData = getContentData(config)
    addRoutes(routes, contentData)
  }
}


/**
 * Returns 2D array of content data, each with its respective
 * registered directory, options, and nested files.
 */
function getContentData (config) {
  const rootPath = config.options.rootPath
  const contentData = []
  config.content.forEach(type => {
    const dir = join('/', type[0])
    const opts = getContentOpts(type[1] || {}, config.options)
    const path = join(rootPath, dir)
    const otherRegisteredDirs = getOtherRegisteredDirs(dir, config.content)

    const filesData = []
    fs.readdirSync(path).forEach(stat => {
      const statPath = join(path, stat)
      if(fs.statSync(statPath).isDirectory()) { // Nested Files
        const dirSection = join(dir, stat)
        if (!(otherRegisteredDirs.indexOf(dirSection) > -1)) {
          filesData.push(...getFilesData(dirSection, rootPath, otherRegisteredDirs))
        }
      }
      else { // Top Level file
        filesData.push({
          src: statPath,
          section: dir
        })
      }
    })
    contentData.push([dir, opts, filesData])
  })
  return contentData
}


/**
 * Creates top level or nested route for each content file.
 */
function addRoutes(routes, contentData) {
  contentData.forEach(type => {
    const dir = type[0]
    const opts = type[1]
    const filesData = type[2]

    if (opts.route === "/") { // Top level route
      filesData.forEach(file => {
        routes.push(createRoute(file, opts))
      })
    } else { // Nested route
      let routeFound = false
      routes.forEach(route => {
        const isRoute = route.path.indexOf(opts.route) > -1
        if (isRoute) {
          routeFound = true
          if (!route.children) route.children = []
          filesData.forEach(file => {
            route.children.push(createRoute(file, opts))
          })
        }
      })
      if (!routeFound) throw Error(`${dir} route does not exists`)
    }
  })
}


/**
 * Gets page data via 1) front-matter 2) file name.
 */
function createRoute (file, options) {
  const fileSource = fs.readFileSync(file.src, 'utf-8')
  const metadata = fm(fileSource).attributes

  const fileName = file.src.replace(/^.*[\\\/]/, '')
  const fileDate = fileName.match(/!?(\d{4}-\d{2}-\d{2})/)

  const pathOpts = {
    slug: paramCase(metadata.slug || toSlug(fileName)),
    section: file.section
  }
  if (options.isPost) {
    const dateData = fileDate[0].split('-')
    pathOpts.year = dateData[0]
    pathOpts.month = dateData[1]
    pathOpts.day = dateData[2]
  }

  const toPath = pathToRegexp.compile(options.permalink)
  const permalink = toPath(pathOpts, { pretty: true })
    .replace(/%2F/gi, "/") // url encoded slash pretty

  return {
    path: join("/", permalink),
    component: file.src
  }
}

/**
 * Gets content options via 1) content config property 2) module Options 3) defaults
 */
function getContentOpts (config, options) {
  const route = config.routePath || options.routePath || config.srcDir || ''
  return {
    route: join('/', route),
    permalink: config.permalink || options.permalink || ':slug',
    isPost: !(config.isPost === false)
  }
}


/**
 * Remove date and extension from file name.
 */
function toSlug (fileName) {
  const date = /!?(\d{4}-\d{2}-\d{2}-)/
  const ext = /(.)[^.]+$/
  return fileName.replace(date, '').replace(ext, '')
}

/**
 * Recursively get all content files with their respective metadata.
 */
function getFilesData (contentDir, rootPath, blacklist, filesData = []) {
  const contentPath = join(rootPath, contentDir)

  fs.readdirSync(contentPath).forEach((stat, opts) => {
    const statPath = join(contentPath, stat)
    if(fs.statSync(statPath).isDirectory()) {
      const nestedContentDir = join(contentDir, stat)
      if (!(blacklist.indexOf(nestedContentDir) > -1)) {
        getFilesData(nestedContentDir, rootPath, blacklist, filesData)
      }
    } else {
      filesData.push({
        src: statPath,      // path to file
        section: contentDir // path to file directory
      })
    }
  })
  return filesData
}


/**
 * Gets all the registered content directory types.
 */
function  getOtherRegisteredDirs (currDir, contentTypes) {
  const dirs = []
  contentTypes.forEach(type => {
    const dir = type[0]
    if (dir !== currDir) dirs.push(join('/' + dir))
  })
  return dirs
}

function is2DArray (arr) {
  return Array.isArray(arr[0])
}

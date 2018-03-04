const { join, isAbsolute } = require('path')
const { existsSync, mkdirSync } = require('fs')

module.exports = (nuxtOptions, moduleOptions) => {
  const srcDir = nuxtOptions.srcDir
  const rootDir = nuxtOptions.rootDir
  
  const tmpPath = join(rootDir, '.tmp')

  // create temp path if it doesn't exist yet
  if (!existsSync(tmpPath)) {
	  mkdirSync(tmpPath)
  }

  const defaults = {
    srcGlobs: ['layouts/**/*.vue', 'pages/**/*.vue', 'components/**/*.vue'],
    variablesPath: null,
    sassTempPath: join(tmpPath, 'nuxt-bulma-slim.sass'),
    cssTempPath: join(tmpPath, 'nuxt-bulma-slim.css'),
    disablePostCSSWarnings: true,
    whitelist: [],
    whitelistPatterns: [],
    additionalPaths: []
  }

  const options = Object.assign(
    {},
    defaults,
    {
      rootDir: nuxtOptions.rootDir,
      srcDir
    },
    moduleOptions
  )

  const makeAbsolute = path => {
    if (!isAbsolute(path)) {
      return join(srcDir, path)
    }

    return path
  }

  options.srcGlobs = options.srcGlobs.map(makeAbsolute)
  options.additionalPaths = options.additionalPaths.map(makeAbsolute)

  if (options.variablesPath) {
    options.variablesPath = [options.variablesPath].map(makeAbsolute)[0]
  } else {
    const varSassPath = join(srcDir, 'assets/sass/variables.sass')
    const varScssPath = join(srcDir, 'assets/scss/variables.scss')

    if (existsSync(varSassPath)) {
      options.variablesPath = varSassPath
    } else if (existsSync(varScssPath)) {
      options.variablesPath = varScssPath
    }
  }

  return options
}

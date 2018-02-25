const { join, isAbsolute } = require('path')
const { tmpdir } = require('os')
const { existsSync } = require('fs')

module.exports = (nuxtOptions, moduleOptions) => {
  const srcDir = nuxtOptions.srcDir

  const defaults = {
    srcGlobs: ['layouts/**/*.vue', 'pages/**/*.vue', 'components/**/*.vue'],
    variablesPath: null,
    sassTempPath: join(tmpdir(), 'nuxt-bulma-slim.sass'),
    cssTempPath: join(tmpdir(), 'nuxt-bulma-slim.css'),
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

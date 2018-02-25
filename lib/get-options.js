const { join, isAbsolute } = require('path')
const { tmpdir } = require('os')

module.exports = (nuxtOptions, moduleOptions) => {
  const srcDir = nuxtOptions.srcDir

  const defaults = {
    srcGlobs: ['layouts/**/*.vue', 'pages/**/*.vue', 'components/**/*.vue'],
    variablesPath: 'assets/sass/variables.sass',
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
  options.variablesPath = [options.variablesPath].map(makeAbsolute)[0]

  return options
}

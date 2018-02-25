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
    whitelistPatterns: []
  }
  const options = Object.assign({}, defaults, moduleOptions, {
    rootDir: nuxtOptions.rootDir,
    srcDir
  })

  options.srcGlobs = options.srcGlobs.map(srcGlob => {
    if (!isAbsolute(srcGlob)) {
      return join(srcDir, srcGlob)
    }

    return srcGlob
  })

  if (!isAbsolute(options.variablesPath)) {
    options.variablesPath = join(srcDir, options.variablesPath)
  }

  return options
}

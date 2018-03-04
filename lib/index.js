const { join } = require('path')
const { writeFileSync, existsSync } = require('fs')
const ansi = require('ansicolor')
const sass = require('node-sass')
const Purgecss = require('purgecss')
const debug = require('debug')('nuxt:bulma-slim')
const getOptions = require('./get-options')
const getBulmaPath = require('./get-bulma-path')

module.exports = function(moduleOptions = {}) {
  if (process.env.npm_lifecycle_event === 'start') {
    // Unfortunately this is the only way I've found to distinguish between
    // Nuxt's `build` and `start` command. Nuxt strips out the command from
    // process.argv - so this will only work if a user does a `npm start`.
    return
  }

  let outFile, outContent
  const options = getOptions(this.options, moduleOptions)
  const bulmaPath = getBulmaPath(options.rootDir)
  const sassPaths = [join(bulmaPath, 'bulma.sass'), ...options.additionalPaths]
  const license = '/*! bulma.io | MIT License | github.com/jgthms/bulma */'

  if (existsSync(options.variablesPath)) {
    sassPaths.unshift(options.variablesPath)
    debug(
      'Overwriting Bulma variables with',
      ansi.yellow(options.variablesPath)
    )
  }

  const sassContent = sassPaths
    .map(v => v.replace(/\\/g, '\\\\')) // replace backslash by double backslash (needed for windows)
    .map(v => `@import "${v}"`)
    .join('\n')

  if (options.disablePostCSSWarnings) {
    Object.assign(this.options.build, {
      postcss: {
        plugins: {
          'postcss-custom-properties': {
            warnings: false
          }
        }
      }
    })
  }

  if (this.options.dev) {
    outFile = options.sassTempPath
    outContent = sassContent
  } else {
    const { css } = sass.renderSync({
      data: sassContent,
      indentedSyntax: true
    })

    outFile = options.cssTempPath
    outContent = new Purgecss({
      content: options.srcGlobs,
      css: [{ raw: css }],
      whitelist: ['html', 'body', ...options.whitelist],
      whitelistPatterns: options.whitelistPatterns
    }).purge()[0].css

    if (!outContent.includes(license.substr(0, 12))) {
      outContent = license + outContent
    }
  }

  writeFileSync(outFile, outContent, 'utf8')
  this.options.css.push(outFile)
  debug('Wrote temporary file to', ansi.yellow(outFile))
}

module.exports.meta = require('../package.json')

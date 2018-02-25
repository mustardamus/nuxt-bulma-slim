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
  const sassImport = v => `@import "${join(bulmaPath, 'sass', v)}"`
  const bulmaAllSass = [`@import "${join(bulmaPath, 'bulma')}"`]

  const bulmaBaseSass = [
    'utilities/_all',
    'base/minireset',
    'base/generic'
  ].map(sassImport)

  const bulmaBuildSass = [
    'utilities/_all',
    'base/helpers',
    'elements/_all',
    'components/_all',
    'grid/_all',
    'layout/_all'
  ].map(sassImport)

  if (existsSync(options.variablesPath)) {
    const variablesImport = `@import "${options.variablesPath}"`

    bulmaAllSass.unshift(variablesImport)
    bulmaBaseSass.unshift(variablesImport)
    bulmaBuildSass.unshift(variablesImport)

    debug(
      'Overwriting Bulma variables with',
      ansi.yellow(options.variablesPath)
    )
  }

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
    outContent = bulmaAllSass.join('\n')
  } else {
    const bulmaBaseCss = sass.renderSync({
      data: bulmaBaseSass.join('\n'),
      indentedSyntax: true
    }).css

    const bulmaBuildCss = sass.renderSync({
      data: bulmaBuildSass.join('\n'),
      indentedSyntax: true
    }).css

    const bulmaBuildPurged = new Purgecss({
      content: options.srcGlobs,
      css: [{ raw: bulmaBuildCss }]
    }).purge()[0].css

    outFile = options.cssTempPath
    outContent = '/*! bulma.io | MIT License | github.com/jgthms/bulma */'
    outContent += bulmaBaseCss + bulmaBuildPurged
  }

  writeFileSync(outFile, outContent, 'utf8')
  this.options.css.push(outFile)
  debug('Wrote temporary file to', ansi.yellow(outFile))
}

module.exports.meta = require('../package.json')

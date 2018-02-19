const { join } = require('path')
const { tmpdir } = require('os')
const { writeFileSync, existsSync } = require('fs')
const ansi = require('ansicolor')
const sass = require('node-sass')
const makeFullBuild = require('./make-full-build')
const makeSlimBuild = require('./make-slim-build')

module.exports = function(moduleOptions) {
  const prefix = '  ' + ansi.cyan('nuxt:bulma-slim')
  const packageJsonPath = join(this.options.rootDir, 'package.json')
  const packageJson = require(packageJsonPath)
  const deps = Object.assign(
    {},
    packageJson.dependencies,
    packageJson.devDependencies
  )
  const srcDir = this.options.srcDir
  const defaults = {
    srcGlobs: [
      join(srcDir, 'layouts/**/*.vue'),
      join(srcDir, 'pages/**/*.vue'),
      join(srcDir, 'components/**/*.vue')
    ],
    variablesPath: join(srcDir, 'assets/sass/variables.sass'),
    sassTempPath: join(tmpdir(), 'nuxt-bulma-slim.sass'),
    cssTempPath: join(tmpdir(), 'nuxt-bulma-slim.css'),
    disablePostCSSWarnings: true
  }
  const options = Object.assign({}, defaults, moduleOptions)
  let sassContent = []
  let variablesPath = options.variablesPath

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
    sassContent = makeFullBuild(options)
    console.log(prefix, 'Using complete Bulma in development')
  } else {
    sassContent = makeSlimBuild(options)
    const usedParts = sassContent
      .map(l => {
        return l
          .split('node_modules/bulma/sass/')[1]
          .replace('.sass"', '')
          .replace('/_all"', '')
      })
      .sort()

    console.log(prefix, 'Only using these Bulma features in production:')
    usedParts.forEach(part => console.log(prefix, '-', ansi.yellow(part)))
  }

  if (variablesPath.charAt(0) !== '/') {
    variablesPath = join(srcDir, variablesPath)
  }

  if (existsSync(variablesPath)) {
    sassContent.unshift(`@import "${variablesPath}"`)
    console.log(
      prefix,
      'Overwriting Bulma variables with',
      ansi.yellow(variablesPath)
    )
  }

  if (deps['node-sass'] && deps['sass-loader']) {
    writeFileSync(options.sassTempPath, sassContent.join('\n'), 'utf8')
    this.options.css.push(options.sassTempPath)

    console.log(
      prefix,
      'Wrote temporary SASS file to',
      ansi.yellow(options.sassTempPath)
    )
  } else {
    const { css } = sass.renderSync({
      data: sassContent.join('\n'),
      indentedSyntax: true
    })

    writeFileSync(options.cssTempPath, css, 'utf8')
    this.options.css.push(options.cssTempPath)

    console.log(
      prefix,
      'Wrote temporary CSS file to',
      ansi.yellow(options.cssTempPath)
    )
  }
}

module.exports.meta = require('../package.json')

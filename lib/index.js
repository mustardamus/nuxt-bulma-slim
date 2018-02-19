const { join } = require('path')
const { tmpdir } = require('os')
const { writeFileSync, existsSync } = require('fs')
const ansi = require('ansicolor')
const makeFullBuild = require('./make-full-build')
const makeSlimBuild = require('./make-slim-build')

module.exports = function(moduleOptions) {
  const prefix = '  ' + ansi.cyan('nuxt:bulma-slim')
  const srcDir = this.options.srcDir
  const defaults = {
    srcGlobs: [
      join(srcDir, 'layouts/**/*.vue'),
      join(srcDir, 'pages/**/*.vue'),
      join(srcDir, 'components/**/*.vue')
    ],
    variablesPath: join(srcDir, 'assets/sass/variables.sass'),
    sassTempPath: join(tmpdir(), 'nuxt-bulma-slim.sass'),
    disablePostCSSWarnings: true
  }
  const options = Object.assign({}, defaults, moduleOptions)

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

  let sassContent

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

  if (existsSync(options.variablesPath)) {
    sassContent.unshift(`@import "${options.variablesPath}"`)
    console.log(
      prefix,
      'Overwriting Bulma variables with',
      ansi.yellow(options.variablesPath)
    )
  }

  writeFileSync(options.sassTempPath, sassContent.join('\n'), 'utf8')
  this.options.css.push(options.sassTempPath)

  // check if node-sass and sass-loader exists in project
  // if so, directly insert sass into css array
  // if not, compile sass to css and insert in css array
}

module.exports.meta = require('../package.json')

const { join } = require('path')
const makeSlimBuild = require('./make-slim-build')

module.exports = function(moduleOptions) {
  const srcDir = this.options.srcDir
  const defaults = {
    srcGlobs: [
      join(srcDir, 'layouts/**/*.vue'),
      join(srcDir, 'pages/**/*.vue'),
      join(srcDir, 'components/**/*.vue')
    ],
    variablesPath: join(srcDir, 'assets/sass/variables.sass')
  }
  const options = Object.assign({}, defaults, moduleOptions)
  const { sassTmpFile, usedFilesShort } = makeSlimBuild(options)

  this.options.css.push(sassTmpFile)
  console.log('Bulma Slim Build:', usedFilesShort.sort().join(', ')) // eslint-disable-line

  // TODO have option
  Object.assign(this.options.build, {
    postcss: {
      plugins: {
        'postcss-custom-properties': {
          warnings: false
        }
      }
    }
  })

  // check if node-sass and sass-loader exists in project
  // if so, directly insert sass into css array
  // if not, compile sass to css and insert in css array
  // if on developlent, include the whole of bulma
}

module.exports.meta = require('../package.json')

const { join, basename } = require('path')
const { readFileSync } = require('fs')
const globby = require('globby')
const uniq = require('lodash.uniq')

module.exports = () => {
  const srcDir = join(__dirname, '../node_modules/bulma')
  const srcGlob = join(srcDir, 'sass/**/*.sass')
  const srcFiles = globby.sync(srcGlob).filter(srcFile => {
    return (
      basename(srcFile).charAt(0) !== '_'
      && !srcFile.includes('/base/')
      && !srcFile.includes('/utilities/')
    )
  })
  const srcFilesClasses = srcFiles.map(srcFile => {
    const content = readFileSync(srcFile, 'utf8')
    const classes = content.split('\n')
      .filter(line => line.substr(0, 1) === '.')
      .map(line => line.substr(1, line.length))

    return { srcFile, classes: uniq(classes) }
  })

  return srcFilesClasses
}

const { join } = require('path')
const { readFileSync } = require('fs')
const globby = require('globby')
const compiler = require('vue-template-compiler')
const uniq = require('lodash.uniq')
const flattenDeep = require('lodash.flattendeep')
const getBulmaPath = require('./get-bulma-path')
const getClassesFromBulma = require('./get-classes-from-bulma')
const getClassesFromTemplate = require('./get-classes-from-template')

module.exports = (options = {}) => {
  const srcFiles = globby.sync(options.srcGlobs)
  const bulmaDir = getBulmaPath(options.rootDir)
  const bulmaClasses = getClassesFromBulma(bulmaDir)
  const rawClasses = srcFiles.map(srcFile => {
    const content = readFileSync(srcFile, 'utf8')
    const { template } = compiler.parseComponent(content)
    const classes = getClassesFromTemplate(template.content)
    return classes
  })
  const usedClasses = uniq(flattenDeep(rawClasses))
  const rawUsedFiles = usedClasses.map(usedClass => {
    return bulmaClasses
      .filter(c => c.classes.includes(usedClass))
      .map(c => c.srcFile)
  })
  const usedFiles = uniq(flattenDeep(rawUsedFiles))
  const sassContent = [
    `@import "${join(bulmaDir, 'sass/utilities/_all')}"`,
    `@import "${join(bulmaDir, 'sass/base/_all')}"`,
    ...usedFiles.map(f => `@import "${f}"`)
  ]

  return sassContent
}

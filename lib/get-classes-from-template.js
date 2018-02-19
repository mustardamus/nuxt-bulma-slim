const uniq = require('lodash.uniq')
const flattenDeep = require('lodash.flattendeep')

module.exports = template => {
  const rawClasses = []
  const classRegEx = /class=("|')(.*?)("|')/g
  let match

  while ((match = classRegEx.exec(template))) {
    rawClasses.push(match[2])
  }

  const classesSplit = rawClasses.map(c => c.split(' '))
  const classes = uniq(flattenDeep(classesSplit))

  return classes
}

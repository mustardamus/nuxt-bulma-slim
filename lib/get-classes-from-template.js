const uniq = require('lodash.uniq')
const trim = require('lodash.trim')
const flattenDeep = require('lodash.flattendeep')

module.exports = template => {
  const normalClassRegEx = /[^:]class=["'](.+)["']/g
  const bindClassStringRegEx = /[:]class=["']["'](.+)["']["']/g
  const bindClassObjectRegEx = /:class=["']\s*{\s*([^}]*)\s*}\s*/g
  const wordRegex = /([A-Za-z0-9-_]+)/g
  let classes = []
  let match

  while ((match = normalClassRegEx.exec(template))) {
    classes = [...classes, ...match[1].split(' ')]
  }

  while ((match = bindClassStringRegEx.exec(template))) {
    let wordMatch

    while ((wordMatch = wordRegex.exec(match[1]))) {
      classes.push(wordMatch[1])
    }
  }

  while ((match = bindClassObjectRegEx.exec(template))) {
    const keyClasses = match[1].split(',').map(line => {
      return trim(line)
        .split(':')[0]
        .replace(/['"]/g, '')
    })

    classes = [...classes, ...flattenDeep(keyClasses)]
  }

  return uniq(classes)
}

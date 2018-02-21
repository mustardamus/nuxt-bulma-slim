const { join } = require('path')
const { readFileSync } = require('fs')
const getBulmaPath = require('./get-bulma-path')

module.exports = ({ rootDir }) => {
  const bulmaDir = getBulmaPath(rootDir)
  const bulmaSrc = join(bulmaDir, '/bulma.sass')
  const content = readFileSync(bulmaSrc, 'utf8')
  const sassContent = content
    .split('\n')
    .filter(l => l.includes('@import'))
    .map(l => l.replace('sass/', join(bulmaDir, 'sass/')))

  return sassContent
}

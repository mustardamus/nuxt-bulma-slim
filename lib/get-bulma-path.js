const { join } = require('path')
const { existsSync } = require('fs')

module.exports = rootPath => {
  const bulmaModule = 'node_modules/bulma'
  let bulmaDir = join(__dirname, '..', bulmaModule)

  if (!existsSync(bulmaDir)) {
    bulmaDir = join(rootPath, bulmaModule)
  }

  if (!existsSync(bulmaDir)) {
    throw new Error('Can not find Bulma. Install it with `npm install bulma`')
  }

  return bulmaDir
}

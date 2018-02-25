const { join } = require('path')
const { existsSync } = require('fs')

module.exports = rootPath => {
  const bulmaModule = 'node_modules/bulma'
  let bulmaPath = join(__dirname, '..', bulmaModule)

  if (!existsSync(bulmaPath)) {
    bulmaPath = join(rootPath, bulmaModule)
  }

  if (!existsSync(bulmaPath)) {
    throw new Error('Can not find Bulma. Install it with `npm install bulma`')
  }

  return bulmaPath
}

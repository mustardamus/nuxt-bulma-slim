const { join } = require('path')
const { existsSync } = require('fs')

module.exports = rootDir => {
  const bulmaModule = 'node_modules/bulma'
  let bulmaPath = join(__dirname, '..', bulmaModule)

  if (!existsSync(bulmaPath)) {
    bulmaPath = join(rootDir, bulmaModule)
  }

  if (!existsSync(bulmaPath)) {
    throw new Error('Can not find Bulma. Install it with `npm install bulma`')
  }

  return bulmaPath
}

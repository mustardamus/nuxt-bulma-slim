const { join } = require('path')
const getBulmaPath = require('../lib/get-bulma-path')

describe('Bulma Path', () => {
  it('should get the bulma path from this module', () => {
    const rootDir = join(__dirname, '..')
    const bulmaPath = getBulmaPath(rootDir)

    expect(bulmaPath).toBe(join(rootDir, 'node_modules/bulma'))
  })
})

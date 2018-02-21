const { join } = require('path')
const getClassesFromBulma = require('../lib/get-classes-from-bulma')

describe('Get Classes From Bulma', () => {
  it('should return all the defined classes', () => {
    const bulmaPath = join(__dirname, '../node_modules/bulma')
    const classes = getClassesFromBulma(bulmaPath)

    expect(classes).toHaveLength(30)

    const section = classes.filter(c => c.srcFile.includes('section.sass'))[0]

    expect(section.classes).toEqual(['section'])
  })
})

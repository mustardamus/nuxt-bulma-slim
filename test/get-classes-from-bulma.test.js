const getClassesFromBulma = require('../lib/get-classes-from-bulma')

describe('Get Classes From Bulma', () => {
  it('should return all the defined classes', () => {
    const classes = getClassesFromBulma()

    expect(classes).toHaveLength(30)

    const section = classes.filter(c => c.srcFile.includes('section.sass'))[0]

    expect(section.classes).toEqual(['section'])
  })
})

const getClassesFromTemplate = require('../lib/get-classes-from-template')

describe('Get Classes From Template', () => {
  it('should get regular class names', () => {
    const template = `
      <div class="parent-class">
        <div class="child-class">1</div>
        <div class="child-class another-child-class">2</div>
        <div class='single-quote' id="single-quote">3</div>
      </div>
    `
    const classes = getClassesFromTemplate(template)

    expect(classes).toHaveLength(4)
    expect(classes).toEqual([
      'parent-class',
      'child-class',
      'another-child-class',
      'single-quote'
    ])
  })

  // it('should get bind class names from an object')
  // it('should get bind class names from a string')
})

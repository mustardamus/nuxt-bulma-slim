const getClassesFromTemplate = require('../lib/get-classes-from-template')

describe('Get Classes From Template', () => {
  it('should get regular class names', () => {
    const template = require('./fixtures/template-normal-class')
    const classes = getClassesFromTemplate(template)

    expect(classes).toHaveLength(8)
    expect(classes).toEqual([
      'container',
      'is-fluid',
      'columns',
      'column',
      'is-8',
      'button',
      'is-info',
      'notification'
    ])
  })

  it('should get bind class names from a string', () => {
    const template = require('./fixtures/template-bind-class-string')
    const classes = getClassesFromTemplate(template)

    expect(classes).toHaveLength(6)
    expect(classes).toEqual([
      'container',
      'var',
      'is-fluid',
      'column',
      'button',
      'is-primary'
    ])
  })

  it('should get bind class names from an object', () => {
    const template = require('./fixtures/template-bind-class-object')
    const classes = getClassesFromTemplate(template)

    expect(classes).toHaveLength(7)
    expect(classes).toEqual([
      'container',
      'columns',
      'column',
      'is-8',
      'button',
      'is-fullwidth',
      'is-4'
    ])
  })

  it('should get all mixed class styles', () => {
    const template = require('./fixtures/template-mixed')
    const classes = getClassesFromTemplate(template)

    expect(classes).toHaveLength(7)
    expect(classes).toEqual([
      'container',
      'columns',
      'column',
      'button',
      'is-info',
      'notification',
      'is-active'
    ])
  })
})

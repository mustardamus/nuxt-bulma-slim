const { join } = require('path')
const nuxtModule = require('../lib')

describe('Nuxt Module', () => {
  it('should work', () => {
    const context = {
      options: {
        rootDir: join(__dirname, '..'),
        srcDir: join(__dirname, '../example'),
        css: [],
        build: {}
      }
    }
    const options = {}

    nuxtModule.call(context, options)

    expect(context.options.build.postcss).toEqual({
      plugins: {
        'postcss-custom-properties': {
          warnings: false
        }
      }
    })
  })
})

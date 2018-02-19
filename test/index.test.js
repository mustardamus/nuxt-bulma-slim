const { join } = require('path')
const nuxtModule = require('../lib')

describe('Nuxt Module', () => {
  it('should work', () => {
    const context = {
      options: {
        srcDir: join(__dirname, '..'),
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

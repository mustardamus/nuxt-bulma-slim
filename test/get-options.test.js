const { join } = require('path')
const getOptions = require('../lib/get-options')

describe('Options', () => {
  it('should return the default options with expanded paths', () => {
    const srcDir = __dirname
    const rootDir = __dirname
    const options = getOptions({ srcDir, rootDir }, {})
    const tmpPath = join(rootDir, '.tmp')

    expect(options.srcGlobs).toEqual([
      join(__dirname, 'layouts/**/*.vue'),
      join(__dirname, 'pages/**/*.vue'),
      join(__dirname, 'components/**/*.vue')
    ])

    expect(options.variablesPath).toBe(null)
    expect(options.sassTempPath).toBe(join(tmpPath, 'nuxt-bulma-slim.sass'))
    expect(options.cssTempPath).toBe(join(tmpPath, 'nuxt-bulma-slim.css'))
    expect(options.disablePostCSSWarnings).toBe(true)
    expect(options.whitelist).toEqual([])
    expect(options.whitelistPatterns).toEqual([])
    expect(options.whitelistPatternsChildren).toEqual([])
    expect(options.additionalPaths).toEqual([])
  })

  it('should overwrite default options', () => {
    const srcDir = __dirname
    const rootDir = __dirname
    const customOptions = {
      srcGlobs: ['/test'],
      variablesPath: '/test.sass',
      sassTempPath: '/test.sass',
      cssTempPath: '/test.css',
      disablePostCSSWarnings: false,
      whitelist: ['test'],
      whitelistPatterns: ['test'],
      whitelistPatternsChildren: ['test'],
      additionalPaths: ['/test'],
      srcDir: '/test',
      rootDir: '/test'
    }
    const options = getOptions({ srcDir, rootDir }, customOptions)

    expect(options).toEqual(customOptions)
  })

  it('should automatically set variablesPath if assets/sass/variables.sass exists', () => {
    const srcDir = join(__dirname, 'fixtures/sass')
    const rootDir = __dirname
    const options = getOptions({ srcDir, rootDir }, {})

    expect(options.variablesPath).toBe(
      join(srcDir, 'assets/sass/variables.sass')
    )
  })

  it('should automatically set variablesPath if assets/scss/variables.scss exists', () => {
    const srcDir = join(__dirname, 'fixtures/scss')
    const rootDir = __dirname
    const options = getOptions({ srcDir, rootDir }, {})

    expect(options.variablesPath).toBe(
      join(srcDir, 'assets/scss/variables.scss')
    )
  })
})

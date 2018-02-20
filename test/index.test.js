const { join } = require('path')
const { tmpdir } = require('os')
const { existsSync, readFileSync } = require('fs')
const nuxtModule = require('../lib')

const bulmaPath = join(__dirname, '../node_modules/bulma')

describe('Nuxt Module', () => {
  it('should work with the default options', () => {
    const context = {
      options: {
        rootDir: join(__dirname, '..'),
        srcDir: join(__dirname, '../example'),
        css: [],
        build: {}
      }
    }

    nuxtModule.call(context)

    expect(context.options.build.postcss).toEqual({
      plugins: {
        'postcss-custom-properties': {
          warnings: false
        }
      }
    })

    expect(context.options.css).toHaveLength(1)
  })

  it('should write full bulma sass build if on development', () => {
    const context = {
      options: {
        dev: true,
        rootDir: join(__dirname, '..'),
        srcDir: join(__dirname, '../example'),
        css: [],
        build: {}
      }
    }
    const sassTempPath = join(tmpdir(), 'nuxt-bulma-slim.full.sass')
    const options = { sassTempPath, variablesPath: false }

    nuxtModule.call(context, options)

    expect(existsSync(sassTempPath)).toBe(true)
    expect(context.options.css).toHaveLength(1)
    expect(context.options.css[0]).toBe(sassTempPath)

    const lines = readFileSync(sassTempPath, 'utf8').split('\n')

    expect(lines).toHaveLength(6) // _all
    expect(lines[0].includes(bulmaPath)).toBe(true)
  })

  it('should write the slim bulma sass build if on production', () => {
    const context = {
      options: {
        dev: false,
        rootDir: join(__dirname, '..'),
        srcDir: join(__dirname, '../example'),
        css: [],
        build: {}
      }
    }
    const sassTempPath = join(tmpdir(), 'nuxt-bulma-slim.slim.sass')
    const options = { sassTempPath, variablesPath: false }

    nuxtModule.call(context, options)

    expect(existsSync(sassTempPath)).toBe(true)
    expect(context.options.css).toHaveLength(1)
    expect(context.options.css[0]).toBe(sassTempPath)

    const lines = readFileSync(sassTempPath, 'utf8').split('\n')

    expect(lines).toHaveLength(7) // each used feature
    expect(lines[0].includes(bulmaPath)).toBe(true)
  })

  it('should include the variables file in the build', () => {
    const context = {
      options: {
        dev: true,
        rootDir: join(__dirname, '..'),
        srcDir: join(__dirname, '../example'),
        css: [],
        build: {}
      }
    }
    const sassTempPath = join(tmpdir(), 'nuxt-bulma-slim.slim.sass')
    const variablesPath = join(
      __dirname,
      '../example/assets/sass/variables.sass'
    )
    const options = { sassTempPath, variablesPath }

    nuxtModule.call(context, options)

    expect(existsSync(sassTempPath)).toBe(true)
    expect(context.options.css).toHaveLength(1)
    expect(context.options.css[0]).toBe(sassTempPath)

    const lines = readFileSync(sassTempPath, 'utf8').split('\n')

    expect(lines).toHaveLength(7) // each feature
    expect(lines[1].includes(bulmaPath)).toBe(true)
  })

  it('should write full bulma css build if on development', () => {
    const context = {
      options: {
        dev: true,
        rootDir: join(__dirname, '../node_modules/lodash.trim'), // to read the package.json that doesnt have sass dependencies
        srcDir: join(__dirname, '../example'),
        css: [],
        build: {}
      }
    }
    const cssTempPath = join(tmpdir(), 'nuxt-bulma-slim.full.css')
    const options = { cssTempPath, variablesPath: false }

    nuxtModule.call(context, options)

    expect(existsSync(cssTempPath)).toBe(true)
    expect(context.options.css).toHaveLength(1)
    expect(context.options.css[0]).toBe(cssTempPath)
    expect(existsSync(cssTempPath)).toBe(true)
  })

  it('should write slim bulma css build if on development', () => {
    const context = {
      options: {
        dev: false,
        rootDir: join(__dirname, '../node_modules/lodash.trim'), // to read the package.json that doesnt have sass dependencies
        srcDir: join(__dirname, '../example'),
        css: [],
        build: {}
      }
    }
    const cssTempPath = join(tmpdir(), 'nuxt-bulma-slim.slim.css')
    const options = { cssTempPath, variablesPath: false }

    nuxtModule.call(context, options)

    expect(existsSync(cssTempPath)).toBe(true)
    expect(context.options.css).toHaveLength(1)
    expect(context.options.css[0]).toBe(cssTempPath)
    expect(existsSync(cssTempPath)).toBe(true)
  })
})

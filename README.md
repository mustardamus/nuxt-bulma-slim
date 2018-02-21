# nuxt-bulma-slim

[Nuxt.js](https://nuxtjs.org) module to automatically make a slim
[Bulma](https://bulma.io) build of used features.


## Setup

Install the dependency:

```shell
npm install nuxt-bulma-slim
```

Add it to the `modules` section of `nuxt.config.js`:

```javascript
{
  modules: [
    'nuxt-bulma-slim'
  ]
}
```

Or with custom options:

```javascript
{
  modules: [
    [
      'nuxt-bulma-slim',
      {
        variablesPath: 'assets/scss/variables.scss'
      }
    ]
  ]
}
```


## Options

### `srcGlobs`

This is an Array of [globs](https://github.com/sindresorhus/globby). This module
will parse all the `*.vue` files it finds and extracts the used classes.

Note that the files have to be single file components with the `.vue`
extension.

#### Default

```javascript
srcGlobs = [
  '<Nuxt App srcDir>/layouts/**/*.vue',
  '<Nuxt App srcDir>/pages/**/*.vue',
  '<Nuxt App srcDir>/components/**/*.vue'
]
```

### `variablesPath`

This is a String of a path to a `.sass`/`.scss` file that contains variables.
Use this file to overwrite
[Bulma's variables](https://bulma.io/documentation/overview/variables/).

Note that the path can be absolute or relative to the Nuxt App `srcDir` and must
be a `.sass` or `.scss` file.

#### Default

```javascript
variablesPath = '<Nuxt App srcDir>/assets/sass/variables.sass'
```

### `sassTempPath`

This is a String of a path to the temporary `.sass` file that will be consumed
by Nuxt.

#### Default

```javascript
sassTempPath = '<OS temp dir>/nuxt-bulma-slim.sass'
```

### `cssTempPath`

This is a String of a path to the temporary `.css` file that will be consumed
by Nuxt.

#### Default

```javascript
sassTempPath = '<OS temp dir>/nuxt-bulma-slim.css'
```

### `disablePostCSSWarnings`

This is a Boolean to disable PostCSS warnings when compiling Bulma's SASS to
CSS. If `true`, it will set this option in the Nuxt settings:

```javascript
{
  build: {
    postcss: {
      plugins: {
        'postcss-custom-properties': {
          warnings: false
        }
      }
    }
  }
}
```

Check out the [related issue](https://github.com/nuxt/nuxt.js/issues/1670).

#### Default

```javascript
disablePostCSSWarnings = true
```


## How does it work?



## Development

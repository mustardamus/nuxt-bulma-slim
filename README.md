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

This is a String of a path to a `*.sass`/`*.scss` file that contains variables.
Use this file to overwrite
[Bulma's variables](https://bulma.io/documentation/overview/variables/).

Note that the path can be absolute or relative to the Nuxt App `srcDir`.

#### Default

```javascript
variablesPath = '<Nuxt App srcDir>/assets/sass/variables.sass'
```

### `sassTempPath`
### `cssTempPath`
### `disablePostCSSWarnings`


## How does it work?



## Development

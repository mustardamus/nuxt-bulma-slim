# nuxt-bulma-slim

[Nuxt.js](https://nuxtjs.org) module to automatically make a slim
[Bulma](https://bulma.io) build of used features with
[Purgecss](https://www.purgecss.com). Simply drop in this module and
save precious kilobytes. Also gets rid of annoying warnings for you.

![Demo](./example/assets/images/demo.png)


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
        variablesPath: 'assets/scss/my-variables.scss',
        additionalPaths: ['assets/scss/component-styles.scss']
      }
    ]
  ]
}
```


## Options

### `srcGlobs`

This is an Array of glob paths. These paths can be absolute or relative to the
Nuxt App `srcDir` option. The Array is passed to Purgecss'
[`content`](https://www.purgecss.com/configuration.html#content) option.

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
[Bulma's variables](https://bulma.io/documentation/overview/variables).

Note that the path can be absolute or relative to the Nuxt App `srcDir` option
and must be a `.sass` or `.scss` file.

For convenience this module checks if one of these files exists and
automatically set the `variablesPath` option if you haven't set it already:

- `<Nuxt App srcDir>/assets/sass/variables.sass`
- `<Nuxt App srcDir>/assets/scss/variables.scss`

#### Default

```javascript
variablesPath = null // if none of the above files exist, or ...
variablesPath = '<Nuxt App srcDir>/assets/sass/variables.sass' // or ...
variablesPath = '<Nuxt App srcDir>/assets/scss/variables.scss'
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

### `whitelist`

This is an Array of whitelisted selectors and is given to Purgecss'
[`whitelist`](https://www.purgecss.com/configuration.html#whitelist) option.

Note that `html` and `body` are already whitelisted by this module.

#### Default

```javascript
whitelist = []
```

### `whitelistPatterns`

This is an Array of whitelisted selectors based on RegEx and is given to
Purgecss'
[`whitelistPatterns`](https://www.purgecss.com/configuration.html#whitelistpatterns)
option.

#### Default

```javascript
whitelistPatterns = []
```


## How does it work?

First all classes that Bulma provides are extracted along with the source files
where they were found. For example the extracted class `.container` can be found
in `bulma/sass/elements/container.sass`.

Second all single file components (`*.vue` files in `layouts`, `pages` and
`components` by default) are parsed for the `<template/>`. Then all used
classes are extracted.

The parser supports normal `class`es, and bound `:class`es. Take this template
for example:

```html
<template>
  <div :class="{
    container: true,
    'is-fluid': isFluid
  }">
    <div class="columns">
      <div class="column">
        Left
      </div>
      <div :class="'column ' + columnWidth">
        Right
      </div>
    </div>
  </div>
</template>
```

The parser will extract the following classes from the template:

```
.container, .is-fluid, .columns, .column
```

Then these extracted classes are checked against the classes provided by Bulma.
If they match, the related source file is added to the Bulma build.

If the [node-sass](https://github.com/sass/node-sass) and
[sass-loader](https://github.com/webpack-contrib/sass-loader) dependencies are
found in the current project, it will write a temporary `.sass` file with all
used Bulma features. Then this temporary file is given to Nuxt to compile and
use.

If one or all dependencies are missing, the module will compile the SASS Bulma
build to CSS and write it to a temporary `.css` file. Then this temporary file
is given to Nuxt to use.

Note that the custom build is only made when in production mode (`nuxt build`).
For development, the whole of Bulma is used so every feature is available.

You can create the file `assets/sass/variables.sass` (or set the
`variablesPath` option) to overwrite
[Bulma's variables](https://bulma.io/documentation/overview/variables/). This
file is simply put in front of the used Bulma SASS files, electively overwriting
every variable that follows.


## Development

#### `npm test`

Run all the tests.

#### `npm run test:watch`

Re-run specific tests on file changes.

#### `npm run lint`

Lint all the code.

#### `npm run lint:fix`

Lint all the code and try to auto-repair problems.

#### `npm run dev`

Run the `./example` Nuxt App in dev mode (will use the whole Bulma library).

#### `npm run build`

Build the example Nuxt App (will only bundle Bulma features that are used).

#### `npm start`

Will start the example Nuxt App in production.

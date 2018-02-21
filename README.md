# nuxt-bulma-slim

[Nuxt.js](https://nuxtjs.org) module to automatically make a slim Bulma build of
used features.


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


## How does it work?


## Options

### `srcGlobs`
### `variablesPath`
### `sassTempPath`
### `cssTempPath`
### `disablePostCSSWarnings`


## Development

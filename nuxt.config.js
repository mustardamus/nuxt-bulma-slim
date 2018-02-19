module.exports = {
  srcDir: './example',
  modules: [
    [
      './lib',
      {
        variablesPath: 'assets/sass/variables.sass'
      }
    ]
  ],
  build: {
    extractCSS: true
  }
}

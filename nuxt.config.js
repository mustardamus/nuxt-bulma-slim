module.exports = {
  srcDir: './example',
  modules: [
    [
      './lib',
      {
        additionalPaths: ['assets/sass/additional.sass']
      }
    ]
  ],
  build: {
    extractCSS: true
  }
}

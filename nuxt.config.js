module.exports = {
  srcDir: './example',
  modules: [
    [
      './lib',
      {
        additionalPaths: ['assets/sass/additional.sass'],
        whitelist: ['whitelist'],
        whitelistPatterns: [/whitelist-patterns/],
        whitelistPatternsChildren: [/children/]
      }
    ]
  ],
  build: {
    extractCSS: true
  }
}

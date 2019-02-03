module.exports = {  
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/styles.scss";`
      }
    }
  },
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  }
}

module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.98.123.211',
        ws: true,
        changeOrigin: true
        // 不需要重写，因为原本的接口就有/api
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    }
  }
}

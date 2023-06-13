const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //关闭eslint
  lintOnSave: false,
  //代理跨域
  devServer: {
    port:8081,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',     //'服务器真实地址',
        changeOrigin: true, // 是否跨域
      }
    }
  },
  //打包
  publicPath: '/admin/',//公共路径
})

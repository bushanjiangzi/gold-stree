const target = 'http://10.10.9.77:8090' // 李像华本地
// const target = 'http://10.10.7.27:8090' // 测试环境

module.exports = {
  proxy: {
    '/xiaoxian': {
      target,
      changeOrigin: true, // 是否跨域
      pathRewrite: {
        '^/xiaoxian': '/'
      } // 路径重定向
    },
    '/hongxu': {
      target,
      changeOrigin: true, // 是否跨域
      pathRewrite: {
        '^/hongxu': '/'
      } // 路径重定向
    },
    '/lixin': {
      target,
      changeOrigin: true, // 是否跨域
      pathRewrite: {
        '^/lixin': '/'
      } // 路径重定向
    },
    '/huangshan': {
      target,
      changeOrigin: true, // 是否跨域
      pathRewrite: {
        '^/huangshan': '/'
      } // 路径重定向
    },
    '/yangsen': {
      target,
      changeOrigin: true, // 是否跨域
      pathRewrite: {
        '^/yangsen': '/'
      } // 路径重定向
    }, // 开发环境
    '/xianghua': {
      target,
      changeOrigin: true, // 是否跨域
      pathRewrite: {
        '^/xianghua': '/'
      } // 路径重定向
    }, // 开发环境
    '/': {
      target: 'http://10.10.9.220:8090',
      changeOrigin: true
    }
  }
}

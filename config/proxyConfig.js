//  const target = 'http://10.10.9.77:7090' // 李像华本地
// const target = 'http://10.10.7.27:8090' // 测试环境
//const target = 'http://139.9.26.115:7090' // 华为云
// const target = 'http://202.109.145.152:7090' // 金街

let isDev = process.env.NODE_ENV === 'development'
let target = ''
if (isDev) {
  target = 'http://202.109.145.152:7090' // 金街
} else {
  target = 'http://127.0.0.1:7090'
}

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
    '/admin': {
      target,
      changeOrigin: true,
      pathRewrite: {
        '^/admin': '/admin'
      } // 路径重定向
    }
  }
}

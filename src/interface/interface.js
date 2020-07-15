import {get, post} from '../common/http.js'
// import HeartCheck from '../common/heartCheck'

let isDev = process.env.NODE_ENV === 'development'
let apiUrl = {
  login: '/hongxu/api/saas/user/login',
 
}

export const User = {
  login: function (data) {
    post(apiUrl.login, data.params).then(data.success).catch(data.error)
  } // 登录
}


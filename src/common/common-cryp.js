import AES from 'crypto-js/aes'
import Utf8 from 'crypto-js/enc-utf8'
import ECB from 'crypto-js/mode-ecb'
import Pkcs7 from 'crypto-js/pad-pkcs7'
var aseKey = '19qx_ZN&19qx_ZN&' // 秘钥必须为：8/16/32位

const CommonCryp = {
  // 加密
  encrypt: function (data) {
    return AES.encrypt(data, Utf8.parse(aseKey), {
      mode: ECB,
      padding: Pkcs7
    }).toString()
  },
  // 解密
  decrypt: function (data) {
    return AES.decrypt(data, Utf8.parse(aseKey), {
      mode: ECB,
      padding: Pkcs7
    }).toString(Utf8)
  }
}

export {CommonCryp}

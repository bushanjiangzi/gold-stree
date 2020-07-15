<template>
  <div>
    <box class="login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm" @submit.native.prevent>
          <div class="form-top">
            <img src="../assets/image/S_BANNER.png">
          </div>
          <div class="form-bottom">
            <h3 class="title">登录</h3>
            <!-- <p>尚未成为会员？<span @click="$router.push({name: '注册'})">立刻注册</span></p> -->
            <el-form-item prop="username" class="marginB20">
              <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="请输入您的手机号">
              </el-input>
            </el-form-item>
            <el-form-item prop="password" class="marginB20">
              <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="请输入密码">
                <template slot="prepend">
                </template>
              </el-input>
            </el-form-item>
            <!-- <el-form-item prop="code" class="marginB35">
              <el-input type="text" class="code"  v-model="ruleForm.code" auto-complete="off" placeholder="请输入右侧验证码" @keyup.enter.native="handleSubmit('ruleForm')"></el-input>
              <img :src="codeImg" class="vm" @click="getImgCode">
            </el-form-item> -->
            <el-form-item class="tc">
              <el-button type="primary" class="submit-button" @click.native.prevent="handleSubmit('ruleForm')"  :loading="logining">登录</el-button>
              <!-- <p class="forget-password" @click="$router.push({name: '修改密码'})">忘记密码了吗</p> -->
            </el-form-item>
          </div>
      </el-form>
    </box>
  </div>
</template>
<script>
import Box from '@/components/box.vue'
import {CommonCryp} from '@/common/common-cryp'
import { User } from '@/interface/interface'

export default {
  name: 'login',
  components: {
    Box
  },
  data () {
    var validateUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      let reg = /^1[3456789]\d{9}$/
      setTimeout(() => {
        if (!reg.test(value)) {
          callback(new Error('手机号格式不对'))
        } else {
          callback()
        }
      }, 0)
    }
    var validatePwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'))
      }
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/
      setTimeout(() => {
        if (!reg.test(value)) {
          callback(new Error('密码长度不少于8位，且必须有数字和字母'))
        } else {
          callback()
        }
      }, 0)
    }
    // var validateCode = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('验证码不能为空'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      logining: false,
      ruleForm: {
        username: '',
        password: ''
        // code: ''
      },
      rules: {
        username: [
          {validator: validateUser, trigger: 'blur'}
        ],
        password: [
          {validator: validatePwd, trigger: 'blur'}
        ]
        // code: [
        //   {
        //     validator: validateCode, trigger: 'blur'
        //   }
        // ]
      },
      codeImg: '',
      date: ''
    }
  },
  created () {
    // this.getImgCode()
    if (localStorage.phone) {
      this.ruleForm.username = localStorage.phone
    }
  },
  mounted () {
    sessionStorage.clear()
  },
  methods: {
    // 获取图形验证图片
    getImgCode () {
      this.date = new Date().getTime()
      this.codeImg = this.urlObj.interfaceUrl + '/api/saas/user/getCode?timekey=' + this.date
    },
    // 登录
    handleSubmit (ruleForm) {
      this.logining = true
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          User.login({
            params: {
              phone: this.ruleForm.username,
              password: CommonCryp.encrypt(this.ruleForm.password),
              code: this.ruleForm.code,
              timekey: this.date
            },
            success: (res) => {
              sessionStorage.clear()
              if (res.code === '30016') {
                // this.getImgCode()
              } else {
                localStorage.phone = this.ruleForm.username
                sessionStorage.setItem('account', res.data.user.account)
                sessionStorage.setItem('username', this.ruleForm.username)
                sessionStorage.setItem('userId', res.data.user.id)
                sessionStorage.setItem('flagType', '0')
                sessionStorage.setItem('sn', res.data.token)
                this.$router.push({name: '主页'})
              }
            },
            error: (err) => {
              console.log('error', err)
            }
          })
          setTimeout(() => {
            this.logining = false
          }, 100)
        } else {
          this.logining = false
          return false
        }
      })
    }
  }
}
</script>

<style>
  .login .title {
    margin-bottom: 15px;
    margin-left: 8px;
    font-size: 24px;
    color: #202020;
    font-family: "PingFang-SC-Regular";
    font-weight: normal;
  }
  .login .title+p{
    margin-bottom: 25px;
    margin-left: 8px;
    color: #252525;
  }
  .login .title+p span{
    color: #2472E1;
    cursor: pointer;
  }
  .login .form-top>img{
    width: 100%;
  }
  .login .el-input-group__prepend {
    height: 48px;
    border-radius: 10px 0 0 10px;
    background-color: #fff;
    border: 1px solid #e6e6e6;
    border-right: 0px;
  }
  .login .el-input-group__append,.login  .el-input-group__prepend {
    padding: 0 18px;
  }
  .login .el-form-item{
    width: 373px;
    margin: 0 auto;
  }
  .login .el-form-item .el-input__inner{
    border: 1px solid rgb(24, 24, 24);
    height: 46px;
    border-radius: 0;
  }
  .login .el-form-item.is-error .el-input__inner,.login .el-form-item.is-success .el-input__inner {
    border-color: rgb(24, 24, 24);
  }
  .login .marginB20 {
    margin-bottom: 20px;
  }
  .login .marginB35 {
    margin-bottom: 35px;
  }
  .login footer{
    position: absolute;
    bottom: 0.6rem;
    left: 50%;
    transform: translate(-50%,0);
    color: #fff;
  }
  .login span.dib{
    margin: 5px 25px;
    color: #fff;
  }
  .login .code.el-input{
    width: auto;
  }
  .login .code input.el-input__inner{
    width: 253px;
  }
  .login .code+img, .login .code{
    display: inline-block;
  }
  .login .submit-button{
    width: 374px;
    height: 50px;
    border-radius: 5px;
    background-color: #0092E6;
    color: #fff;
  }
  .login .submit-button span{
    font-size: 18px;
    font-family: 'PingFang-SC-Regular';
  }
  .login ::-webkit-input-placeholder { /* WebKit browsers */
    color: #5f5f5f;
    font-size: 16px;
  }

  .login ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #5f5f5f;
    font-size: 16px;
  }

  .login :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #5f5f5f;
    font-size: 16px;
  }
  .login .forget-password {
    display: inline-block;
    color: #2472E1;
    cursor: pointer;
  }
</style>

<template>
  <div class="header-nav" :class="{'active': $route.name !== '主页'}">
    <div class="fr">
      <!-- <i v-if="$route.name !== '主页'" class="iconfont icon-zhuye" @click="gotoHome" title="回到主页"></i> -->
      <i class="iconfont icon-guanyu1"></i>
      <i class="iconfont icon-xiazai"></i>
      <div class="sm-box">
        <i class="iconfont icon-tixing"></i>
        <span></span>
      </div>
      <!-- <i class="iconfont icon-d--1" @click="goto3D" title="打开3D场景控制"></i> -->
      <!-- <i class="iconfont icon-keshihuashujuETL" @click="gotoHadoop" title="打开3D大数据"></i> -->
      <div>
        <div class="circle">
          <i class="iconfont icon-yonghu"></i>
        </div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{user}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="set">设置</el-dropdown-item>
            <el-dropdown-item command="exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div>
       <h3><img src="@/assets/image/logo.png" ></h3>
    </div>
    <!-- <popup-box :download-url="downloadUrl" v-show="isShow" @closePopBox="isShow=false" @close-pop="isShow = false"></popup-box> -->
  </div>
</template>
<script>
import { User } from '../interface/interface'
import {get} from '@/common/http.js'
import Bus from '@/common/Bus'

export default {
  name: 'headerNav',
  components: {
    // popupBox
  },
  props: {
    titleName: String
  },
  data () {
    return {
      user: sessionStorage.getItem('username'),
      systemName: sessionStorage.getItem('systemName'),
      localUrl: '', // 本地url
      downloadUrl: '', // 下载链接
      isShow: false,
      ws: ''
    }
  },
  mounted () {
    Bus.$on('voiceControlPage', (data) => {
      switch (data) {
        case '6':
          this.gotoHadoop()
          break
      }
    })
  },
  beforeDestroy () {
    Bus.$off('voiceControlPage')
  },
  methods: {
    handleCommand (command) {
      switch (command) {
        case 'set':
          break
        case 'exit':
          User.logout({
            params: {},
            success: ({code, msg, data}) => {
              this.$message.success('退出成功')
              this.$router.push({name: 'Login'})
            },
            error: (err) => {
              console.log('error', err)
            }
          })
          break
      }
    },
    gotoHome () {
      this.$router.push({name: '主页'})
    },
    goto3D () {
      let _this = this
      Ws.getLocalIp({
        message: (ev, ws) => {
          _this.localUrl = ev.data
          get('http://' + _this.localUrl + ':2020/api/checkfile/home/QX21').then((res) => {
            if (res.result) {
              _this.gotoClient()
            } else {
            }
            ws.close()
          }).catch()
        },
        error: () => {
          _this.downloadFile()
        }
      })
    },
    gotoClient () {
      get('http://' + this.localUrl + ':2020/run/home/QX21?token=' + sessionStorage.sn + '&page=default').then(() => {
        this.$message.success('启动成功')
      }).catch(() => {})
    },
    downloadFile () {
      Client.getInstallFile({
        params: {},
        success: ({code, data, msg}) => {
          this.isShow = true
          this.downloadUrl = data.fileUrl
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    gotoHadoop () {
      // window.open(window.location.href.split('#')[0] + '#/data_visualization', '_blank')
      let _this = this
      Ws.getLocalIp({
        message: (ev, ws) => {
          _this.localUrl = ev.data
          get('http://' + _this.localUrl + ':2020/api/checkfile/home/QX21').then((res) => {
            if (res.result) {
              _this.gotoHadoopClient()
            } else {
            }
            ws.close()
          }).catch()
        },
        error: () => {
          _this.downloadFile()
        }
      })
    },
    gotoHadoopClient () {
      get('http://' + this.localUrl + ':2020/run/home/QX21?token=' + sessionStorage.sn + '&page=datapage').then(() => {
        this.$message.success('启动成功')
      }).catch(() => {})
    }
  }
}
</script>
<style>
.header-nav{
  height: 70px;
  background:linear-gradient(180deg,rgba(204,220,231,0.85),rgba(108,134,169,0.51));
  box-shadow:0px 2px 6px 0px rgba(68,116,161,0.95);
  z-index: 2;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
}
.header-nav.active{
  background: none;
  background-color: #fff;
  box-shadow: none;
}
.header-nav>div>h3{
  display: inline-block;
  margin-left: 19px;
  height: 70px;
  line-height: 70px;
  font-weight: normal;
}
.header-nav h3 span{
  display: inline-block;
  font-size: 20px;
  color: #FFF;
  vertical-align: middle;
}
.header-nav.active h3 span{
  color: #3B474E;
}
.header-nav h3 img{
  margin-right: 20px;
  width: 208px;
  vertical-align: middle;
}
.header-nav>div{
  line-height: 70px;
}
.header-nav>div.fr{
  margin-right: 42px;
}
.header-nav>div>div{
  display: inline-block;
}
.header-nav>div>div .circle{
  display: inline-block;
  margin-right: 12px;
  width: 28px;
  height: 28px;
  line-height: 28px;
  background-color: rgb(0, 252, 255);
  border-radius: 50%;
  vertical-align: baseline;
  text-align: center;
}
.header-nav>div .iconfont{
  display: inline-block;
  margin-right: 25px;
  font-size: 23px;
}
.header-nav>div .iconfont.icon-yonghu{
  color: #167F96;
  margin-right: 0;
}
.header-nav>div .el-dropdown-link {
  font-size: 16px;
  color: #6FFEFF;
}
.header-nav.active>div .el-dropdown-link{
  color: #5e6a78;
}
.header-nav .icon-zhuye,.header-nav .icon-guanyu1,.header-nav .icon-xiazai{
  cursor: pointer;
}
.header-nav .icon-zhuye{
  color: #FA8A01;
}
.header-nav .icon-guanyu1{
  color: #00CDA9;
}
.header-nav .icon-xiazai{
  color: #457c96;
}
.header-nav .icon-tixing{
  color: #628EBA;
}
.header-nav .icon-d--1{
  color: #238979;
  cursor: pointer;
}
.header-nav .icon-keshihuashujuETL{
  color: #008aca;
  cursor: pointer;
}
.header-nav .icon-zhuye:hover, .header-nav .icon-guanyu1:hover, .header-nav .icon-xiazai:hover, .header-nav .icon-tixing:hover{
  color: #00FFF8
}
.header-nav .sm-box{
  position: relative;
}
.header-nav .sm-box>span{
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background:linear-gradient(180deg,rgba(255,174,0,1),rgba(241,76,3,1));
  left: 15px;
  top: 23px;
}
.el-dropdown-menu{
  width: 128px;
}
.el-dropdown-menu .el-dropdown-menu__item{
  height: 36px;
  line-height: 36px;
}
.fr {
  float: right;
}
</style>

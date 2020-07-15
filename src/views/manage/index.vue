<template>
  <div class="index" @click="closeRightBox">
    <header-nav :title-name="titleName"></header-nav>
    <side-bar :active-index="activeIndex" @get-sidebar-arr="getSideBarArr"></side-bar>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Bus from '@/common/Bus'
import HeaderNav from '@/components/headerNav.vue'
import SideBar from '@/components/sidebar.vue'

export default {
  name: 'index',
  components: {
    HeaderNav,
    SideBar
  },
  data () {
    return {
      sidebarArr: [],
      titleName: '',
      intervalObj: '',
      activeIndex: ''
    }
  },
  watch: {
    $route (to, from) {
      const path = window.location.href.split('#')[1].split('?')[0]
      // 如果当前路径是在$router.options.route[0]一级目录下,则:
      const activeIndexObj = this.sidebarArr.find(function (item, index) {
        return path === item.path || ('/' + path.split('/')[1]) === item.path
      })
      this.activeIndex = activeIndexObj.name
    }
  },
  created () {
    window.addEventListener('keydown', this.tabEvent)
    setTimeout(() => {
      // 刷新后判断url与vue-router中的配置文件进行匹配，选择符合当前url的内容
      const path = window.location.href.split('#')[1].split('?')[0]
      // 如果当前路径是在$router.options.route[0]一级目录下,则
      const activeIndexObj = this.sidebarArr.find(function (item, index) {
        return path === item.path || ('/' + path.split('/')[1]) === item.path
      })
      this.activeIndex = activeIndexObj.name
    })
  },
  mounted () {
    window.addEventListener('hashchange', () => {
      let currentPath = window.location.hash.slice(1)
      if (this.$route.path !== currentPath) {
        this.$router.push(currentPath)
      }
    })
    // window.addEventListener('resize', () => {
    //   document.body.clientWidth = document.body.clientWidth
    //   document.body.clientHeight = document.body.clientHeight
    // })
  },
  methods: {
    closeRightBox () {
      Bus.$emit('hiddenRightBox', false)
    },
    getSideBarArr (data) {
      this.sidebarArr = data
    },
    tabEvent (event) {
      const ev = event || window.event
      if (ev.keyCode === 9) {
        ev.preventDefault()
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.intervalObj)
    window.removeEventListener('keydown', this.tabEvent)
  }
}
</script>
<style>
.main{
  padding-left: 186px;
  height: calc(100vh - 70px);
  box-sizing: border-box;
  background-color: #D7D6D6;
}
</style>

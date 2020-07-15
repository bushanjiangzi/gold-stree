<template>
  <section id="sidebar" class="sidebar" :class="[isCollapse?'sidebar-inactive':'']">
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
    <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :router="true" unique-opened>
    <!-- <el-menu :default-active="'1'" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :router="true" unique-opened> -->
      <div v-for="(item, index) in sidebarArr.children" :key="index">
        <el-submenu v-if="item.hasChild&&!item.isHidden" :index="item.name">
          <template slot="title">
            <i :class="item.iconClass"></i>
            <span index="1" slot="title" class="font15">{{item.name}}</span>
          </template>
          <el-menu-item-group v-for="(itemChildren, index1) in item.children" :key="index1">
            <el-menu-item v-if="!itemChildren.isHidden" :route="itemChildren.path"  :index="itemChildren.name" @click="changeActive">{{itemChildren.name}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item v-if="!item.hasChild&&!item.isHidden" :index="item.name"  :route="item.path" @click="changeActive">
          <i :class="item.iconClass"></i>
          <span slot="title"  class="font15">{{item.name}}</span>
        </el-menu-item>
      </div>
    </el-menu>
    <!-- <transition name="move">
      <div @click="isCollapse=!isCollapse" class="collapse-icon" :class="[isCollapse?'collapse':'notcollapse']">
        <i :class="[isCollapse?'el-icon-d-arrow-right': 'el-icon-d-arrow-left']"></i>
      </div>
    </transition> -->
  </section>
</template>
<script>
export default {
  props: {
    activeIndex: String
  },
  data () {
    return {
      isCollapse: false,
      sidebarArr: []
    }
  },
  watch: {
    isCollapse: function (value) {
      // this.$store.commit('changeIsCollapse', value)
    }
  },
  created () {
    this.sidebarArr = this.$router.options.routes.find((item, index) => {
      return this.$route.path.indexOf(item.path) !== -1 && item.path !== '/'
    })
    this.sidebarArr.children.forEach(element => {
      let arr = []
      if (element.name.indexOf('-') !== -1) {
        arr = element.name.split('-')
        // console.log(arr)
        element.name = arr[1]
        if (element.children && element.children.length) {
          element.children.forEach((item1) => {
            item1.name = item1.name.split('-')[1]
          })
        }
      }
    })
    this.$emit('get-sidebar-arr', this.sidebarArr.children)
  },
  methods: {
    handleOpen (key, keyPath) {

    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    changeActive (key) {
      // this.$store.dispatch('changeSubTitle',this.activeIndex)
      // Bus.$emit('changeSubTitle', this.activeIndex)
    }
  }
}
</script>
<style>
  .collapse {
    transition:all 0.3s ease-in-out;
    transform: translate3d(-156px,0,0);
  }
  .notcollapse {
    transition:all 0.3s ease-in-out;
    transform: translate3d(0,0,0);
  }
  .sidebar .el-menu{
    border-right: 0;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 185px;
    margin-top: 20px;
    /* border-top: 1px solid rgb(165,165,165); */
  }
  .el-menu--collapse>div>.el-menu-item span, .el-menu--collapse>div>.el-submenu>.el-submenu__title span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }
  .sidebar .el-menu-item-group__title {
    padding: 0 0 0 20px;
  }
  .sidebar,.sidebar .el-menu {
    background-color: #3a4a58;
  }
  .sidebar .el-menu-item,.sidebar .el-submenu__title{
    color: #fff;
  }
  .sidebar .el-menu-item span{
    margin-left: 10px;
  }
  .sidebar .el-menu-item i{
    font-size: 20px;
  }
  .sidebar .el-submenu__title span{
    margin-left: 15px;
  }
  .sidebar .el-menu-item:hover {
    background: linear-gradient(#405263, #52657a);
  }
  .sidebar .el-menu-item:focus{
    background: transparent;
  }
  .sidebar .iconfont{
    color: #fff;
  }
  .sidebar .el-submenu__title:hover {
    background-color: #376ca7;
  }
  .sidebar .el-menu-item.is-active {
    color: #00F6FF;
    background-color: #53657b;
    border-left: 2px solid #0ab0c6;
  }

  .sidebar .el-menu-item img,.sidebar .el-submenu__title img{
    margin-right: 10px;
  }
  #sidebar{
    float: left;
  }
  .font15{
    font-size: 15px;
  }
  .sidebar .collapse-icon{
    position: absolute;
    width: 20px;
    height: 20px;
    padding-top: 6px;
    top: 50%;
    left: 220px;
    background-color: #3a4a58;
    color: #fff;
    text-align: center;
    z-index: 2;
  }
  .sidebar>.el-menu{
    height: calc(100vh - 90px);
  }
  .sidebar .el-menu>div{
    margin-bottom: 1px;
  }
  .sidebar .el-submenu__title:focus,.sidebar .el-submenu__title:hover{
    background-color: #376ca7;
  }
  .sidebar .el-menu-item-group>ul{
    overflow: hidden;
  }
  .sidebar .el-menu-item-group>ul>li{
    padding-left: 54px!important;
  }
</style>

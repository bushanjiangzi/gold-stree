<template>
  <div class="popup-box">
    <div>
      <div class="popup-box-header">
        <h3><i class="fr el-icon-close" @click="$emit('closePopBox')"></i>提示</h3>
      </div>
      <div class="popup-box-main">
        <p>当前未检测到客户端服务，如果已安装服务，请启动服务</p>
        <el-button type="danger" @click="downloadClient">点击安装客户端</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    downloadUrl: String
  },
  data () {
    return {
    }
  },
  methods: {
    downloadClient () {
      window.open(this.downloadUrl)
      this.$emit('close-pop')
    }
  }
}
</script>
<style>
/* .popup-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.3);
  overflow: hidden;
  z-index: 10;
  >div{
    position: absolute;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);
    width: 420px;
    background-color: rgba(255, 255, 255, 0.95);
    .popup-box-header{
      height: 60px;
      padding: 0 20px;
      border-bottom: 1px solid #ccc;
      >h3{
        line-height: 60px;
        >i{
          line-height: 60px;
          cursor: pointer;
        }
      }
    }
    .popup-box-main{
      padding: 0 20px;
      text-align: center;
    }
  }
} */
</style>

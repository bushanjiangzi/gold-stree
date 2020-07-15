<template>
  <div class="box">
    <el-row class="box-container">
      <div>
        <slot></slot>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>

<style>
  .box {
    height: 100vh;
    background: url('../assets/image/S_BJ.png');
    background-size: 100% 100%;
  }
  .box>h3 {
    padding-left: 1rem;
    padding-top: 1rem;
  }
  .box>h3 span{
    font-size: 0.27rem;
    display: inline-block;
    color: #fff;
    height: 50px;
    vertical-align: middle;
  }
  .box .box-container {
    position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
  }
  .box-container>div{
    width: 425px;
    height: 550px;
    padding: 10px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
  }
  .box-container>div>form {
    height: 530px;
    background-color: #fff;
    box-sizing: border-box;
  }
  .box-container>div>form .form-top{
    height: 111px;
  }
  .box-container>div>form .form-bottom{
    padding: 25px 15px 20px 15px;
  }

  .box-container .el-form-item.is-error .el-input__inner,.box-container .el-form-item.is-success .el-input__inner {
    border-color: rgb(24, 24, 24);
  }
  .box .marginB20 {
    margin-bottom: 20px;
  }
  .box .marginB35 {
    margin-bottom: 35px;
  }
  .box .code.el-input{
    width: auto;
  }
  .box .code input.el-input__inner{
    width: 253px;
  }
  .box .code+img, .box .code{
    display: inline-block;
  }
  .box .submit-button{
    width: 374px;
    height: 50px;
    border-radius: 5px;
    background-color: #0092E6;
    color: #fff;
  }
  .box .submit-button span{
    font-size: 18px;
    font-family: 'PingFang-SC-Regular';
  }
  .box ::-webkit-input-placeholder { /* WebKit browsers */
    color: #5f5f5f;
    font-size: 16px;
  }

  .box ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #5f5f5f;
    font-size: 16px;
  }
  .box :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #5f5f5f;
    font-size: 16px;
  }
</style>

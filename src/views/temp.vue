<template>
  <div class="store">
    <div class="top">
      <div>数字金街 - 体温检测</div>
    </div>
    <div class="bottom">
      <div class="store-box">
        <div class="title">》实时抓拍</div>
        <div class="content">
          <div class="content-left">
            <div class="img-box">
              <img class="tixing-img tixing-left" src="../assets/image/tixing.png">
              <img class="tixing-img tixing-right" src="../assets/image/tixing.png">
              <img src="../assets/image/temp2.png">
            </div>
            <div class="temp-normal">体温：0℃</div>
          </div>
          <div class="content-right">
            <div class="progress-box">
              <div>
                <div>访客总量</div>
                <div class="box-top outside-border">0</div>
              </div>
              <div>
                <div>正常访客量</div>
                <div class="box-top">
                  <el-progress type="circle" :stroke-width="4" :percentage="0"></el-progress>
                </div>
              </div>
              <div>
                <div>异常访客量</div>
                <div class="box-top">
                  <el-progress type="circle" :stroke-width="4" :percentage="0"></el-progress>
                </div>
              </div>
              <div>
                <div>今日访客量</div>
                <div class="box-top outside-border">0</div>
              </div>
              <div>
                <div>今日正常访客量</div>
                <div class="box-top">
                  <el-progress type="circle" :stroke-width="4" :percentage="0"></el-progress>
                </div>
              </div>
              <div>
                <div>今日异常访客量</div>
                <div class="box-top">
                  <el-progress type="circle" :stroke-width="4" :percentage="0"></el-progress>
                </div>
              </div>
            </div>
            <div class="img-box">
              <img src="../assets/image/arrow.png" class="arrow-img arrow-img-left">
              <img src="../assets/image/arrow.png" class="arrow-img arrow-img-right">
              <div>
                <div class="img-relative">
                  <img class="tixing-img tixing-left" src="../assets/image/tixing.png">
                  <img class="tixing-img tixing-right" src="../assets/image/tixing.png">
                  <img src="../assets/image/temp1.png">
                </div>
                <div class="temp">体温：0℃</div>
              </div>
              <div>
                <div class="img-relative">
                  <img class="tixing-img tixing-left" src="../assets/image/tixing.png">
                  <img class="tixing-img tixing-right" src="../assets/image/tixing.png">
                  <img src="../assets/image/temp6.png">
                </div>
                <div class="temp">体温：0℃</div>
              </div>
              <div>
                <div class="img-relative">
                  <img class="tixing-img tixing-left" src="../assets/image/tixing.png">
                  <img class="tixing-img tixing-right" src="../assets/image/tixing.png">
                  <img src="../assets/image/temp3.png">
                </div>
                <div class="temp">体温：0℃</div>
              </div>
              <div>
                <div class="img-relative">
                  <img class="tixing-img tixing-left" src="../assets/image/tixing.png">
                  <img class="tixing-img tixing-right" src="../assets/image/tixing.png">
                  <img src="../assets/image/temp4.png">
                </div>
                <div class="temp">体温：0℃</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="back" @click="backTo3D">返回</button>
  </div>
</template>
<script>
export default {
  data () {},
  methods: {
    backTo3D () {
      exit_app_tw()
    }
  }
}
</script>
<style scoped>
.back{
  position: fixed;
  top: 40px;
  right: 50px;
  width: 100px;
  height: 48px;
  line-height: 48px;
  background: #00FFE4;
  border-radius: 15px;
  text-align: center;
  font-size: 24px;
  color: #fff;
}
.store {
  width: 100%;
  height: 100%;
  background: url("../assets/image/Bg.png");
  background-size: 100% 100%;
  font-size: 24px;
}
.store .top{
  background: url("../assets/image/head_top.png");
  background-size: 100% 100%;
  height: 85px;
  position: relative;
}
.store .top div{
  width: 300px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: #00EAFF;
  font-size: 30px;
  position: absolute;
  left: 50%;
  top: 18px;
  margin-left: -100px;
}
.store .bottom{
  margin-top: 15px;
  width: 100%;
  height: calc(100% - 85px);
  padding: 0 5px;
  display: flex;
  flex-direction: row;
}
.store .bottom .store-box{
  width: calc(100%);
  height: calc(100% - 60px);
  background:rgba(7,15,32,0.3);
  border:1px solid rgba(208, 236, 255, 0.2);
  box-shadow:0px 22px 32px 0px rgba(6,19,48,0.5);
  border-radius:10px;
  margin-right: 20px;
}
.store .bottom .store-box .title{
  display: inline-block;
  color: #00FFF6;
  font-size: 16px;
  width: 350px;
  height: 29px;
  background: linear-gradient(to right, #087FA4, #0D1835);
  margin-top: 44px;
  line-height: 29px;
  padding-left: 10px;
}
.store .bottom .store-box .content{
  padding: 24px 82px 0 82px;
  display: flex;
  color: #fff;
  font-size: 24px;
}
.store .bottom .store-box .content .content-left{
  text-align: center;
}
.store .bottom .store-box .content .content-left .img-box{
  position: relative;
  width: 465px;
  height: 623px;
  border-radius: 10px;
  border: 1px solid #00FFE4;
  /* overflow: hidden; */
}
.store .bottom .store-box .content .content-left .img-box img{
  width: 465px;
  height: 623px;
}
.store .bottom .store-box .content .content-left .img-box .tixing-img{
  position: absolute;
  top: 420px;
  width: 18px;
  height: 98px;
}
.store .bottom .store-box .content .content-left .img-box .tixing-left{
  transform: rotate(180deg);
  left: -13px;
}
.store .bottom .store-box .content .content-left .img-box .tixing-right{
  right: -13px;
}
.store .bottom .store-box .content .content-left .temp-normal{
  width: 412px;
  height: 63px;
  line-height: 63px;
  text-align: center;
  border-radius: 10px;
  border: 1px solid #00FFE4;
  margin-top: 26px;
  margin-left: 26px;
  background: #00FFE4;
  font-size: 24px;
}
.store .bottom .store-box .content .content-right {
  margin-left: 80px;
  flex-grow: 1;
}
.store .bottom .store-box .content .content-right .progress-box{
  display: flex;
  justify-content: space-around;
  text-align: center;
  border-bottom: 1px solid;
  padding: 45px 0;
  font-size: 20px;
}
.store .bottom .store-box .content .content-right .progress-box .outside-border{
  width: 126px;
  height: 126px;
  border-radius: 50%;
  border: 4px solid #FFEA56;
  line-height: 126px;
  box-sizing: border-box;
}
.store .bottom .store-box .content .content-right .progress-box .box-top{
  margin-top: 36px;
}
/deep/.el-progress--circle .el-progress__text, .el-progress--dashboard .el-progress__text {
  color: #fff;
}
.store .bottom .store-box .content .content-right .img-box{
  position: relative;
  display: flex;
  justify-content: space-around;
  text-align: center;
  margin-top: 60px;
}
.store .bottom .store-box .content .content-right .img-box .arrow-img{
  position: absolute;
  top: 120px;
  width: 25px;
  height: 44px;
}
.store .bottom .store-box .content .content-right .img-box .arrow-img-left{
  left: -20px;
  transform: rotateZ(180deg);
}
.store .bottom .store-box .content .content-right .img-box .arrow-img-right{
  right: -20px;
}
.store .bottom .store-box .content .content-right .img-box .temp{
  width: 216px;
  height: 63px;
  line-height: 63px;
  border-radius: 10px;
  background: #00FFE4;
  margin-top: 30px;
  font-size: 24px;
}
.store .bottom .store-box .content .content-right .img-box img{
  width: 200px;
  height: 290px;
}
.store .bottom .store-box .content .content-right .img-box .active{
  background: #FF1E27;
}
.store .bottom .store-box .content .content-right .img-box .img-relative {
  position: relative;
}
.store .bottom .store-box .content .content-right .img-box .tixing-img{
  position: absolute;
  top: 220px;
  width: 9px;
  height: 47px;
}
.store .bottom .store-box .content .content-right .img-box .tixing-left{
  transform: rotate(180deg);
  left: 2px;
}
.store .bottom .store-box .content .content-right .img-box .tixing-right{
  right: 2px;
}
</style>
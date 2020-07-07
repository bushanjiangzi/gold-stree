<template>
  <div class="store">
    <div class="top">
      <span>数字金街-店铺</span>
    </div>
    <div class="bottom">
      <div class="storeLeft"></div>
      <div class="storeRight">
        <div class="right_title">
          <span>分类排行</span>
          <span>店铺排行 </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style>
.store {
  width: 100%;
  height: 100%;
  background: url("../assets/image/Bg.png");
  background-size: 100% 100%;
}
.store .top{
  background: url("../assets/image/head_top.png");
  background-size: 100% 100%;
  height: 85px;
  position: relative;
}
.store .top span{
  width: 200px;
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
.storeLeft{
  width: calc(100% - 400px);
  height: calc(100% - 60px);
  background:rgba(7,15,32,0.3);
  border:1px solid rgba(208, 236, 255, 0.2);
  box-shadow:0px 22px 32px 0px rgba(6,19,48,0.5);
  border-radius:10px;
  margin-right: 20px;
}
.storeRight{
  width: 316px;
  height: calc(100% - 87px);
  background:rgba(7,15,32,0.3);
  border:1px solid rgba(208, 236, 255, 0.2);
  box-shadow:0px 22px 32px 0px rgba(6,19,48,0.5);
  border-radius:10px;
  padding: 27px 22px 0 22px;
  /* box-sizing: border-box; */
}
</style>
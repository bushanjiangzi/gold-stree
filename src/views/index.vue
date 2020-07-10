<template>
  <div class="store">
    <div class="top">
      <span>数字金街-店铺</span>
    </div>
    <div class="bottom">
      <div class="storeLeft">
        <div v-show="activeName === 'one'">
          <div class="pandect_top">
            <div class="totalNum">
              <img src="../../static/image/pandectImg/pandectImg1.png" alt="店铺总数">
              <div>
                <span class="pandect_top_name">店铺总数</span>
                <span class="pandect_top_num">398</span>
              </div>
            </div>
            <div class="hiredStore">
              <el-progress type="circle" :stroke-width="6" :percentage="98" color="#03FFA9"></el-progress>
              <div>
                <span class="pandect_top_name">已租店铺</span>
                <span class="pandect_top_num">344</span>
              </div>
            </div>
            <div class="forRentStore">
              <el-progress type="circle" :stroke-width="6" :percentage="2" color="#FF3600"></el-progress>
              <div>
                <span class="pandect_top_name">待租店铺</span>
                <span class="pandect_top_num">54</span>
              </div>
            </div>
          </div>
          <div class="pandect_bottom">
            <div class="chartBox">
              <div class="chartBox_title">》已租店铺趋势图</div>
              <el-select v-model="value1" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <div id="lineChart1"></div>
            </div>
            <div class="chartBox">
              <div class="chartBox_title">》待租店铺趋势图</div>
              <el-select v-model="value2" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <div id="lineChart2"></div>
            </div>
          </div>
        </div>
        <div v-show="activeName === 'two'">
          <div class="numStatistics">
            <div>
              <div>店铺数量</div>
              <div>259</div>
            </div>
            <div>
              <div>今日客流总量</div>
              <div>560</div>
            </div>
            <div>
              <div>客流总量</div>
              <div>13580</div>
            </div>
          </div>
          <div class="storeImg">
            <el-carousel trigger="click" indicator-position="outside">
              <el-carousel-item v-for="(item, index) in storeImgList" :key="index">
                <img :src="item" alt="">
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="line1"></div>
          <div class="line2"></div>
        </div>
        <div v-show="activeName === 'three'">
          <div class="numStatistics">
            <div>
              <div>与上一天对比</div>
              <div>20%<span class="yellow">↑</span></div>
            </div>
            <div>
              <div>今日客流总量</div>
              <div>560</div>
            </div>
            <div>
              <div>客流总量</div>
              <div>13580</div>
            </div>
          </div>
          <div class="storeInfo">
            <img :src="storeImg" alt="店铺名称">
            <div>{{storeIntroduce}}</div>
          </div>
          <div class="line1"></div>
          <div class="line2"></div>
        </div>
      </div>
      <div class="storeRight">
        <el-tabs type="border-card" v-model="activeName" @tab-click="tabClick">
        <el-tab-pane label="总览" name="one">
          <div class="pandectItem" v-for="(item, index) in pandectList" :key="index">
            <div class="indexNum">{{index + 1}}</div>
            <div class="storeName">{{item.name}}</div>
            <div class="storeNum">店铺数量：{{item.num}}</div>
            <div class="storePercent">{{item.percent}}</div>
            <div v-show="item.icon">
              <div v-if="item.iconName === 'yellow'" class="yellowIcon">↑</div>
              <div v-else class="redIcon">↓</div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="分类" name="two">
          <div class="classificationItem" v-for="(item, index) in classificationList" :key="index">
            <div class="indexNum">{{index + 1}}</div>
            <img :src="item.src" :alt="item.name">
            <div class="storeName">{{item.name}}</div>
            <div class="personNum">{{item.num}}</div>
            <div v-show="item.icon">
              <div v-if="item.iconName === 'yellow'" class="yellowIcon">↑</div>
              <div v-else class="redIcon">↓</div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="店铺" name="three">
          <div class="storeItem" v-for="(item, index) in storeList" :key="index" @click="storeItemClick(index)">
            <div class="indexNum">{{index + 1}}</div>
            <div class="storeName">{{item.name}}</div>
            <div class="personNum">{{item.num}}</div>
            <div v-show="item.icon">
              <div v-if="item.iconName === 'yellow'" class="yellowIcon">↑</div>
              <div v-else class="redIcon">↓</div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      </div>
    </div>
    <div class="gobackBtn">
      <el-button type="primary" @click="goback">返回</el-button>
    </div>
  </div>
</template>
<script>
import Echarts from 'echarts'
export default {
  name: 'store',
  data () {
    return {
      activeName: 'one',
      pandectList: [
        {
          name: '餐馆',
          num: 105,
          percent: '30.5%',
          icon: true,
          iconName: 'yellow'
        },
        {
          name: '快餐',
          num: 76,
          percent: '22.0%',
          icon: true,
          iconName: 'red'
        },
        {
          name: '饮品',
          num: 64,
          percent: '18.6%',
          icon: true,
          iconName: 'yellow'
        },
        {
          name: '风味小吃',
          num: 42,
          percent: '12.2%',
          icon: false,
          iconName: ''
        },
        {
          name: '便利店',
          num: 24,
          percent: '6.7%',
          icon: false,
          iconName: ''
        },
        {
          name: '服饰鞋帽',
          num: 15,
          percent: '4.4%',
          icon: false,
          iconName: ''
        },
        {
          name: '美妆护理',
          num: 10,
          percent: '2.9%',
          icon: false,
          iconName: ''
        },
        {
          name: '休闲娱乐',
          num: 8,
          percent: '2.3%',
          icon: false,
          iconName: ''
        }
      ],
      classificationList: [
        {
          name: '餐馆',
          src: '../../static/image/classification/classification1.png',
          num: 12420,
          icon: true,
          iconName: 'yellow'
        },
        {
          name: '快餐',
          src: '../../static/image/classification/classification2.png',
          num: 11053,
          icon: true,
          iconName: 'red'
        },
        {
          name: '饮品',
          src: '../../static/image/classification/classification3.png',
          num: 10062,
          icon: true,
          iconName: 'yellow'
        },
        {
          name: '风味小吃',
          src: '../../static/image/classification/classification4.png',
          num: 9451,
          icon: false,
          iconName: ''
        },
        {
          name: '便利店',
          src: '../../static/image/classification/classification5.png',
          num: 9423,
          icon: false,
          iconName: ''
        },
        {
          name: '服饰鞋帽',
          src: '../../static/image/classification/classification6.png',
          num: 8968,
          icon: false,
          iconName: ''
        },
        {
          name: '美妆护理',
          src: '../../static/image/classification/classification7.png',
          num: 8542,
          icon: false,
          iconName: ''
        },
        {
          name: '休闲娱乐',
          src: '../../static/image/classification/classification8.png',
          num: 7815,
          icon: false,
          iconName: ''
        }
      ],
      storeList: [
        {
          name: '星巴克',
          num: 11380,
          icon: true,
          iconName: 'yellow'
        },
        {
          name: '煌上煌',
          num: 10359,
          icon: true,
          iconName: 'red'
        },
        {
          name: '正新鸡排',
          num: 10135,
          icon: true,
          iconName: 'yellow'
        },
        {
          name: '庙东排骨',
          num: 8642,
          icon: false,
          iconName: ''
        },
        {
          name: '周黑鸭',
          num: 8355,
          icon: false,
          iconName: ''
        },
        {
          name: '必胜客',
          num: 7645,
          icon: false,
          iconName: ''
        },
        {
          name: '麦当劳',
          num: 7253,
          icon: false,
          iconName: ''
        },
        {
          name: '宝岛眼镜',
          num: 5500,
          icon: false,
          iconName: ''
        }
      ],
      storeImgList: [
        '../../static/image/storeImg/classificationImg1.png',
        '../../static/image/storeImg/classificationImg2.png',
        '../../static/image/storeImg/classificationImg3.png'
      ],
      storeImg: '',
      storeIntroduce: '',
      storeInfoList: [  
        {
          src: '../../static/image/storeImg/xbk.png',
          introduce:'星巴克(Starbucks)是美国一家连锁咖啡公司的名称，1971年成立，为全球最大的咖啡连锁店，其总部坐落美国华盛顿州西雅图市。星巴克旗下零售产品包括30多款全球顶级的咖啡豆、手工制作的浓缩咖啡和多款咖啡冷热饮料、新鲜美味的各式糕点食品以及丰富多样的咖啡机、咖啡杯等商品。星巴克在全球范围内已经有近21300间分店，遍布北美、南美洲、欧洲、中东及太平洋区。 2016年12月8日，星巴克与腾讯宣布战略合作关系，微信用户可以在内地所有星巴克门店使用微信支付。2018年8月2日，星巴克与阿里巴巴集团在上海宣布达成新零售全面战略合作。8月28日，星巴克与雀巢完成71.5亿美元授权协议，星巴克的包装咖啡及茶产品由雀巢行销全球。9月19日，星巴克试运营外卖咖啡。 2020年4月19日，针对星巴克“员工确诊新冠”，该员工已入院进行隔离治疗，门店已关店进行全面消毒。'
        },
        {
          src: '../../static/image/storeImg/hsh.png',
          introduce:'江西煌上煌集团食品股份有限公司始创于1993年，总部座落在江西南昌，公司是一家集肉鸭养殖、屠宰加工、肉制品深加工、连锁销售、科研开发为一体的民营企业，2012年9月5日成功在深交所挂牌上市，成为酱卤肉制品行业第一个上市公司。公司在全国分布有6大现代化的食品生产加工基地，开发出6大系列，100多个产品，近4000家连锁专卖店分布在全国24个省份及直辖市。先后被列为全国农产品加工业示范基地、农业产业化国家重点龙头企业，是全国绿色食品示范企业、全国主食加工示范企业，国家高新技术企业，2017年入选中国制造业企业500强。'
        },
        {
          src: '../../static/image/storeImg/zxjp.png',
          introduce:'健康甘旨的鸡排是顾客所喜欢的，正新新世纪鸡排是顾客在繁忙了一天作业后卸下疲乏身驱的首选，慵懒的坐在客厅的沙发上，吃着喜欢的鸡排，听听舒缓的音乐，全身的脑细胞在这一刻得到放松。正新新世纪鸡排加盟总部专注做好鸡排，从事鸡排职业多年，具有一支具有办理，技能研制，运营办理才干的强壮专业团队。下设商场部，营销部，企划部，人事部，财务部，物流部，运营部等多个部分，完善的办理系统和专业的团队，为加盟商保驾护航，削减加盟上探索时刻躲避危险，到达以加盟商带动公司开展，公司扶持加盟商盈余的互利共赢形式，终究完成双赢。正新新世纪鸡排品牌作为正新新世纪鸡排研制加盟总部的重要品牌，一切加盟店肆实施一致装饰风格，选用精约风格装饰，交融当下潮流元素，打造共同店面规划风格，使其愈加具有特性，识别性高，让人过目不忘。'
        },
        {
          src: '../../static/image/storeImg/mdpg.png',
          introduce:'南京晨商箕食品有限公司的品牌创始人于2010年决定投身传统风味小吃开始，走访了全国30多个城市，尝遍了全国一百多种小吃。最终决定选择炸排骨作为研发并长期坚持的产品。于2014年初在南京市秦淮区创立了第一家直营店铺，并取名店名为«庙东排骨»。店铺开业初期即受到广大消费着的好评，生意火爆，随即连开两家直营店铺。2016年5月庙东排骨商标注册成功。2017年应广大消费者要求正式注册公司放开加盟，，从此解决了任何小餐饮品牌都无法比拟的货品安全与品质问题。三年的沉淀，只为夯实基础，为消费者提供一个健康，美味，持久的品牌。'
        },
        {
          src: '../../static/image/storeImg/zhy.png',
          introduce:'湖北周黑鸭食品工业园有限公司，是一家专门从事生产、营销及零售休闲熟卤制品企业，主营业务为卤鸭、鸭副产品，卤制红肉、卤制蔬菜、卤制家禽及水产类等其他产品。目前产品包装形式主要有气调保鲜包装、真空颗粒包装。“会娱乐更快乐”是周黑鸭的品牌理念。努力成为年轻、有活力兼具文化底蕴、生活品味的品牌是周黑鸭品牌目标。周黑鸭相信，可口、卫生、方便的产品，能够为消费者带来更大的乐趣和更好的体验。'
        },
        {
          src: '../../static/image/storeImg/ps.png',
          introduce:'以"红屋顶"作为餐厅外观显著标志的必胜客，如今已是全球最大的披萨专卖连锁企业之一，在遍布世界各地一百多个国家，每天接待超过400万位顾客，烤制170多万个比萨饼。必胜客已在营业额和餐厅数量上，迅速成为全球领先的比萨连锁餐厅企业。必胜客公司属于世界最大的餐饮集团-百胜全球餐饮集团，百胜餐饮集团在全球100多个国家拥有超过32,500家的连锁餐厅，是全球餐饮业多品牌集合的领导者。'
        },
        {
          src: '../../static/image/storeImg/mdl.png',
          introduce:'50年代，麦当劳对餐厅进行了一次全新的升级。设计由美国设计师Stanley Meston亲自操刀，外墙使用了红白相间的线条，十分醒目。而为了让餐厅的屋顶结构显得更加饱满，设计师在餐厅的两边分别加入了一道金色抛物线，搭配上金色的霓虹灯，就这样，金色拱门正式诞生了。金色跳跃的双抛物线传递着动感和能量，英文里，这个醒目的标识被称为“Golden Arches”, 中文里叫“金色拱门”。以此为灵感，1961年，麦当劳的品牌Logo首次加入了“金色拱门”的元素，金色双抛物线化身成为金色的“M”标识。如今，“金色拱门”已成为了麦当劳的代名词，也成为了麦当劳品牌中最具象征性的标志。'
        },
        {
          src: '../../static/image/storeImg/bdyj.png',
          introduce:'宝岛眼镜作为华人世界中眼镜界比较知名的品牌，拥有30多年历史，目前在亚洲的中国大陆、台湾分别开拓市场。其中，大陆拥有近1200家门店。一直以来，宝岛眼镜秉持着“用专业的心，做专业的事”理念，不断引进国外视光高科技产品，以及和国内重点高校合作，进行专业人才培训，并积极参与国家质量部门检测，落实高质量的商品分析，真正创造企业、高校和视光产业三方面纵横一体的零售企业。'
        }
      ],
      value1: '2',
      value2: '2',
      options: [
        {
          label: '2018',
          value: '0'
        },
        {
          label: '2019',
          value: '1'
        },
        {
          label: '2020',
          value: '2'
        }
      ]
    }
  },
  mounted () {
    this.storeItemClick(0)
    this.getLine1Chart1()
    this.getLine1Chart2()
  },
  methods: {
    tabClick (item) {
      console.log(item)
      this.storeItemClick(0)
    },
    storeItemClick (index) {
      let storeList = document.getElementsByClassName('storeItem')
      console.log(storeList[index])
      for (let i = 0; i < storeList.length; i++) {
        storeList[i].classList.remove('ClickActive')
      }
      storeList[index].classList.add('ClickActive')
      this.storeImg = this.storeInfoList[index].src
      this.storeIntroduce = this.storeInfoList[index].introduce
    },
    goback () {
      exit_app();
    },
    getLine1Chart1 () {
      const options = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#ccc'
            }
          },
          axisLabel: {
            show: true,
            textStyle:{
              color:'#fff',
              fontSize: 12,
            }
          },
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle:{
              color:'#fff',
              fontSize: 12,
            }
          },
        },
        grid: {
          bottom: 20
        },
        series: [{
            data: [110, 156, 300, 322, 330, 282, 300, 260, 320, 300, 315, 330],
            type: 'line',
            areaStyle: { normal: {} },
            itemStyle: {
              normal: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(0, 255, 210, 1)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(0, 255, 240, 0)" // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }, //背景渐变色
              },
            }
        }]
      }
      Echarts.init(document.getElementById('lineChart1')).setOption(options)
    },
    getLine1Chart2 () {
      const options = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#ccc'
            }
          },
          axisLabel: {
            show: true,
            textStyle:{
              color:'#fff',
              fontSize: 12,
            }
          },
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle:{
              color:'#fff',
              fontSize: 12,
            }
          },
        },
        grid: {
          bottom: 20
        },
        series: [{
            data: [288, 242, 98, 76, 68, 116, 98, 138, 78, 98, 83, 68],
            type: 'line',
            areaStyle: { normal: {} },
            itemStyle: {
              normal: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(0, 255, 210, 1)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(0, 255, 240, 0)" // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }, //背景渐变色
              },
            }
        }]
      }
      Echarts.init(document.getElementById('lineChart2')).setOption(options)
    }
  }
}
</script>
<style>
.yellow{
  color: #FFF000;
}
.store {
  width: 100%;
  height: 100%;
  background: url("../assets/image/Bg.png");
  background-size: 100% 100%;
  position: relative;
}
.store .gobackBtn{
  position: absolute;
  top: 50px;
  right: 30px;
}
.store .gobackBtn .el-button--primary{
  background-color: #00D5CB;
  border-color: #00D5CB;
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
  width: calc(100% - 480px);
  height: calc(100% - 60px);
  background:rgba(7,15,32,0.55);
  border:1px solid rgba(208, 236, 255, 0.2);
  box-shadow:0px 22px 32px 0px rgba(6,19,48,0.5);
  border-radius:10px;
  margin-right: 20px;
  padding: 0 40px;
  position: relative;
}
.storeLeft>div{
  height: 100%;
}
.storeLeft .pandect_top{
  padding: 125px 58px 0 79px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.storeLeft .pandect_top>div{
  width: 288px;
  height: 130px;
  background:rgba(15,133,167,0.7);
  border-radius: 10px;
  padding: 40px 73px 40px 34px;
}
.storeLeft .pandect_top>div>div{
  display: inline-block;
  vertical-align: top;
}
.storeLeft .totalNum img{
  width: 130px;
  height: 130px;
  display: inline-block;
  margin-right: 34px;
}
.storeLeft .totalNum{
  color: #fff;
}
.storeLeft .pandect_top .pandect_top_name{
  font-size: 20px;
  letter-spacing: 8px;
  margin-top: 7px;
  margin-bottom: 28px;
  display: block;
}
.storeLeft .pandect_top .pandect_top_num{
  font-size: 60px;
  text-align: center;
  display: block;
}
.storeLeft .pandect_top .hiredStore .el-progress--circle .el-progress__text{
  font-size: 40px!important;
  color: #03FFA9;
}
.storeLeft .pandect_top .forRentStore .el-progress--circle .el-progress__text{
  font-size: 40px!important;
  color: #FF3600;
}
.storeLeft .pandect_top .hiredStore>div:nth-child(2){
  margin-left: 40px;
  color: #fff;
}
.storeLeft .pandect_top .forRentStore>div:nth-child(2){
  margin-left: 40px;
  color: #fff;
}
.storeLeft .pandect_bottom{
  padding: 83px 58px 150px 79px;
  box-sizing: border-box;
}
.storeLeft .pandect_bottom .chartBox{
  /* width: calc((100% - 40px) / 2); */
  width: 48%;
  height: 357px;
  display: inline-block;
  background: rgba(0,30,31,0.2);
  border-radius:10px;
  position: relative;
}
.storeLeft .pandect_bottom .chartBox:nth-child(1){
  margin-right: 46px;
}
.storeLeft .pandect_bottom .chartBox .chartBox_title{
  width: 360px;
  height: 30px;
  line-height: 30px;
  color: #00FFF6;
  margin-top: 28px;
  padding-left: 10px;
  background:linear-gradient(90deg,rgba(0,234,255,0.45),rgba(249,255,255,-0.2));
}
.storeLeft .pandect_bottom .chartBox .el-select{
  position: absolute;
  top: 65px;
  right: 20px;
}
.storeLeft .pandect_bottom .chartBox .el-select>.el-input{
  width: 90px;
  height: 20px;
  line-height: 20px;
}
.storeLeft .pandect_bottom .chartBox .el-input--suffix .el-input__icon{
  height: 20px;
  line-height: 20px;
  color: #FFFFFF;
}
.storeLeft .pandect_bottom .chartBox .el-input--suffix .el-input__inner{
  height: 20px;
  line-height: 20px;
  color: #FFFFFF;
  background-color: rgba(0,30,31,0.2);
  border:1px solid rgba(255,255,255,0.45);
}
#lineChart1{
  width: 100%;
  height: 300px;
}
#lineChart2{
  width: 100%;
  height: 300px;
}
.storeLeft .numStatistics{
  height: 126px;
}
.storeLeft .numStatistics>div{
  float: right;
  width: 100px;
  text-align: center;
  color: #fff;
  font-size: 18px;
  margin: 44px 0 28px 0;
}
.storeLeft .numStatistics>div>div:nth-child(1){
  margin-bottom: 18px;
}
.storeLeft .storeImg{
  height: calc(100% - 126px);
}
.storeLeft .storeImg img{
  width: 100%;
  height: calc(100% - 10px);
  margin-top: 5px;
}
.storeLeft .storeInfo{
  height: calc(100% - 370px);
  padding: 78px 0 166px 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.storeLeft .storeInfo img{
  width: 407px;
  height: 407px;
  margin-right: 30px;
}
.storeLeft .storeInfo>div{
  width: calc(100% - 437px);
  font-size: 22px;
  letter-spacing: 2px;
  line-height: 35px;
  text-align: justify;
  color: #fff;
}
.storeLeft .el-carousel--horizontal{
  height: 100%;
}
.storeLeft .el-carousel__container{
  height: calc(100% - 100px)
}
.storeLeft .el-carousel__indicators--outside{
  position: absolute;
  left: 50%;
  bottom: 30px;
}
.storeLeft .line1{
  width: calc(100% - 80px);
  height: 1px;
  position: absolute;
  top: 126px;
  border-top: 1px solid #cccccc;
}
.storeLeft .line2{
  width: calc(100% - 80px);
  height: 1px;
  position: absolute;
  bottom: 100px;
  border-top: 1px solid #cccccc;
}
.storeRight{
  width: 316px;
  height: calc(100% - 87px);
  background:rgba(7,15,32,0.55);
  border:1px solid rgba(208, 236, 255, 0.2);
  box-shadow:0px 22px 32px 0px rgba(6,19,48,0.5);
  border-radius:10px;
  padding: 27px 22px 0 22px;
}
.storeRight .el-tabs--border-card{
  background: none;
  border: 0;
  box-shadow: 0 0 0 0;
  height: 100%;
}
.storeRight .el-tabs--border-card>.el-tabs__header{
  background: none;
  border: 0;
}
.storeRight .el-tabs--border-card>.el-tabs__content{
  height: calc(100% - 31px);
  padding: 0;
}
.storeRight .el-tabs--border-card>.el-tabs__content>div{
  height: 100%;
}
.storeRight .el-tabs--border-card>.el-tabs__header .el-tabs__nav{
  border:1px solid rgba(0,213,203,1);
  border-radius:10px;
  margin-left: 53px;
  /* margin-left: 88px; */
}
.storeRight .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
  background-color: #00BBDD;
  border-right-color: none;
  border-left-color: none;
  color: #fff;
}
.storeRight .el-tabs--border-card>.el-tabs__header .el-tabs__item{
  color: #fff;
  height: 30px;
  line-height: 30px;
}
.storeRight .el-tabs--border-card>.el-tabs__header .el-tabs__item:hover{
  color: #fff;
}
.storeRight .el-tabs--border-card>.el-tabs__header .el-tabs__item:nth-child(1){
  border-radius: 10px 0 0 10px;
}
.storeRight .el-tabs--border-card>.el-tabs__header .el-tabs__item:last-child{
  border-radius: 0 10px 10px 0;
}
.storeRight .classificationItem{
  display: flex;
  flex-direction: row;
  align-items: center;
  /* padding: calc(100% / 14) 0 ; */
  height: calc(100% / 8);
  border-bottom: 1px solid #00D5CB;
}
.storeRight .storeItem{
  display: flex;
  flex-direction: row;
  align-items: center;
  /* padding: calc(100% / 14) 0 ; */
  height: calc(100% / 8);
  border-bottom: 1px solid #00D5CB;
}
.storeRight .pandectItem{
  display: flex;
  flex-direction: row;
  align-items: center;
  /* padding: calc(100% / 14) 0 ; */
  height: calc(100% / 8);
  border-bottom: 1px solid #00D5CB;
}
.storeRight .el-tabs--border-card>.el-tabs__content>div>.classificationItem:last-child{
  border-bottom: 0;
}
.storeRight .el-tabs--border-card>.el-tabs__content>div>.storeItem:last-child{
  border-bottom: 0;
}
.storeRight .el-tabs--border-card>.el-tabs__content>div>.pandectItem:last-child{
  border-bottom: 0;
}
.storeRight .storeItem.ClickActive .storeName{
  color: #00FCFF;
}
.storeRight .ClickActive .personNum{
  color: #00FCFF;
}
.storeRight .classificationItem img{
  width: 57px;
  height: 47px;
}
.storeRight .indexNum{
  display: inline-block;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  text-align: center;
  line-height: 32px;
  background: #00FDFF;
  color: #fff;
  font-size: 20px;
  margin-right: 22px;
}
.storeRight .pandectItem .indexNum{
  margin-right: 10px;
}
.storeRight .classificationItem .storeName{
  display: inline-block;
  color: #fff;
  font-size: 22px;
  width: 95px;
  margin-left: 20px;
  margin-right: 20px;
}
.storeRight .pandectItem .storeName{
  display: inline-block;
  color: #fff;
  font-size: 22px;
  width: 90px;
  margin-right: 20px;
}
.storeRight .storeItem .storeName{
  display: inline-block;
  color: #fff;
  font-size: 22px;
  width: 165px;
  margin-left: 20px;
  margin-right: 20px;
}
.storeRight .yellowIcon{
  font-size: 24px;
  color: #FFF000;
}
.storeRight .redIcon{
  font-size: 24px;
  color: #FF0000;
}
.storeRight .personNum{
  display: inline-block;
  color: #fff;
  margin-right: 10px;
}
.storeRight .pandectItem .storeNum{
  color: #fff;
  margin-right: 10px;
}
.storeRight .pandectItem .storePercent{
  color: #fff;
}
</style>
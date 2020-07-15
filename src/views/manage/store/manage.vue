<template>
  <div>
    <div class="store-box">
      <div class="title">店铺管理</div>
      <div class="content">
        <div class="search-box">
          <span>名称</span>
          <el-input v-model="storeName" placeholder="请输入店铺名称"></el-input>
          <span>位置</span>
            <el-select v-model="region" placeholder="请选择位置">
              <el-option
                v-for="item in regionArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="regionIndex" placeholder="">
              <el-option
                v-for="item in regionIndexArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span>类型</span>
            <el-select v-model="storeType" placeholder="请选择类型">
              <el-option
                v-for="item in storeTypeArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span>状态</span>
            <el-select v-model="storeState" placeholder="请选择状态">
              <el-option
                v-for="item in storeStateArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button type="primary" @click="search">搜索</el-button>
        </div>
        <div class="table-box">
          <el-table
            :data="newTableData"
            border
            style="width: 100%">
            <el-table-column
              label="序号"
              width="50">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.index }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="图标"
              width="100">
              <template slot-scope="scope">
                <img v-if="scope.row.state" class="img-icon" :src='scope.row.icon'>
                <img v-else src=''>
              </template>
            </el-table-column>
            <el-table-column
              label="名称"
              width="120">
              <template slot-scope="scope">
                <span v-if="scope.row.state">{{ scope.row.name }}</span>
                <span v-else>/</span>
              </template>
            </el-table-column>
            <el-table-column
              label="类型"
              width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.state">{{ scope.row.type }}</span>
                <span v-else>/</span>
              </template>
            </el-table-column>
            <el-table-column
              label="位置"
              width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.region }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="联系方式"
              width="120">
              <template slot-scope="scope">
                <span v-if="scope.row.state">{{ scope.row.phone }}</span>
                <span v-else>/</span>
              </template>
            </el-table-column>
            <el-table-column
              label="备注介绍"
              width="220">
              <template slot-scope="scope">
                <span v-if="scope.row.state">{{ scope.row.introduce }}</span>
                <span v-else>/</span>
              </template>
            </el-table-column>
            <el-table-column
              label="评分"
              width="180">
              <template slot-scope="scope">
                <el-rate
                  v-if="scope.row.state"
                  v-model="scope.row.grade"
                  disabled
                  text-color="#ff9900">
                </el-rate>
                <span v-else>/</span>
              </template>
            </el-table-column>
            <el-table-column
              label="状态"
              width="160">
              <template slot-scope="scope">
                <el-switch
                  style="display: block"
                  v-model="scope.row.state"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span v-if="scope.row.state" >已租</span>
                <span v-else>未租</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <i v-if="scope.row.state" class="el-icon-document" @click="handleEdit(scope.$index, scope.row)"> 编辑</i>
                <i v-else class="el-icon-document"> 编辑</i>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page-box">
          <el-button size="small" @click="getFistData" type="text">首页</el-button>
          <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next"
          
          :total="total">
          </el-pagination>
          <el-button size="small
          " @click="getLastData" type="text">末页</el-button>
        </div>
      </div>
      <el-dialog
        title="编辑"
        :visible.sync="dialogVisible"
        width="730px"
        :before-close="handleClose">
        <div class="dialog-center">
          <div class="left">
            <div class="add-logo" @mouseenter="showImgHandle('logo')" @mouseleave="hideImgHandle">
              <div v-if='isShowLogoImg'>
                <img class="logo-img" :src='logoImgUrl'>
              </div>
              <div v-else>
                <img class="add-icon" src='../../../assets/image/addImage.png'>
                <div>添加logo</div>
              </div>
              <input class="file-input" type="file" id='fileLogo' @change="upFileChange('logo')">
              <div v-show="isShowLogoHandle" class="preview-delete">
                <i class="el-icon-zoom-in" @click="previewImg('logo')"></i>
                <i class="el-icon-delete" @click="deleteImg('logo')"></i>
              </div>
            </div>
            <div class="add-logo add-img" @mouseenter="showImgHandle('img1')" @mouseleave="hideImgHandle">
              <div v-if='isShowImg1'>
                <img class="logo-img" :src='logoImgUrl'>
              </div>
              <div v-else>
                <img class="add-icon" src='../../../assets/image/addImage.png'>
                <div>添加图片</div>
              </div>
              <input class="file-input" type="file" id='fileImg1' @change="upFileChange('img1')">
              <div v-show="isShowImgHandle1" class="preview-delete preview-delete-min">
                <i class="el-icon-zoom-in" @click="previewImg('img1')"></i>
                <i class="el-icon-delete" @click="deleteImg('img1')"></i>
              </div>
            </div>
            <div class="add-logo add-img" @mouseenter="showImgHandle('img2')" @mouseleave="hideImgHandle">
              <div v-if='isShowImg2'>
                <img class="logo-img" :src='logoImgUrl'>
              </div>
              <div v-else>
                <img class="add-icon" src='../../../assets/image/addImage.png'>
                <div>添加图片</div>
              </div>
              <input class="file-input" type="file" id='fileImg2' @change="upFileChange('img2')">
              <div v-show="isShowImgHandle2" class="preview-delete preview-delete-min">
                <i class="el-icon-zoom-in" @click="previewImg('img2')"></i>
                <i class="el-icon-delete" @click="deleteImg('img2')"></i>
              </div>
            </div>
            <div class="add-logo add-img" @mouseenter="showImgHandle('img3')" @mouseleave="hideImgHandle">
              <div v-if='isShowImg3'>
                <img class="logo-img" :src='logoImgUrl'>
              </div>
              <div v-else>
                <img class="add-icon" src='../../../assets/image/addImage.png'>
                <div>添加图片</div>
              </div>
              <input class="file-input" type="file" id='fileImg3' @change="upFileChange('img3')">
              <div v-show="isShowImgHandle3" class="preview-delete preview-delete-min">
                <i class="el-icon-zoom-in" @click="previewImg('img3')"></i>
                <i class="el-icon-delete" @click="deleteImg('img3')"></i>
              </div>
            </div>
          </div>
          <div class="right">
            <div>
              <span>名&#8195;&#8195;称：</span>
              <el-input v-model="editStoreName" placeholder="请输入店铺名称"></el-input>
            </div>
            <div>
              <span>类&#8195;&#8195;型：</span>
              <el-select v-model="editStoreType" placeholder="请选择类型">
                <el-option
                  v-for="item in storeTypeArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div>
              <span>位&#8195;&#8195;置：</span>
              <div>
                <el-select v-model="editRegion" disabled placeholder="请选择位置">
                </el-select>
                <el-select v-model="editRegionIndex" disabled placeholder="">
                </el-select>
              </div>
            </div>
            <div>
              <span>楼&#8195;&#8195;层：</span>
              <el-select v-model="editFloor" disabled placeholder="请选择楼层">
              </el-select>
            </div>
            <div>
              <span>评&#8195;&#8195;分：</span>
              <el-rate v-model="editRate"></el-rate>
            </div>
            <div>
              <span>联系方式：</span>
              <el-input v-model="editPhone" placeholder="请输入联系方式"></el-input>
            </div>
            <div class="text-area">
              <span>备注介绍：</span>
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入备注/介绍"
                v-model="editIntroduce">
              </el-input>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmClick">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog :visible.sync="imgPreviewdialog">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        storeName: '',
        region: '',
        regionArr: [
          {
            label: 'A区',
            value: '1'
          }
        ],
        regionIndex: '',
        regionIndexArr: [
          {
            label: '001',
            value: '1'
          }
        ],
        storeType: '',
        storeTypeArr: [
          {
            label: '小吃',
            value: '1'
          }
        ],
        storeState: '',
        storeStateArr: [
          {
            label: '已租',
            value: '1'
          }
        ],
        tableData: [
          {
            index: 1,
            icon: '../../../../static/image/1_cg/B1_21~爱撒椒.png',
            name: '周黑鸭',
            type: '小吃',
            region: 'A区-001',
            phone: '1111',
            introduce: '外婆菜又名万菜，是湖南湘西地区一道家常菜，原料选用大头菜、白萝卜',
            grade: 4.5,
            state: true
          },
          {
            index: 2,
            icon: '../../../../static/image/1_cg/B1_21~爱撒椒.png',
            name: '周黑丫丫',
            type: '小吃',
            region: 'A区-002',
            phone: '1111',
            introduce: '周黑鸭，全称周黑鸭国际控股有限公司，股票代码01458，是一家专门从事生产、营销及零售休闲熟卤制品企业，主营业务为卤鸭、鸭副产品，卤制红肉、卤制蔬菜、卤制家禽及水产类等其他产品。',
            grade: 5,
            state: false
          },
          {
            index: 1,
            icon: '../../../../static/image/1_cg/B1_21~爱撒椒.png',
            name: '周黑鸭',
            type: '小吃',
            region: 'A区-001',
            phone: '1111',
            introduce: '外婆菜又名万菜，是湖南湘西地区一道家常菜，原料选用大头菜、白萝卜',
            grade: 4.5,
            state: true
          },
          {
            index: 2,
            icon: '../../../../static/image/1_cg/B1_21~爱撒椒.png',
            name: '周黑丫丫',
            type: '小吃',
            region: 'A区-002',
            phone: '1111',
            introduce: '周黑鸭，全称周黑鸭国际控股有限公司，股票代码01458，是一家专门从事生产、营销及零售休闲熟卤制品企业，主营业务为卤鸭、鸭副产品，卤制红肉、卤制蔬菜、卤制家禽及水产类等其他产品。',
            grade: 5,
            state: false
          },
          {
            index: 1,
            icon: '../../../../static/image/1_cg/B1_21~爱撒椒.png',
            name: '周黑鸭',
            type: '小吃',
            region: 'A区-001',
            phone: '1111',
            introduce: '外婆菜又名万菜，是湖南湘西地区一道家常菜，原料选用大头菜、白萝卜',
            grade: 4.5,
            state: true
          },
          {
            index: 2,
            icon: '../../../../static/image/1_cg/B1_21~爱撒椒.png',
            name: '周黑丫丫',
            type: '小吃',
            region: 'A区-002',
            phone: '1111',
            introduce: '周黑鸭，全称周黑鸭国际控股有限公司，股票代码01458，是一家专门从事生产、营销及零售休闲熟卤制品企业，主营业务为卤鸭、鸭副产品，卤制红肉、卤制蔬菜、卤制家禽及水产类等其他产品。',
            grade: 5,
            state: false
          },
          {
            index: 1,
            icon: '../../../../static/image/1_cg/B1_21~爱撒椒.png',
            name: '周黑鸭',
            type: '小吃',
            region: 'A区-001',
            phone: '1111',
            introduce: '外婆菜又名万菜，是湖南湘西地区一道家常菜，原料选用大头菜、白萝卜',
            grade: 4.5,
            state: true
          },
          {
            index: 2,
            icon: '../../../../static/image/1_cg/B1_21~爱撒椒.png',
            name: '周黑丫丫',
            type: '小吃',
            region: 'A区-002',
            phone: '1111',
            introduce: '周黑鸭，全称周黑鸭国际控股有限公司，股票代码01458，是一家专门从事生产、营销及零售休闲熟卤制品企业，主营业务为卤鸭、鸭副产品，卤制红肉、卤制蔬菜、卤制家禽及水产类等其他产品。',
            grade: 5,
            state: false
          }
        ],
        newTableData: [],
        prevTxt: '上一页',
        nextTxt: '下一页',
        currentPage: 1,
        pageSize: 6,
        total: 0,
        dialogVisible: false,
        dialogImageUrl: '',
        imgPreviewdialog: false,
        addImgUrl: '../../../assets/image/addImage.png',
        isShowImg1: false,
        isShowImg2: false,
        isShowImg3: false,
        isShowLogoImg: false,
        logoImgUrl: '../../../../static/image/1_cg/B1_21~爱撒椒.png',
        editStoreName: '',
        editStoreType: '',
        editRegion: '',
        editRegionIndex: '',
        editFloor: '',
        editRate: null,
        editIntroduce: '',
        editPhone: '',
        isShowLogoHandle: false,
        isShowImgHandle1: false,
        isShowImgHandle2: false,
        isShowImgHandle3: false
      }
    },
    created () {

    },
    mounted () {
      this.total = this.tableData.length + 1
      this.getFistData()
    },
    methods: {
      search () {
        console.log(this.storeName, this.region, this.regionIndex, this.storeType, this.storeState)
      },
      handleEdit (index, row) {
        console.log(index, row)
        this.dialogVisible = true
        // console.log(window.innerHeight)
      },
      handleDelete (index, row) {
        console.log(index, row);
      },
      // 点击首页
      getFistData () {
        this.currentPage = 1
        this.infoPageList(1)
      },
      // 跳页
      handleCurrentChange (currentPage) {
        this.infoPageList(currentPage)
      },
      // 点击末页
      getLastData () {
        this.currentPage = Math.ceil(this.total / this.pageSize) === 0 ? 1 : Math.ceil(this.total / this.pageSize)
        this.infoPageList(this.currentPage)
      },
      // 信息分页列表
      infoPageList (page) {
        let index = page - 1
        this.newTableData = this.tableData.slice(index * this.pageSize, page * this.pageSize)
      },
      handleClose (done) {
        this.$confirm('确认关闭？').then(_ => {
          this.confirmClick()
          done();
        }).catch(_ => {});
      },
      confirmClick () {
        console.log('已确认1')
        this.dialogVisible = false
      },
      upFileChange (type) {
        if (type === 'logo') {
          let fileNode = document.getElementById('fileLogo')
          this.isShowLogoImg = true
          console.log(fileNode.files[0])
        } else if (type === 'img1') {
          let fileNode = document.getElementById('fileImg1')
          this.isShowImg1 = true
          console.log(fileNode.files[0])
        } else if (type === 'img2') {
          let fileNode = document.getElementById('fileImg2')
          this.isShowImg2= true
          console.log(fileNode.files[0])
        } else if (type === 'img3') {
          let fileNode = document.getElementById('fileImg3')
          this.isShowImg3 = true
          console.log(fileNode.files[0])
        }
      },
      // 鼠标移入图片
      showImgHandle (type) {
        if (type === 'logo') {
          this.isShowLogoHandle = true
        } else if (type === 'img1') {
          this.isShowImgHandle1 = true
        } else if (type === 'img2') {
          this.isShowImgHandle2 = true
        } else if (type === 'img3') {
          this.isShowImgHandle3 = true
        }
      },
      // 鼠标移出图片
      hideImgHandle () {
        this.isShowLogoHandle = false
        this.isShowImgHandle1 = false
        this.isShowImgHandle2 = false
        this.isShowImgHandle3 = false
      },
      // 预览图片
      previewImg (type) {
        this.imgPreviewdialog = true
        if (type === 'logo') {
        } else if (type === 'img1') {
        } else if (type === 'img2') {
        } else if (type === 'img3') {
        }
      },
      // 删除图片
      deleteImg (type) {
        if (type === 'logo') {
        } else if (type === 'img1') {
          this.isShowImgHandle1 = true
          this.isShowImgHandle2 = true
        } else if (type === 'img3') {
        }
      }
    }
  }
</script>

<style scoped>
.store-box{
  padding: 0 50px;
}
.store-box .title{
  font-size: 25px;
  color: #252525;
  text-align: center;
  padding: 38px 0 10px 0;
  border-bottom: 1px solid #909090;
}
.store-box .content{
  background: #F8F8F8;
  padding: 38px;
  margin-top: 6px;
  height: 660px;
  max-height: 660px;
  overflow: auto;
}
.store-box .content .search-box{
  display: flex;
  font-size: 16px;
  height: 32px;
  line-height: 32px;
}
.store-box .content .search-box > span {
  margin-left: 12px;
}
/deep/.store-box .content .search-box .el-input{
  width: 200px;
  height: 32px;
  margin: 0 6px;
}
/deep/.store-box .content .search-box .el-input .el-input__inner{
  height: 32px;
}
/deep/.store-box .content .search-box .el-select .el-input{
  width: 120px;
  margin: 0 6px;
}
/deep/.store-box .content .search-box .el-select .el-input .el-select__caret{
  line-height: 32px;
}
/deep/.store-box .content .search-box .el-button--primary{
  margin-left: 20px;
  padding: 0 20px;
}
.store-box .content .table-box{
  margin-top: 16px;
}
/deep/.store-box .content .table-box .el-table {
  color: #333333;
}
/deep/.store-box .content .table-box .el-table th {
  background: linear-gradient(to bottom, #DDE8EE, #C3CDD4);
  padding: 0;
  height: 42px;
  line-height: 42px;
  color: #333333;
  text-align: center;
}
/deep/.store-box .content .table-box .el-table .cell {
  text-align: center;
}
.store-box .content .table-box .img-icon{
  width: 70px;
  height: 70px;
}
.store-box .content .table-box .el-table span{
  font-size: 14px;
  max-height: 66px;
  overflow: hidden;
  display: inline-block;
}
/deep/.store-box .content .table-box .el-table .el-switch{
  display: inline-block !important;
  line-height: 23px;
  height: 23px;
  vertical-align: top;
  margin-right: 6px;
}
/deep/.store-box .content .table-box .el-table .el-icon-document{
  font-size: 16px;
}
/deep/.store-box .content .table-box .el-table .el-icon-document:hover{
  cursor: pointer;
}
.store-box .content .page-box{
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
/deep/.store-box .el-dialog__header {
  background: linear-gradient(to bottom, #515F6D, #36404E);
  height: 50px;
  line-height: 50px;
  padding: 0;
  padding-left: 20px;
}
/deep/.store-box .el-dialog__header .el-dialog__title{
  color: #fff;
}
/deep/.store-box .el-dialog__header .el-dialog__headerbtn .el-dialog__close {
    color: #F2F2F2;
    font-size: 20px;
    margin-top: -10px;
}
/deep/.store-box .el-dialog__footer{
  text-align: center;
}
.store-box .dialog-center{
  display: flex;
}
.store-box .dialog-center .left{
  width: 200px;
  margin: 0 20px;
}
.store-box .dialog-center .left .preview-delete{
  position: absolute;
  background: black;
  opacity: 0.6;
  color: #FFF;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 66px;
}
.store-box .dialog-center .left .preview-delete-min {
  padding-top: 32px;
}
.store-box .dialog-center .left .preview-delete i{
  font-size: 20px;
  margin-right: 6px;
}
.store-box .dialog-center .left .add-logo{
  border: 1px solid #CAD4DC;
  border-radius: 5px;
  width: 150px;
  height: 150px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.store-box .dialog-center .left .add-logo .add-icon{
  padding: 50px 0 10px 0;
  width: 28px;
  height: 28px;
}
.store-box .dialog-center .left .add-logo .logo-img{
  width: 150px;
  height: 150px;
}
.store-box .dialog-center .left .add-img {
  height: 76px;
  margin-top: 5px;
}
.store-box .dialog-center .left .add-img .add-icon{
  padding: 10px 0 10px 0;
}
.store-box .dialog-center .left .add-img .logo-img{
  width: 150px;
  height: 76px;
}
.store-box .dialog-center .left .file-input{
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 150px;
}
.store-box .dialog-center .right{
  flex-grow: 1;
  margin-right: 20px;
}
.store-box .dialog-center .right > div{
  display: flex;
  height: 32px;
  line-height: 32px;
  margin-top: 14px;
}
.store-box .dialog-center .right > div > span{
  display: inline-block;
  min-width: 80px;
}
/deep/.store-box .dialog-center .right > div > div {
  flex-grow: 1;
  display: flex;
}
/deep/.store-box .dialog-center .right > div > div .el-select:nth-child(2){
  margin-left: 8px;
}
/deep/.store-box .dialog-center .right > div input {
  height: 32px;
}
/deep/.store-box .dialog-center .right .el-input__icon {
  line-height: 32px;
}
/deep/.store-box .dialog-center .right .el-rate{
  margin-top: 6px;
}
/deep/.store-box .dialog-center .right .text-area{
  height: 108px;
}
</style>
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
            <div class="region-index">
              <el-input v-model="regionIndex" type="number" trigger-on-focus=false placeholder="店铺编号"></el-input>
            </div>
            <!-- <el-select v-model="regionIndex" placeholder="">
              <el-option
                v-for="item in regionIndexArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select> -->
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
            <el-button type="primary" @click="searchClick">搜索</el-button>
            <el-button type="primary" @click="createStore">新建</el-button>
        </div>
        <div class="table-box">
          <el-table
            :data="newTableData"
            border
            style="width: 100%">
            <el-table-column
              label="序号"
              width="80">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.shopId }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="图标"
              width="100">
              <template slot-scope="scope">
                <div v-if="scope.row.imgUrl0">
                  <img v-if="scope.row.state" class="img-icon" :src='scope.row.imgUrl0'>
                  <img v-else class="img-icon" src='../../../assets/image/default.png'>
                </div>
                <img v-else class="img-icon" src='../../../assets/image/default.png'>
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
                <span v-if="scope.row.state">{{ scope.row.typeName }}</span>
                <span v-else>/</span>
              </template>
            </el-table-column>
            <el-table-column
              label="位置"
              width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.location.modleOperation }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="联系方式"
              width="120">
              <template slot-scope="scope">
                <span v-if="scope.row.state">{{ scope.row.relationPhone }}</span>
                <span v-else>/</span>
              </template>
            </el-table-column>
            <el-table-column
              label="备注介绍"
              width="220">
              <template slot-scope="scope">
                <span v-if="scope.row.state">{{ scope.row.desc }}</span>
                <span v-else>/</span>
              </template>
            </el-table-column>
            <el-table-column
              label="评分"
              width="180">
              <template slot-scope="scope">
                <el-rate
                  v-if="scope.row.state"
                  v-model="scope.row.score"
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
                  inactive-color="#ff4949"
                  @change="stateChange(scope.row)">
                </el-switch>
                <span v-if="scope.row.state" >已租</span>
                <span v-else>未租</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <i v-if="scope.row.state" class="" @click="handleEdit(scope.$index, scope.row)"> 编辑</i>
                <i v-else class=""> 编辑</i>
                <i class="" @click="deleteStore(scope.row)"> 删除</i>
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
          layout="prev, pager, next, jumper"
          :total="total">
          </el-pagination>
          <el-button size="small" @click="getLastData" type="text">末页</el-button>
        </div>
      </div>
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="730px"
        :before-close="handleClose">
        <div class="dialog-center">
          <div class="left" v-show="isEdit">
            <div class="add-logo" @mouseenter="showImgHandle('logo')" @mouseleave="hideImgHandle">
              <div v-if='editInfo.imgUrl0'>
                <img class="logo-img" :src='editInfo.imgUrl0'>
              </div>
              <div v-else>
                <img class="add-icon" src='../../../assets/image/addImage.png'>
                <div>添加logo</div>
              </div>
              <input class="file-input" type="file" id='fileLogo' @change="upFileChange('logo')">
              <div v-show="isShowLogoHandle" class="preview-delete">
                <i class="el-icon-zoom-in" @click="previewImg('logo')" title="预览"></i>
                <img class="replace" src="../../../assets/image/replace.png" title="替换" @click="replaceClick('fileLogo')">
                <i class="el-icon-delete" @click="deleteImg('logo')" title="删除"></i>
              </div>
            </div>
            <div class="add-logo add-img" @mouseenter="showImgHandle('img1')" @mouseleave="hideImgHandle">
              <div v-if='editInfo.imgUrl1'>
                <img class="logo-img" :src='editInfo.imgUrl1'>
              </div>
              <div v-else>
                <img class="add-icon" src='../../../assets/image/addImage.png'>
                <div>添加图片</div>
              </div>
              <input class="file-input" type="file" id='fileImg1' @change="upFileChange('img1')">
              <div v-show="isShowImgHandle1" class="preview-delete preview-delete-min">
                <i class="el-icon-zoom-in" @click="previewImg('img1')" title="预览"></i>
                <img class="replace" src="../../../assets/image/replace.png" title="替换" @click="replaceClick('fileImg1')">
                <i class="el-icon-delete" @click="deleteImg('img1')" title="删除"></i>
              </div>
            </div>
            <div class="add-logo add-img" @mouseenter="showImgHandle('img2')" @mouseleave="hideImgHandle">
              <div v-if='editInfo.imgUrl2'>
                <img class="logo-img" :src='editInfo.imgUrl2'>
              </div>
              <div v-else>
                <img class="add-icon" src='../../../assets/image/addImage.png'>
                <div>添加图片</div>
              </div>
              <input class="file-input" type="file" id='fileImg2' @change="upFileChange('img2')">
              <div v-show="isShowImgHandle2" class="preview-delete preview-delete-min">
                <i class="el-icon-zoom-in" @click="previewImg('img2')" title="预览"></i>
                <img class="replace" src="../../../assets/image/replace.png" title="替换" @click="replaceClick('fileImg2')">
                <i class="el-icon-delete" @click="deleteImg('img2')" title="删除"></i>
              </div>
            </div>
            <div class="add-logo add-img" @mouseenter="showImgHandle('img3')" @mouseleave="hideImgHandle">
              <div v-if='editInfo.imgUrl3'>
                <img class="logo-img" :src='editInfo.imgUrl3'>
              </div>
              <div v-else>
                <img class="add-icon" src='../../../assets/image/addImage.png'>
                <div>添加图片</div>
              </div>
              <input class="file-input" type="file" id='fileImg3' @change="upFileChange('img3')">
              <div v-show="isShowImgHandle3" class="preview-delete preview-delete-min">
                <i class="el-icon-zoom-in" @click="previewImg('img3')" title="预览"></i>
                <img class="replace" src="../../../assets/image/replace.png" title="替换" @click="replaceClick('fileImg3')">
                <i class="el-icon-delete" @click="deleteImg('img3')" title="删除"></i>
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
                  v-for="item in editTypeArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div>
              <span>位&#8195;&#8195;置：</span>
              <div>
                <el-select v-if='isEdit' v-model="editRegion" disabled placeholder="请选择位置"></el-select>
                <el-select v-else v-model="editRegion" placeholder="请选择位置">
                  <el-option
                    v-for="item in editRegionList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-if='isEdit' v-model="editRegionIndex" disabled placeholder="请输入店铺编号"></el-select>
                <!-- <el-select v-else v-model="editRegionIndex" placeholder="请输入店铺编号"></el-select> -->
                <el-input v-else style="margin-left: 10px;" v-model="editRegionIndex" type="number" trigger-on-focus=false placeholder="请输入店铺编号"></el-input>
              </div>
            </div>
            <div>
              <span>楼&#8195;&#8195;层：</span>
              <el-select v-if='isEdit' v-model="editFloor" disabled placeholder="请选择楼层"></el-select>
              <!-- <el-select v-else v-model="editFloor" placeholder="请选择楼层">
              </el-select> -->
              <el-input v-else v-model="editFloor" type="number" trigger-on-focus=false placeholder="请输入楼层"></el-input>
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
          <el-button type="primary" @click="confirmClick">保 存</el-button>
        </span>
      </el-dialog>
      <el-dialog :visible.sync="imgPreviewdialog">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="isShowdelete"
        width="30%">
        <span>确定删除吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isShowdelete = false">取 消</el-button>
          <el-button type="primary" @click="deleteClick">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { Admin } from '@/interface/interface'
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
      editRegionList: [],
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
      editTypeArr: [],
      storeState: '',
      storeStateArr: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '已租',
          value: '1'
        },
        {
          label: '未租',
          value: '2'
        }
      ],
      tableData: [
        {
          shopId: 1,
          icon: '../../../../static/image/1_cg/B1_21~爱撒椒.png',
          name: '周黑鸭',
          type: '小吃',
          region: 'A区-001',
          phone: '1111',
          desc: '外婆菜又名万菜，是湖南湘西地区一道家常菜，原料选用大头菜、白萝卜',
          grade: 4.5,
          state: true
        },
        {
          shopId: 2,
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
          shopId: 1,
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
      pageSize: 5,
      total: 0,
      dialogVisible: false,
      dialogImageUrl: '',
      imgPreviewdialog: false,
      isShowImg1: false,
      isShowImg2: false,
      isShowImg3: false,
      isShowLogoImg: false,
      editInfo: {},
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
      isShowImgHandle3: false,
      dialogTitle: '',
      isEdit: false,
      isShowdelete: false,
      deleteStoreId: ''
    }
  },
  created () {
    this.getAreas()
    this.getTypes()
    this.getShowNums()
    this.getAllShopList()
  },
  mounted () {
    // this.total = this.tableData.length + 1
    // this.getFistData()
  },
  methods: {
    // 获取区域列表
    getAreas () {
      this.regionArr = []
      this.editRegionList = []
      Admin.areas({
        params: {},
        success: (res) => {
          res.dataList.forEach((item) => {
            let areaObj = {}
            areaObj.label = item
            areaObj.value = item
            this.regionArr.push(areaObj)
            this.editRegionList.push(areaObj)
          })
          this.regionArr.unshift({label: '全部', value: ''})
        }
      })
    },
    // 获取店铺类型
    getTypes () {
      this.storeTypeArr = []
      this.editTypeArr = []
      Admin.types({
        params: {},
        success: (res) => {
          console.log(res)
          res.dataList.forEach((item) => {
            let typeObj = {}
            typeObj.value = item.id
            typeObj.label = item.typeName
            this.storeTypeArr.push(typeObj)
            this.editTypeArr.push(typeObj)
          })
          this.storeTypeArr.unshift({value: '', label: '全部'})
        }
      })
    },
    // 获取区域的所有店铺编号
    getShowNums () {
      Admin.showNums({
        params: {
          area: 'A1区'
        },
        success: (res) => {
          console.log(res)
        }
      })
    },
    // 获取店铺列表
    getAllShopList () {
      this.tableData = []
      Admin.allShop({
        params: {},
        success: (res) => {
          // console.log(res)
          if (res.dataList.length > 0) {
            res.dataList.forEach( item => {
              if (item.status === '1') {
                item.state = true
              } else {
                item.state = false
              }
              if (item.shopPictures.length > 0) {
                item.shopPictures.forEach((element) => {
                  let imgUrl = 'imgUrl' + element.shopPictureIndex
                  item[imgUrl] = element.shopPicturePath + element.shopPictureName
                })
              }
            })
            this.tableData = res.dataList
            this.total = res.dataList.length
            this.handleCurrentChange (this.currentPage)
            // console.log('this.tableData:', this.tableData)
          }
        }
      })
    },
    // 搜索
    searchClick () {
      this.currentPage = 1
      this.search()
    },
    search () {
      // console.log('search:', this.storeName, this.region, this.regionIndex, this.storeType, this.storeState)
      Admin.search({
        params: {
          shopName: this.storeName,
          shopType: this.storeType,
          shopArea: this.region,
          shopNum: this.regionIndex,
          shopStatus: this.storeState
        },
        success: (res) => {
          // console.log(res)
          if (res.dataList.length > 0) {
            res.dataList.forEach( item => {
              if (item.status === '1') {
                item.state = true
              } else {
                item.state = false
              }
              if (item.shopPictures.length > 0) {
                item.shopPictures.forEach((element) => {
                  let imgUrl = 'imgUrl' + element.shopPictureIndex
                  item[imgUrl] = element.shopPicturePath + element.shopPictureName
                })
              }
            })
            console.log('this.currentPage:', this.currentPage)
            this.tableData = res.dataList
            this.total = res.dataList.length
            // console.log('this.currentPage:', this.currentPage)
            this.handleCurrentChange (this.currentPage)
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    // 更改店铺状态
    stateChange (info) {
      if (info) {
        console.log(info)
        let state = '1'
        if (info.status === '1') {
          state = '2'
        } else {
          state = '1'
        }
        Admin.status({
          params: {
            id: info.shopId,
            status: state
          },
          success: (res) => {
            console.log(res)
            this.$message.success('店铺状态更新成功！')
            this.search()
          },
          error: (err) => {
            this.$message.error(err.msg)
          }
        })
      }
    },
    // 新建店铺
    createStore () {
      this.isEdit = false
      this.dialogTitle = '新建店铺'
      this.editInfo = {}
      this.dialogVisible = true
      this.editStoreName = ''
      this.editStoreType = 1
      this.editRegion = ''
      this.editRegionIndex = ''
      this.editFloor = ''
      this.editRate = 0
      this.editPhone = ''
      this.editIntroduce = ''
    },
    // 点击编辑
    handleEdit (index, row) {
      let typeId = 9
      for (let item of this.storeTypeArr) {
        if (item.label === row.typeName) {
          typeId = item.value
          break
        }
      }
      this.isEdit = true
      this.dialogTitle = '编辑店铺'
      // console.log(index, row, typeId)
      this.editInfo = row
      this.dialogVisible = true
      this.editStoreName = row.name
      this.editStoreType = typeId
      this.editRegion = row.location.shopArea
      this.editRegionIndex = row.location.shopNum
      this.editFloor = row.location.shopLevel
      this.editRate = row.score
      this.editPhone = row.relationPhone
      this.editIntroduce = row.desc
      // console.log(window.innerHeight)
    },
    handleDelete (index, row) {
      console.log(index, row);
    },
    // 删除店铺信息
    deleteStore (info) {
      console.log('删除店铺信息', info)
      this.isShowdelete = true
      this.deleteStoreId = info.shopId
    },
    deleteClick () {
      this.isShowdelete = false
      Admin.delete({
        id: this.deleteStoreId,
        params: {},
        success: res => {
          this.$message.success(res.msg)
          this.search()
        },
        error: err => {
          this.$message.error(err.msg)
        }
      })
    },
    // 点击首页
    getFistData () {
      this.currentPage = 1
      this.infoPageList(1)
    },
    // 跳页
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
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
        done();
      }).catch(_ => {});
    },
    // 确认保存
    confirmClick () {
      console.log(this.isEdit)
      // console.log('this.editStoreType:', this.editStoreType)
      if (this.isEdit) {
        Admin.shopSave({
          params: {
            id: this.editInfo.shopId,
            typeId: this.editStoreType,
            name: this.editStoreName,
            relationPhone: this.editPhone,
            desc: this.editIntroduce,
            score: this.editRate
          },
          success: (res) => {
            console.log(res)
            this.$message.success('保存成功！')
            this.search()
            this.dialogVisible = false
          },
          error: (err) => {
            console.log(err)
            this.$message.error(err.msg)
          }
        })
      } else {
        // this.$message.success('添加成功！')
        if (!this.editRegion) {
          this.$message.warning('请选择区域！')
          return
        }
        if (!this.editRegionIndex) {
          this.$message.warning('请输入店铺编号！')
          return
        }
        if (!this.editFloor) {
          this.$message.warning('请填写楼层！')
          return
        }
        let location = {}
        location.shopArea = this.editRegion
        location.shopNum = this.editRegionIndex
        location.shopLevel = this.editFloor
        let typeObj = null
        for (let item of this.editTypeArr) {
          if (item.value === this.editStoreType) {
            typeObj = item
          }
        }
        console.log(typeObj)
        Admin.addStore({
          params: {
            typeName: typeObj.label,
            name: this.editStoreName,
            relatinPhone: this.editPhone,
            desc: this.editIntroduce,
            score: this.editRate,
            location: location
          },
          success: res => {
            this.$message.success(res.msg)
            this.dialogVisible = false
            this.search()
          },
          error: err => {
            this.$message.error(err.msg)
          }
        })
      }
    },
    // 图片上传
    upFileChange (type) {
      let files = null
      let fileNode = null
      let shopIndex = 0
      if (type === 'logo') {
        fileNode = document.getElementById('fileLogo')
        // this.isShowLogoImg = true
        shopIndex = 0
        console.log(fileNode.files[0])
      } else if (type === 'img1') {
        fileNode = document.getElementById('fileImg1')
        // this.isShowImg1 = true
        shopIndex = 1
        console.log(fileNode.files[0])
      } else if (type === 'img2') {
        fileNode = document.getElementById('fileImg2')
        // this.isShowImg2= true
        shopIndex = 2
        console.log(fileNode.files[0])
      } else if (type === 'img3') {
        fileNode = document.getElementById('fileImg3')
        // this.isShowImg3 = true
        shopIndex = 3
        console.log(fileNode.files[0])
      }
      files = fileNode.files[0]
      console.log('files:', files)
      let fielData = new FormData()
      fielData.append('file', files)
      fielData.append('shopId', this.editInfo.shopId)
      fielData.append('shopIndex', shopIndex)
      console.log('fielData', fielData)
      Admin.upload({
        params: fielData,
        success: (res) => {
          console.log(res)
          if (res.code === '200') {
            this.$message.success('图片上传成功！')
            let imgUrl = 'imgUrl' + shopIndex
            this.editInfo[imgUrl] = res.data
            this.search()
            this.dialogVisible = false
          }
        },
        error: (err) => {
          console.log(err)
          this.$message.error(err.msg)
        }
      })
    },
    // 鼠标移入图片
    showImgHandle (type) {
      if (type === 'logo') {
        if (this.editInfo.imgUrl0) {
          this.isShowLogoHandle = true
        } else {
          this.isShowLogoHandle = false
        }
      } else if (type === 'img1') {
        if (this.editInfo.imgUrl1) {
          this.isShowImgHandle1 = true
        } else {
          this.isShowImgHandle1 = false
        }
      } else if (type === 'img2') {
        if (this.editInfo.imgUrl2) {
          this.isShowImgHandle2 = true
        } else {
          this.isShowImgHandle2 = false
        }
      } else if (type === 'img3') {
        if (this.editInfo.imgUrl3) {
          this.isShowImgHandle3 = true
        } else {
          this.isShowImgHandle3 = false
        }
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
        this.dialogImageUrl = this.editInfo.imgUrl0
      } else if (type === 'img1') {
        this.dialogImageUrl = this.editInfo.imgUrl1
      } else if (type === 'img2') {
        this.dialogImageUrl = this.editInfo.imgUrl2
      } else if (type === 'img3') {
        this.dialogImageUrl = this.editInfo.imgUrl3
      }
    },
    // 图片替换
    replaceClick (type) {
      console.log(type)
      document.getElementById(type).click()
    },
    // 删除图片
    deleteImg (type) {
      console.log('删除图片：', this.editInfo)
      let imgIndex = ''
      let imgId = ''
      if (type === 'logo') {
        imgIndex = 0
      } else if (type === 'img1') {
        this.isShowImgHandle1 = true
        imgIndex = 1
      } else if (type === 'img2') {
        this.isShowImgHandle2 = true
        imgIndex = 2
      } else if (type === 'img3') {
        this.isShowImgHandle3 = true
        imgIndex = 3
      }
      console.log(imgIndex)
      for (let item of this.editInfo.shopPictures) {
        if (imgIndex === item.shopPictureIndex) {
          imgId = item.id
          break
        }
      }
      if (imgId === '') {
        this.$message.warning('没有可以删除的图片！')
        return
      }
      Admin.deleteImg({
        params: {
          id: imgId
        },
        success: (res) => {
          console.log(res)
          this.$message.success(res.msg)
          this.search()
          this.dialogVisible = false
          // this.editInfo['imgUrl' + imgIndex] = ''
        },
        error: (err) => {
          console.log(err.msg)
          this.$message.error(err.msg)
        }
      })
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
/deep/.store-box .content .search-box .region-index .el-input{
  width: 100px;
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
  border-radius: 50%;
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
/deep/.store-box .content .table-box .el-table .cell:hover{
  cursor: pointer;
}
/deep/.store-box .content .table-box .el-table .cell i{
  margin-right: 12px;
}
/deep/.store-box .content .table-box .el-table .cell i:last-child{
  color: red;
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
.store-box .dialog-center .left .add-logo .replace{
  display: inline-block;
  width: 21px;
  height: 21px;
  vertical-align: bottom;
  margin-right: 6px;
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
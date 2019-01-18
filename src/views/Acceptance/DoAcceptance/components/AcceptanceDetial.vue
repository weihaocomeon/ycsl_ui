<template>
<el-row>
  <el-col :span="24">
    <el-button-group>
      <el-button type="primary" icon="plus" @click="dialogSJVisible = true">新建</el-button>
      <el-button type="primary" icon="edit" @click="handlerEdit">编辑</el-button>
      <el-button type="primary" icon="delete" @click="handleDelete">删除</el-button>
      <el-button type="warning" @click="handlerAuthorize">挂起</el-button>
    </el-button-group>

    <el-dialog title="收件" :visible.sync="dialogSJVisible" width="80%" center>
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" labelWidth="20px" class="demo-dynamic">
        <el-form-item>
          <label>收件单号:{{sjdh}}</label>
        </el-form-item>
        <hr>
        <el-form-item>
          <label>权利人信息</label>
        </el-form-item>
        <el-form-item v-for="(qlr, index) in dynamicValidateForm.qlrs" :key="qlr.key">
          <el-form :inline="true" :model="qlr" class="demo-form-inline" style="width: 100%">
            <el-form-item label="权利人名称">
              <el-input v-model="qlr.qlrmc" placeholder="权利人名称"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
              <el-input v-model="qlr.qlrsfzh" placeholder="身份证号"></el-input>
            </el-form-item>
            <el-form-item label="证件类型">
              <el-input v-model="qlr.qlrzjlx" placeholder="证件类型"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click.prevent="removeQlr(qlr)">删除</el-button>
              <el-button  type="primary" @click="insertQLR(qlr,index)">扫证</el-button>
              <el-button @click="addQlr">增加</el-button>
            </el-form-item>
          </el-form>
        </el-form-item>
        <hr>
        <el-form-item>
          <label>权利人代理人信息</label>
        </el-form-item>
        <el-form-item v-for="(qlrdlr, index) in dynamicValidateForm.qlrdlrs" :key="qlrdlr.key" >
          <el-form :inline="true" :model="qlrdlr" class="demo-form-inline">
            <el-form-item label="代理人名称">
              <el-input v-model="qlrdlr.qlrdlrmc" placeholder="权利人代理人名称"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
              <el-input v-model="qlrdlr.qlrdlrsfzh" placeholder="权利人代理人身份证号"></el-input>
            </el-form-item>
            <el-form-item label="证件类型">
              <el-input v-model="qlrdlr.qlrdlrzjlx" placeholder="证件类型"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click.prevent="removeQlrdlr(qlrdlr)">删除</el-button>
              <el-button  type="primary" @click="insertQLRDLR(qlrdlr,index)" >扫证</el-button>
              <el-button @click="addQlrdlr">增加</el-button>
            </el-form-item>
          </el-form>
        </el-form-item>
        <hr>
        <el-form-item>
          <label>义务人信息</label>
        </el-form-item>
        <el-form-item v-for="(ywr, index) in dynamicValidateForm.ywrs" :key="ywr.key" >
          <el-form :inline="true" :model="ywr" class="demo-form-inline">
            <el-form-item label="义务人名称">
              <el-input v-model="ywr.ywrmc" placeholder="义务人名称"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
              <el-input v-model="ywr.ywrsfzh" placeholder="身份证号"></el-input>
            </el-form-item>
            <el-form-item label="证件类型">
              <el-input v-model="ywr.ywrzjlx" placeholder="证件类型"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click.prevent="removeYwr(ywr)">删除</el-button>
              <el-button type="primary" @click="insertYWR(ywr,index)">扫证</el-button>
              <el-button @click="addYwr">增加</el-button>
            </el-form-item>
          </el-form>
        </el-form-item>
        <hr>
        <el-form-item>
          <label>义务人代理人信息</label>
        </el-form-item>
        <el-form-item v-for="(ywrdlr, index) in dynamicValidateForm.ywrdlrs" :key="ywrdlr.key" >
          <el-form :inline="true" :model="ywrdlr" class="demo-form-inline">
            <el-form-item label="代理人名称">
              <el-input v-model="ywrdlr.ywrdlrmc" placeholder="义务人代理人名称"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
              <el-input v-model="ywrdlr.ywrdlrsfzh" placeholder="义务人代理人身份证号"></el-input>
            </el-form-item>
            <el-form-item label="证件类型">
              <el-input v-model="ywrdlr.ywrdlrzjlx" placeholder="证件类型"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click.prevent="removeYwrdlr(ywrdlr)">删除</el-button>
              <el-button type="primary" @click="insertYWRDLR(ywrdlr,index)">扫证</el-button>
              <el-button @click="addYwrdlr">增加</el-button>
            </el-form-item>
          </el-form>
        </el-form-item>
        <hr>
        <el-form-item>
          <label>土地证与房产证信息</label>
        </el-form-item>
        <el-form-item>

          <el-form :inline="true" :model="searchForm" class="demo-form-inline" style="padding-left: 50px">
            <el-form-item label="姓名">
              <el-input v-model="searchForm.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="相关证号">
              <el-input v-model="searchForm.xgzh" placeholder="相关证号"></el-input>
            </el-form-item>
            <el-form-item label="证书/证明">
              <el-select v-model="searchForm.zslx" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchZS">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-form-item>
      </el-form>

      <el-table :data='certificate' width='100%' element-loading-text='Loading' border fit highlight-current-row>
        <el-table-column align='center' label='相关证号'>
          <template slot-scope='scope'>
            <span>{{scope.row.xgzh}}</span>
          </template>
        </el-table-column>
        <el-table-column align='center' label='相关证类型' >
          <template slot-scope='scope'>
            <span>{{scope.row.xgzlx}}</span>
          </template>
        </el-table-column>
        <el-table-column align='center' label='权利人名称' >
          <template slot-scope='scope'>
            <span>{{scope.row.qlrmc}}</span>
          </template>
        </el-table-column>
        <el-table-column align='center' label='坐落' >
          <template slot-scope='scope'>
            <span>{{scope.row.zl}}</span>
          </template>
        </el-table-column>
      </el-table>
      <hr>
      <el-form>
        <el-form-item>
          <label>通知人信息</label>
        </el-form-item>
        <el-form-item>
          <el-form :inline="true" :model="inform" class="demo-form-in；line" style="padding-left: 50px">
            <el-form-item label="姓名">
              <el-input v-model="inform.name" placeholder="姓名" style="width: 450px"></el-input>
            </el-form-item>
            <el-form-item label="电话号码">
              <el-input v-model="inform.tel" placeholder="电话号码" style="width: 450px"></el-input>
            </el-form-item>
          </el-form>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSJVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSJVisible = false">确 定</el-button>
      </div>

      <el-dialog width="50%" title="内层 Dialog" :visible.sync="innerVisible" append-to-body>
        <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column align='center' label='相关证号'>
            <template slot-scope='scope'>
              <span>{{scope.row.xgzh}}</span>
            </template>
          </el-table-column>
          <el-table-column align='center' label='相关证类型' >
            <template slot-scope='scope'>
              <span>{{scope.row.xgzlx}}</span>
            </template>
          </el-table-column>
          <el-table-column align='center' label='权利人名称' >
            <template slot-scope='scope'>
              <span>{{scope.row.qlrmc}}</span>
            </template>
          </el-table-column>
          <el-table-column align='center' label='坐落' >
            <template slot-scope='scope'>
              <span>{{scope.row.zl}}</span>
            </template>
          </el-table-column>
        </el-table>

        <div style="margin-top: 20px">
          <!--<el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>-->
          <!--<el-button @click="toggleSelection()">取消选择</el-button>-->
          <el-button type="primary" @click="choseData">确定</el-button>
        </div>

      </el-dialog>

      <el-steps :active="active" finish-status="success">
        <el-step title="收件" @click.native='Steps()'></el-step>
        <el-step title="附件" @click.native='Steps2()'></el-step>
        <el-step title="打印/预览" @click.native='Steps3()'></el-step>
      </el-steps>


    </el-dialog>




    <el-dialog title="流程附件" :visible.sync="dialogFJVisible" width="80%" center>

      <div style="padding-left: 100px;padding-right: 100px" align="center">
        <el-table :data="lcfj">
          <el-table-column prop="value" label="类型" width="300">
          </el-table-column>
          <el-table-column label="上传" width="300">
            <template slot-scope="scope">
              <el-button type="primary" @click="getFJ(scope.$index, scope.row)">上传</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-steps :active="active" finish-status="success">
        <el-step title="收件" @click.native='Steps()'></el-step>
        <el-step title="附件" @click.native='Steps2()'></el-step>
        <el-step title="打印/预览" @click.native='Steps3()'></el-step>
      </el-steps>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFJVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFJVisible = false">确 定</el-button>
      </div>

    </el-dialog>

    <el-dialog title="打印/预览" :visible.sync="dialogPrintVisible" width="80%" center>

      <el-button type="primary">预览</el-button>
      <el-button type="primary">打印</el-button>
      <el-button type="primary" @click="submit()">提交</el-button>

      <el-steps :active="active" finish-status="success">
        <el-step title="收件" @click.native='Steps()'></el-step>
        <el-step title="附件" @click.native='Steps2()'></el-step>
        <el-step title="打印/预览" @click.native='Steps3()'></el-step>
      </el-steps>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPrintVisible = false">取 消</el-button>

      </div>

    </el-dialog>






  </el-col>
  <el-col :span="24">
    <div class='app-container'>
    <el-form ref='form' :model='form' label-width='70px'>
      <el-form-item label='起始时间'>
        <el-col :span='11'>
          <el-date-picker type='date' placeholder='开始日期' v-model='form.date1' style='width: 100%;'></el-date-picker>
        </el-col>
        <el-col class='line' :span='2' align='center'>--</el-col>
        <el-col :span='11'>
          <el-date-picker type='date' placeholder='结束日期' v-model='form.date2' style='width:100%;'></el-date-picker>
        </el-col>
      </el-form-item>
    </el-form>
    <el-form :inline='true' ref='form2' :model='form2' label-width='70px'>
      <el-form-item label="收件号" style="width: 30%">
        <el-input v-model="form2.SLBH" placeholder="收件号"></el-input>
      </el-form-item>
      <el-form-item align="right">
        <el-tooltip class="item" effect="dark" content="搜索" placement="top-start">
          <el-button size='mini' icon="el-icon-search" @click='searchResult' type="primary"></el-button>
        </el-tooltip>
      </el-form-item>
    </el-form>

    <el-table :data='list' v-loading.body='listLoading' width='100%' element-loading-text='Loading' border fit highlight-current-row>
      <el-table-column align='center' label='收件号'>
        <template slot-scope='scope'>
          <span>{{scope.row.SLBH}}</span>
        </template>
      </el-table-column>
      <el-table-column align='center' label='收件时间'>
        <template slot-scope='scope'>
          <span>{{scope.row.SJSJ}}</span>
        </template>
      </el-table-column>
      <el-table-column align='center' label='房产办理情况'>
        <template slot-scope='scope'>
          {{scope.row.FCStatus}}
        </template>
      </el-table-column>
      <el-table-column align='center' label='不动产办理情况'>
        <template slot-scope='scope'>
          {{scope.row.BDCStatus}}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination align='center' @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='currentPage' :page-sizes='[5, 10, 15, 20]' :page-size='5' layout='total, sizes, prev, pager, next, jumper' :total='total'>
    </el-pagination>
  </div>
  </el-col>
</el-row>
</template>

<script>
import { mapGetters } from 'vuex';
import ElFormItem from "../../../../../node_modules/element-ui/packages/form/src/form-item.vue";
import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button.vue";
import ElRow from "element-ui/packages/row/src/row";

export default {
  name: 'file',
  components: {
    ElRow,
    ElButton,
    ElFormItem},
  data(){
    return{
      total: 0,
      listLoading: false,
      currentPage: 1,
      form: {
        date1: 'date1',
        date2: 'date2',
        title:'',
          type:''
      },
      form2: {
        SLBH:''
      },
      list:[],
      sjdh: '0A69E3D6E3CA47BD91AA15A9642C0879',
      json: {},
      dialogSJVisible: false,
      dialogFJVisible: false,
      dialogPrintVisible: false,
      innerVisible: false,
      dynamicValidateForm: {
        qlrs: [{
          qlrmc: '',
          qlrsfzh: '',
          qlrzjlx: ''
        }],
        qlrdlrs: [{
          qlrdlrmc: '',
          qlrdlrsfzh: '',
          qlrdlrzjlx: ''
        }],
        ywrs: [{
          ywrmc: '',
          ywrsfzh: '',
          ywrzjlx: ''
        }],
        ywrdlrs: [{
          ywrdlrmc: '',
          ywrdlrsfzh: '',
          ywrdlrzjlx: ''
        }]
      },
      searchForm: {
        xgzh: '',
        name: '',
        zslx: ''
      },
      inform: {
        name: '',
        tel: '',
      },
      options: [{
        value: 'zs',
        label: '证书'
      }, {
        value: 'zm',
        label: '证明'
      }],
      certificate: null,
      active: 0,
      lcfj: [
        {
          value: '房屋所有权证',
          upload: ''
        },{
          value: '土地使用权证',
          upload: ''
        },{
          value: '不动产权证书',
          upload: ''
        },{
          value: '土地收益等价款',
          upload: ''
        },{
          value: '契税完税证',
          upload: ''
        },{
          value: '上市交易申请审核表',
          upload: ''
        },{
          value: '声明',
          upload: ''
        },{
          value: '证明',
          upload: ''
        },{
          value: '维修资金专用收据',
          upload: ''
        },{
          value: '维修资金交存查询证明',
          upload: ''
        },{
          value: '申请书',
          upload: ''
        },{
          value: '询问笔录',
          upload: ''
        },{
          value: '身份证明复印件',
          upload: ''
        },{
          value: '户口复印件',
          upload: ''
        },{
          value: '证明复印件',
          upload: ''
        },{
          value: '婚姻状况材料',
          upload: ''
        },{
          value: '二平面图',
          upload: ''
        },{
          value: '宗地图',
          upload: ''
        },{
          value: '存量房买卖合同',
          upload: ''
        },{
          value: '法律文书',
          upload: ''
        }
      ],
      tableData3: [
        {
          xgzlx: '房屋不动产证',
          qlrmc: '马敏',
          xgzh: '苏(2017)宿迁市不动产权第0025535号',
          zl: '中远·现代城10幢1803室'
        },{
          xgzlx: '房屋不动产证',
          qlrmc: '陆启战',
          xgzh: '苏(2016)宿迁市不动产权第0014463号',
          zl: '绿城庭园B-1-B09'
        },{
          xgzlx: '房屋不动产证',
          qlrmc: '闻杰',
          xgzh: '宿房权证宿豫字第201403038_1号',
          zl: '宿豫区水润天城5 107'
        },{
          xgzlx: '房屋不动产证',
          qlrmc: '谭钦',
          xgzh: '苏(2017)宿迁市不动产权第0024109号',
          zl: '宿城区隆城府邸二期2#607'
        },{
          xgzlx: '房屋不动产证',
          qlrmc: '谭宗美',
          xgzh: '苏(2017)宿迁市不动产权第0024166号',
          zl: '宿城区幸福新城一期（阅湖花园）百合园9幢204室'
        },{
          xgzlx: '房屋不动产证',
            qlrmc: '叶敬陶',
            xgzh: '苏(2017)宿迁市不动产权第0043302号',
            zl: '宿豫区印象99花园10幢2-203室'
        },{
          xgzlx: '房屋不动产证',
            qlrmc: '叶青',
            xgzh: '宿房权证字第12-S-246_2号',
            zl: '黄河路黄河南四路5号2#/'
        }
      ],
      multipleSelection: [],
      qlrtest: [{
        name:'张长征',
        zjh:'320819197611256831',
        zjlx:'居民身份证'
      },{
        name:'葛云连',
        zjh:'320381198508283220',
        zjlx:'居民身份证'
      },{
        name:'张思源',
        zjh:'321321198809143111',
        zjlx:'居民身份证'
      },{
        name:'汤瑞',
        zjh:'321302198311050832',
        zjlx:'居民身份证'
      },{
        name:'徐宜明',
        zjh:'321323198601242818',
        zjlx:'居民身份证'
      },{
        name:'王英',
        zjh:'320421197412114216',
        zjlx:'居民身份证'
      },{
        name:'张竣',
        zjh:'321302198909200831',
        zjlx:'居民身份证'
      },{
        name:'谭钦',
        zjh:'321302198702040092',
        zjlx:'居民身份证'
      },{
        name:'叶青',
        zjh:'320819195203310414',
        zjlx:'居民身份证'
      },{
        name:'方勇',
        zjh:'320819197809100875',
        zjlx:'居民身份证'
      }]
      /*treeData: [{
        label: '流程附件',
        children: [{
          label: '房屋所有权证',
        }, {
          label: '土地使用权证',
        }, {
          label: '不动产权证书',
        }, {
          label: '土地收益等价款',
        }, {
          label: '契税完税证',
        }, {
          label: '上市交易申请审核表',
        }, {
          label: '声明',
        }, {
          label: '证明',
        }, {
          label: '维修资金专用收据',
        }, {
          label: '维修资金交存查询证明',
        }, {
          label: '申请书',
        }, {
          label: '询问笔录',
        }, {
          label: '身份证明复印件',
        }, {
          label: '户口复印件',
        }, {
          label: '证明复印件',
        }, {
          label: '婚姻状况材料',
        }, {
          label: '二平面图',
        }, {
          label: '宗地图',
        }, {
          label: '存量房买卖合同',
        }, {
          label: '法律文书',
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },*/
    }
  },

  methods: {
    getNoticeType() {

    },
    fetchData(pageNum, pageSize) {

    },
    fetchCount(){

    },
    editPrepare(index, row){
    },
    deletePrepare(index, row){

    },
    handleEdit(index, row) {
    },
    handleDelete(id){

    },
    searchResult(){

    },
    fetchSearchResult(formData) {

    },
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {

    },
    onEditorBlur() {
      console.log('val')
    },
    onEditorFocus() {
      console.log('val')
    },
    onEditorChange() {
      console.log('sfgfdgfd')
    },
    checkNoticeType() {

    } ,
    handlerEdit() {
    },
    handlerAdd() {

    },
    handleDelete() {

    },
    handlerAuthorize(){

    },
    removeQlr(item) {
      const index = this.dynamicValidateForm.qlrs.indexOf(item)
      if (index !== -1 && index >= 1) {
        this.dynamicValidateForm.qlrs.splice(index, 1)
      }
    },
    addQlr() {
      this.dynamicValidateForm.qlrs.push({
        qlrmc: '',
        qlrsfzh: '',
        key: Date.now()
      });
    },
    insertQLR(qlr, index) {
      console.log("index:"+index)
      if(index < 10){
        qlr.qlrmc = this.qlrtest[index].name;
        qlr.qlrsfzh = this.qlrtest[index].zjh;
        qlr.qlrzjlx = this.qlrtest[index].zjlx
      }else {
        qlr.qlrmc = '测试';
        qlr.qlrsfzh = '测试';
        qlr.qlrzjlx = "居民身份证"
      }
    },
    insertQLRDLR(qlrdlr, index) {
      if(index < 10){
        qlrdlr.qlrdlrmc = this.qlrtest[index].name;
        qlrdlr.qlrdlrsfzh = this.qlrtest[index].zjh;
        qlrdlr.qlrdlrzjlx = this.qlrtest[index].zjlx
      }else {
        qlrdlr.qlrdlrmc = '测试';
        qlrdlr.qlrdlrsfzh = '测试';
        qlrdlr.qlrdlrzjlx = "居民身份证"
      }
    },
    insertYWR(ywr, index) {
      if(index < 10){
        ywr.ywrmc = this.qlrtest[index].name;
        ywr.ywrsfzh = this.qlrtest[index].zjh;
        ywr.ywrzjlx = this.qlrtest[index].zjlx
      }else {
        ywr.ywrmc = '测试';
        ywr.ywrsfzh = '测试';
        ywr.ywrzjlx = "居民身份证"
      }
    },
    insertYWRDLR(ywrdlr, index) {
      if(index < 10){
        ywrdlr.ywrdlrmc = this.qlrtest[index].name;
        ywrdlr.ywrdlrsfzh = this.qlrtest[index].zjh;
        ywrdlr.ywrdlrzjlx = this.qlrtest[index].zjlx
      }else {
        ywrdlr.ywrdlrmc = '测试';
        ywrdlr.ywrdlrsfzh = '测试';
        ywrdlr.ywrdlrzjlx = "居民身份证"
      }

    },
    removeQlrdlr(item) {
      const index = this.dynamicValidateForm.qlrdlrs.indexOf(item)
      if (index !== -1 && index >= 1) {
        this.dynamicValidateForm.qlrdlrs.splice(index, 1)
      }
    },
    addQlrdlr() {
      this.dynamicValidateForm.qlrdlrs.push({
        qlrdlrmc: '',
        qlrdlrsfzh: '',
        key: Date.now()
      });
    },
    removeYwr(item) {
      const index = this.dynamicValidateForm.ywrs.indexOf(item)
      if (index !== -1 && index >= 1) {
        this.dynamicValidateForm.ywrs.splice(index, 1)
      }
    },
    addYwr() {
      this.dynamicValidateForm.ywrs.push({
        ywrmc: '',
        ywrsfzh: '',
        key: Date.now()
      });
    },
    removeYwrdlr(item) {
      const index = this.dynamicValidateForm.ywrdlrs.indexOf(item)
      if (index !== -1 && index >= 1) {
        this.dynamicValidateForm.ywrdlrs.splice(index, 1)
      }
    },
    addYwrdlr() {
      this.dynamicValidateForm.ywrdlrs.push({
        ywrdlrmc: '',
        ywrdlrsfzh: '',
        key: Date.now()
      });
    },
    Steps() {
      this.active = 1;
      this.dialogSJVisible = true;
      this.dialogPrintVisible = false;
      this.dialogFJVisible = false;
    },
    Steps2() {
      this.active = 2;
      this.dialogSJVisible = false;
      this.dialogPrintVisible = false;
      this.dialogFJVisible = true;
    },
    Steps3() {
      this.active = 3;
      this.dialogSJVisible = false;
      this.dialogPrintVisible = true;
      this.dialogFJVisible = false;
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    searchZS(){
      this.innerVisible = true;
    },
    handleNodeClick(data) {
      console.log(data);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val)
    },
    choseData() {
      this.innerVisible = false;
      this.certificate = this.multipleSelection;
    },
    getFJ(index, row) {
      row.upload = 'fujianxinxi';
      console.log(row.value+"  "+ row.upload);
      console.log(this.lcfj);
    },
    submit(){
      this.dialogPrintVisible = false;
      const formData = new FormData;
      formData.append('sjbh',this.sjdh);
      formData.append('form',this.dynamicValidateForm);
      formData.append('inform',this.inform);
      formData.append('certificate',this.certificate);
      formData.append('fj',this.lcfj);
      console.log("表单:"+formData.values());
      this.json.sjdh = this.sjdh;
      this.json.form = this.dynamicValidateForm;
      this.json.inform = this.inform;
      this.json.certificate = this.certificate;
      this.json.fj = this.lcfj;

      console.log("json:"+ this.json)
      console.log("json_form:"+ this.json.form)
      this.$http.post("http://localhost:8092/smfw/put",this.json).then(response => {
        console.log(formData)
      })
    }
  }
}
</script>

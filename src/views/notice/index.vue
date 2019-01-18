<template>

  <div class='app-container'>

    <el-form :inline='true' ref='form2' :model='listQuery' label-width='70px'>
      <el-form-item label="公告时间">
        <el-date-picker type='date' placeholder='日期' v-model='listQuery.nDate' style='width:100%;' value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item label="公告标题">
        <el-input v-model="listQuery.nName" placeholder="公告标题"></el-input>
      </el-form-item>
      <el-form-item label="公告类型">
        <el-select v-model='listQuery.nType' filterable placeholder='请选择公告类型'>
          <el-option v-for='(item,index) in contentlist' :value='item.itemname' :key='index'>{{item.itemname}}</el-option>
          <el-option :value='typevalue'>无类型</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-switch
          v-model="lookMe"
          active-text="只看我的"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="changeLoookMe"
        >
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-tooltip class="item" effect="dark" content="清空" placement="top-start">
          <el-button class="filter-item" type="info" icon="el-icon-tickets" @click="cleanFilter">清空</el-button>
        </el-tooltip>
      </el-form-item>
      <el-form-item>
        <el-tooltip class="item" effect="dark" content="搜索" placement="top-start">
          <el-button size='mini' icon="el-icon-search" @click='searchResult' type="primary"></el-button>
        </el-tooltip>
      </el-form-item>
    </el-form>

    <el-table :data='list' @sort-change="sortMethod" :default-sort = "{prop: 'fbrq', order: 'descending'}" v-loading.body='listLoading' width='100%' element-loading-text='Loading' border fit highlight-current-row>
      <el-table-column type='expand'>
        <template slot-scope='props'>
          <el-form labelPosition='left' inline class='demo-table-expand'>
            <el-form-item label='内容'>
              <div v-if="props.row.nnoticetype === '1'">
                <div v-html = 'props.row.ncontent'></div>
              </div>
              <div v-if="props.row.nnoticetype === '2'">
                <iframe :src='props.row.ncontent' style='width: 1200px;height: 1200px;' scrolling='yes'></iframe>
              </div>

            </el-form-item>

          </el-form>
        </template>
      </el-table-column>
-->
      <el-table-column label='公告名称' align='center'>
        <template slot-scope='scope'>
          <span>{{scope.row.nname}}</span>
        </template>
      </el-table-column>

      <el-table-column label='发布人' align='center'>
        <template slot-scope='scope'>
          {{scope.row.nissuer}}
        </template>
      </el-table-column>

      <el-table-column align='center'sortable="custom" label='发布日期' prop="N_DATE">
        <template slot-scope='scope'>
          <span>{{scope.row.ndate}}</span>
        </template>
      </el-table-column>

      <el-table-column label='公告类型' align='center'>
        <template slot-scope='scope'>
          {{scope.row.ntype}}
        </template>
      </el-table-column>

      <el-table-column label='Editor' align='center'>
        <template slot-scope='scope'>
          <el-tooltip class="item" effect="dark" content="修改公告" placement="top-start">
            <el-button size='mini' type='warning' @click='editPrepare(scope.$index, scope.row)'>编辑</el-button>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column label='Delete' align='center'>
        <template slot-scope='scope'>
          <el-tooltip class="item" effect="dark" content="删除此公告" placement="top-start">
            <el-button size='mini' type='danger' @click="deletePrepare(scope.$index, scope.row)">删除</el-button>
          </el-tooltip>
          <el-dialog :visible.sync="dialogVisible" width='20%' v-model="deleteValue">
            <span>确定删除吗？</span>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click='handleDelete(deleteValue.nid)'>是</el-button>
              <el-button @click="dialogVisible = false">否</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog title="修改公告内容" :visible.sync='dialogFormVisible' v-model='editValue'>

      <el-form :model="updateform" status-icon :rules="editRules" ref="updateform" label-width="130px" labelPosition="left" class="demo-ruleForm">
        <el-form-item label='公告名称' prop='name'>
          <el-input v-model='updateform.name' placeholder='请输入公告名称'></el-input>
        </el-form-item>
        <el-form-item label='公告类型' prop='type'>
          <el-select v-model='updateform.type' filterable placeholder='请选择公告类型'>
            <el-option v-for='(item,index) in contentlist' :value='item.itemname' :key='index'>{{item.itemname}}</el-option>
            <el-option :value='typevalue'>无类型</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='公告内容类型' prop='contenttype'>
          <el-select v-model='updateform.contenttype' placeholder='请选择公告内容类型' v-on:change='checkNoticeType()'>
            <el-option v-for='item in options' :key='item.value' :label = 'item.label' :value='item.value'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='公告内容' v-if='showinput' prop='noticecontent'>
          <el-input v-model='updateform.noticecontent' placeholder='请输入链接地址'></el-input>
        </el-form-item>
        <el-form-item label='公告内容' v-if='showquill' prop='noticecontent'>
          <el-input type="textarea" v-model='updateform.noticecontent':rows='8'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleEdit('updateform')">提交</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination align='center' @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='currentPage' :page-sizes='[5, 10, 15, 20]' :page-size='listQuery.limit' layout='total, sizes, prev, pager, next, jumper' :total='total'>
      </el-pagination>
    </div>
  </div>
</template>
<style>
  .attachment{
    display: none;
  }
</style>
<script>
  /* eslint-disable */
  import { deleteNotice,getType,noticeUpdate,getPageList } from '@/api/notice/table'
  import ElForm from '../../../node_modules/element-ui/packages/form/src/form.vue';
  import ElFormItem from '../../../node_modules/element-ui/packages/form/src/form-item.vue';
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button.vue';
  import ScrollPane from "../../components/ScrollPane/index.vue";
  import ElRow from "element-ui/packages/row/src/row";
  import EditForm from "./edit";
  import ElOption from "../../../node_modules/element-ui/packages/select/src/option.vue";

  export default {
    components: {
      ElOption,
      EditForm,
      ElRow,
      ScrollPane,
      ElButton,
      ElFormItem,
      ElForm },
    data() {
      return {

        lookMe:false,//是否只看当前登录
        contentlist: null,
        list: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 5,
          nDelete: '0'
        },
        updateform: {
          name: '',
          updateissuer: '',
          type: '',
          childtype: '',
          contenttype: '',
          noticecontent: '',
        },
        editRules: {
          name: [
            {
              required: true,
              message: '请输入公告名称',
              trigger: 'blur'
            }
          ],
          type: [
            {
              required: true,
              message: '请选择公告类型',
              trigger: 'blur'
            }
          ],
          contenttype:[
            {
              required: true,
              message: '请选择公告内容类型',
              trigger: 'blur'
            }
          ],
          noticecontent:[
            {
              required: true,
              message: '请选择输入公告内容',
              trigger: 'blur'
            }
          ]
        },
        typevalue: '无',
        showinput: false,
        showquill: false,
        required: true,
        pageNum:1,
        pageSize:5,
        total:100,
        currentPage: 1,
        dialogVisible:false,
        dialogFormVisible:false,
        deleteValue:null,
        editValue:null,
        search:false,
        editorOption: {

        },
        options: [{
          value: '1',
          label: '自编辑内容'
        }, {
          value: '2',
          label: '引用链接网址'
        }]
      }
    },
    created() {
      this.fetchData()
      this.getNoticeType()
    },
    methods: {
      changeLoookMe(value){
        //console.log(value)
        if(value==true){
          this.listQuery.nIssuer = this.$store.state.user.name;
        }else{
          this.listQuery.nIssuer =null;
        }
      },
      sortMethod(column){
        //console.log(column)  this.listQuery.order
        //封装排序
        var order;
        if(column.order=="descending"){
          order ='desc'
        }else{
          order ='asc'
        }

        this.listQuery.order = column.prop+" "+order
        //console.log(this.listQuery)
        //访问后台服务
        this.fetchData()

      },
      cleanFilter(){
        this.listQuery= {
            page: 1,
            limit: 5,
            nDelete: '0'
        }
      },
      getNoticeType() {
        getType(this.contentlist).then(response => {
          this.contentlist = response.data
        })
      },
      fetchData() {
        this.listLoading = true
        getPageList(this.listQuery).then(response => {
          //console.log(response)
          this.list = response.data.rows
          this.total = response.data.total;
          this.listLoading = false
        })
      },
      editPrepare(index, row){
        this.dialogFormVisible = true
        this.updateform.id = row.nid
        this.updateform.name = row.nname
        this.updateform.type = row.ntype
        this.updateform.childtype = row.nchildtype
        this.updateform.contenttype = row.nnoticetype
        const judge = this.updateform.contenttype
        if (judge === '1'){
          this.showinput = false
          this.showquill = true
        }else {
          this.showinput = true
          this.showquill = false
        }
        this.updateform.noticecontent = row.ncontent

      },
      deletePrepare(index, row){
        this.dialogVisible = true
        this.deleteValue = row
      },
      handleEdit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false

            if (this.updateform.type == null || this.updateform.type === '') {
              this.updateform.type = '无';
            }
            if (this.updateform.childtype == null || this.updateform.childtype === '') {
              this.updateform.childtype = '无';
            }
            const content = this.updateform.noticecontent
              //console.log("content:"+content)
            const formData = new FormData()
            formData.append('id', this.updateform.id)
            formData.append('name', this.updateform.name)
            this.updateform.updateissuer = this.$store.state.user.name
            formData.append('updateissuer', this.updateform.updateissuer)
            formData.append('type', this.updateform.type)
            formData.append('childtype', this.updateform.childtype)
            formData.append('content', content)
            formData.append('noticetype', this.updateform.contenttype)
            noticeUpdate(formData).then(response => {
              this.fetchData(this.pageNum,this.pageSize)
              this.$message({
                message: '更新成功',
                type: 'success'
              });
            })
          } else {
            //console.log('error update!!');
            return false;
          }
        });
      },
      handleDelete(id){
        this.dialogVisible = false
        deleteNotice(id).then(response => {
          this.fetchData(this.pageNum,this.pageSize)
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        })
      },
      searchResult(){
        this.fetchData()
      },

      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.fetchData()
      },
      checkNoticeType() {
        //console.log('公告字典：' + this.updateform.contenttype)
        if ('1' === this.updateform.contenttype) {
          this.showinput = false
          this.showquill = true
        } else {
          this.showinput = true
          this.showquill = false
        }
      }
    }
  }
</script>

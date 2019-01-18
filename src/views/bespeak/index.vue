<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;margin-top: 7px" class="filter-item" placeholder="预约编号" v-model="listQuery.yybh"> </el-input>
       <el-select v-model="listQuery.sldw" placeholder="办理网点" >
                       <el-option
                         v-for="item in wdData"
                        :key="item.id"
                        :label="item.value1"
                        :value="item.value1"> 
                       </el-option> 
         </el-select>
         <el-select v-model="listQuery.yysjd" placeholder="时间段">
                       <el-option value="上午">上午</el-option> 
                       <el-option value="下午">下午</el-option> 
                    </el-select>

                  <el-date-picker placeholder="选择预约时间"
                        type="date"
                        v-model="listQuery.yysj"
                        :clearable=false
                        value-format="yyyy-MM-dd">
                    </el-date-picker>   

                       <el-date-picker placeholder="选择预约申请日期"
                        type="date"
                        v-model="listQuery.yysqrq"
                        :clearable=false
                        value-format="created">
                    </el-date-picker>          
       <el-button class="filter-item" style="margin-top: 7px" type="info" icon="el-icon-tickets" @click="cleanFilter">清空</el-button>                         
      <el-button class="filter-item"  style="margin-top: 7px"  type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      
    </div>
    <el-table @expand-change="expandChange" :default-sort = "{prop: 'yybh', order: 'descending'}"
     :key='tableKey' :data="list" v-loading.body="listLoading" element-loading-text='数据加载中' border fit highlight-current-row  stripe height="500" style="width: 100%">
         <el-table-column type="expand">
              <template slot-scope="props">
                    <el-form :data="user" label-position="left"  inline class="demo-table-expand">
                        <el-form-item label="姓名:" >
                           <el-tag >{{ user.name }}</el-tag> 
                        </el-form-item>
                        <el-form-item label="身份证号码:">
                             <el-tag >{{ user.idcard }}</el-tag> 
                        </el-form-item>
                        <el-form-item label="联系方式:">
                            <el-tag >{{ user.tel }}</el-tag> 
                        </el-form-item>
                        <el-form-item label="性别:">
                             <el-tag >{{ user.sex }}</el-tag> 
                        </el-form-item>
                        
                        </el-form>

          </template>
         </el-table-column>         

    <el-table-column width="200px" :sortable="true" prop="yybh" align="center" label="预约编号">
        <template slot-scope="scope" >
            <span>{{scope.row.yybh}}</span>
        </template>
        </el-table-column>
        <el-table-column :sortable="true" width="200px" align="center" label="预约申请日期">
      <template slot-scope="scope">
        <span>{{scope.row.yysqrq}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="受理单位">
      <template slot-scope="scope">
        <span>{{scope.row.sldw}}</span>
      </template>
    </el-table-column>
        <el-table-column :sortable="true" width="200px" align="center" label="预约时间">
      <template slot-scope="scope">
        <span>{{scope.row.yysj|substrValue(10)}}</span>
      </template>
    </el-table-column>
      
        <el-table-column width="200px" align="center" label="预约状态">
      <template slot-scope="scope">
         <el-tag style="margin-left:10px;margin-top:10px" :type="scope.row.yyzt?'danger':'success'">{{scope.row.yyzt|yystsatus}}</el-tag>
      </template>
    </el-table-column>
      
        <el-table-column width="200px" align="center" label="预约时间段">
      <template slot-scope="scope">
        <span>{{scope.row.yysjd}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="登记小类">
      <template slot-scope="scope">
        <span>{{scope.row.djxl}}</span>
      </template>
    </el-table-column>
        <!-- <el-table-column fixed="right" align="center" label="操作" width="150"> <template slot-scope="scope">
        <el-button v-if="wwZxyyManager_btn_edit" size="small" type="success" @click="handleUpdate(scope.row)">编辑
        </el-button>
        <el-button v-if="wwZxyyManager_btn_del" size="small" type="danger" @click="handleDelete(scope.row)">删除
        </el-button>
      </template> </el-table-column> -->
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </div>
    
  </div>
</template>

<script>
  import {
      page
  } from '@/api/bespeak/index';
  import {getuser} from '@/api/user/index';
  import { mapGetters } from 'vuex';
  import {getDotlist } from "@/api/pubserver/dicUsrDefValue/index"; //引入初始化的相关方法
  export default {
    name: 'wwZxyy',
    data() {
      return {
        user:{},//用户信息
        wdData:[],  //网点信息
        form: {
        yysqrq : undefined,        openid : undefined,        sldw : undefined,        yysj : undefined,        yybh : undefined,        yyzt : undefined,        yydlr : undefined,        djdl : undefined,        djxl : undefined,        yysjd : undefined,        ywlxid : undefined,        djdlid : undefined,        keynum : undefined,        qxr : undefined,        qxsj : undefined          },
        list: null,
        total: null,
        listLoading: true,
        listQuery: { //用来携带查询数据的参数
          page: 1,
          limit: 20,
        },
        dialogFormVisible: false,
        dialogStatus: '',
        wwZxyyManager_btn_edit: false,
        wwZxyyManager_btn_del: false,
        wwZxyyManager_btn_add: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0
      }
    },
    filters:{//字符串截取展示
        substrValue:function(arg1,arg2){
            //console.log(arg)
            if(arg1&&arg1.length>=arg2){
                 return arg1.substring(0,arg2);
            }else{
                return arg1;
            }
        },
        yystsatus: function(arg1){
            if(!arg1){
                return '已预约'
            }else{
                return '已取消'
            }
        }
    },
    created() { //初始化的时候加载数据
      this.getList();
      this.getDotlistInfo();//获取办理网点
      this.wwZxyyManager_btn_edit = this.elements['wwZxyyManager:btn_edit'];
      this.wwZxyyManager_btn_del = this.elements['wwZxyyManager:btn_del'];
      this.wwZxyyManager_btn_add = this.elements['wwZxyyManager:btn_add'];
    },
    computed: {
      ...mapGetters([
        'elements'
      ])
    },
    methods: {
      //展开行 加载用户信息  
      expandChange(data,expandedRows){
         // console.log(data)
          //根据openid 获取用户信息  openid
           //展开行控制在一行  
          if(expandedRows.length>1){
            expandedRows.shift()
          }
          getuser(data.openid)
            .then(response => {
          //判断是否查询到用户，如果没有（可能性很小 但为了测试时不报错  可以加上判断）
          
          this.user = response.data;

          if(this.user==null){
            this.user={}
          }
         
      })
      },
      //清空搜索条件
      cleanFilter(){
          this.listQuery={};
      },
      //获取网点信息  
      getDotlistInfo(){
              
            getDotlist().then(response=>{
                this.wdData = response.data;
               
            })
          },
      getList() {
        this.listLoading = true;
        page(this.listQuery)
            .then(response => {
          this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
      })
      },
      handleFilter() {
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      handleCreate() {
        this.resetTemp();
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
      },
      handleUpdate(row) {
        getObj(row.id)
            .then(response => {
          this.form = response.data;
        this.dialogFormVisible = true;
        this.dialogStatus = 'update';
      });
      },
      handleDelete(row) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            .then(() => {
          delObj(row.id)
      .then(() => {
          this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        });
        const index = this.list.indexOf(row);
        this.list.splice(index, 1);
      });
      });
      },
      create(formName) {
        const set = this.$refs;
        set[formName].validate(valid => {
        if (valid) {
        addObj(this.form)
        .then(() => {
        this.dialogFormVisible = false;
        this.getList();
        this.$notify({
        title: '成功',
        message: '创建成功',
        type: 'success',
        duration: 2000
        });
        })
        } else {
        return false;
        }
        });
      },
      cancel(formName) {
        this.dialogFormVisible = false;
        const set = this.$refs;
        set[formName].resetFields();
      },

    }
  }
</script>

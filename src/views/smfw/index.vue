<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;margin-top: 7px" class="filter-item" placeholder="申请编号" v-model="listQuery.sqbh"> </el-input>
                  <el-date-picker placeholder="申请日期"
                        type="date"
                        v-model="listQuery.sqrq"
                        :clearable=false
                        value-format="yyyy-MM-dd">
                    </el-date-picker>   

                       <el-select placeholder="审批状态" v-model="listQuery.spzt">
                        <el-option value="未审批">未审批</el-option>
                        <el-option value="通过">通过</el-option> 
                        <el-option value="未通过">未通过</el-option> 
                       </el-select>

                   <el-tooltip class="item" effect="light"  content="开启查看我的受理件" placement="right">      
                     <el-switch
                            v-model="lookMe"
                            active-text="只看我的"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @change="changeLoookMe"
                            >
                        </el-switch>
                    </el-tooltip>        
       <el-button class="filter-item" style="margin-top: 7px" type="info" icon="el-icon-tickets" @click="cleanFilter">清空</el-button>                         
      <el-button class="filter-item"  style="margin-top: 7px"  type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      
    </div>
    <el-table  @expand-change="expandChange" :default-sort = "{prop: 'sqbh', order: 'descending'}"
     :key='tableKey' :data="list" v-loading.body="listLoading" element-loading-text='数据加载中' border fit highlight-current-row  stripe height="500" style="width: 100%">
         
    <el-table-column width="200px" :sortable="true" prop="sqbh" align="center" label="申请编号">
        <template slot-scope="scope" >
             <el-tooltip class="item" effect="light"  content="点击查看详情" placement="bottom">  
                  <a href="#" style="text-decoration:none" ><span style="color: #409EFF;font-size: 15px;" @click="click(scope.row)"><strong>{{scope.row.sqbh}}</strong></span></a>
             </el-tooltip>
        </template>
        </el-table-column>
        <el-table-column :sortable="true" prop="sqrq" width="200px" align="center" label="申请日期">
      <template slot-scope="scope">
        <span>{{scope.row.sqrq|substrValue(10)}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="申请人">
      <template slot-scope="scope">
        <span>{{scope.row.openid}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="审批人">
      <template slot-scope="scope">
        <span>{{scope.row.spr}}</span>
      </template>
    </el-table-column>

      <el-table-column width="200px" align="center" label="审批意见">
      <template slot-scope="scope">
        <span>{{scope.row.spyj}}</span>
      </template>
    </el-table-column>

       <el-table-column width="200px" align="center" label="审批日期">
      <template slot-scope="scope">
        <span>{{scope.row.sprq}}</span>
      </template>
    </el-table-column>

    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </div>
    
  </div>
</template>

<script>
  import {
      page
  } from '@/api/smfw/index';
  import {getuser} from '@/api/user/index';
  import { mapGetters } from 'vuex';
  import {getDotlist } from "@/api/pubserver/dicUsrDefValue/index"; //引入初始化的相关方法
  export default {
    name: 'wwZxyy',
    data() {
      return {
        lookMe:false,//是否只看当前登录
        user:{},//用户信息
        list: null,
        total: null,
        listLoading: true,
        listQuery: { //用来携带查询数据的参数
          page: 1,
          limit: 20,
        },
        dialogFormVisible: false,
        dialogStatus: '',
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
       
    },
    created() { //初始化的时候加载数据
      this.getList();
     
    },
    computed: {
      ...mapGetters([
        'elements'
      ])
    },
    methods: {
       changeLoookMe(value){//只看我的
        if(value==true){
          this.listQuery.spr = this.$store.state.user.name;
        }else{
          this.listQuery.spr =null;
        }
      },
      click(row){
          //console.log(row);
            this.$store.dispatch('saveSqbh_Smfw', row.sqbh)
            // 路由的跳转
            this.$router.push({name:'上门服务审批'})  
        },
      //展开行 加载用户信息  
      expandChange(data){
         // console.log(data)
          //根据openid 获取用户信息  openid
          getuser(data.openid)
            .then(response => {
          this.user = response.data;
      })
      },
      //清空搜索条件
      cleanFilter(){
          this.listQuery={};
          this.lookMe=false;
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


    }
  }
</script>

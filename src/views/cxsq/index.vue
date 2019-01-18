<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">       
                  <el-date-picker placeholder="查询日期"
                        type="date"
                        v-model="listQuery.sqrq"
                        :clearable=false
                        value-format="yyyy-MM-dd"
                        >
                    </el-date-picker>   
  <el-input @keyup.enter.native="handleFilter" style="width: 200px;margin-top: 7px" class="filter-item" placeholder="申请编号" v-model="listQuery.sqbh"> </el-input>  
       
       <el-select placeholder="查询类型" v-model="listQuery.sqtype"> 
                       <el-option value="无房查询">无房查询</el-option>
                       <el-option value="有房查询">有房查询</el-option> 
                    </el-select>   



       <el-button class="filter-item" style="margin-top: 7px" type="info" icon="el-icon-tickets" @click="cleanFilter">清空</el-button>                         
      <el-button class="filter-item"  style="margin-top: 7px"  type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      
    </div>
    <el-table   @sort-change="sortMethod"   :default-sort = "{prop: 'sqrq', order: 'descending'}"
     :key='tableKey' :data="list" v-loading.body="listLoading" element-loading-text='数据加载中' border fit highlight-current-row  stripe height="500" style="width: 100%">
         
           
        <el-table-column width="200px" align="center" label="申请编号">
      <template slot-scope="scope">
      <el-tooltip class="item" effect="light"  content="点击查看详情" placement="bottom">   
        <a  style="text-decoration:none"  @click="openDialog(scope.row)"><span style="color: #409EFF;font-size: 15px;">{{scope.row.sqbh}}</span></a>
      </el-tooltip> 
      </template>
    </el-table-column>
        <el-table-column  sortable="custom" width="200px" prop="sqrq"  align="center" label="申请日期">
      <template slot-scope="scope">
        <span>{{scope.row.sqrq|substrValue(16)}}</span>
      </template>
    </el-table-column>

        </el-table-column>
        <el-table-column width="200px" align="center" label="查询类型">
      <template slot-scope="scope">
        <span>{{scope.row.sqtype}}</span>
      </template>
    </el-table-column>

   <el-table-column width="200px" align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>


        <el-table-column width="200px" align="center" label="身份证">
      <template slot-scope="scope">
        <span>{{scope.row.idcard}}</span>
      </template>
    </el-table-column>

      <el-table-column width="200px" align="center" label="联系方式">
      <template slot-scope="scope">
        <span>{{scope.row.tel}}</span>
      </template>
    </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </div>

    <el-dialog
    :visible.sync="dialogFormVisible"
    :fullscreen=false
    width="900px"
    @close="closeDialog"
    title="查询结果明细">
          <div>
             <embed v-if="dialogFormVisible" width="800" height="1200" :src="pdfsrc"></embed>
          </div>   
    </el-dialog>
    
  </div>
</template>
<script>


  import {
      page,getPdf
  } from '@/api/cxsq/index';
  import {getuser} from '@/api/user/index';
  import { mapGetters } from 'vuex';
  export default {
    name: 'wwZxyy',
    data() {
      return {
        
        pdfsrc: '',//pdf 字段
        user:{},//用户信息
        list: null,
        total: null,
        listLoading: true,
        listQuery: { //用来携带查询数据的参数
          page: 1,
          limit: 20,
        },
        dialogFormVisible: false,//表格是否展示
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
    computed: {
      ...mapGetters([
        'elements'
      ])
    },
    methods: {

       //展开行 加载用户信息  
      openDialog(row){
        //console.log("打开了弹出框")
          const query = {
            sqbh:row.sqbh
          }
          getPdf(query)
            .then(response => {
         //开启表框
        // console.log(this.$refs.pdfRef)
        //this.$refs['pdfRef'].src="data:application/pdf;base64,"+response 
        this.pdfsrc="data:application/pdf;base64,"+response
        this.dialogFormVisible= true;
      })
      },
      //关闭dialog
      closeDialog(){
         this.pdfsrc=null;
         this.dialogFormVisible=false;
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
         this.getList()

        },

      //清空搜索条件
      cleanFilter(){
          this.listQuery={};
         
      },
     
      getList() {
        //console.log(this.pdfsrc)
        this.pdfsrc=null;
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
        //console.log("页面尺寸被触发")
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
       // console.log("当前页被触发")
        this.getList();
      },
    }
  }
</script>

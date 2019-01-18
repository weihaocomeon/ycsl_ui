<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">       
                  <el-date-picker placeholder="评价日期"
                        type="date"
                        v-model="listQuery.tjrq"
                        :clearable=false
                        value-format="yyyy-MM-dd">
                    </el-date-picker>   
  <el-input @keyup.enter.native="handleFilter" style="width: 200px;margin-top: 7px" class="filter-item" placeholder="评价环节" v-model="listQuery.pjhj"> </el-input>
  <el-input @keyup.enter.native="handleFilter" style="width: 200px;margin-top: 7px" class="filter-item" placeholder="业务编号" v-model="listQuery.ywbh"> </el-input>
  <!-- <el-input @keyup.enter.native="handleFilter" style="width: 200px;margin-top: 7px" class="filter-item" placeholder="服务评分" v-model="listQuery.fwpf"> </el-input>
-->
   <el-select placeholder="服务评分" v-model="listQuery.fwpf"> 
                       <el-option value="一星"><el-rate v-model="star1" disabled></el-rate></el-option>
                       <el-option value="两星"><el-rate v-model="star2" disabled></el-rate></el-option> 
                       <el-option value="三星"><el-rate v-model="star3" disabled></el-rate></el-option> 
                       <el-option value="四星"><el-rate v-model="star4" disabled></el-rate></el-option> 
                       <el-option value="五星"><el-rate v-model="star5" disabled></el-rate></el-option> 
                    </el-select>     
       
       <el-button class="filter-item" style="margin-top: 7px" type="info" icon="el-icon-tickets" @click="cleanFilter">清空</el-button>                         
      <el-button class="filter-item"  style="margin-top: 7px"  type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      
    </div>
    <el-table  @sort-change="sortMethod"   :default-sort = "{prop: 'tjrq', order: 'descending'}"
     :key='tableKey' :data="list" v-loading.body="listLoading" element-loading-text='数据加载中' border fit highlight-current-row  stripe height="500" style="width: 100%">
         
        <el-table-column sortable="custom" prop="tjrq" width="170px" align="center" label="评价日期">
      <template slot-scope="scope">
        <span>{{scope.row.tjrq|substrValue(10)}}</span>
      </template>
    </el-table-column>
        <el-table-column width="100px" align="center" label="评价人">
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



    <el-table-column width="150px" align="center" label="业务编号">
        <template slot-scope="scope">
          <span>{{scope.row.ywbh}}</span>
        </template>
      </el-table-column>

      
    <el-table-column width="150px" prop="pjhj" align="center" label="评价环节">
        <template slot-scope="scope">
          <span>{{scope.row.pjhj}}</span>
        </template>
      </el-table-column>



      
    <el-table-column sortable="custom"  prop="fwpf" width="150px" align="center" label="服务评分">
        <template slot-scope="scope">
            <el-rate
            v-model="scope.row.fwpf"
            disabled
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
        </template>
      </el-table-column>

         <el-table-column  width="350px" align="left" label="内容">
        <template slot-scope="scope">
          <span>{{scope.row.nr}}</span>
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
  } from '@/api/rate/index';
  import {getuser} from '@/api/user/index';
  import { mapGetters } from 'vuex';
  import {getDotlist } from "@/api/pubserver/dicUsrDefValue/index"; //引入初始化的相关方法
  export default {
    name: 'wwZxyy',
    data() {
      return {
        star1:1,
        star2:2,
        star3:3,
        star4:4,
        star5:5,
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
    //无需初始化时触发 因为发现 页面排序会自动触发
    // created() { //初始化的时候加载数据
    // console.log("初始化时被触发")
    //   this.getList();
     
    // },
    computed: {
      ...mapGetters([
        'elements'
      ])
    },
    methods: {

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
         this.listQuery.bh="XJPJ"
         //console.log(this.listQuery)
         //访问后台服务
        // console.log("排序被触发")
         this.getList()

        },

      //清空搜索条件
      cleanFilter(){
          this.listQuery={};
         
      },
     
      getList() {
        this.listLoading = true;
        page(this.listQuery)
            .then(response => {
          this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
        //for循环进行处理字符串
        this.list.forEach(element => {
            switch(element.fwpf)
                {
                case "一星":
                  element.fwpf=1
                  break;
                 case "两星":
                  element.fwpf=2
                  break;
                 case "三星":
                  element.fwpf=3
                  break;
                 case "四星":
                  element.fwpf=4
                  break;
                 case "五星":
                  element.fwpf=5
                  break;   
                }
        });

      })
      },
      handleFilter() {
         this.listQuery.bh="XJPJ"
        //console.log("搜索被触发")
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
      handleCreate() {
        this.resetTemp();
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
      },


    }
  }
</script>

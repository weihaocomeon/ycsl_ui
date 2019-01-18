<template>
  <div class="app-container calendar-list-container">
   
    <el-table  @sort-change="sortMethod"   :default-sort = "{prop: 'updatetime', order: 'descending'}"
     :key='tableKey' :data="list" v-loading.body="listLoading" element-loading-text='数据加载中' border fit highlight-current-row  stripe height="500" style="width: 100%">
        <el-table-column  prop="name"  align="center" label="姓名">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
       </el-table-column>
        <el-table-column  align="center" label="身份证号">
            <template slot-scope="scope">
              <span>{{scope.row.idcard}}</span>
            </template>
        </el-table-column>


        <el-table-column  align="center" label="电话">
      <template slot-scope="scope">
        <span>{{scope.row.tel}}</span>
      </template>
    </el-table-column>

      <el-table-column  align="center" label="性别">
      <template slot-scope="scope">
        <span>{{scope.row.sex}}</span>
      </template>
    </el-table-column>


     <el-table-column sortable="custom" align="center" prop="updatetime" label="注册时间">
      <template slot-scope="scope">
        <span>{{scope.row.updatetime}}</span>
      </template>
    </el-table-column>

          <el-table-column   align="center" label="操作">
        <template slot-scope="scope">
          <!-- <el-button type="primary" class="tag-read" data-clipboard-text='{222222}'  @click="copy">立即阅读</el-button> -->

          <el-button type="primary" icon="el-icon-info" size="small"  v-clipboard:copy='scope.row.openid' v-clipboard:success="onCopy" v-clipboard:error="onError">复制主键</el-button>

        </template>
      </el-table-column>




    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </div>
    
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueClipboard from 'vue-clipboard2';
 
  import {
      userOrder
  } from '@/api/user/index';
  import{
     sendMessage 
  } from '@/api/apply/index';
  import {getuser} from '@/api/user/index';
  import { mapGetters } from 'vuex';
  import {getDotlist } from "@/api/pubserver/dicUsrDefValue/index"; //引入初始化的相关方法
  Vue.use(VueClipboard);
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
       onCopy: function (e) {
          this.$message({
                    message: '用户ID已成功复制到粘贴板',
                    type: 'success'
                    });
       },
        onError: function (e) {
         this.$message({
                    message: '该浏览器不兼容,复制失败！',
                    type: 'error'
                    });
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
         //console.log("排序被触发")
         this.getList()

        },

      //   copy() {
      //   var clipboard = new Clipboard('.tag-read')
      //   clipboard.on('success', e => {
      //     alert('复制成功')
      //     // 释放内存
      //     clipboard.destroy()
      //   })
      //   clipboard.on('error', e => {
      //     // 不支持复制
      //    alert('该浏览器不支持自动复制')
      //     // 释放内存
      //     clipboard.destroy()
      //   })
      // },


  
      getList() {
        this.listLoading = true;
        userOrder(this.listQuery)
            .then(response => {
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;//关闭遮罩 
     
      })
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




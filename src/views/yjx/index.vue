<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">       
                  <el-date-picker placeholder="投诉日期"
                        type="date"
                        v-model="listQuery.tjrq"
                        :clearable=false
                        value-format="yyyy-MM-dd">
                    </el-date-picker>   
  <!-- <el-input @keyup.enter.native="handleFilter" style="width: 200px;margin-top: 7px" class="filter-item" placeholder="评价环节" v-model="listQuery.pjhj"> </el-input> -->
  <!-- <el-input @keyup.enter.native="handleFilter" style="width: 200px;margin-top: 7px" class="filter-item" placeholder="服务评分" v-model="listQuery.fwpf"> </el-input> -->
     <el-select placeholder="审核状态" v-model="listQuery.sfsy"> 
                       <el-option value="0" label="未签收"></el-option>
                       <el-option value="1" label="未审核"></el-option> 
                       <el-option value="2" label="已审核"></el-option> 
                    </el-select>  


      <el-switch
        v-model="lookMe"
        active-text="只看我的"
        active-color="#13ce66"
        inactive-color="#ff4949"
        @change="changeLoookMe"
        >
      </el-switch>

       <el-button class="filter-item" style="margin-top: 7px" type="info" icon="el-icon-tickets" @click="cleanFilter">清空</el-button>                         
      <el-button class="filter-item"  style="margin-top: 7px"  type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      
    </div>
    <el-table  @sort-change="sortMethod"   :default-sort = "{prop: 'tjrq', order: 'descending'}"
     :key='tableKey' :data="list" v-loading.body="listLoading" element-loading-text='数据加载中' border fit highlight-current-row  stripe height="500" style="width: 100%">
      <!-- 展开行 -->
       <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item v-if="props.row.spr">
               <el-tag type="success">签收人:</el-tag>
              <span>{{ props.row.spr }}</span>
            </el-form-item>
            <el-form-item  v-if="props.row.qsrq">
              <el-tag type="success">签收日期:</el-tag>
              <span>{{ props.row.qsrq }}</span>
            </el-form-item>
            <el-form-item  v-if="props.row.spr&&props.row.sprq">
              <el-tag type="success">审批人:</el-tag>
              <span>{{ props.row.spr }}</span>
            </el-form-item>
             <el-form-item v-if="props.row.sprq">
               <el-tag type="success">审批日期:</el-tag>
              <span>{{ props.row.sprq }}</span>
            </el-form-item>
            <div>
            <el-form-item>
              <div style="width:1020px">
                  <el-tag type="success">投诉/建议内容:</el-tag>
                       <el-input  type="textarea"  :rows="4" :disabled="true" :value="props.row.nr"></el-input>
              </div>
            </el-form-item>

              <el-form-item v-if="props.row.spyj">
              <div style="width:1020px">
                  <el-tag type="success">审批意见:</el-tag>
                       <el-input  type="textarea"  :rows="1" :disabled="true" :value="props.row.spyj"></el-input>
              </div>
              
                        
            </el-form-item>
            </div>
          </el-form>
        </template>
    </el-table-column>


        <el-table-column sortable="custom" prop="tjrq"  align="center" label="投诉日期">
          <template slot-scope="scope">
            <span>{{scope.row.tjrq|substrValue(10)}}</span>
          </template>
       </el-table-column>
        <el-table-column  align="center" label="申请人">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
        </el-table-column>


        <el-table-column  align="center" label="身份证">
      <template slot-scope="scope">
        <span>{{scope.row.idcard}}</span>
      </template>
    </el-table-column>

      <el-table-column  align="center" label="联系方式">
      <template slot-scope="scope">
        <span>{{scope.row.tel}}</span>
      </template>
    </el-table-column>



          <el-table-column   align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.text" @click="clickButton(scope.row)"  :disabled="scope.row.isDis">{{scope.row.text}}</el-button>
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
      page,sign,approval
  } from '@/api/rate/index';
  import{
     sendMessage 
  } from '@/api/apply/index';
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
      
       clickButton(row){
         //判断是签收还是审批 
         if(row.text=="签收"){
           //进行签收
           const query = {
                spr:this.$store.state.user.name,
                bh:row.bh
              }
           sign(query)
            .then(response => {
              //对结果进行判断 
              if(response.status=="200"){
                 this.$message({
                    message: response.data,
                    type: 'success'
                    });
              }else{
                this.$message({
                  message: response.message,
                  type: 'error'
                  });
              }
              this.getList();//刷新表格数据

            })

         }else{
            this.$prompt('请输入反馈意见', '提示', {
              confirmButtonText: '审批',
              cancelButtonText: '取消',
              inputType: "testarea",
              rows:3,
              inputPlaceholder:"请认真填写，不超过20个字",
              inputPattern: /^[\s\S]{1,20}$/,
              inputErrorMessage: '请按要求输入反馈意见'
            }).then(({ value }) => {
              //进行发送审批建议
              const query = {
                spr:this.$store.state.user.name,
                bh:row.bh,
                spyj: value
              }
              //alert(query.spr+query.bh+query.sprj)
              approval(query).then(response => {
                  if(response.status=="200"){
                  this.$message({
                      message: response.data,
                      type: 'success'
                      });

                  //触发短信发送的机制  
                  const queryM = {
                    applyNo:row.bh,
                    ywType:"投诉建议反馈"
                  }
                  sendMessage(queryM).then(response =>{
                  })
                  
                  }else{
                    this.$message({
                      message: response.message,
                      type: 'error'
                      });
              }
              this.getList();//刷新表格数据
              })

            }).catch(() => {
                  
              });
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
        // console.log("排序被触发")
         this.getList()

        },

      //清空搜索条件
      cleanFilter(){
          this.listQuery={};
          this.lookMe=false;
      },
     
      getList() {
        this.listLoading = true;
        this.listQuery.bh="YJX"
        page(this.listQuery)
            .then(response => {
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;//关闭遮罩 
        //循环所有记录 对按钮状态和显示的名称 进行装配
        //获取当前的用户名
        const user = this.$store.state.user.name
        this.list.forEach(element => {
            //根据审批状态填充按钮 
            if(element.sfsy=="0"){
                //未审核 
                element.isDis = false
                element.text = "签收"
            }else if(element.sfsy=="1"&&element.spr==user){
                //已签收 且为本人签收
                element.isDis = false
                element.text = "审批"
            }else if(element.sfsy=="1"&&element.spr!=user){
                //已签收 且为本人签收
                element.isDis = true
                element.text = "审批"
            }else{
                //已审批
                element.isDis = true
                element.text = "已审批"
            }            
        });
      })
      },
      handleFilter() {
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
      changeLoookMe(value){
        if(value==true){
          this.listQuery.spr = this.$store.state.user.name;
        }else{
          this.listQuery.spr =null;
        }
      }


    }
  }
</script>




<template>
<div>
    <!-- <el-card> -->
        <!-- <div slot="header" >
            <span>查询条件</span>
        </div> -->
        <div style="margin:10px">
            <el-form :model="reqParam"  ref="ruleForm" :inline="true" label-position="left">
                <el-row>
                <el-col :span="7">
                    <el-form-item prop='ywnh'  label="业 务 编 号:" >
                    <el-input v-model="reqParam.ywbh"></el-input>
                    </el-form-item>   
                </el-col>  

                <el-col :span="7">
                    <el-form-item label="创建开始日期:" prop="sqkssj">
                     
                    <el-date-picker
                        type="date"
                        v-model="reqParam.sqkssj"
                        :clearable=false
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        @change="checkSqjssj"
                        >
                    </el-date-picker>
                    </el-form-item>
                </el-col>  

                 <el-col :span="7">
                    <el-form-item label="申请结束日期:" prop="sqjssj">
                     
                    <el-date-picker
                        type="date"
                        v-model="reqParam.sqjssj"
                        :clearable=false
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        @change="checkSqjssj">
                    </el-date-picker>
                    </el-form-item>
                </el-col>  

                </el-row>

                <!-- <el-row>
                     <el-col :span="5">
                        <el-form-item label="案 件 状 态" >
                            <el-select v-model="jobInfo.blzt"  >
                                <el-option value="未处理">未处理</el-option> 
                                <el-option value="已完成">已完成</el-option> 
                                <el-option value="有异议">有异议</el-option>
                                <el-option value="已退回">已退回</el-option>
                            </el-select>
                        </el-form-item>     
                    </el-col>

                     <el-col :span="7" :offset="2">
                        <el-form-item prop='slbh'  label="交易合同号:" >
                        <el-input v-model="jobInfo.slbh"></el-input>
                        </el-form-item>   
                        </el-col> 

                    <el-col :span="5" :offset="5">
                        <el-form-item >
                            <el-button  type="primary" @click="reset('ruleForm')">重置</el-button>
                            
                            <el-button type="primary" @click="onSubmit('ruleForm')">查询</el-button>
                        </el-form-item>     
                    </el-col>
                </el-row> -->

            </el-form>
        </div>
        <div>
        <el-table
              border fit highlight-current-row  stripe 
            :data="jobInfo"
            style="width: 100%"
            height="750"
            size="medium" 
             >
            <el-table-column
            type="index"
            label="序号">
            </el-table-column>
            <el-table-column
                 width="200px"
                prop="ywbh"
                label="业务编号"
                 align="center">
                 <template slot-scope="scope">
                     <el-tooltip class="item" effect="light"  content="点击查看详情" placement="bottom">  
                        <a href="#" style="text-decoration:none" ><span style="color: #409EFF;font-size: 15px;" @click="changeView(scope.row)"><strong>{{scope.row.ywbh}}</strong></span></a>
                     </el-tooltip>
                </template>

            </el-table-column>
            <el-table-column
                prop="htbah"
                label="交易合同号"
                 align="center">
            </el-table-column>
            <el-table-column
                prop="fwzl"
                label="房屋坐落"
                 align="center">
            </el-table-column>

               <el-table-column
                prop="xgrmc"
                label="相关人名称"
                 align="center">
            </el-table-column>
            
            <el-table-column
                prop="crtTime"
                label="经办人"
                 align="center">
            </el-table-column>
            <el-table-column
                prop="crtUser"
                label="创建时间"
                 align="center">
            </el-table-column>

         
             
             
           
           <!-- <el-table-column
                prop="spzt"
                label="核税状态"
                 align="center">
                 <template slot-scope="scope">
                       <el-tag >{{scope.row.spzt}}</el-tag>
                </template>

            </el-table-column>

             <el-table-column
                prop="yyyy"
                label="异议原因"
                 align="center">
            </el-table-column>   

            <el-table-column
                prop="thyy"
                label="退回原因"
                 align="center">
            </el-table-column>

            <el-table-column
                prop=""
                label="操作"
                 align="center">
                  <template  slot-scope="scope">
                        <el-button  type="primary" size="small" v-if="scope.row.djxl=='转移登记'&&smzt==0" @click="sm" >扫码完成</el-button>
                        <el-button  type="primary" size="small" v-if="scope.row.spzt=='有异议'" @click="toInner(scope.row)" >通知联系人</el-button>
                        <el-button  type="primary" size="small" v-if="scope.row.spzt=='已退回'" @click="resetUp(scope.row)" >重新上传</el-button>
                </template>
            </el-table-column> -->

             </el-table>

                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="reqParam.page"
                    :page-sizes="[20, 50, 100, 200]"
                    :page-size="reqParam.limit"
                    :total="total"
                    layout="total, sizes, prev, pager, next, jumper"
                    >
                </el-pagination>
             </div>   
        </div>


      
</div>
</template>

<script>
import router from '@/router'//引入路由
import moment from "moment";
import { getJobs } from "@/api/ycsl/index";
export default {
     data(){
        return {
            dialogFormVisible: false,
            dialog: false,
             lookMe:false,//是否只看当前登录
             listLoading: true,//遮罩
            total:null,
            reqParam:{
                page:1,
                limit:20 ,//当前页面容量
            },
            jobInfo:[],//表格对象
           
           

        }},
    methods:{
        //查看详情
        changeView(row){
          //console.log('当前登记小类aa'+ row.djxl)
            this.$store.dispatch('saveXsywbh', row.ywbh)
            // 路由的跳转
            this.$router.push({name:'业务详情'})  

        },
        onSubmit(){
            getJobs(this.reqParam).then(response => {
                console.log(response)
                 this.jobInfo = response.data.rows
                 this.total = response.data.total
            })
        },
        resetUp(){
            this.$alert('与地税技术讨论后再开发......', '消息提醒', {confirmButtonText: '确定'});
        },
        // 附件转内网
        toInner(){
             this.$alert('短信通知发送模块', '消息提醒', {confirmButtonText: '确定'});
        },
        
        openFullScreen() {
            const loading = this.$loading({
            lock: true,
            text: '正在处理中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
            })
        },
        closeFullScreen(){
            this.$loading().close()
        },


        click(row){
          //console.log('当前登记小类aa'+ row.djxl)
          console.log(row)
          if(row.djxl =="转移登记"){
              //弹出附件查看框  
             this.dialogFormVisible = true;
          }

        },
        //申请结束时间的校验  
        checkSqjssj(){
            if(this.jobInfo.sqkssj!=''&&this.jobInfo.sqjssj!=''){
                //判断是否不符合
                if(moment(this.jobInfo.sqjssj).isBefore(this.jobInfo.sqkssj)){
                //时间定为到今天 
                this.jobInfo.sqjssj = this.jobInfo.sqkssj
                //给出错误提示
                this.$message({
                message: '申请结束时间不能小于开始时间',
                type: 'error'
                });
            }
            }
        },

         checkSpjssj(){
            if(this.jobInfo.spkssj!=''&&this.jobInfo.spjssj!=''){
                //判断是否不符合
                if(moment(this.jobInfo.spjssj).isBefore(this.jobInfo.spkssj)){
                //时间定为到今天 
                this.jobInfo.spjssj = this.jobInfo.spkssj
                //给出错误提示
                this.$message({
                message: '审批结束时间不能小于开始时间',
                type: 'error'
                });
            }
            }
        },
        // 分页相关 
         handleSizeChange(val) {
             this.reqParam.limit= val
             this.onSubmit()
        },
        handleCurrentChange(val) {
            this.reqParam.page= val
            this.onSubmit()
        }
    },
    created() {//初始化加载数据 
        this.onSubmit();
    },
}
</script>


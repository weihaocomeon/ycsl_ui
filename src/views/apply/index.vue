<template>
<div>
    <!-- <el-card> -->
        <!-- <div slot="header" >
            <span>查询条件</span>
        </div> -->
        <div style="margin:10px">
            <el-form :model="zxsq"  ref="ruleForm" :inline="true" label-position="left">
                <el-row>
                <el-col :span="7">
                    <el-form-item prop='sqbh'  label="申 请  编 号:" >
                    <el-input v-model="zxsq.sqbh"></el-input>
                    </el-form-item>   
                </el-col>  

                <el-col :span="7">
                    <el-form-item label="申请开始日期:" prop="sqkssj">
                     
                    <el-date-picker
                        type="date"
                        v-model="zxsq.sqkssj"
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
                        v-model="zxsq.sqjssj"
                        :clearable=false
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        @change="checkSqjssj">
                    </el-date-picker>
                    </el-form-item>
                </el-col>  

                </el-row>

                <el-row>
                 

                <el-col :span="7">
                    <el-form-item label="审批开始日期:" prop="spkssj">
                     
                    <el-date-picker
                        type="date"
                        v-model="zxsq.spkssj"
                        :clearable=false
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        @change="checkSpjssj">
                    </el-date-picker>
                    </el-form-item>
                </el-col>  

                 <el-col :span="7">
                    <el-form-item label="审批结束日期:" prop="spjssj">
                     
                    <el-date-picker
                        type="date"
                        v-model="zxsq.spjssj"
                        :clearable=false
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        @change="checkSpjssj"
                        >
                    </el-date-picker>
                    </el-form-item>
                </el-col>  

                <el-col :span="7">
                 <el-form-item label="审 批  状 态:" prop='shzt'>
                    
                    <el-select v-model="zxsq.spzt"  >
                       <el-option value="" label="所有">所有</el-option> 
                       <el-option value="未审批">未审批</el-option> 
                       <el-option value="通过">通过</el-option> 
                       <el-option value="未通过">未通过</el-option> 
                    </el-select>

                  </el-form-item>   

                  
                </el-col>


                </el-row>

                <el-row>
                     <el-col :span="8">
                        <el-form-item label="同 步 状 态" >
                            <el-select v-model="zxsq.blzt"  >
                                <el-option value="未同步">未同步</el-option> 
                                <el-option value="已同步登记平台办理未通过">已同步登记平台办理未通过</el-option> 
                                <el-option value="已同步登记平台办理并通过">已同步登记平台办理并通过</el-option> 
                                <el-option value="附件同步成功">附件同步成功</el-option> 
                                <el-option value="附件同步失败">附件同步失败</el-option> 
                            </el-select>
                        </el-form-item>     
                    </el-col>

                    <el-col :span="4" style="margin-top: 7px;">
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
                      </el-col>

                    <el-col :span="5" :offset="5">
                        <el-form-item >
                            <el-button  type="primary" @click="reset('ruleForm')">重置</el-button>
                            
                            <el-button type="primary" @click="onSubmit('ruleForm')">查询</el-button>
                        </el-form-item>     
                    </el-col>
                </el-row>

            </el-form>
        </div>
    <!-- </el-card> -->

    <!-- 查询结果 -->
    <!-- <el-card> -->
        <!-- <div slot="header" >
            <span>查询结果</span>  
        </div> -->
        <div>
             <el-table
              v-loading.body="listLoading"
               element-loading-text='数据加载中'
              border fit highlight-current-row  stripe 
            :data="tableData"
            style="width: 100%"
            height="400"
            size="medium" 
             >
            <el-table-column
            type="index"
            label="序号">
            </el-table-column>
            <el-table-column
                 width="200px"
                prop="sqbh"
                label="申请编号"
                 align="center">
                 <template slot-scope="scope">
                    <el-tooltip class="item" effect="light"  content="点击查看详情" placement="bottom">  
                        <a href="#" style="text-decoration:none" ><span style="color: #409EFF;font-size: 15px;" @click="click(scope.row)"><strong>{{scope.row.sqbh}}</strong></span></a>
                    </el-tooltip>
                </template>

            </el-table-column>
            <el-table-column
                prop="djxl"
                label="业务类型"
                 align="center">
            </el-table-column>
            <el-table-column
                prop="openid"
                label="申请人"
                 align="center">
            </el-table-column>
            <el-table-column
                prop="sqrq"
                label="申请时间"
                 align="center">
            </el-table-column>
            <!-- <el-table-column
                prop="gyfs"
                label="共有方式"
                 align="center">
            </el-table-column> -->
            <el-table-column
                prop="blwd"
                label="办理网点"
                 align="center">
            </el-table-column>
             
              <!-- <el-table-column
                prop="smsstatue"
                label="短信发送状态"
                 align="center">
            </el-table-column> -->
             <el-table-column
                prop="slbh"
                label="受理编号"
                 align="center">
            </el-table-column>
             
            <el-table-column
                prop="spr"
                label="审核人"
                 align="center">
            </el-table-column>
            <el-table-column
                prop="sprq"
                label="审核日期"
                 align="center">
            </el-table-column>
           
           <el-table-column
                prop="spzt"
                label="审核状态"
                 align="center">
                 <template slot-scope="scope">
                       <el-tag >{{scope.row.spzt}}</el-tag>
                </template>

            </el-table-column>

            <el-table-column
                prop=""
                label="操作"
                 align="center">
                  <template  slot-scope="scope">
                        <el-button  type="primary" size="small" v-if="scope.row.spzt=='通过'&&(scope.row.slbh==null)" @click="toInner(scope.row)" >转平台</el-button>
                        <el-button  type="primary" size="small" v-if="scope.row.ajzt==2&&(scope.row.fjtbzt=='同步失败')" @click="toInnerFJ(scope.row)" >转附件</el-button>
                </template>
            </el-table-column>

             </el-table>
             <div v-show="!listLoading">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="zxsq.curpage"
                    :page-sizes="[20, 50, 100, 200]"
                    :page-size="zxsq.pagesize"
                    :total="total"
                    layout="total, sizes, prev, pager, next, jumper"
                    >
                </el-pagination>
             </div>   
        </div>
    <!-- </el-card> -->
</div>
</template>

<script>
import router from '@/router'//引入路由
import moment from "moment";
import { getApplys,toinner,synFile} from "@/api/apply/index"; 
export default {
     data(){
        return {
             lookMe:false,//是否只看当前登录
             listLoading: true,//遮罩
            total:null,
            zxsq:{
                blzt:'',//办理状态 用于查询
                slbh:null,//受理编号
                sqbh:'',//申请编号
                sqkssj:'',//申请开始时间
                sqjssj:'',//申请结束时间
                spkssj:'',//审批开始时间
                spjssj:'',//审批结束时间
                spzt:'',//审批状态
                // 分页相关属性
                curpage:1,
                pagesize:20 ,//当前页面容量
               // total:0//数据总条数
            },
            tableData:[],//表格对象
           
           

        }},
    methods:{
        changeLoookMe(value){
        if(value==true){
          this.zxsq.spr = this.$store.state.user.name;
        }else{
          this.zxsq.spr =null;
        }
      },
        // 转内网
        toInner(row){
            const query = {
                sqbh:row.sqbh,
                userid:this.$store.state.user.name
            }
             this.openFullScreen()
            toinner(query).then(response=>{
                if(response.state==200){
                     //结果的打印
                    this.$message({
                    message: response.data.result,
                    type: 'info'
                    });
                }else{
                    this.$message({
                    message: response.data.result,
                    type: 'error'
                    });
                }
                this.closeFullScreen()
                 //刷新表格数据  
                this.onSubmit('ruleForm')
               
            })
           
        },
        // 附件转内网
        toInnerFJ(row){
            
            const query = {
                sqbh:row.sqbh,
                userid:this.$store.state.user.name,
                slbh:row.slbh
            }
             this.openFullScreen()
            synFile(query).then(response=>{
                 if(response.state==200){
                     //结果的打印
                    this.$message({
                    message: response.data,
                    type: 'info'
                    });
                 }else{
                    this.$message({
                    message: response.data.result,
                    type: 'error'
                    }); 
                 }
                  this.closeFullScreen()
                 //刷新表格数据  
                 this.onSubmit('ruleForm')
            })
           
            
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
            this.$store.dispatch('saveSqbh', row.sqbh)
            this.$store.dispatch('saveYwlx', row.djxl)
            this.$store.dispatch('saveBlwd',row.blwd)
            // 路由的跳转
            this.$router.push({name:'申请详情', params: {'sqbh': row.sqbh, type: row.djxl}})  

        },
        //申请结束时间的校验  
        checkSqjssj(){
            if(this.zxsq.sqkssj!=''&&this.zxsq.sqjssj!=''){
                //判断是否不符合
                if(moment(this.zxsq.sqjssj).isBefore(this.zxsq.sqkssj)){
                //时间定为到今天 
                this.zxsq.sqjssj = this.zxsq.sqkssj
                //给出错误提示
                this.$message({
                message: '申请结束时间不能小于开始时间',
                type: 'error'
                });
            }
            }
        },

         checkSpjssj(){
            if(this.zxsq.spkssj!=''&&this.zxsq.spjssj!=''){
                //判断是否不符合
                if(moment(this.zxsq.spjssj).isBefore(this.zxsq.spkssj)){
                //时间定为到今天 
                this.zxsq.spjssj = this.zxsq.spkssj
                //给出错误提示
                this.$message({
                message: '审批结束时间不能小于开始时间',
                type: 'error'
                });
            }
            }
        },
        //重置的方法
        reset(formName){
            this.zxsq.sqbh=''
            this.zxsq.sqkssj=''
            this.zxsq.sqjssj=''
            this.zxsq.spkssj=''
            this.zxsq.spjssj=''
            this.zxsq.spzt=''
            this.lookMe=false;
        },
        //查询的方法
        onSubmit(formName){
           // console.log(this.zxsq)
            this.listLoading = true;
            getApplys(this.zxsq).then(response=>{
            if(response.data.ts!=null){
                this.tableData = response.data.ts;
            }else{
                this.tableData=[];
                this.tableData.push(response.data.t); 

            }
            this.total= response.data.total;
            this.listLoading = false;
        })
        },
        // 分页相关 
         handleSizeChange(val) {
             this.zxsq.pagesize= val
             this.onSubmit()
        },
        handleCurrentChange(val) {
            this.zxsq.curpage= val
            this.onSubmit()
        }
    },
    created() {//初始化加载数据 
        this.zxsq.curpage= 1;
        this.zxsq.pagesize= 20;
        this.onSubmit();
    },
}
</script>


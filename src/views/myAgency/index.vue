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
                     <el-col :span="5">
                        <el-form-item label="案 件 状 态" >
                            <el-select v-model="zxsq.blzt"  >
                                <el-option value="未处理">未处理</el-option> 
                                <el-option value="已完成">已完成</el-option> 
                                <el-option value="有异议">有异议</el-option>
                                <el-option value="已退回">已退回</el-option>
                            </el-select>
                        </el-form-item>     
                    </el-col>

                     <el-col :span="7" :offset="2">
                        <el-form-item prop='slbh'  label="交易合同号:" >
                        <el-input v-model="zxsq.slbh"></el-input>
                        </el-form-item>   
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
        <div>
             <el-table
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
                        <a href="#" style="text-decoration:none" ><span style="color: #409EFF;font-size: 15px;" @click="click(scope.row)"><strong>{{scope.row.sqbh}}</strong></span></a>
                </template>

            </el-table-column>
            <el-table-column
                prop="djxl"
                label="房屋坐落"
                 align="center">
            </el-table-column>
            <el-table-column
                prop="slbh"
                label="交易合同号"
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
             
             
           
           <el-table-column
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


          <el-dialog title="选择业务类型" :visible.sync="dialog">
                  <el-select  v-model="zxsq.spzt"  width="30%">
                       <el-option value="商品房预告登记转商品房转移登记">商品房预告登记转商品房转移登记</el-option> 
                       <el-option value="不动产抵押登记">不动产抵押登记</el-option> 
                    </el-select>
                     <span slot="footer" class="dialog-footer">
                    <el-button @click="dialog = false">取 消</el-button>
                    <el-button type="primary" @click="isOk">确 定</el-button>
                </span>
          </el-dialog>

      
</div>
</template>

<script>
import router from '@/router'//引入路由
import moment from "moment";
// import { getApplys,toinner,synFile} from "@/api/apply/index"; 
export default {
     data(){
        return {
            smzt:0,
            dialogFormVisible: false,
            dialog: false,
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
                yyyy:'',//异议原因
                // 分页相关属性
                curpage:1,
                pagesize:20 ,//当前页面容量
               // total:0//数据总条数
            },
            tableData:[],//表格对象
           
           

        }},
    methods:{
        resetUp(){
            this.$alert('与地税技术讨论后再开发......', '消息提醒', {confirmButtonText: '确定'});
        },
        sm(){
            this.smzt=1
        },
        isOk(){
            this.dialog= false
           
            this.tableData[1].slbh="201901240023"
            this.tableData[1].spzt="已生成"
             this.$set(this.tableData, 1, this.tableData[1]);
            //this.onSubmit()
        },
        changeLoookMe(value){
        if(value==true){
          this.zxsq.spr = this.$store.state.user.name;
        }else{
          this.zxsq.spr =null;
        }
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
            this.tableData = [{
        "curpage": 1,
        "pagesize": 20,
        "maxpage": 1,
        "sqbh": "SJ201901240001",
        "sqrq": "2019-01-24 07:35:28",
        "djxl": "幸福小区18#3-101",
        "spzt": "已完成",
        "slbh":"201901240022",
        "ajzt": "0",
        "openid": "Administrator",
        "blwd": "宿迁市不动产登记窗口",
        "tbblzt": "未同步",
        "fjtbzt": "未同步",
        "smsstatue": "未发送"
      },
      {
        "curpage": 1,
        "pagesize": 20,
        "maxpage": 1,
        "sqbh": "SJ201901240002",
        "slbh":"201901240002",
        "sqrq": "2019-01-24 09:57:39",
        "djxl": "悦山府A1-14#2-1301",
        "spzt": "有异议",
        "yyyy":"婚姻状况异常",
        "ajzt": "0",
        "openid": "Administrator",
        "blwd": "中国工商银行铜山支行",
        "xgzh": "201501620",
        "sfzsbd": "是",
        "sfzsyx": "是",
        "gyfs": "单独所有",
        "tbblzt": "未同步",
        "fjtbzt": "未同步",
        "smsstatue": "未发送"
      },
       {
        "curpage": 1,
        "pagesize": 20,
        "maxpage": 1,
        "sqbh": "SJ201901240003",
        "slbh":"201901240002",
        "sqrq": "2019-01-24 09:57:39",
        "djxl": "悦山府A2-14#2-1101",
        "spzt": "已退回",
        "thyy":"附件缺失", //退回原因
        "ajzt": "0",
        "openid": "Administrator",
        "blwd": "中国工商银行铜山支行",
        "xgzh": "201501620",
        "sfzsbd": "是",
        "sfzsyx": "是",
        "gyfs": "单独所有",
        "tbblzt": "未同步",
        "fjtbzt": "未同步",
        "smsstatue": "未发送"
      }]
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


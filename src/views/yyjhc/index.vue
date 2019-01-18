<template>
<div>
    <div>
    <el-card class="box-card-top">
        <div slot="header" class="clearfix">
            <span>条件设置</span>
        </div>
        <div>
        <el-form :model="yyjhc" :rules="rules" ref="ruleForm" :inline="true" label-position="left">
                <el-row>
                <el-form-item prop='setType'>
                  <el-radio-group v-model="yyjhc.setType" @change='radioChange'>  
                     <el-radio label="初始化">初始化</el-radio>
                     <el-radio  label="占号">占号</el-radio>
                     <el-radio  label="放号">放号</el-radio>
                  </el-radio-group>   
                </el-form-item>   
                </el-row>
                <el-row>
                <el-col :span="14">
                <el-form-item label="办理日期" prop="endYyrq">
                     
                    <el-date-picker
                        type="date"
                        v-model="yyjhc.yyrq"
                        :clearable=false
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <el-tag type="success">至</el-tag>
                    <el-date-picker
                        :clearable=false
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        type="date"
                        v-model="yyjhc.endYyrq"
                        @change="checkendDate"
                        >
                    </el-date-picker>
                  </el-form-item>   
                </el-col>
                <el-col :span="10">
                 <el-form-item label="办理网点" prop='blwd'>
                    
                    <el-select v-model="yyjhc.blwd" @change='wdChange' >
                       <el-option
                         v-for="item in wdData"
                        :key="item.id"
                        :label="item.value1"
                        :value="item.value1"> 
                       </el-option> 
                    </el-select>

                  </el-form-item>   
                </el-col>
                </el-row>
                <el-row >
                <el-col :span="14">
                <el-form-item label="办理时间段" prop='sjd'>
                     
                    <el-select v-model="yyjhc.sjd" >
                        <el-option label="上午" value="上午"></el-option>
                        <el-option label="下午" value="下午"></el-option>
                    </el-select>
                    
                  </el-form-item>
                </el-col>
                <el-col :span="10>"     
                  <el-form-item label="登记大类" prop="djdl">
                   
                    <el-select v-model="yyjhc.djdl" >
                        <el-option
                         v-for="item in djdlArray"
                        :key="item.id"
                        :label="item.value1"
                        :value="item.value1"> 
                       </el-option> 
                    </el-select>
                  
                  </el-form-item>   
                 </el-col> 
                </el-row>
                <el-row>
                <el-col :span="14">
                  <el-form-item label="占号数量"  v-if="yyjhc.setType=='占号'"  prop="count">
                        <el-input type="number"  v-model="yyjhc.count" ></el-input>
                  </el-form-item>

                  <el-form-item label="放号数量" v-if="yyjhc.setType=='放号'"  prop="count">
                    <el-input v-model="yyjhc.count" type="number"></el-input>
                  </el-form-item>  
                </el-col>
                <el-col :span="10">
                  <el-form-item label="放号起始值"  v-if="yyjhc.setType=='放号'" prop="startnum">
                    <el-input v-model="yyjhc.startnum"  type="number"></el-input>
                  </el-form-item>  
                </el-col>   
                </el-row>
                <el-form-item label-position='right'>
                    <el-button  @click="yyjhcSet('ruleForm')">{{yyjhc.setType}}</el-button>
                    
                    <el-button type="primary" @click="onSubmit('ruleForm')">号池查询</el-button>
                </el-form-item>   
           

        </el-form>
        </div>
    </el-card>
    </div>
    <div>
    <el-card class="box-card-bottom">
        <div slot="header" class="clearfix">
            <span>号池状态</span>
        </div>

        <el-table
            :data="tableData"
            style="width: 100%"
            border
            height="250"
            size="medium" 
             >
            <el-table-column
                prop="yyrq"
                label="日期"
                 align="center">
            </el-table-column>
            <el-table-column
                prop="ammsg"
                label="上午"
                 align="center">
                <template slot-scope="scope">
                     <span>{{scope.row.ammsg}}  </span>
                        <el-button  type="primary" size="small" v-if="scope.row.ammsg!='暂未开放'" @click="getDetailInfo(scope.row,'上午')">查看详情</el-button>
                </template>
            </el-table-column>
            <el-table-column
                
                prop="pmmsg"
                label="下午">

                 <template slot-scope="scope">
                     <span>{{scope.row.pmmsg}}</span>
                        <el-button  type="primary" size="small" v-if="scope.row.pmmsg!='暂未开放'" @click="getDetailInfo(scope.row,'下午')">查看详情</el-button>
                </template>

            </el-table-column>
        </el-table>


    </el-card>


    <!-- DIALOG号池详情 --> 
      <el-dialog
    :visible.sync="dialogVisible"
    width="30%"
    center>
    <span slot="title">
        <el-row>
        {{dialogTitle}}
        </el-row>
         <el-row>
            
                <el-alert
                    title="可预约"
                    type="success"
                    :closable=false
                    center
                    show-icon>
                </el-alert>
            
                <el-alert
                    style="float:left"
                    :closable=false
                    title="已使用"
                    type="error"
                    center
                    show-icon>
                </el-alert>
            
        </el-row>
        </span>  
    <!-- 表单提交 因为之前 dictValueForm已经被赋值了 所以这里能拿到值-->
  
        <!-- 下表中必须存在itemorder属性 否则验证规则将不起作用 -->
       <template v-for="yyxq in dialogFormData">
           <el-tag style="margin-left:10px;margin-top:10px" :type="yyxq.zt==1?'danger':'success'">{{yyxq.bh}}</el-tag>
       </template>    
    
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>

  </el-dialog>
    


    </div>
</div>    
</template>

<script>
import moment from "moment";
import { getModlue,getDotlist,getBespeakType } from "@/api/pubserver/dicUsrDefValue/index"; //引入初始化的相关方法
import { getDicWithPandC } from "@/api/pubserver/dicItem/index";
import { geInfos , getDetailedInfo,setYyjhc} from "@/api/bespeak/index";//引入号池操作相关
  export default {
      data() {
        return {
            dialogFormData:[],//弹出框的数据
            dialogVisible: false,//弹出框是否展示
            dialogTitle: '',//弹出框的标题
            wdData:[], //初始化对象 包含现在网点的各种值 数组对象 是返回值的data节点
            djdlArray:[],//用来接收树形结构的登记大类
            tableData:[],//表格
            yyjhc: { //参数对象
                sjd: '上午',
                blwd: '', // 办理网点
                djdl:'',//登记大类
                yyrq:'',//预约日期
                endYyrq:'',//结束日期
                id:'',//网点id
                setType:'初始化',//管理类型
                count:'',//占号数量
                startnum:''//开始号段
            },
            //表单提交的校验规则
            rules: {
            setType: [
                { required: true, message: '请选择操作类型', trigger: 'change' },
            ],
            endYyrq: [
                { required: true, message: '请选择结束日期', trigger: 'change' }
            ],
            blwd: [
                { type: 'string', required: true, message: '请选择办理网点', trigger: 'change' }
            ],
            sjd: [
                { type: 'string', required: true, message: '请选择时间段', trigger: 'change' }
            ],
            djdl: [
                { type: 'string', required: true, message: '请选择登记大类', trigger: 'change' }
            ],
              count: [
                {required: true, message: '请填写数量', trigger: 'change'  }
              ],
              startnum: [
                {  required: true, message: '请填写起始值', trigger: 'change' }
              ]
            }  
        }
      },
      methods: {

          //单选框选的值变更时 触发的事件
          radioChange(){
              //将数量清空 防止误操作
              this.yyjhc.count='';
              this.yyjhc.startnum='';
         
          },
          yyjhcSet(formName){
              //进行数据校验
              this.$refs[formName].validate((valid) => {
            if (valid) {
                //初始化号池所有的方法最终都要调用公共的set方法
              setYyjhc(this.yyjhc).then(response=>{
                 //查询一波
                 this.onSubmit(formName);
                 //弹框提示信息 
                  this.$alert(response.data, '操作提示', {
                    confirmButtonText: '确定',
                     dangerouslyUseHTMLString:true
                    }); 
            })
            } else {
                return false;
            }
            });

              
          },
          onSubmit(formName){
              this.yyjhc.setType='初始化'
              //填充网点id
              //console.log(this.yyjhc)
              //进行数据校验
            this.$refs[formName].validate((valid) => {
            if (valid) {
                 geInfos(this.yyjhc).then(response=>{
                 this.tableData=response.data 
                })
            } else {
                return false;
            }
            });

             
          },
          //查看详情
          getDetailInfo(row,sjd){
            //不要污染全局变量yyrq传参
            let param={
                blwd: this.yyjhc.blwd,
                djdl: this.yyjhc.djdl,
                sjd:sjd,
                yyrq: row.yyrq.replace(/[^0-9]/ig,"")
            }
            getDetailedInfo(param).then(response=>{
                //赋值 
                this.dialogFormData=response.data;
                this.dialogTitle=row.yyrq+sjd+"号池详情"
                //dialog弹出
                this.dialogVisible= true
            })
          },

          //监测结束时间是否小于结束时间
          checkendDate(date){
             //和开始时间做比较 
            //判断开始时间是否在结束时间之前
            if(moment(date).isBefore(this.yyjhc.yyrq)){
                //时间定为到今天 
                this.yyjhc.endYyrq =  moment(new Date).format('YYYY-MM-DD')
                //给出错误提示
                this.$message({
                message: '结束时间不能小于开始时间',
                type: 'error'
                });
               
            }
          },
          // 获取网点信息 给网点进行赋值
          getDotlistInfo(){
              
            getDotlist().then(response=>{
                this.wdData = response.data;
                //网点信息初始化
                this.yyjhc.blwd = response.data[0].value1
                this.yyjhc.id = response.data[0].id
                //请求成功后发送下一个请求    
                this.getBespeakTypeInfo(response.data[0].id)
            })
          },
          //获取网点可预约的信息 传入网点的id
          getBespeakTypeInfo(id){
            getBespeakType(id).then(response=>{
               this.djdlArray=response.data 
               //console.log(this.djdlArray)
               //初始化值
               this.yyjhc.djdl = this.djdlArray[0].value1
               
            })
          },
          // 获取可预约天数 计算第二个日期框的值 
          initTime(){
            this.yyjhc.yyrq =  moment(new Date).format('YYYY-MM-DD')
             const query = {
              parParam: '预约时间配置',
              childParam:'可预约天数'
            };
           getDicWithPandC(query).then(response=>{
             this.yyjhc.endYyrq =moment(new Date(new Date().getTime() + (1000 * 60 * 60 * 24*response.data.itemval))).format('YYYY-MM-DD')
           })
          },
          wdChange(blwd){
              let wd= this.wdData.filter(item=>{
                 return item.value1 == blwd 
            })
            //网点id重新赋值
            this.yyjhc.id = wd[0].id
            //找出另外一个网点的业务
            this.getBespeakTypeInfo(this.yyjhc.id)
          },
        
      },
      created() {
          this.getDotlistInfo()
          // 获取可预约天数 计算第二个日期框的值 
          this.initTime()
         

      } 
  }
  
</script>

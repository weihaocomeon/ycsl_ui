<template>
   <div>
       <el-collapse v-model="activeNames">
           <el-collapse-item name="1"  style="margin-bottom:5px">
               <template slot="title" >
                <div style="background-color:#DCDFE6">
                    <i class="iconfont icon-renyuan" style="margin-left:5px"></i>
                    <strong>
                        <span style="font-size:18px">申请人信息</span>
                    </strong>
                </div>   
                 </template> 
               <!-- 申请人信息 -->
               <div class="div-mjFormData">
               <el-table
                :data="user"
                style="width: 100%"
                border>
                <el-table-column
                    prop="name"
                    label="姓名"
                    >
                </el-table-column>
                <el-table-column
                    prop="tel"
                    label="电话"
                   >
                </el-table-column>
                <el-table-column
                    prop="idcard"
                    label="身份证号码">
                </el-table-column>
                </el-table>      
            </div>
           </el-collapse-item>

            <el-collapse-item name="2"  style="margin-bottom:5px">
               <template slot="title" >
                <div style="background-color:#DCDFE6">
                    <i class="iconfont icon-renyuanxinxi" style="margin-left:5px"></i>
                    <strong>
                        <span style="font-size:18px">申请详情</span>
                    </strong>
                </div>   
                 </template> 
               <!-- 申请人信息 -->
              <div class="div-fw">
                    <el-row>
                <el-col :span="12">
                    <el-input :value="wwSmfwsq.sqbh" class="data-fwinfo" :readonly="true">
                        <template slot="prepend"><span>申请编号</span></template>
                    </el-input>    
                </el-col>   
                <el-col :span="12">
                    <el-input :value="wwSmfwsq.sqrq"  class="data-fwinfo" :readonly="true">
                        <template slot="prepend">申请日期:</template>
                    </el-input>    
                </el-col>     
             </el-row>

             <el-row>
              <el-col :span="12">
                    <el-input :value="wwSmfwsq.sqyy"  class="data-fwinfo" :readonly="true">
                        <template slot="prepend">申请原因:</template>
                    </el-input>    
                </el-col>     
             </el-row>

            <el-row>
                <el-col :span="24">
                    <div style="margin-top:10px;margin-left:15px">
                    <el-tag type="info"  ><span  style="font-size:13.5px">需办理业务描述:</span></el-tag>
                    </div>
                    <el-input type="textarea" :rows="5" :value="wwSmfwsq.xblyw" class="data-fwinfo" :readonly="true">
                    </el-input>    
                </el-col>   
               
             </el-row>



           
              </div>
           </el-collapse-item>



               <el-collapse-item   name="3" style="margin-bottom:5px">
              <template slot="title" >
            <div  style="background-color:#DCDFE6">
                <i class="iconfont icon-fujian" style="margin-left:5px"></i>
                <strong>
                    <span style="font-size:18px">附件信息</span>
                </strong>
            </div>    
            </template>

             <div class="div-mjFormData">
               <el-table
                :data="fjMap"
                style="width: 100%"
                border>
                 <el-table-column
                   prop="fjxh"
                    label="序 号">
                 </el-table-column>
                <el-table-column
                    prop="fjlb"
                    label="附件名称"
                    >
                </el-table-column>
                <el-table-column
                    prop="fjsm"
                    label="附件类型"
                   >
                </el-table-column>
                <el-table-column
                    label="上传状态">
                    <template slot-scope="scope">
                        <el-button  type="primary" size="small" v-if="scope.row.fjxq.length>0" @click="checkFJ(scope.row)">查看附件</el-button>
                </template>

                </el-table-column>

                </el-table>      
            </div>

        </el-collapse-item>


          <el-collapse-item   name="4" style="margin-bottom:5px">
              <template slot="title" >
            <div  style="background-color:#DCDFE6">
                <i class="iconfont icon-shenhe" style="margin-left:5px"></i>
                <strong>
                    <span style="font-size:18px">审批信息</span>
                </strong>
            </div>    
            </template>
            <el-form ref="spForm"  :model="spForm" :rules="spFormRules"  label-width="80px" class="div-mjFormData">
                    <el-form-item label="是否通过:" prop="spzt" label-width="100px">
                    <el-select v-model="spForm.spzt"  :disabled="spForm.canWrite">
                       <el-option value="通过">通过</el-option> 
                       <el-option value="未通过">未通过</el-option> 
                    </el-select>
                    </el-form-item> 

                    <el-form-item label="审批意见:" prop="spyj" label-width="100px" style="width: 800px;">
                        <el-input :readonly="spForm.canWrite"
                        type="textarea"
                        :rows="2"
                        placeholder="请认真填写审批意见,审批不通过时,审批意见将通过短信方式发送给申请人！"
                        v-model="spForm.spyj">
                        </el-input>
                    </el-form-item> 

                    <el-row>
                    <el-col :offset="20">
                        <el-form-item label-position='right' >
                            <el-button  type="primary" @click="clickButton('spForm')" :disabled="buttonInfo.isDis">{{buttonInfo.text}}</el-button>
                            
                        </el-form-item>     
                    </el-col>
                </el-row>
            </el-form>
        </el-collapse-item>
    
       </el-collapse>

        <!-- 附件查看 -->  
         <el-dialog
            :visible.sync="dialogVisible"
            :fullscreen=true
            @close="closeDialog"
            >
            
            <el-row>
                <el-col :span="4">
                    <el-card class="box-card" style="height:100%">
                    <div slot="header">
                        <span>附件列表</span>
                    </div>
                    <div v-for="(fj,index) in fjs" :key="fj.qdid" >
                        <a href="#"  style="text-decoration:none"  ><span ref="titleArr"  :style="titleStyle" @click="getImg(fj,'titleArr',index)"><strong>{{fj.fjlx}}{{"("+(index+1)+")"}}</strong></span></a>
                    </div>
                    </el-card>


                </el-col>
                <el-col :span="18">
                    <el-card class="box-card" style="height:800px" >
                    <div slot="header">
                        <span>图片内容</span>
                    </div>
                    <!-- <img :src="imgsrc"> -->
                    <div class="images" v-viewer >
                        <img  :src="imgsrc" style="width:100%"  >
                        </div>
                    </el-card>

                </el-col>
            </el-row>
        </el-dialog>

   </div>
</template>

<script>
import { getDicListWithPm } from "@/api/pubserver/dicItem/index"; 
import {getData,getFjDetail,smfwQs,smfwSp} from "@/api/smfw/index"; 
import{
    sendMessage 
} from '@/api/apply/index';
import 'viewerjs/dist/viewer.css';
import Viewer from 'v-viewer';
import Vue from 'vue';
import axios from 'axios';
Vue.use(Viewer);
Viewer.setDefaults({
  title: false,
  toolbar: {
        zoomIn: 4,
        zoomOut: 4,
        oneToOne: 4,
        reset: 4,
        rotateLeft: 4,
        rotateRight: 4,
        flipHorizontal: 4,
        flipVertical: 4,
        }
})
export default {
    data() {
      return {
        buttonInfo:{
            text: '',//按钮显示的值
            isDis:true//是否禁用 默认禁用
        },
        spForm:{//审批的表单
        sqbh:'',//this.respData.sqbh,
        spzt:'通过', //审批状态
        spyj:'',//审批意见
        canWrite:true//根据案件状态判断是否可编辑表单数据
        },  
        titleStyle:{//附件样式
            color: 'black',
            fontSize: '15px'
        },
         imgsrc:'',//图片地址  
        dialogVisible: false,//查看附件的弹框是否显示
        dialogTitle:'附件管理',
        smfwxq:null,
        activeNames: ['1','2','3','4','5','6'],
        wwSmfwsq:{},
        user:[],
        fjs:[{}],//后台附件
         //用来存储附件的数据结构  
        fjMap:[{
            fjxh:'',//附件序号
            fjlb:'',//附件类别
            fjsm:'',//附件说明
            fjxq:[//附件详情
                {
                    fjlb:'',//附件类别(用于组织附件名称)
                    fjmc:'',//图片名称
                    qdid:'',//清单id
                }
            ]
        }],
        fjxq:[],//附件详情 在查看附件的时候 需要获取是哪个附件列表 并复制给该数组
        spFormRules:{//表单验证
                spzt: [
                    {
                        required: true,
                        message: '请选择审批状态',
                        trigger: 'blur'
                    }
                ],
                spyj: [
                    {
                        required: true,
                        message: '审批意见不能为空',
                        trigger: 'blur'
                    }
                ],
            }
      }},
    methods:{
         openFullScreen() {
            const loading = this.$loading({
            lock: true,
            text: '图片加载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
            })
        },
        closeFullScreen(){
            this.$loading().close()
        },
        initData(){
            //请求后台数据

            const query = {sqbh:this.$store.state.smfw.sqbh_smfw} 
            getData(query).then(response => {
                //给各个表格模板赋值
                this.user=[]
                this.wwSmfwsq = response.data.wwSmfwsq
                this.user.push(response.data.user)
                this.fjs = response.data.fjs
                //console.log(this.fjs)
                //判断当前的审批状态 
                const nowuser =  this.$store.state.user.name
                //1. 案件未签收  
                if(this.wwSmfwsq.spr==null||this.wwSmfwsq.spr==''){
                    this.spForm.canWrite=false //激活编辑状态
                    this.buttonInfo.text = '签收'
                    this.buttonInfo.isDis=false//释放按钮状态
                }
                //2. 案件已签收未审批(非本人签收)
               else if(this.wwSmfwsq.spzt=='未审批'&&this.wwSmfwsq.spr!=nowuser){
                    this.buttonInfo.text = '已被签收'  
                }
                //3. 案件已签收未审批(本人签收)
               else if(this.wwSmfwsq.spzt=='未审批'&&this.wwSmfwsq.spr==nowuser){
                   this.spForm.canWrite=false //激活编辑状态
                   this.buttonInfo.text = '审批'
                   this.buttonInfo.isDis=false//释放按钮状态  
                }else{//4. 案件已审批
                   this.buttonInfo.text = '已审批'
                }

                this.getFjInfo()
                
        })

    },
    clickButton(formName){
                    //根据目前的值进行判断是签收 还是提交  
          if(this.buttonInfo.text=='签收'){
              //签收
            const query = {
              sqbh:this.$store.state.smfw.sqbh_smfw,//申请编号
              name: this.$store.state.user.name//审批人名称
            };
            smfwQs(query).then(response => {
                if(response.status==200){
                     this.$message({
                    message: response.message,
                    type: 'success'
                    });
                    this.buttonInfo.text='审批'
                }else if(response.status==201){
                    this.$message({
                     message: '已被他人签收，不可重复签收',
                    type: 'error'
                    });
                    this.buttonInfo.text = '已被签收'
                    this.buttonInfo.isDis=true;  
                    //console.log("非本人签收")
                }
               
            });
          }else{
              const set = this.$refs;
            set[formName].validate(valid => {
                if (valid) {
                    const query ={
                       sqbh:this.$store.state.smfw.sqbh_smfw,//申请编号
                       name: this.$store.state.user.name,//审批人名称
                       spyj:this.spForm.spyj,//审批意见
                       spzt:this.spForm.spzt//审批状态
                    }
                   
                    
                   // console.log(obj)
                    smfwSp(query).then(response => {
                        if(response.status==200){
                            this.$message({
                            message: response.message,
                            type: 'success'
                            });
                            this.buttonInfo.isDis=true; // 禁用按钮
                            this.buttonInfo.text='已审批';
                            //锁定不可编辑状态 
                            this.spForm.canWrite=true;
                            const queryM = {
                                applyNo:this.$store.state.smfw.sqbh_smfw,
                                ywType:"上门服务反馈"
                            }
                            sendMessage(queryM).then(response =>{
                            })
                        }else{
                            this.$message({
                                message: response.message,
                                type: 'error'
                                });
                            }
                        
                        });
                } else {//验证失败 返回false 验证框架会自动标注所有验证失败的原因
                return false;
                }
      }); 
             
          }
      },
    //关闭dialog控制样式
      closeDialog(){
         const set = this.$refs.titleArr;
           //遍历所有元素 给所有元素置黑
            set.forEach(function(ele,index){  
                   set[index].style.color="black"
                });
      },
    //查看附件详情 
     //查看附件
      checkFJ(fjInfo){
         
         this.dialogVisible=true
         
         this.fjxq = fjInfo.fjxq 
         this.imgsrc=''
         
       
      }, 
      getImg(fjInfo,titleArr,index){
           const set = this.$refs;
           
           //遍历所有元素 给所有元素置黑
            set[titleArr].forEach(function(ele,index){  
                    set[titleArr][index].style.color="black"
                });
            set[titleArr][index].style.color="green"
        const queryFj= {
            qdid: fjInfo.qdid
        };
         this.openFullScreen()
        getFjDetail(queryFj).then(response => {
           
            this.imgsrc ='data:image/jpeg;base64,'+response
            this.closeFullScreen()
        })
      },  
    getFjInfo(){
        //发送请求附件请求
         const queryFj = {
              parParam: "上门服务申请"
            };
        getDicListWithPm(queryFj).then(response=>{
               //this.fjFormData = response.data; //获取到的数据详情 赋值给显示的表单数据对象
                //将第一次请求的初始化参数和fj列表进行组织参数
                this.fjMap=[];
                //遍历返回值进行map的类别赋值
                response.data.forEach(fj => {
                    let fjsingle  = { //构造附件参数
                    fjxh: fj.itemorder,
                    fjlb:fj.itemname,
                    fjsm:fj.itemnote,
                    fjxq:[]
                }
                    this.fjMap.push(fjsingle)
                });
            //遍历respData 将其中的各个附件条目进行规整  
            //console.log(this.fjs)
            this.fjs.forEach(respfj=>{
                let fjindex =  this.fjMap.findIndex(function(fjinmap){
                
                    return fjinmap.fjlb == respfj.fjlx
                })
                if(fjindex!=-1){//如果通过fj名称在map中找到了相应位置
                    //那么push新的元素
                    let fjxqQuery = {
                        fjlb:respfj.fjlx,//附件类别
                        fjmc: respfj.fjmc, //名称
                        qdid: respfj.qdid //清单id
                    }
                    this.fjMap[fjindex].fjxq.push(fjxqQuery)
                }
            })
        })
     

            //console.log(this.fjMap)
      },

    },
    mounted(){
       
        //this.respData.sqbh =this.$store.state.smfw.sqbh_smfw;  
        //根据业务类型 控制哪些菜单需要展示 顺便控制哪些请求需要发送
        //const ywlx = this.respData.djxl;
        //  console.log('赋值上门服务sqbh'+ sqbh)
        this.initData()
        
    }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.div-fw{
    margin:10px;
    // 房屋落 展示框的样式
    .data-fwinfo {
        width: 85%;
        margin-top: 10px;
        margin-left: 15px
    }
}

.div-mjFormData{
    margin: 10px
} 
.div-gyfs{ //共有方式的外层div
    margin-left: 140px;
    margin-top: 30px;
    .radio{
        margin-right: 200px
    }
}


</style>

<template>
    <div >
        <el-collapse v-model="activeNames">
        <el-collapse-item name="1" v-if="showFwInfo" style="margin-bottom:5px">
            <template slot="title" >
            <div  style="background-color:#DCDFE6">
                 <i class="iconfont icon-fangwu" style="margin-left:5px"></i>
                <strong>
                    <span style="font-size:18px">不动产登记信息(单位：平方米、元)</span>
                </strong>
               
            </div>    
            </template>
            <!-- 详细内容 -->
            <div class="div-fw">
             <el-row>
                <el-col :span="12">
                    <el-input :value="fwData.zl" class="data-fwinfo" :disabled="true">
                        <template slot="prepend"><span>房屋坐落</span></template>
                    </el-input>    
                </el-col>   
                <el-col :span="12">
                    <el-input :value="fwData.bdczh"  class="data-fwinfo" :disabled="true">
                        <template slot="prepend">不动产证号</template>
                    </el-input>    
                </el-col>     
             </el-row>

              <el-row>
                <el-col :span="12">
                    <el-input :value="fwData.bdcdyh" class="data-fwinfo" :disabled="true">
                        <template slot="prepend">不动产单元号</template>
                    </el-input>    
                </el-col>   
                <el-col :span="12">
                    <el-input :value="fwData.tdsyqmj"  class="data-fwinfo" :disabled="true">
                        <template slot="prepend">土地使用权面积</template>
                    </el-input>    
                </el-col>     
             </el-row>

              <el-row>
                <el-col :span="12">
                    <el-input :value="fwData.dytdmj" class="data-fwinfo" :disabled="true">
                        <template slot="prepend">独用土地面积</template>
                    </el-input>    
                </el-col>   
                <el-col :span="12">
                    <el-input :value="fwData.fttdmj"  class="data-fwinfo" :disabled="true">
                        <template slot="prepend">分摊土地面积</template>
                    </el-input>    
                </el-col>     
             </el-row>

             <el-row>
                <el-col :span="12">
                    <el-input :value="fwData.qlxz" class="data-fwinfo" :disabled="true">
                        <template slot="prepend">房屋权利类型</template>
                    </el-input>    
                </el-col>   
                <el-col :span="12">
                    <el-input :value="fwData.tdsyqx"  class="data-fwinfo" :disabled="true">
                        <template slot="prepend">使用期限</template>
                    </el-input>    
                </el-col>     
             </el-row>

              <el-row>
                <el-col :span="12">
                    <el-input :value="fwData.tdqsrq" class="data-fwinfo" :disabled="true">
                        <template slot="prepend">起始时间</template>
                    </el-input>    
                </el-col>   
                <el-col :span="12">
                    <el-input :value="fwData.tdzzrq"  class="data-fwinfo" :disabled="true">
                        <template slot="prepend">截止时间</template>
                    </el-input>    
                </el-col>     
             </el-row>

              <el-row>
                <el-col :span="12">
                    <el-input :value="fwData.ghyt" class="data-fwinfo" :disabled="true">
                        <template slot="prepend">规划用途</template>
                    </el-input>    
                </el-col>   
                <el-col :span="12">
                    <el-input :value="fwData.jzmj"  class="data-fwinfo" :disabled="true">
                        <template slot="prepend">房屋建筑面积</template>
                    </el-input>    
                </el-col>     
             </el-row>

                <el-row>
                <el-col :span="12">
                    <el-input :value="fwData.fwtnmj" class="data-fwinfo" :disabled="true">
                        <template slot="prepend">房屋套内面积</template>
                    </el-input>    
                </el-col>   
                <el-col :span="12">
                    <el-input :value="fwData.fwftmj"  class="data-fwinfo" :disabled="true">
                        <template slot="prepend">房屋分摊面积</template>
                    </el-input>    
                </el-col>     
             </el-row>

             </div>
        </el-collapse-item>

        <el-collapse-item  v-if="showSqrInfo" name="2" style="margin-bottom:5px">
             <template slot="title" >
            <div  style="background-color:#DCDFE6">
                <i class="iconfont icon-renyuan" style="margin-left:5px"></i>
                <strong>
                    <span style="font-size:18px">申请人信息</span>
                </strong>
                
            </div>    
            </template>
            <div class="div-mjFormData">
               <el-table
                :data="users"
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
                    prop="idCard"
                    label="身份证号码">
                </el-table-column>
                </el-table>      
            </div>
        </el-collapse-item>



        <el-collapse-item  v-if="showHTHInfo" name="2" style="margin-bottom:5px">
             <template slot="title" >
            <div  style="background-color:#DCDFE6">
                <i class="iconfont icon-hetongdengji" style="margin-left:5px"></i>
                <strong>
                    <span style="font-size:18px">合同号信息</span>
                </strong>
                
            </div >    
            </template>
            <div class="div-mjFormData"style="width:50%">
                 <el-input :value="respData.htbh"  class="data-fwinfo" :disabled="true">
                        <template slot="prepend">合同号</template>
                    </el-input>    
            </div>
        </el-collapse-item>

        <el-collapse-item  v-if="showGsInfo" name="2" style="margin-bottom:5px">
             <template slot="title" >
            <div  style="background-color:#DCDFE6">
                <i class="iconfont icon-gongsiyewu" style="margin-left:5px"></i>
                <strong>
                    <span style="font-size:18px">净地业务公司信息</span>
                </strong>
                
            </div>    
            </template>
            <div class="div-mjFormData">
               <el-table
                :data="respData.sqrxxs"
                style="width: 100%"
                border>
                <el-table-column
                    prop="sqrmc"
                    label="公司名称"
                    >
                </el-table-column >
               
                <el-table-column
                    prop="idcard"
                    label="社会统一机构代码">
                </el-table-column>
                </el-table>      
            </div>
        </el-collapse-item>

        <el-collapse-item  v-if="showGyfs" name="3" style="margin-bottom:5px">
             <template slot="title" >
            <div  style="background-color:#DCDFE6">
                <i class="iconfont icon-57" style="margin-left:5px"></i>
                <strong>
                    <span style="font-size:18px">持有方式</span>
                </strong>
                
            </div>    
            </template>
            <div class="div-gyfs">
                <el-radio-group v-model="respData.gyfs" :disabled="spForm.canWrite">
                    <el-radio label="单独所有" class="radio" border></el-radio>
                    <el-radio label="共同共有" class="radio" border></el-radio>
                    <el-radio label="按份共有" class="radio" border></el-radio>
                </el-radio-group>
            </div>
        </el-collapse-item>
        <el-collapse-item  v-if="showMfrInfo" name="4" style="margin-bottom:5px">
              <template slot="title" >
            <div  style="background-color:#DCDFE6">
                <i class="iconfont icon-renyuanxinxi" style="margin-left:5px"></i>
                <strong>
                    <span style="font-size:18px">买方人信息</span>
                </strong>
            </div>    
            </template>

             <div class="div-mjFormData">
               <el-table
                :data="respData.sqrxxs"
                style="width: 100%"
                border>
                 <el-table-column
                    type="index"
                    label="序 号">
                 </el-table-column>
                <el-table-column
                    prop="sqrmc"
                    label="姓名"
                    >
                </el-table-column>
                
                <el-table-column
                    prop="idcard"
                    label="身份证号码">
                </el-table-column>

                <el-table-column
                    prop="gyfe"
                    label="共有份额">
                </el-table-column>
                </el-table>      
            </div>

        </el-collapse-item>

         <el-collapse-item  v-if="showFJInfo" name="5" style="margin-bottom:5px">
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

        <el-collapse-item   name="6" style="margin-bottom:5px">
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

                    <el-form-item label="业务类型:" v-if="showYwlx"  prop="isDY" label-width="100px">
                    <el-select v-model="spForm.isDY" :disabled="spForm.canWrite">
                       <el-option
                       
                         v-for="item in dklxSelect"
                        :key="item.itemid"
                        :label="item.itemnote"
                        :value="item.itemnote"> 
                       </el-option> 
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
        
  <el-dialog
    :visible.sync="dialogVisible"
    :fullscreen=true
    @close="closeDialog"
    title="附件管理">
    
    <el-row>
        <el-col :span="4">
            <el-card class="box-card" style="height:100%">
            <div slot="header">
                <span>附件列表</span>
            </div>
            <div v-for="(fj,index) in fjxq" :key="fj.qdid" >
                 <a href="#"  style="text-decoration:none"  ><span ref="titleArr"  :style="titleStyle" @click="getImg(fj,'titleArr',index)"><strong>{{fj.fjlb}}{{"("+(index+1)+")"}}</strong></span></a>
            </div>
            </el-card>


        </el-col>
        <el-col :span="18">
             <el-card class="box-card" style="height:800px">
            <div slot="header">
                <span>图片内容</span>
            </div>
            <!-- <img :src="imgsrc"> -->
               <div class="images" v-viewer>
                <img  :src="imgsrc" style="width:100%">
                </div>
            </el-card>

        </el-col>
    </el-row>
  </el-dialog>

    

    </div>
</template>

<script>
import { getDicListWithPm } from "@/api/pubserver/dicItem/index"; 
import { getApplysDetail,signInApply,approvalApply,findFC,getFjDetail,sendMessage} from "@/api/apply/index"; 
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
            showHTHInfo:false,//合同号信息
            showFwInfo:true,//房屋信息展示
            showSqrInfo:true,//申请人展示
            showGyfs:true,//共有方式的展示 
            showMfrInfo:true,//买房人展示 
            showFJInfo:true,//附件信息展示
            showYwlx:true,//审批意见的展示
            showGsInfo:false,//净地业务公司信息
            titleStyle:{
                color: 'black',
                fontSize: '15px'
            },
            activeNames: ['1','2','3','4','5','6'],
            fwData:{
                zl:'',//房屋坐落
                bdczh:'',//不动产证号
                bdcdyh:'',//不动产单元号
                tdsyqmj:'',//土地使用权面积
                dytdmj:'',//独用土地面积
                fttdmj:'',//分摊土地面积
                qlxz:'',//房屋权利性质
                tdsyqx:'',//使用期限
                tdqsrq:'',//起始时间
                tdzzrq:'',//截止时间
                ghyt:'',//规划用途
                jzmj:'',//房屋建筑面积
                fwtnmk:'',//房屋套内面积 
                fwftmj:'',//房屋分摊面积
            },
            respData:{//包含多个对象的返回信息(根据申请编号查询后的结果)
                 sqbh:'',//申请编号
                 djxl:'',//申请类型
                 xgzh:'',//相关证号
                 gyfs:'',//共有方式
                 user: {
                //      {   //用户相关
                //     openid: "", //openid
                //     tel: "", //联系电话
                //     idCard: "", //身份证号码
                //     name: "" //名称
                //  }
                 },
                fjs: [  //附件清单列表
                    {
                        fjmc: "",//附件名称
                        fjlx: "",//附件类型
                        qdid: ""//清单id
                    }
                ],
                sqrxxs: [ //申请人信息(多人)
                {
                    glbh: "",//关联编号
                    sqrmc: "",//申请人名称
                    idcard: "",//身份证号码
                    gyfe:""//共有份额
                }
                ],
            },
            fjFormData:[
                //字典获取的附件信息
                // {
                // itemorder:'',//序号
                // itemname:'',//附件名称
                // itemnote:'',//附件 是否必选   
                // }
            ],
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
            users:[],//用来解决表格遍历和返回值的冲突
            dklxSelect:[],//贷款类型 是否贷款  属性：pid note（select绑定的值）
            spForm:{//审批的表单
                sqbh:'',//this.respData.sqbh,
                spr:'',//审批人 用系统用户赋值
                spzt:'通过', //审批状态
                spyj:'',//审批意见
                gllcpid:'',//业务对应的pid
                isDY:'',//是否是抵押 0为非抵押 1为抵押
                canWrite:true//根据案件状态判断是否可编辑表单数据
            },
            buttonInfo:{
                text: '',//按钮显示的值
                isDis:true//是否禁用 默认禁用
            },
            dialogVisible: false,//查看附件的弹框是否显示
            dialogTitle:'附件管理',
            imgsrc:'',//图片地址
            spFormRules:{//表单验证
                spzt: [
                    {
                        required: true,
                        message: '请选择审批状态',
                        trigger: 'blur'
                    }
                ],
                isDY: [
                    {
                        required: true,
                        message: '请选择业务类型',
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
        }
    },  
    methods: {
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
      closeDialog(){
         const set = this.$refs.titleArr;
           //遍历所有元素 给所有元素置黑
            set.forEach(function(ele,index){  
                   set[index].style.color="black"
                });
      },
     
      //获取业务字典 
      getDylx(resp){
             //console.log(this.respData)
          //过滤值
          const blwd =this.$store.state.sqxq.blwd
           this.dklxSelect = resp.data.filter(item=>{
                 return item.itemname == (this.respData.djxl+"-"+blwd); //过滤出登记和登记小类相同的数组 
            })
           // console.log(this.dklxSelect)
      },

      //获取图片详情  
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
      //获取房屋信息  
      getFwDate(){
            const queryFC= {
              bdczh: this.respData.xgzh
            };

            findFC(queryFC).then(response => {
                this.fwData= response.data
            })
      },
      //查看附件
      checkFJ(fjInfo){
          this.dialogVisible=true
         this.fjxq = fjInfo.fjxq 
         this.imgsrc='';
       
      }, 
      initData(){
          //console.log(this.respData)
           //获取附件的参数 
            const queryFj = {
              parParam: this.respData.djxl
            }; 

             const queryInit = {
              sqbh: this.respData.sqbh
            }; 

            //下拉框的赋值
            const queryLC = {
              parParam: "内外网业务对照"
            }; 
          
             axios.all([getDicListWithPm(queryFj),getApplysDetail(queryInit),getDicListWithPm(queryLC)]).then(axios.spread((T,R,X)=>{
                 //先执行resp的赋值  再执行fj的赋值 
                 this.getSqDetail(R)
                 //在执行附件的方法
                 this.getFjInfo(T)
                 //dklxSelect 下拉框的字典赋值 
                 this.getDylx(X);
                 //获取房屋信息
                 if(this.showFwInfo==true){
                     this.getFwDate()
                 }
          
              }))
            
      },  
      clickButton(formName){
            

           

                    //根据目前的值进行判断是签收 还是提交  
          if(this.buttonInfo.text=='签收'){
              //签收
            const query = {
              sqbh: this.respData.sqbh,//申请编号
              spr: this.$store.state.user.name
            };
            signInApply(query).then(response => {
                if(response.status==200){
                     this.$message({
                    message: response.data.result,
                    type: 'success'
                    });
                    this.buttonInfo.text='审批'
                }else{
                    this.$message({
                     message: response.data.result,
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
                    //console.log("验证成功")
                    const { ...obj } = this.spForm; //不定参数  防止数据污染
                   
                    if(this.respData.djxl=="净地首次登记"){
                        obj.gllcpid = this.dklxSelect[0].itemval
                        //console.log(this.dklxSelect)
                    }else{
                        let dkmflx = this.dklxSelect.find(item=>{return item.itemnote==this.spForm.isDY});
                        obj.isDY =  dkmflx.itemnote=="全款买房"?0:1
                        obj.gllcpid = dkmflx.itemval
                    }
                   
                    //进入提交的功能 approvalApply
                    obj.sqbh = this.respData.sqbh;
                    obj.spr = this.$store.state.user.name;
                   // console.log(obj)
                    approvalApply(obj).then(response => {
                        if(response.status==200){
                            this.$message({
                            message: response.data.result,
                            type: 'success'
                            });
                            this.buttonInfo.isDis=true; // 禁用按钮
                            this.buttonInfo.text='已审批';
                            //锁定不可编辑状态 
                            this.spForm.canWrite=true;
                            //发送信息
                            //触发短信发送的机制  
                            const queryM = {
                                applyNo:obj.sqbh,
                                ywType:"在线申请审核"
                            }
                            sendMessage(queryM).then(response =>{
                            })
                        }else{
                            this.$message({
                                message: response.data.result,
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
      getRouterParams() {
        // 取到路由带过来的参数 
       this.respData.sqbh= this.$route.params.sqbh
       this.respData.djxl = this.$route.params.type
    //    console.log(this.respData.sqbh)
    //    console.log(this.respData.sqbh+this.respData.djxl)  
     },
      getFjInfo(response){
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
            this.respData.fjs.forEach(respfj=>{
               let fjindex =  this.fjMap.findIndex(function(fjinmap){
                    // console.log(fjinmap)
                    // console.log(respfj)
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

            //console.log(this.fjMap)
      },
      //获取申请详情信息
      getSqDetail(response){
            this.respData.user=[];

            this.respData = response.data; //获取到的数据详情 赋值给显示的表单数据对象
            this.users.push(this.respData.user);
            //审批意见的附值 审批状态的赋值
            if(this.respData.ajzt==2){ //案件已审批
                //审批意见和审批结果进行赋值
                this.spForm.spzt = this.respData.spzt  //审批状态
                this.spForm.spyj = this.respData.spyj  //审批意见
                this.spForm.isDY = this.respData.isDY==1?"贷款买房":"全款买房"; //是否抵押
                //按钮 显示已审批 
                this.buttonInfo.text = '已审批'
               // console.log("已审批")
            }else if(this.respData.ajzt==0){ //案件未签收 未审批
                 this.spForm.canWrite=false //激活编辑状态
                 this.buttonInfo.text = '签收'
                 this.buttonInfo.isDis=false//释放按钮状态
                //  console.log("未签收未审批")
            }else if(this.respData.ajzt==1){ //已签收 未审批
                //判断是不是本人签收的 如果是本人签收 则给审批按钮
                 if(this.$store.state.user.name==this.respData.spr){
                     this.spForm.canWrite=false //激活编辑状态
                     this.buttonInfo.text = '审批'
                     this.buttonInfo.isDis=false//释放按钮状态
                    //  console.log("已本人签收  未审批")
                 }else{//如果不是  则显示已签收 
                     this.buttonInfo.text = '已被签收'  
                      //console.log("非本人签收")
                 }
               
            }

      }
    },
    mounted(){
       
        this.respData.djxl =this.$store.state.sqxq.ywlx;  
        this.respData.sqbh =this.$store.state.sqxq.sqbh;
        this.respData.blwd = this.$store.state.sqxq.blwd;
        //根据业务类型 控制哪些菜单需要展示 顺便控制哪些请求需要发送
        const ywlx = this.respData.djxl;
        if(ywlx=="净地首次登记"){
            //alert(true)
            //房屋信息不展示  
            this.showFwInfo=false;
            //共有方式不展示
            this.showGyfs= false;
            //买房人信息不展示 
            this.showMfrInfo=false;
            //类型不展示(纯土地登记不存在贷款)
            this.showYwlx=false;
            //公司信息展示
            this.showGsInfo=true;
        }else if(ywlx=="一手房转移登记"){
            this.showFwInfo=false;
            this.showHTHInfo=true;
        }
            // console.log('赋值登记小类'+ this.respData.djxl)
            // console.log('赋值sqbh'+ this.respData.sqbh)
            // console.log('赋值办理网点'+this.respData.blwd)
        //发起合并请求
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

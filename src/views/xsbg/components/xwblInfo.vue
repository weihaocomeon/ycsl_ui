<template>
    <div>
        <el-row> 
             <el-col :span="22">
                    <!-- 跳转到合同展示页 -->
                    <el-button  type="text" @click="tochangeview(true,false,false,false)"><<<i class="el-icon-tickets"></i>合同信息查看</el-button>
             </el-col>
             <el-col :span="1">
                    <!-- 跳转到附件选取页面 -->
                    <el-button type="text" @click="tochangeview(false,false,false,true)">房屋情况查询<i class="el-icon-search"></i>>></el-button>

                    <el-button type="primary" @click="testSaveXwbl()">测试询问笔录保存</el-button>
            </el-col>
          </el-row>

          <div>
               <el-row>
                   <el-col :span="12">
                       <div class="grid-content bg-purple" style="margin-right: 10px;margin-left:10px">
                           <el-card class="box-card">
                            <div slot="header"  class="clearfix">
                                <span>以下由买卖双方共同回答 :</span>
                                <el-button  type="warning" @click="resetData(1,'sfhdForm')">重新选择</el-button>
                                <el-button  type="warning" @click="testBd('sfhdForm')">测试表单验证</el-button>
                            </div>
                            <el-form ref="sfhdForm" :rules="sfhdRules"  :model="xwblForm" label-width="80px">
                                <el-form-item prop="zsbd">
                                    <h3 class="textStyle">1. 申请登记事项是否为申请人真实意思表示?</h3>
                                    <template>
                                    <el-radio-group v-model="xwblForm.zsbd">
                                        <el-radio label="1" border>是</el-radio>
                                        <el-radio label="2" border>否</el-radio>
                                    </el-radio-group>
                                    </template>
                                </el-form-item>
                                <el-form-item  prop="zsyx">
                                    <h3 class="textStyle">2. 申请登记所递交材料是否为真实有效的？</h3>
                                    <el-radio-group v-model="xwblForm.zsyx">
                                        <el-radio label="1" border>是</el-radio>
                                        <el-radio label="2" border>否</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            <el-form-item prop="jyfe">
                                    <h3 class="textStyle">3. 本次交易份额是否满100%？</h3>
                                    <el-radio-group v-model="xwblForm.jyfe">
                                        <el-radio label="1" border>是</el-radio>
                                        <el-radio label="2" border>否</el-radio>
                                    </el-radio-group>    
                                    <el-input class="data-fwinfo" v-if="xwblForm.jyfe==2" v-model="xwblForm.jyfeValue">
                                        <template slot="prepend">输入交易份额</template>
                                        <template slot="append">%</template>
                                    </el-input>
                                </el-form-item>

  
                                </el-form>
                            </el-card>    
                       </div>        
                   </el-col>

                   <el-col :span="12">
                       <div class="grid-content bg-purple" style="margin-right: 10px;margin-left:10px">
                           <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>以下由被询问人(卖方)回答</span>
                                <el-button  type="warning" @click="resetData(2,'sellerHdForm')">重新选择</el-button>
                                 <el-button  type="warning" @click="testBd('sellerHdForm')">测试表单验证</el-button>
                            </div>
                            <el-form ref="sellerHdForm" :rules="sellerHdRules"  :model="xwblForm" label-width="80px">
                                <el-form-item prop="sellerGyfs">
                                    <h3 class="textStyle">1. 申请登记的不动产是共有还是单独所有?</h3>
                                    <template>
                                    <el-radio-group v-model="xwblForm.sellerGyfs">
                                        <el-radio  label="1" border>单独所有</el-radio>
                                        <el-radio  label="2" border>共有</el-radio>
                                    </el-radio-group>
                                    </template>
                                </el-form-item>
                                <el-form-item prop="mwwy">
                                    <h3 class="textStyle">2. 你所出售的住房属于在江苏省范围内家庭(含配偶)唯一居住用房吗？</h3>
                                    <template>
                                    <el-radio-group v-model="xwblForm.mwwy">
                                        <el-radio label="1" border>属于家庭的省内唯一且满5年住房</el-radio>
                                        <el-radio label="2" border>否</el-radio>
                                    </el-radio-group>
                                    </template>
                                </el-form-item>
                            <el-form-item prop="sellerHyzk">
                                    <h3 class="textStyle">3. 如属于省内唯一且满5年，请如实回答您的婚姻状况。您是否已婚？</h3>
                                     <template>
                                    <el-radio-group v-model="xwblForm.sellerHyzk">
                                        <el-radio  label="1" border>已婚</el-radio>
                                        <el-radio  label="2" border>未婚</el-radio>
                                        <el-radio  label="3" border>离异</el-radio>
                                        <el-radio  label="4" border>丧偶</el-radio>
                                    </el-radio-group>
                                    <el-button type="primary" icon="el-icon-location" v-if="xwblForm.sellerHyzk==1" @click="loadXgr('售房者','sellerPoName','sellerPoIdCard')">关联售房者</el-button> 
                                    </template>
                                    <el-input class="data-po" v-if="xwblForm.sellerHyzk==1" v-model="xwblForm.sellerPoName">
                                        <template slot="prepend">配偶姓名:</template>
                                    </el-input>
                                    <el-input class="data-po" v-if="xwblForm.sellerHyzk==1" v-model="xwblForm.sellerPoIdCard">
                                        <template slot="prepend">配偶身份证号:</template>
                                    </el-input>
                            </el-form-item>
                            <el-form-item prop="sellerIsCym">
                                    <h3 class="textStyle">4. 您/您们是否有曾用名？</h3>
                                    <template>
                                    <el-radio-group v-model="xwblForm.sellerIsCym">
                                        <el-radio label="1" border>无曾用名</el-radio>
                                        <el-radio label="2" border>有曾用名</el-radio>
                                    </el-radio-group>
                                    </template>
                                     <el-button type="primary" icon="el-icon-location" v-if="xwblForm.sellerIsCym==2" @click="loadCym('售房者')">选择售房者</el-button>  
                                     <div  v-if="xwblForm.sellerIsCym==2" v-for="(item,index)  in qlrInfo" :key="index" :label="index" >
                                        <el-input class="data-po" v-if="item.xgrlx=='售房者'&item.cym!=null"  v-model.trim="qlrInfo[index].cym">
                                            <template slot="prepend">{{item.xgrmc}}曾用名:</template>
                                        </el-input>
                                         <el-button type="primary"  v-if="item.xgrlx=='售房者'&&item.cym!=null"  @click="$delete(item,'cym')" icon="el-icon-delete"></el-button>
                                    </div>
                            </el-form-item>
                                </el-form>
                                
                            </el-card>    
                       </div>        
                   </el-col>

                  </el-row>
                  <el-row>
                   <el-col :span="12">
                       <div class="grid-content bg-purple" style="margin: 10px">
                           <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>以下为被询问人(买方)回答 :</span>
                                <el-button  type="warning" @click="resetData(3,'buyerHdForm')">重新选择</el-button>
                                <el-button  type="warning" @click="testBd('buyerHdForm')">测试表单验证</el-button>
                            </div>
                            <el-form ref="buyerHdForm" :rules="buyerHdForm" :model="xwblForm" label-width="80px">
                                <el-form-item prop="buyerGyfs">
                                    <h3 class="textStyle">1. 申请登记的不动产是单独所有、共同共有、按份共有?</h3>
                                    <template>
                                        <el-radio-group v-model="xwblForm.buyerGyfs">
                                            <el-radio  label="1" border>单独所有</el-radio>
                                            <el-radio  label="2" border>共同共有</el-radio>
                                            <el-radio  label="3" border>按份共有</el-radio>
                                        </el-radio-group>
                                    </template>
                                    <div v-for="(item,index)  in qlrInfo" v-if="xwblForm.buyerGyfs==3" >
                                        <el-input class="data-po" v-if="item.xgrlx=='购房者'"  v-model="item.buyerGyfe">
                                            <template slot="prepend">{{item.xgrmc}}</template>
                                            <template slot="append">%</template>
                                        </el-input>
                                    </div>
                                </el-form-item>
                                <el-form-item  prop="buyerFwts">
                                    <h3 class="textStyle">2. 所购入房屋属于家庭(含配偶及未成年子女)在铜山区拥有的第几套住房？</h3>
                                    <template>
                                    <el-radio-group v-model="xwblForm.buyerFwts">
                                        <el-radio  label="1" border>第一套</el-radio>
                                        <el-radio  label="2" border>第二套</el-radio>
                                        <el-radio  label="3" border>两套以上</el-radio>
                                    </el-radio-group>
                                    </template>
                                </el-form-item>
                            <el-form-item  prop="buyerHyzk">
                                    <h3 class="textStyle">3. 如属于家庭在铜山区的第一套或者第二套的,请如实回答您的婚姻状况？</h3>
                                    <template>
                                    <el-radio-group v-model="xwblForm.buyerHyzk">
                                        <el-radio  label="1" border>已婚</el-radio>
                                        <el-radio  label="2" border>未婚</el-radio>
                                        <el-radio  label="3" border>离异</el-radio>
                                        <el-radio  label="4" border>丧偶</el-radio>
                                    </el-radio-group>
                                    </template>  
                                     <el-button type="primary" icon="el-icon-location" v-if="xwblForm.buyerHyzk==1" @click="loadXgr('购房者','buyerPoName','buyerPoIdCard')">关联购房者</el-button>  
                                    <el-input class="data-po" v-if="xwblForm.buyerHyzk==1" v-model="xwblForm.buyerPoName">
                                        <template slot="prepend">配偶姓名:</template>
                                    </el-input>
                                    <el-input class="data-po" v-if="xwblForm.buyerHyzk==1" v-model="xwblForm.buyerPoIdCard">
                                        <template slot="prepend">配偶身份证号:</template>
                                    </el-input>
                            </el-form-item>
                            <el-form-item prop="buyerIsCym">
                                    <h3 class="textStyle">4. 您/您们是否有曾用名？</h3>
                                    <template>
                                    <el-radio-group v-model="xwblForm.buyerIsCym">
                                        <el-radio label="1" border>无曾用名</el-radio>
                                        <el-radio label="2" border>有曾用名</el-radio>
                                    </el-radio-group>
                                    </template>
                                    <el-button type="primary" icon="el-icon-location" v-if="xwblForm.buyerIsCym==2" @click="loadCym('购房者')">选择购房者</el-button>  
                                     <div  v-if="xwblForm.buyerIsCym==2" v-for="(item,index)  in qlrInfo" :key="index" :label="index" >
                                        <el-input class="data-po" v-if="item.xgrlx=='购房者'&&item.cym!=null"  v-model.trim="qlrInfo[index].cym">
                                            <template slot="prepend">{{item.xgrmc}}曾用名:</template>
                                        </el-input>
                                        <el-button type="primary"  v-if="item.xgrlx=='购房者'&&item.cym!=null"  @click="$delete(item,'cym')" icon="el-icon-delete"></el-button>
                                    </div>
                            </el-form-item>

                            <el-form-item prop="haveZn">
                                    <h3 class="textStyle">5. 您是否有未成年子女(小于18周岁)</h3>
                                    <template>
                                    <el-radio-group v-model="xwblForm.haveZn">
                                        <el-radio label="1" border>无</el-radio>
                                        <el-radio label="2" border>有</el-radio>
                                    </el-radio-group>
                                    </template>    
                                    <el-button type="primary" icon="el-icon-circle-plus-outline" v-if="xwblForm.haveZn==2" @click="addZn">增加一条</el-button>
                                    <div v-for="(item,index)  in xwblForm.zn" v-if="xwblForm.haveZn==2" class="znDivBorder">
                                        <el-input class="data-zn" v-model="item.znName">
                                            <template slot="prepend">子女姓名:</template>
                                        </el-input>
                                        <!-- 删除按钮 -->
                                        <el-button type="primary" icon="el-icon-delete" v-if="xwblForm.zn.length!=1" @click="delZn(index)"></el-button>
                                        <el-input class="data-zn" v-model="item.znIdCard">
                                            <template slot="prepend">子女证件号码:</template>
                                        </el-input>
                                    </div>
                                  
                            </el-form-item>

                                </el-form>
                            </el-card>    
                       </div>        
                   </el-col>

                   <el-col :span="12">
                        <div class="grid-content bg-purple" style="margin: 10px">
                           <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>询问笔录预览</span>
                                <el-button  type="primary" v-print="'#PrintTest'">打印询问笔录</el-button>
                            </div>
                            <!-- <img style="box-shadow:0 0 20px 0 #000000;" src="./image/询问笔录.png"> -->
                               <!-- 此处引入合同页面 -->
                               <hty-html :ht-info="htInfo"></hty-html>
                                 <!-- <el-button type="primary" v-print="'#PrintTest'">打印测试</el-button> -->
                            </el-card>    
                       </div>        
                   </el-col>
               </el-row>
              


          </div>

          <!--此处应该是相关联人的通用dialog-->
          <el-dialog
            title="选择相关联人"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="dialogCancel">
                    <el-radio-group v-model="radioTemp">
                        <el-radio style="margin-left:10px;margin-top:10px" v-for="(item,index)  in qlrInfo" :key="index" :label="index" v-if="item.xgrlx==dialogContent" border>姓名:{{item.xgrmc}} 证件号码:{{item.zjhm}}</el-radio>
                   </el-radio-group> 
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogCancel">取 消</el-button>
                <el-button type="primary" @click="dialogConfirm">确 定</el-button>
            </span>
          </el-dialog>
    </div>
</template>

<script>
import htyHtml from './image/htyHtml';
import { saveXwbl } from "@/api/ycsl/index";//询问笔录保存测试
export default {
    components:{
        htyHtml
    },
    data(){
        var validateJyfe = (rule, value, callback) => {
            let jyfeValue = this.xwblForm.jyfeValue
              //alert(Number(jyfeValue))
            if (value == '2') {
                if(jyfeValue ==''){
                    callback(new Error('请输入真实交易份额'));
                }else if(isNaN(Number(jyfeValue))){ //转换数字失败
                    callback(new Error('请输入数字!'));
                }else if(Number(jyfeValue)<=0||Number(jyfeValue)>=100){
                    callback(new Error('请输入0-100间的有效数字!'));
                }else{
                    callback();
                }    
            }else{
                callback();
            }
        }
        var validateSellerHyzk = (rule, value, callback) => {
                if(this.xwblForm.mwwy==1){
                    if(value==''){
                        callback(new Error('请选择卖方房产是否符合满五唯一'));
                    }else{
                        if(value==1){//选择了已婚
                             //验证是否输入了配偶姓名或者身份证号
                            if(this.xwblForm.sellerPoName==''||this.xwblForm.sellerPoIdCard==''){
                                callback(new Error('请完整输入卖方配偶信息')); 
                            }else{
                            callback() 
                            }
                        }else{
                            callback()
                        }
                        callback()
                    }
                }else{
                    callback()
                }
        }
        var validateCym = (rule, value, callback) => {
            if(value==2){//选择了曾用名
                
                const type = rule.field.substr(0,rule.field.indexOf('IsCym'))
                const qlrType = type =='buyer'?'购房者':'售房者'
              
                //根据权利人属性验证 是否该属性为空 
               this.qlrInfo.forEach(qlr => {
                    if(qlr.xgrlx==qlrType&&('cym' in qlr)&&qlr.cym==''){//有该属性
                        callback(new Error('请输入已选择人的曾用名'))
                    }
               })
               callback()
            }else{
                callback()
            }
        }
        var validateBuyerHyzk = (rule, value, callback) => {
            if(value==1){
                //检查是否完整输入了配偶姓名和配偶身份证号
                if(this.xwblForm.buyerPoName==''||this.xwblForm.buyerPoIdCard==''){
                    callback(new Error('请完整输入买方配偶姓名和配偶证件号码'))
                }
                callback()
            }
            callback()
        }
        var validateBuyerGyfe = (rule, value, callback) => {
            //判断是不是选择了按份共有
            if(value==3){
                let countGyfe = 0
                //循环遍历相关人如果是权利人 看其共有份额是否为空
                this.qlrInfo.forEach(qlr => {
                    if(qlr.xgrlx=='购房者'){
                        if(qlr.buyerGyfe==undefined||qlr.buyerGyfe==''){
                            callback(new Error('请输入购房者共有份额'))
                        }else if(isNaN(Number(qlr.buyerGyfe))){
                            callback(new Error('请输入数字!'));
                        }else if(Number(qlr.buyerGyfe)<=0||Number(qlr.buyerGyfe)>100){
                            callback(new Error('请输入0-100间的有效数字!'));
                        }
                            countGyfe+=Number(qlr.buyerGyfe)
                    }
                });
                //判断是否总数大于100
                if(countGyfe!=100){
                    callback(new Error('总计共有份额必须为100%!'));
                }
                callback()
            }else{
                callback()
            }
        }

        var validateZn = (rule, value, callback) => {
            if(value==2){
                //遍历子女列表
                this.xwblForm.zn.forEach(zn => {
                    if(zn.znName==''||zn.znIdCard==''){
                        callback(new Error('请输入子女名称和证件号码'))
                    }
                });
                callback()
            }
            callback()
        }
        
        return {
            //下方为dialog的先关属性 包括是否展示 以及展示的内容参数，后期需要提出去
            dialogAction:'',
            dialogPoName:'',//用来确定是买方还是卖方
            dialogPoIdCard:'',//用来确定是买方还是卖方
            radioTemp:'',//单选框的临时变量
            dialogVisible:false,
            dialogContent:'',//传入选择售房者还是买房者
            xwblForm: {
                zsbd: '',//问询真实表达
                zsyx: '',//附件真实有效
                jyfe: '',//交易份额是否100%
                jyfeValue:'',//交易份额
                sellerGyfs:'',//共有方式
                mwwy:'',//满五唯一
                sellerHyzk:'',//婚姻状况
                sellerPoName:'',//配偶名称
                sellerPoIdCard:'',//配偶身份证号
                sellerIsCym:'',//是否有曾用名
                sellerCym:'',//曾用名名称
                buyerGyfs:'',//买方共有方式
                buyerFwts:'',//买方买方房屋套数
                buyerHyzk:'',//买方婚姻状况
                buyerPoName:'',//买方配偶名称
                buyerPoIdCard:'',//买方配偶身份证号
                buyerIsCym:'',//买方是否有曾用名
                buyerCym:'',//买方曾用名名称
                haveZn:'',//是否有未满18周岁子女
                zn:[
                    {
                    znName:'',//子女名称
                    znIdCard:'',//子女身份证号
                    }
                ],
                },
            sfhdRules:{
                zsbd: [{ required: true, message: '请选择是否真实表达', trigger: 'change' }],
                zsyx: [{ required: true, message: '请选择提交材料是否真实有效', trigger: 'change' }],
                jyfe: [{
                     required: true, message: '请选择是否交易份额满100%', trigger: 'change' },
                     { validator: validateJyfe, trigger: 'blur' }   
                ],
            },
            sellerHdRules:{
                sellerGyfs: [{ required: true, message: '请选择卖方共有方式', trigger: 'change' }],
                mwwy: [{ required: true, message: '请选择是否满五唯一', trigger: 'change' }],
                sellerHyzk: [{ validator: validateSellerHyzk, trigger: 'change' }],
                sellerIsCym: [{ required: true, message: '请选择卖方是否有曾用名', trigger: 'change' },
                            { validator: validateCym, trigger: 'blur' }
                ],
            },
            buyerHdForm:{
                buyerGyfs: [{ required: true, message: '请选择买方共有方式', trigger: 'change' },
                            { validator: validateBuyerGyfe, trigger: 'blur' }],
                buyerFwts: [{ required: true, message: '请选择买方已拥有房屋套数', trigger: 'change' }],
                buyerHyzk: [{ validator: validateBuyerHyzk, trigger: 'blur' }],
                buyerIsCym:[{ required: true, message: '请选择买方是否有曾用名', trigger: 'change' },
                             { validator: validateCym, trigger: 'blur' }
                ],
                haveZn:[{ required: true, message: '请选择买方是否有未成年子女', trigger: 'change' },
                             { validator: validateZn, trigger: 'blur' }
                ],
            }
        }
    },
    props:{
        'ht-info':Object,
        'qlr-info':Array
    },
    methods:{
        //测试询问笔录
        testSaveXwbl(){
            saveXwbl(this.xwblForm).then(response => {
            })
        },
        //确认按钮
        dialogConfirm(){
            if(this.dialogAction=='配偶录入'){
                //名称赋值
                this.xwblForm[this.dialogPoName] = this.qlrInfo[this.radioTemp].xgrmc
                //身份证赋值
                this.xwblForm[this.dialogPoIdCard] = this.qlrInfo[this.radioTemp].zjhm
                this.dialogVisible= false
            }else{
                if('cym' in this.qlrInfo[this.radioTemp]){
                   console.log(this.qlrInfo[this.radioTemp])
                }else{
                     this.$set(this.qlrInfo[this.radioTemp], 'cym', '')
                }
                this.dialogVisible= false
              
                
                
            }
          
        },
        //关闭触发的动作
        dialogCancel(){
            //变量初始化
            this.dialogVisible=false
            this.dialogPoName=''
            this.dialogPoIdCard=''
        },
        //导入购房者
        loadXgr(xgrlx,poType,poIdType){
            this.dialogAction = "配偶录入"
            this.dialogVisible = true
            this.dialogContent=xgrlx
            this.dialogPoName =poType
            this.dialogPoIdCard=poIdType
        },
        loadCym(qlrType){
            this.dialogAction = "曾用名"
            this.dialogVisible = true
            this.dialogContent=qlrType
        },
        //重新选择
        resetData(index,formName){
            
            this.$refs[formName].resetFields();
            if(index==1){
                this.xwblForm.zsbd=''
                this.xwblForm.zsyx=''
                this.xwblForm.jyfe=''
                this.xwblForm.jyfeValue=''
            }else if (index==2) {
                this.xwblForm.sellerGyfs=''
                this.xwblForm.mwwy=''
                this.xwblForm.sellerHyzk=''
                this.xwblForm.sellerPoName=''
                this.xwblForm.sellerPoIdCard=''
                this.xwblForm.sellerIsCym=''
                this.xwblForm.sellerCym=''
            } else {
                this.xwblForm.buyerGyfs=''
                this.xwblForm.buyerFwts=''
                this.xwblForm.buyerHyzk=''
                this.xwblForm.buyerPoName=''
                this.xwblForm.buyerPoIdCard=''
                this.xwblForm.buyerIsCym=''
                this.xwblForm.buyerCym=''
                this.xwblForm.haveZn=''
                this.xwblForm.zn=[ {
                    znName:'',//子女名称
                    znIdCard:'',//子女身份证号
                    }]
            }
        },
        //询问笔录页面跳转
        tochangeview(isJyInfoShow,isXwblInfoShow,isWfzmInfoShow,isFjSelectShow){
            if(isJyInfoShow==true){
                this.$emit('tochangeview',isJyInfoShow,isXwblInfoShow,isWfzmInfoShow,isFjSelectShow)
            }else{
                 //验证表单 
                const formArr=['sfhdForm','sellerHdForm','buyerHdForm']
                let boolean_final_result = true//默认成功，失败时赋值
                formArr.forEach(item => { //根据表单的ref校验
                    if(!this.checkForm(item)){
                        boolean_final_result = false
                    }
                })
                if(boolean_final_result){
                    //触发数据保存到总页面 savexwblinfo
                    this.$emit('savexwblinfo',this.xwblForm)
                    //组织查询参数至总页面 
                    this.$emit('tochangeview',isJyInfoShow,isXwblInfoShow,isFjSelectShow)
                }else{
                    this.$message({
                        showClose: true,
                        message: '请按照页面提示补全询问笔录信息',
                        type: 'warning'
                        });
                }
                }
           
        },
        //表单验证
        checkForm(formName){
            let formValid = false
            this.$refs[formName].validate((valid) => {
            if (valid) {
                formValid= true
            } else {
                formValid= false
                return false
            }
            })
            return formValid
        },
        //子女数量的增加 
        addZn(){
            const zn = {
                    znName:'',//子女名称
                    znIdCard:'',//子女身份证号
                    }
            this.xwblForm.zn.push(zn)
        },
        //子女数量的删除
        delZn(index){
            //删除该条数据
            this.xwblForm.zn.splice(index,1)
        },
        //测试表单提交
        testBd(formName){
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('验证成功!');
                } else {
                    alert('验证失败');
                    return false;
                }
                });
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    //房屋落 展示框的样式
    .data-fwinfo {
        width: 50%;
        //margin-top: 10px;
        margin-left: 14.6px
    }
    .data-po{
        width: 50%;
        margin-top: 10px;
    }
     .data-zn{
        width: 80%;
        margin-top: 5px;
    }
    .textStyle {
        margin-top:0px;
        margin-bottom:0px
    }
    .el-card__header{  //改变头部背景色未完成！！
        background-color: burlywood
    }
    .znDivBorder{ //子女框border
        border:3px solid;
        border-color:#F5F7FA;
        margin-top: 10px;
        padding: 5px    
    }
</style>

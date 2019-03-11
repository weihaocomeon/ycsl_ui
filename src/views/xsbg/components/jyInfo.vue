<template>
    <div>
         <el-row> 
             <el-col :span="10">
                    <!-- 合同信息展示页 -->
                    <el-button icon="el-icon-tickets" type="text" >合同信息展示</el-button>
             </el-col>
             <el-col :span="12" style="margin-top:10px">
                    <!-- 合同信息展示页 -->
                    <span >业务编号:{{ywbh}}</span>
             </el-col>
             <el-col :span="1">
                    <!-- 询问笔录页的跳转 -->
                    <el-button type="text" @click="tochangeview(false,true,false,false)">打印询问笔录<i class="el-icon-printer"></i>>></el-button>
            </el-col>
          </el-row>
          <el-collapse v-model="activeNames">
              <!-- 合同号获取 -->
               <el-collapse-item name="1" style="margin-bottom:5px">
                    <template slot="title" >
                        <div   style="background-color:#0078D7">
                            <i class="iconfont icon-fangwu" style="margin-left:5px"></i>
                            <strong>
                                <span  style="font-size:18px;color:#ffffff" >合同号信息获取</span>
                            </strong>
                        </div>
                    </template>    
                <!-- 内容页面 -->
                <el-row style="margin:15px">
                    <el-col :span="5">
                    <el-input  placeholder="请输入/扫描合同号" v-model="hthInput" :readonly="htInputReadOnly"></el-input>
                    </el-col>
                     <el-button type="primary" @click="smClick" plain>扫码</el-button>
                     <el-button type="primary" plain @click="getHtInfo" :disabled="getHtBtn">获取合同信息</el-button>
                </el-row>    
               </el-collapse-item>



             <el-collapse-item name="2" style="margin-bottom:5px">
                    <template slot="title" >
                        <div   style="background-color:#0078D7">
                            <i class="iconfont icon-fangwu" style="margin-left:5px"></i>
                            <strong>
                                <span  style="font-size:18px;color:#ffffff">房屋基本信息</span>
                            </strong>
                        </div>
                    </template>    
                <!-- 内容页面 -->
                <div class="div-fw">
                     <el-row >
                         <el-col :span="12">
                             <el-input :value="htInfo.htid" class="data-fwinfo" :readonly="true">
                                <template slot="prepend">合同ID</template>
                             </el-input>       
                         </el-col>
                         <el-col :span="12">
                            <el-input :value="htInfo.cqzh"  class="data-fwinfo"  :readonly="true">
                                <template slot="prepend">相关证号</template>
                            </el-input>    
                        </el-col>    
                     </el-row>

                      <el-row >
                         <el-col :span="12">
                             <el-input :value="htInfo.jzmj" class="data-fwinfo" :readonly="true">
                                <template slot="prepend">建筑面积</template>
                                 <template slot="append">/平方米</template>
                             </el-input>       
                         </el-col>
                         <el-col :span="12">
                            <el-input :value="htInfo.jyjg"  class="data-fwinfo" :readonly="true">
                                <template slot="prepend">交易价格</template>
                                 <template slot="append">元</template>
                            </el-input>    
                        </el-col>    
                     </el-row>

                      <el-row >
                         <el-col :span="12">
                             <el-input :value="htInfo.fwzl" class="data-fwinfo" :readonly="true">
                                <template slot="prepend">房屋坐落</template>
                             </el-input>       
                         </el-col>
                         <el-col :span="12">
                            <el-input :value="htInfo.htbasj"  class="data-fwinfo" :readonly="true">
                                <template slot="prepend">合同备案时间</template>
                            </el-input>    
                        </el-col>    
                     </el-row>
                 </div>    
               </el-collapse-item>







                 <el-collapse-item name="3" style="margin-bottom:5px">
                    <template slot="title" >
                        <div   style="background-color:#0078D7">
                            <i class="iconfont icon-fangwu" style="margin-left:5px"></i>
                            <strong>
                                <span  style="font-size:18px;color:#ffffff">买卖双方信息</span>
                            </strong>
                        </div>
                    </template>    
                <!-- 内容页面 -->
                        <el-table :data="qlrInfo" stripe style='width: 100%;margin-top:10px' border>
                            <el-table-column type="index" label="序 号">
                            </el-table-column>
                            <el-table-column prop="xgrmc" label="姓名">
                            </el-table-column>
                            <el-table-column prop="xgrlx" label="相关人类型">
                            </el-table-column>
                            <el-table-column prop="zjlx" label="证件类型">
                            </el-table-column>
                            <el-table-column prop="zjhm" label="证件号码">
                            </el-table-column>
                        </el-table>
               </el-collapse-item>
          </el-collapse> 

    </div>
</template>
<script>
import { getJyInfo } from "@/api/ycsl/index";
import { generalYwbh } from "@/api/ycsl/index";
export default {
    data(){
        return {
            htInputReadOnly:false,//默认合同号区域可输入
            ywbh:'',//业务编号
            getHtBtn:false,//按钮未禁用
            activeNames: ['1','2','3','4'],//控制展开折叠面板
            hthInput:'',//输入的合同号
            htInfo:{//合同相关信息
            },
            qlrInfo:[],//权利人相关信息
        }
    },

    methods:{
        tochangeview(isJyInfoShow,isXwblInfoShow,isWfzmInfoShow,isFjSelectShow){
            //判断是否取拿到了房屋信息 
            if(this.htInfo.fwzl==null){
                 this.$alert('合同坐落为空,无法跳转至下一步', '消息提醒', {confirmButtonText: '确定'});
                 return
            }
             if(this.qlrInfo.size==0){
                 this.$alert('相关联人为空,无法跳转至下一步', '消息提醒', {confirmButtonText: '确定'});
                 return
            }
            this.$emit('tochangeview',isJyInfoShow,isXwblInfoShow,isWfzmInfoShow,isFjSelectShow)
            //传递参数信息
            this.$emit('savejjinfo',this.htInfo,this.qlrInfo)
        },
        smClick(){
             this.$alert('未检测到扫码枪', '消息提醒', {confirmButtonText: '确定'});
        },
        getHtInfo(){
            alert('jinru')
            //判断是否输入了正确的合同号
            const trimInput = this.hthInput.trim();
            if(trimInput==""){
                 this.$alert('请输入相关合同号后查询！', '消息提醒', {confirmButtonText: '确定'});
                return
            }
            //访问后端数据将结果进行展示
            //1.全屏开启
            const requestParam = {HTBH:trimInput,YWBH:this.ywbh};
            getJyInfo(requestParam).then(response=>{
                console.log(response.data)
                if(response.data.htInfo==null){
                    this.$alert('根据当前合同号未查询到相关信息!', '消息提醒', {confirmButtonText: '确定'});
                }else{
                    //获取合同号按钮置为不可使用
                    this.getHtBtn = true
                    this.htInfo = response.data.htInfo
                    this.qlrInfo = response.data.qlrInfo 
                }
           })

        },
        initForm(){
            this.htInputReadOnly=false//默认合同号区域可输入
            this.ywbh=''//业务编号
            this.getHtBtn=false,//按钮未禁用
            this.hthInput=''//输入的合同号
            this.htInfo={//合同相关信息
            }
            this.qlrInfo=[]//权利人相关信息
        },
        initData(){
            //因为组件会被复用 之前被赋值的会继续存在  所以 有初始化的方法
            this.initForm()
             //this.$store.dispatch('saveXsywbh', 'XSBG201902200001')\
        console.log('业务办公:'+this.$store.state.xsbg.xsywbh)
        //判断全局变量中是否有业务编号
          if(this.$store.state.xsbg.xsywbh==''){
              //后台生成业务编号
              const requestParam = {username:this.$store.state.user.roles};
                generalYwbh(requestParam).then(response=>{
                    //给受理编号赋值
                    this.htInputReadOnly = false
                    this.ywbh = response.data
                    this.$store.dispatch('saveXsywbh', response.data)
            })
          }else{
              //加载房屋基本信息和买卖双方信息 买卖双方的信息需要划定type标识是否为当时接口获取的而非之后添加的
               const requestParam = {YWBH:this.$store.state.xsbg.xsywbh};
                getJyInfo(requestParam).then(response=>{
                    if(response.data.htInfo!=undefined){
                       //获取合同号按钮置为不可使用
                        this.hthInput = response.data.htInfo.clhtbah
                        this.htInputReadOnly = true
                        this.getHtBtn = true
                        this.htInfo = response.data.htInfo
                        this.qlrInfo = response.data.qlrInfo 
                    }
                        this.ywbh = this.$store.state.xsbg.xsywbh
                        console.log('赋值的业务编号'+this.ywbh)
                    })
          }
        //测试设置全局变量 
        }
    },
    created(){
        this.initData()
        
    },
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.div-fw{
    margin:10px;
    //房屋落 展示框的样式
    .data-fwinfo {
        width: 85%;
        margin-top: 10px;
        margin-left: 15px;
       
    }
}

</style>
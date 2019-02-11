<template>
    <div>
         <el-row> 
             <el-col :span="22">
                    <!-- 合同信息展示页 -->
                    <el-button icon="el-icon-tickets" type="text" >合同信息展示</el-button>
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
                    <el-input  placeholder="请输入/扫描合同号" v-model="hthInput"></el-input>
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
export default {
    data(){
        return {
            getHtBtn:false,//按钮未禁用
            activeNames: ['1','2','3','4'],//控制展开折叠面板
            hthInput:'',//输入的合同号
            htInfo:{//合同相关信息
            },
            qlrInfo:[],//权利人相关信息
        }
    },
    methods:{
        tochangeview(isJyInfoShow,isXwblInfoShow,isFjSelectShow){
            //判断是否取拿到了房屋信息 
            if(this.htInfo.fwzl==null){
                 this.$alert('合同坐落为空,无法跳转至下一步', '消息提醒', {confirmButtonText: '确定'});
                 return
            }
             if(this.qlrInfo.size==0){
                 this.$alert('相关联人为空,无法跳转至下一步', '消息提醒', {confirmButtonText: '确定'});
                 return
            }
            this.$emit('tochangeview',isJyInfoShow,isXwblInfoShow,isFjSelectShow)
            //传递参数信息
            this.$emit('savejjinfo',this.htInfo,this.qlrInfo)
        },
        smClick(){
             this.$alert('未检测到扫码枪', '消息提醒', {confirmButtonText: '确定'});
        },
        getHtInfo(){
            //判断是否输入了正确的合同号
            const trimInput = this.hthInput.trim();
            if(trimInput==""){
                 this.$alert('请输入相关合同号后查询！', '消息提醒', {confirmButtonText: '确定'});
                return
            }
            //访问后端数据将结果进行展示
            //1.全屏开启
            const requestParam = {HTBH:trimInput};
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

        }
    }
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
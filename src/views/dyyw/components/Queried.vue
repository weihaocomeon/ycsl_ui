<template>
    <div>
        <el-form :inline="true"  style="margin-top:20px;margin-left:20px" >
            <el-row> 
             <el-col :span="22">
                <el-form-item>
                    <!-- 手动调出相关信息搜索框 -->
                    <el-button icon="el-icon-zoom-in" type="primary" @click="openSearchDialog">添加房屋信息</el-button>
                </el-form-item>
             </el-col>
             <el-col :span="1">
                <el-form-item>
                    <!-- 保存搜索出的数据 -->
                    <el-button type="text" @click="saveQuried">录入抵押信息<i class="el-icon-edit"></i>>></el-button>
                </el-form-item>
            </el-col>
            </el-row>
        </el-form>
        <el-collapse v-model="activeNames">
            <!-- 房产信息 -->
            <el-collapse-item v-if="showFwInfo" name="1" style="margin-bottom:5px">
                <template slot="title" >
                    <div   style="background-color:#0078D7">
                        <i class="iconfont icon-fangwu" style="margin-left:5px"></i>
                        <strong>
                            <span  style="font-size:18px;color:#ffffff">不动产登记信息</span>
                        </strong>
                    </div>
                </template>
                <housing v-bind:fwData="fwData"></housing>
            </el-collapse-item>
            <!-- 共有方式 -->
            <!-- <el-collapse-item  v-if="showGyfsInfo" name="2" style="margin-bottom:5px">
                <template slot="title" >
                    <div  style="background-color:#DCDFE6">
                        <i class="iconfont icon-57" style="margin-left:5px"></i>
                        <strong>
                            <span style="font-size:18px">持有方式</span>
                        </strong>
                    </div>
                </template>
                <div class="div-gyfs">
                    <el-radio-group v-model="gyfs" disabled>
                        <el-radio label="单独所有" class="radio" border></el-radio>
                        <el-radio label="共同共有" class="radio" border></el-radio>
                        <el-radio label="按份共有" class="radio" border></el-radio>
                    </el-radio-group>
                </div>
            </el-collapse-item> -->
            <!-- 权利人信息 -->
            <el-collapse-item  v-if="showQlrInfo" name="2" style="margin-bottom:5px">
                <template slot="title" >
                <div   style="background-color:#0078D7">
                    <i class="iconfont icon-renyuan" style="margin-left:5px"></i>
                    <strong>
                        <span  style="font-size:18px;color:#ffffff">权利人信息</span>
                    </strong>
                </div>
                </template>
                <obligee v-bind:obligeeInfo="obligeeInfo"></obligee>
            </el-collapse-item>
            <!-- 卖方信息 -->
            <el-collapse-item v-if="showMfInfos" name="3" style="margin-bottom:5px">
                <template slot="title" >
                <div   style="background-color:#0078D7">
                    <i class="iconfont icon-renyuan" style="margin-left:5px"></i>
                    <strong>
                    <span  style="font-size:18px;color:#ffffff">卖方信息</span>
                    </strong>
                </div>
                </template>
                <seller v-bind:sellerInfo="sellerInfo"></seller>
            </el-collapse-item>
            <!-- 已存在的抵押信息 -->
            <el-collapse-item v-if="showOldDyInfos" name="4" style="margin-bottom:5px">
                <template slot="title" >
                <div   style="background-color:#0078D7">
                    <i class="iconfont icon-fangwu" style="margin-left:5px"></i>
                    <strong>
                    <span  style="font-size:18px;color:#ffffff">已存在的抵押信息</span>
                    </strong>
                </div>
                </template>
                <old-mortgage v-bind:oldMortgageInfo="oldMortgageInfo"></old-mortgage>
            </el-collapse-item>
        </el-collapse>
        <!-- 相关信息搜索框 -->
        <message-dialog v-bind:messageDialogVisible="messageDialogVisible" @pushToFather="choseData" @closeDialog="closeDialog"></message-dialog>
    </div>
</template>
<script>
import Housing from './queried/Housing';//导入房产信息组件
import Obligee from './queried/Obligee';//导入权利人组件
import OldMortgage from './queried/OldMortgage'//导入已存在的抵押信息组件
import Seller from './queried/Seller'//导入卖方信息组件
import MessageDialog from '../dialog/MessageDialog';//导入搜索相关信息Dialog组件
export default {
    components:{
        Housing,
        Obligee,
        OldMortgage,
        Seller,
        MessageDialog,
    },
    data(){
        return{
            activeNames: ['1','2','3','4'],//控制展开折叠面板
            showFwInfo:true,//是否显示房屋信息
            showGyfsInfo:true,//显示共有方式
            showQlrInfo:true,//显示权利人信息
            showOldDyInfos:true,//显示已存在抵押信息
            showMfInfos:true,//显示卖方信息
            messageDialogVisible:false,//查询相关信息的Dialog
            fwData:{},//房屋数据
            gyfs:'',//共有方式
            obligeeInfo:[],//权利人数据
            oldMortgageInfo:[],//已存在的抵押数据
            sellerInfo:[],//卖方数据信息
        }
    },
    methods:{
        choseData(val){//获取子组件搜索到的数据
            this.messageDialogVisible = false;
            if(val==null || val == undefined){
                this.fwData = {};
                this.showFwInfo = false;
            }else{
                this.fwData = val.fwData;
                this.showFwInfo = true;
                if(val.qlrs.length<1 || val.qlrs == undefined){
                    this.obligeeInfo = [];
                    this.showQlrInfo = false;
                    this.gyfs = '';
                    this.showGyfsInfo = false;
                }else{
                    this.obligeeInfo = val.qlrs;
                    this.showQlrInfo = true;
                    this.gyfs = val.qlrs[0].gyfs;
                    this.showGyfsInfo = true;
                }
                if(val.dys.length<1 || val.dys == undefined){
                    this.oldMortgageInfo = [];
                    this.showOldDyInfos = false;
                }else{
                    this.oldMortgageInfo = val.dys;
                    this.showOldDyInfos = true;
                }
                if(val.mfs.length<1 || val.mfs == undefined){
                    this.sellerInfo = [];
                    this.showMfInfos = false;
                }else{
                    this.sellerInfo = val.mfs;
                    this.showMfInfos = true;
                }
            }
        },
        openSearchDialog(){//打开搜索框
            this.messageDialogVisible = true
        },
        closeDialog(){//关闭Dialog
            this.messageDialogVisible = false
        },
        saveQuried(){//保存搜索到的数据并传递到父组件
            let data = {};
            data.fwData = this.fwData;
            data.qlrs = this.obligeeInfo;
            data.dys = this.oldMortgageInfo;
            data.mfs = this.sellerInfo;
            this.$emit('saveQueriedData',data)
        }
    },
    mounted(){
        //this.messageDialogVisible = true;
    }
}
</script>
<style scoped>
.div-gyfs{
    margin-left: 30px;
    margin-top: 30px;
}
</style>


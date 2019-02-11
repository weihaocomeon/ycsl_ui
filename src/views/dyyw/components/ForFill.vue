<template>
    <div>
        <el-form :inline="true" style="margin-top:20px;margin-left:20px" >
             <el-row> 
             <el-col :span="22">
                <el-form-item>
                    <!-- 手动调出相关信息搜索框 -->
                    <el-button type="text" @click="openQuried"><<<i class="el-icon-document"></i>查看房屋信息</el-button>
                </el-form-item>
             </el-col>
             <el-col :span="1">
                <el-form-item>
                    <!-- 保存搜索出的数据 -->
                    <el-button type="text" @click="upLoadImg">上传图像信息<i class="el-icon-picture"></i></el-button>  
                </el-form-item>
              </el-col>
            </el-row>
        </el-form>
        <el-collapse v-model="activeNames">
            <!-- 抵押信息 -->
            <el-collapse-item  v-if="showDyInfo" name="1" style="margin-bottom:5px">  
                <template slot="title" >
                <div  style="background-color:#0078D7">
                    <i class="iconfont icon-renyuan" style="margin-left:5px"></i>
                    <strong>
                        <span style="font-size:18px;color:#ffffff">抵押信息录入<el-tag type="danger">请按照抵押合同录入信息</el-tag></span>
                    </strong>
                </div>
                </template>
                <mortgage></mortgage>
            </el-collapse-item>
        </el-collapse>
        <el-collapse v-model="activeNames">
            <!-- 抵押人信息 -->
            <el-collapse-item  v-if="showDyrInfo" name="2" style="margin-bottom:5px">
                <template slot="title" >
                <div  style="background-color:#0078D7">
                    <i class="iconfont icon-renyuan" style="margin-left:5px"></i>
                    <strong>
                        <span style="font-size:18px;color:#ffffff">抵押人信息录入</span>
                    </strong>
                </div>
                </template>
                <mortgagor @saveMortgagor="saveMortgagor"></mortgagor>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
import Mortgage from './forFill/Mortgage';//导入抵押信息组件
import Mortgagor from './forFill/Mortgagor';//导入抵押人组件
export default {
    components:{
        Mortgage,
        Mortgagor,
    },
    data(){
        return{
            activeNames: ['1','2','3','4'],//控制展开折叠面板
            showDyInfo:true,//展示抵押信息
            showDyrInfo:true,//显示新增抵押人信息
            mortgagorInfo:[],//抵押人信息
        }
    },
    methods:{
        saveMortgagor(val){//获取抵押人信息
            this.mortgagorInfo = val
        },
        openQuried(){
            this.$emit('openQuerid')
        },
        upLoadImg(){
            this.$emit('showfjinfoview')
        }
    }
}
</script>
<style scoped>
</style>


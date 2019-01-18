<template>
    <div>
        <el-form :inline="true" class="demo-form-inline" style="padding-left: 30px;padding-top:10px;margin-bottom: -15px;">
            <el-form-item>
                <!-- 手动调出相关信息搜索框 -->
                <el-button type="text" @click="openQuried">查看上一页</el-button>
            </el-form-item>
            <el-form-item>
                <!-- 保存搜索出的数据 -->
                <el-button type="text" @click="saveForFill">保存</el-button>
            </el-form-item>
        </el-form>
        <el-collapse v-model="activeNames">
            <!-- 抵押信息 -->
            <el-collapse-item  v-if="showDyInfo" name="1" style="margin-bottom:5px">
                <template slot="title" >
                <div  style="background-color:#DCDFE6">
                    <i class="iconfont icon-renyuan" style="margin-left:5px"></i>
                    <strong>
                        <span style="font-size:18px">抵押信息<el-tag type="danger">请按照抵押合同录入信息</el-tag></span>
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
                <div  style="background-color:#DCDFE6">
                    <i class="iconfont icon-renyuan" style="margin-left:5px"></i>
                    <strong>
                        <span style="font-size:18px">抵押人信息</span>
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
        saveForFill(){

        }
    }
}
</script>
<style scoped>
</style>


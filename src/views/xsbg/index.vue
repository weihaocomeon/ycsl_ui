<template>
    <div>
        <!-- 交易合同展示页 -->
        <div v-if="jyInfoShow">
            <jy-info  @savejjinfo="saveJyInfo"  @tochangeview="toChangeView"></jy-info>
        </div>

         <!-- 交易合同展示页 -->
        <div v-if="xwblInfoShow">
            <xwbl-info :ht-info="htInfo" :qlr-info="qlrInfo" @savexwblinfo="saveXwblInfo" @tochangeview="toChangeView"></xwbl-info>
        </div>

        <div v-if="wfzmInfoShow">
            <wfzm  @tochangeview="toChangeView" :xwbl-info="xwblForm" :qlr-info="qlrInfo"></wfzm>
        </div>

         <!-- 附件选择页面 -->
        <div v-if="fjSelectShow">
            <fj-select  @tochangeview="toChangeView"></fj-select>
        </div>


    </div>
</template>
<script>
import jyInfo from './components/jyInfo';//导入交易合同展示页
import xwblInfo from './components/xwblInfo';//导入询问笔录闻讯打印页
import fjSelect from './components/fjSelect';//附件选择页面的导入
import wfzm from './components/wfzm'; //无房证明
export default {
    name:'xsbg',
    components:{
        jyInfo,
        xwblInfo,
        fjSelect,
        wfzm
    },
    data(){
        return {
            jyInfoShow:true,//交易信息页面展示
            xwblInfoShow:false,//询问笔录信息页展示
            wfzmInfoShow:false,//无房证明的信息展示页
            fjSelectShow:false,//附件选择页展示
            htInfo:{},//合同页的相关数据
            qlrInfo:[],//权利人相关信息
            xwblForm:{},//询问笔录相关信息
        }
    },
    methods:{
        //询问笔录页面跳转
        toChangeView(isJyInfoShow,isXwblInfoShow,isWfzmInfoShow,isFjSelectShow){
            // console.log(this.qlrInfo)
            // alert(''+isJyInfoShow+''+isXwblInfoShow+''+isFjSelectShow)
            this.jyInfoShow = isJyInfoShow
            this.xwblInfoShow = isXwblInfoShow
            this.wfzmInfoShow = isWfzmInfoShow
            this.fjSelectShow = isFjSelectShow
        },
        saveJyInfo(htInfo,qlrInfo){
            this.htInfo = htInfo
            this.qlrInfo = qlrInfo
        },
        saveXwblInfo(xwblForm){
            console.log(xwblForm)
            this.xwblForm = xwblForm
        }
    },

    created(){
        console.log('组件被重新渲染')
    },
        watch:{
    '$route':function(){
        console.log('路由变更')
        console.log(this.$route)
        // if(this.$route.name=='协税办公'||this.$route.name=='业务详情'){ //引用同一组件的两个路由同时打开了 重新渲染组件
        //     //this.$forceUpdate()
        //     //组件进行重新渲染
        //     this.$emit('tochangeview',true,false,false,false)
        //     this.initData()
        // }
    }
    },
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
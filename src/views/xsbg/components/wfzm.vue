<template>
    <div>
        <el-row> 
             <el-col :span="10">
                    <!-- 跳转到合同展示页 -->
                    <el-button  type="text" @click="tochangeview(false,true,false,false)"><<<i class="el-icon-printer"></i>询问笔录展示</el-button>
             </el-col>
            <el-col :span="12" style="margin-top:10px">
                <!-- 合同信息展示页 -->
                <span >业务编号:{{ywbh}}</span>
             </el-col>
             <el-col :span="1">
                    <!-- 跳转到附件选取页面 -->
                    <el-button type="text" @click="tochangeview(false,false,false,true)">图像信息选取<i class="el-icon-picture"></i>>></el-button>

            </el-col>
          </el-row>

        <div class="grid-content bg-purple" style="margin-right: 10px;margin-left:10px">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>产权查询人列表</span>
                        <!-- <el-button  type="warning" @click="testBd('sellerHdForm')">测试表单验证</el-button> -->
                </div>
             <el-table
                :data="wfzmCxrs"
                stripe style='width: 80%;margin:10px' border >
                <el-table-column
                    type="index"
                    label="序号">
                </el-table-column>
                <el-table-column
                    prop="xgrmc"
                    label="姓名">
                </el-table-column>
                 <el-table-column
                    prop="cym"
                    label="曾用名">
                </el-table-column>
                <el-table-column
                    prop="xgrlx"
                    label="相关人类型">
                </el-table-column>
                <el-table-column
                    prop="zjhm"
                    label="证件号码">
                </el-table-column>
                </el-table>
            </el-card>    
        </div>

         <div class="grid-content bg-purple" style="margin-right: 10px;margin-left:10px">
            <el-card class="box-card">
                
                <div slot="header" class="clearfix">
                    <el-tooltip class="item" effect="light"  content="当被查询人重新选择后请重新获取数据" placement="bottom">  
                    <span>查询结果列表</span>
                    </el-tooltip>
                     <el-button style="margin-left:10px" type="primary" @click="getInfo">获取数据</el-button>
                        <!-- <el-button  type="warning" @click="testBd('sellerHdForm')">测试表单验证</el-button> -->
                </div>
                 
                <el-table
                :data="fwInfos"
                stripe style='width: 100%;margin:10px' border >
                <el-table-column
                    type="index"
                    label="序号">
                </el-table-column>
                <el-table-column
                    prop="qlrmc"
                    label="姓名">
                </el-table-column>
                 <el-table-column
                    prop="zjhm"
                    label="证件号码">
                </el-table-column>
                 <el-table-column
                    prop="zl"
                    label="房屋坐落">
                </el-table-column>
                <el-table-column
                    prop="jzmj"
                    label="建筑面积(㎡)">
                </el-table-column>
                <el-table-column
                    prop="sourceDB"
                    label="数据来源">
                </el-table-column>

                 <el-table-column
                prop=""
                label="操作"
                 align="center">
                  <template  slot-scope="scope">
                       <el-button type="danger" v-if="scope.row.isDel==0" icon="el-icon-delete" @click="filterFwInfo(scope.row,1)" circle>排除</el-button>
                       <el-button type="info" v-if="scope.row.isDel==1" icon="el-icon-back" @click="filterFwInfo(scope.row,0)" circle>恢复</el-button>
                </template>
            </el-table-column>
                </el-table>
        </el-card>    
            </div>

    </div>
</template>
<script>
import { getHouseWithPeople,getToSelectQlrByYwbh,yrcfPut } from "@/api/ycsl/index";
export default {
     data() {
        return {
            wfzmCxrs:[],
            fwInfos:[],
            ywbh:'',
        }
    },
    props:{
        'xwbl-info':Object,
        'qlr-info':Array
    },
    methods:{
        tochangeview(isJyInfoShow,isXwblInfoShow,isWfzmInfoShow,isFjSelectShow){
            this.$emit('tochangeview',isJyInfoShow,isXwblInfoShow,isWfzmInfoShow,isFjSelectShow)
        },
        getInfo(){
               getHouseWithPeople(this.wfzmCxrs).then(response => {
                   //console.log(this.wfzmCxrs)
                   if(response.data.length>0){
                       this.fwInfos=response.data
                   }else{
                        this.$alert('未查询到相关房屋信息!', '消息提醒', {confirmButtonText: '确定'});
                   }
            })
        },
        filterFwInfo(row,isDel){
            console.log("改变前"+row.isDel)
            //更改row的状态
            row.isDel=isDel
            console.log("改变后"+row.isDel)
            yrcfPut(row).then(response => {

            })
            // this.fwInfos.splice(row.$index,1)
        }
    },
    created(){
        //获取需要被查询人的列表
          this.ywbh = this.$store.state.xsbg.xsywbh
          //根据业务编号查询库中是否有相应的记录 如果有则进行展示
          if(this.ywbh!=''){
              const query = {ywbh:this.ywbh}
              getToSelectQlrByYwbh(query).then(response => {
                       this.wfzmCxrs = response.data
                       console.log(response.data)
                    })

          }else{
              this.$alert('业务编号为空!', '消息提醒', {confirmButtonText: '确定'});
          }
    },
    computed:{   
    },
}
</script>


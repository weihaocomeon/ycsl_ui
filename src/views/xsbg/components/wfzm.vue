<template>
    <div>
        <el-row> 
             <el-col :span="22">
                    <!-- 跳转到合同展示页 -->
                    <el-button  type="text" @click="tochangeview(false,true,false,false)"><<<i class="el-icon-printer"></i>询问笔录展示</el-button>
             </el-col>
             <el-col :span="1">
                    <!-- 跳转到附件选取页面 -->
                    <el-button type="text" @click="tochangeview(false,false,false,true)">图像信息选取<i class="el-icon-picture"></i>>></el-button>

            </el-col>
          </el-row>

             <el-table
                :data="tableData"
                style="width: 80%">
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="曾用名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="权利人类型">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="证件号码"
                    width="180">
                </el-table-column>
                </el-table>

    </div>
</template>
<script>
export default {
     data() {
        return {
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
        }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
        }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
        }]
        }
    },
    methods:{
        tochangeview(isJyInfoShow,isXwblInfoShow,isWfzmInfoShow,isFjSelectShow){
            this.$emit('tochangeview',isJyInfoShow,isXwblInfoShow,isWfzmInfoShow,isFjSelectShow)
        }
    }
}
</script>


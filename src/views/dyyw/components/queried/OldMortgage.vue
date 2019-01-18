<template>
    <div class="oldMortgage">
        <el-table :data="oldMortgageInfo" style="width: 100%" border>
            <el-table-column type='expand'>
                <template slot-scope='props'>
                    <el-form labelPosition='left' inline class='demo-table-expand'>
                        <el-table :data="props.row.dyqrs" style="width: 100%" border>
                            <el-table-column type="index" label="序 号">
                            </el-table-column>
                            <el-table-column prop="dyqrmc" label="抵押权人名称" >
                            </el-table-column>
                            <el-table-column prop="lxdh" label="联系电话">
                            </el-table-column>
                            <el-table-column prop="zjlx" label="证件类别">
                            </el-table-column>
                            <el-table-column prop="zjhm" label="证件号码">
                            </el-table-column>
                        </el-table>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column type="index" label="序 号">
            </el-table-column>
            <el-table-column prop="dyzmh" label="抵押证明号" >
            </el-table-column>
            <el-table-column prop="djlx" label="登记类型">
            </el-table-column>
            <el-table-column prop="xgzh" label="相关证号">
            </el-table-column>
            <el-table-column prop="djyy" label="登记原因">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    props:['oldMortgageInfo'],
    data(){
        return{}
    }
}
</script>
<style scoped>
.oldMortgage{
    margin: 10px;
}
</style>



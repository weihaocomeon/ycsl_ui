<template>
    <div class="seller">
        <el-table :data="sellerInfo" style="width: 100%" border>
            <el-table-column type="index" label="序 号">
            </el-table-column>
            <el-table-column prop="mfrmc" label="卖方姓名" >
            </el-table-column>
            <el-table-column prop="zjlx" label="证件类型">
            </el-table-column>
            <el-table-column prop="zjhm" label="证件号码">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    props:['sellerInfo'],
    data(){
        return{}
    }
}
</script>
<style scoped>
.seller{
    margin: 10px;
}
</style>


<template>
    <div class="obligee">
        <el-table :data="obligeeInfo" stripe style='width: 100%' border>
            <el-table-column type="index" label="序 号">
            </el-table-column>
            <el-table-column prop="qlrmc" label="权利人名称">
            </el-table-column>
            <el-table-column prop="zjlx" label="证件类型">
            </el-table-column>
            <el-table-column prop="zjhm" label="证件号码">
            </el-table-column>
            <el-table-column prop="gyfs" label="共有方式">
            </el-table-column>
            <el-table-column prop="gyfe" label="共有份额">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    props:['obligeeInfo'],
    data(){
        return{

        }
    }
}
</script>
<style scoped>
.obligee{
    margin: 10px;
}
</style>

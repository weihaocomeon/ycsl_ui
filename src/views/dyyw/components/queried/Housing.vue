<template>
    <div>
        <div class="div-fw">
            <el-row>
                <el-col :span="12">
                    <el-input :value="fwData.bdcdyh" class="data-fwinfo" :disabled="true">
                        <template slot="prepend">不动产单元号</template>
                    </el-input>    
                </el-col>   
                <el-col :span="12">
                    <el-input :value="fwData.bdczh"  class="data-fwinfo" :disabled="true">
                        <template slot="prepend">不动产证号</template>
                    </el-input>    
                </el-col>     
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-input :value="fwData.hbh" class="data-fwinfo" :disabled="true">
                        <template slot="prepend"><span>户编号</span></template>
                    </el-input>    
                </el-col>   
                <el-col :span="12">
                    <el-input :value="fwData.zbh"  class="data-fwinfo" :disabled="true">
                        <template slot="prepend">幢编号</template>
                    </el-input>    
                </el-col>     
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-input :value="fwData.hh" class="data-fwinfo" :disabled="true">
                        <template slot="prepend">户号</template>
                    </el-input>    
                </el-col>   
                <el-col :span="12">
                    <el-input :value="fwData.zl"  class="data-fwinfo" :disabled="true">
                        <template slot="prepend">坐落</template>
                    </el-input>    
                </el-col>     
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-input :value="fwData.fjh" class="data-fwinfo" :disabled="true">
                        <template slot="prepend">房间号</template>
                    </el-input>    
                </el-col>   
                <el-col :span="12">
                    <el-input :value="fwData.dyh"  class="data-fwinfo" :disabled="true">
                        <template slot="prepend">单元号</template>
                    </el-input>    
                </el-col>     
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-input :value="fwData.xmmc" class="data-fwinfo" :disabled="true">
                        <template slot="prepend">项目名称</template>
                    </el-input>    
                </el-col>   
                <el-col :span="12">
                    <el-input :value="fwData.jzmj"  class="data-fwinfo" :disabled="true">
                        <template slot="prepend">建筑面积</template>
                    </el-input>    
                </el-col>     
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-input :value="fwData.jzmc" class="data-fwinfo" :disabled="true">
                        <template slot="prepend">建筑名称</template>
                    </el-input>    
                </el-col>                     
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
    props:['fwData'],
    data(){
        return{
            
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
        margin-left: 15px
    }
}
</style>

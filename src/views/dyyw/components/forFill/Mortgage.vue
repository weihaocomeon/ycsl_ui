<template>
    <div>
        <el-form :model="mortgageInfo" :rules="mortgageRule" label-width="100px" class="demo-ruleForm">
            <el-form-item label="申请编号">
                <el-input v-model="mortgageInfo.sqbh" disabled></el-input>
            </el-form-item>
            <el-form-item label="业务类型">
                <el-input v-model="mortgageInfo.ywlx" disabled></el-input>
            </el-form-item>
            <el-form-item label="抵押方式">
                <el-select v-model="mortgageInfo.dyfs">
                    <el-option v-for="(item,index) in dyfsOptions" :key="item.value" :label="item.lable" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="抵押面积">
                <el-input v-model="mortgageInfo.dymj" placeholder="请输入抵押面积"></el-input>
            </el-form-item>
            <el-form-item label="抵押金额">
                <el-input v-model="mortgageInfo.dyje" placeholder="请输入抵押金额"></el-input>
            </el-form-item>
            <el-form-item label="评估价格">
                <el-input v-model="mortgageInfo.pgjg" placeholder="请输入评估价格"></el-input>
            </el-form-item>
            <el-form-item label="抵押期限">
                <el-input v-model="mortgageInfo.dyqx" placeholder="请输入抵押期限"></el-input>
            </el-form-item>
            <el-form-item>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data(){
        return{
            mortgageInfo:{
                sqbh:'', //申请编号
                ywlx:'抵押业务',//申请业务
                dyfs:'',//抵押方式
                dymj:'',//抵押面积
                dyje:'',//抵押金额
                pgjg:'',//评估价格
                dyqx:'',//抵押期限
                qssj:'',//起始时间
                jzsj:'',//截止时间
                dyyy:'',//抵押原因
                fj:''//附记
            },
            dyfsOptions:[{
                label:'余额抵押',
                value:'余额抵押'
            },{
                label:'最高额抵押',
                value:'最高额抵押'
            },{
                label:'一般抵押',
                value:'一般抵押'
            }],
            mortgageRule:{
                dyfs:[
                    {required:true,message:'请选择抵押方式',trigger:'blur'},
                ],
                dymj:[
                    {required:true,message:'请填写抵押面积',trigger:'blur'},
                ],
                dyje:[
                    {required:true,message:'请填写抵押金额',trigger:'blur'},
                    {type:'number',message:'抵押金额必须为数字值'}
                ],
                pgjg:[
                    {required:true,message:'请输入评估价格',trigger:'blur'},
                    {type:'number',message:'评估价格必须为数字值'}
                ],
                dyqx:[
                    {required:true,message:'请输入抵押期限',trigger:'blur'},
                ],
                qssj:[
                    {required:true,type:'date',message:'请选择抵押时间范围',trigger:'change'},
                ],
                jzsj:[
                    {required:true,type:'date',message:'请选择抵押时间范围',trigger:'change'},
                ],
                dyyy:[
                    {required:true,message:'请输入抵押原因',trigger:'blur'},
                ]                
            }
        }
    }
}
</script>

<style scoped>

</style>

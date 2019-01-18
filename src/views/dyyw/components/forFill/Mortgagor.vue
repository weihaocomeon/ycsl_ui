<template>
    <div class='div-mjFormData'>
        <div class='buttonDiv' >
            <el-button @click='loadZj()' type='primary'>新增抵押人</el-button>
            <el-button @click='saveToFather()' type='primary'>保存</el-button>
        </div> 
        <!-- 抵押人信息 -->
        <el-table :data='mortgagorInfo' style='width: 100%' border>
            <el-table-column prop='mortgagorNmae' label='姓名'>
            </el-table-column>
            <el-table-column prop='mortgagorIdType' label='证件类型'>
            </el-table-column>
            <el-table-column prop='mortgagorIdcard' label='证件号码'>
            </el-table-column>
            <el-table-column prop='' label='操作' align='center'>               
                <template  slot-scope='scope'>
                    <el-button  type='danger' size='small'  @click='deleteMortgagor(scope.row)'>删除</el-button>
                    <el-button  type='primary' size='small' @click='editMortgagor(scope.row)'>修改</el-button>
                </template>
            </el-table-column>    
        </el-table>
        <!-- 修改/新增抵押人信息的Dialog -->
        <el-dialog
            :before-close='handleMortgagorDialogCancel'
            :visible.sync='mortgagorDialogVisible'
            width='30%'
            center>
            <span slot='title'>{{mortgagorDialogInfo}}</span>  
            <el-form :model='mortgagorTemp' :rules='mortgagorFormRules' ref='dictValueForm' label-width='100px'>
                </el-form-item>
                    <el-form-item label='姓名' prop='mortgagorNmae' >
                    <el-input v-model='mortgagorTemp.mortgagorNmae' placeholder='请输入姓名'></el-input>
                </el-form-item>                
                <el-form-item label='证件类型'  prop='mortgagorIdType'>
                <el-input v-model='mortgagorTemp.mortgagorIdType' placeholder='请输入证件类型'></el-input>
                </el-form-item>             
                <el-form-item label='证件号码' prop='mortgagorId'>
                <el-input v-model='mortgagorTemp.mortgagorIdcard' placeholder='请输入证件号码'></el-input>
                </el-form-item>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button @click='handleMortgagorDialogCancel'>取 消</el-button>
                <el-button type='primary' @click='handleValueSave'>确 定</el-button>
            </span>
        </el-dialog>  
    </div>
</template>
<script>
export default {
    data(){
        return{
            mortgagorDialogVisible:false,//控制Dialog的开关
            mortgagorInfo:[],//抵押人数据
            mortgagorDialogInfo:'',//判断是修改/新增Dialog
            mortgagorIndex:'',//修改抵押人时记录抵押人的index
            mortgagorTemp:{},//Dialog中的抵押人表单数据
            mortgagorFormRules: {//Dialog中的抵押人表单数据验证规则
                name: [
                {
                    required: true,
                    message: '请输入抵押人姓名',
                    trigger: 'blur'
                }
                ],
                type: [
                {
                    required: true,
                    message: '请输入证件类型',
                    trigger: 'blur'
                }
                ],
                idCard:[
                {
                    required: false,
                    message: '建议输入证件值',
                    trigger: 'blur'
                }
                ],
            },
        }
    },
    methods:{
        loadZj(){//新增抵押人
            this.mortgagorDialogInfo ='新增抵押人';
            this.mortgagorDialogVisible = true; //打开抵押人Dialog
        },
        editMortgagor(row){//修改抵押人
            this.mortgagorDialogInfo ='修改抵押人';
            this.mortgagorIndex =  this.mortgagorInfo.indexOf(row)
            this.mortgagorDialogVisible = true; //打开修改页面
            const { ...obj } = row; //不定参数
            this.mortgagorTemp = obj; 
        },
        deleteMortgagor(row){//删除抵押人
            this.$confirm('是否确认删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //将该条记录从记录中删除
                const index = this.mortgagorInfo.indexOf(row)
                if (index !== -1 && index >= 0) {
                    this.mortgagorInfo.splice(index,1)
                }
            }).catch(() => {
                console.log('取消删除')
            })
        },
        handleMortgagorDialogCancel(){//关闭Dialog触发
            this.mortgagorDialogVisible = false;
        },
        handleValueSave(){//确定新增/修改操作
            if(this.mortgagorDialogInfo == '新增抵押人'){
                this.mortgagorInfo.push(this.mortgagorTemp)
                this.mortgagorTemp = {};
            }else if(this.mortgagorDialogInfo == '修改抵押人'){
                const index = this.mortgagorIndex
                if (index !== -1 && index >= 0) {
                    this.mortgagorInfo.splice(index,1,this.mortgagorTemp);
                }
                this.mortgagorTemp = {};
            }
            this.mortgagorDialogVisible = false;
        },
        saveToFather(){//传递数据到父组件
            this.$emit('saveMortgagor',this.mortgagorInfo)
        }
    }
}
</script>
<style scoped>
.div-mjFormData{
    margin: 10px
}
.buttonDiv{
    margin: 20px;
}
</style>


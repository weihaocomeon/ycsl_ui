<template>
    <div>
        <div v-show="showQueried">
            <queried @saveQueriedData="saveQueriedData"></queried>
        </div>
        <div v-show="showForFill">
            <for-fill @openQuerid="openQuerid"></for-fill>
        </div>
    </div>
</template>
<script>
import Queried from './components/Queried';//导入房产信息组件
import ForFill from './components/ForFill'
export default {
    components:{
        Queried,
        ForFill
    },
    data(){
        return{
            showQueried:true,
            showForFill:false,
        }
    },
    methods:{
        saveQueriedData(val){
            console.log(val)
            this.$confirm('提交成功, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success'
            }).then(() => {
                this.showQueried = false;
                this.showForFill = true;
            }).catch(() => {
                this.showQueried = true;
                this.showForFill = false;    
            });
        },
        openQuerid(){
            this.showQueried = true;
            this.showForFill = false;    
        }
    }
}
</script>
<style scoped>
</style>


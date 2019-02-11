<template>
    <div>
        <div v-show="showQueried">
            <queried @saveQueriedData="saveQueriedData"></queried>
        </div>
       
        <div v-show="showForFill">
            <for-fill @openQuerid="openQuerid" @showfjinfoview="showFjInfoView"></for-fill>
        </div>

        <div v-show="showFjInfo">
            <fj-image @openQuerid="openQuerid"></fj-image>
        </div>
      
    </div>
</template>
<script>
import Queried from './components/Queried';//导入房产信息组件
import ForFill from './components/ForFill'; //信息框组件
import FjImage from './components/FjImage'; //信息框组件
export default {
    components:{
        Queried,
        ForFill,
        FjImage
    },
    data(){
        return{
            showQueried:true,
            showForFill:false,
            showFjInfo:false
        }
    },
    methods:{
        showFjInfoView(){
           // alert('c')
            this.showQueried = false;
            this.showForFill = false;  
            this.showFjInfo = true;  
        },
        saveQueriedData(val){
                this.showFjInfo = false;
                this.showQueried = false;
                this.showForFill = true;
           
        },
        openQuerid(){
            this.showQueried = true;
            this.showForFill = false;  
            this.showFjInfo = false;  
        },
      
    }
}
</script>
<style scoped>
</style>


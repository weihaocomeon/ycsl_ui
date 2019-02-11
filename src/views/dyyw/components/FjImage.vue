<template>
<div>
           <el-form :inline="true" style="margin-top:20px;margin-left:20px" >
             <el-row> 
             <el-col :span="22">
                <el-form-item>
                    <!-- 手动调出相关信息搜索框 -->
                    <el-button type="text" @click="openForFill"><<<i class="el-icon-document"></i>查看录入信息</el-button>
                </el-form-item>
             </el-col>
             <el-col :span="1">
                <el-form-item>
                    <!-- 保存搜索出的数据 -->
                    <el-button type="text"  @click="submitBiz">提交业务<i class="el-icon-success"></i></el-button>  
                </el-form-item>
              </el-col>
            </el-row>
        </el-form>
    <div v-for="item in data" style="margin:15px">
        <span style="margin-bottom:15px">{{item.title}}</span>
        <input type="file" class="blueButton"  multiple="multiple"></input>
        <!-- <el-upload
        class="upload-demo"
        action="111"
        :on-preview="handlePreview"
        :before-upload="beforeUpload"
        :on-remove="handleRemove"
        :file-list="item.file"
        list-type="picture">
        <el-button size="small" type="primary">选择文件</el-button>
        </el-upload> -->
        <div v-for="i in item.name">
        <div>{{i}}</div>
        </div>
    </div>

    </el-dialog>

</div>
</template>

<script>
  export default {
    data() {
      return {
        data: [
            {
                name:[],
                title:'不动产登记申请书(份)',
                file:[]
            },
            {
                title:'询问笔录',
                file:[]
            },
             {
                title:'申请人身份证复印件',
                file:[]
            },
             {
                title:'户口复印件',
                file:[]
            },
             {
                title:'结婚证复印件',
                file:[]
            },
             {
                title:'营业执照复印件',
                file:[]
            },
             {
                title:'委托书',
                file:[]
            },
             {
                title:'商品房销售合同',
                file:[]
            },
        ]
      };
    },
    methods: {
     openForFill(){
         this.$emit('openQuerid')
     },
     submitBiz(){
          const loading = this.$loading({
          lock: true,
          text: '业务提交中....',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
          this.$message({
          message: '业务提交成功！',
          type: 'success'
        });
        }, 2000);
        
     }
    }
  }
</script>
<style scoped>
        .blueButton{
                margin-top: 5px;
                display: block;
                width: 500px;
                /* height: 40px; */
                background-color: #00b3ee;
                color: #fff;
                text-decoration: none;
                text-align: center;
                font:normal normal normal 16px/40px 'Microsoft YaHei';
                cursor: pointer;
                border-radius: 4px;
            }
</style>




<template>
    <div>

           <el-collapse v-model="activeNames">
                 <!-- 房产信息 -->
                <el-collapse-item name="1" style="margin-bottom:5px">
                    <template slot="title" >
                        <div   style="background-color:#0078D7">
                            <i class="iconfont icon-fangwu" style="margin-left:5px"></i>
                            <strong>
                                <span  style="font-size:18px;color:#ffffff">业务类型及基本信息选择</span>
                            </strong>
                        </div>

                    </template>
                        <el-form :inline="true" style="margin-top:15px;margin-left:15px" :model="sjdData" class="demo-form-inline">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="登 记 大 类 :">
                                        <el-select v-model="sjdData.djdl" placeholder="选择登记大类">
                                        <el-option label="转移登记" value="shanghai"></el-option>
                                        <el-option label="注销登记" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>    
                                <el-col :span="12">
                                <el-form-item label="登 记 小 类 :">
                                    <el-select v-model="sjdData.djxl" placeholder="选择登记小类">
                                    <el-option label="商品房买卖转移登记" value="shanghai"></el-option>
                                    <el-option label="注销登记" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="登 记 原 因 :">
                                        <el-select v-model="sjdData.djyy" placeholder="选择登记原因">
                                        <el-option label="买卖" value="shanghai"></el-option>
                                        <el-option label="交易" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>    
                                <el-col :span="12">
                                <el-form-item label="收 件 时 间 :">
                                    <el-input  v-model="sjdData.sjsj" ></el-input>
                                </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="交易合同编号:">
                                        <el-input  v-model="sjdData.jyhtbh" ></el-input>
                                    </el-form-item>

                                       <el-select v-model="htqy" placeholder="选择房屋区域">
                                        <el-option label="铜山区" value="shanghai"></el-option>
                                        <el-option label="铜山高新区" value="beijing"></el-option>
                                        </el-select>  
                                    <el-button type="primary" @click="loadData()">获取交易合同信息</el-button>
                                </el-col>    
                                <el-col :span="12">
                                <el-form-item label="合同业务编号:">
                                    <el-input  v-model="sjdData.htywbh" ></el-input>
                                </el-form-item>
                                </el-col>
                            </el-row>
                            </el-form>
                   
             </el-collapse-item>

              <el-collapse-item name="2" style="margin-bottom:5px">
                    <template slot="title" >
                        <div   style="background-color:#0078D7">
                            <i class="iconfont icon-fangwu" style="margin-left:5px"></i>
                            <strong>
                                <span  style="font-size:18px;color:#ffffff">相关证号</span>
                            </strong>
                        </div>
                    </template>

                        <div class='buttonDiv' >
                            <el-button style="margin-top:15px;margin-left:15px" @click="zhAdd"  type='primary'>证号添加</el-button>
                        </div> 
                       <el-table :data="xgzh" stripe style='width: 100%;margin-top:10px' border>
                            <el-table-column type="index" label="序 号">
                            </el-table-column>
                            <el-table-column prop="xgzh" label="相关证号">
                            </el-table-column>
                            <el-table-column prop="xgzlx" label="相关证类型">
                            </el-table-column>
                            <el-table-column prop="qlrmc" label="权利人名称">
                            </el-table-column>
                            <el-table-column prop="zl" label="坐落">
                            </el-table-column>
                            <el-table-column
                                prop=""
                                label="操作"
                                align="center">
                                <el-button>新增</el-button>
                                <template  slot-scope="scope">
                                        <el-button  type="primary" size="small" @click="deleteXgzh" >删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                </el-collapse-item>


               <el-collapse-item name="2" style="margin-bottom:5px">
                    <div class='buttonDiv' >
                            <el-button style="margin-top:15px;margin-left:15px"  @click='loadZj()'  type='primary'>权利人添加</el-button>
                        </div> 
                    <template slot="title" >
                        <div   style="background-color:#0078D7">
                            <i class="iconfont icon-fangwu" style="margin-left:5px"></i>
                            <strong>
                                <span  style="font-size:18px;color:#ffffff">权利人</span>
                            </strong>
                        </div>
                    </template>
                     <obligee v-bind:obligeeInfo="obligeeInfo"></obligee>

                </el-collapse-item>

                 <el-collapse-item name="3" style="margin-bottom:5px">
                    <div class='buttonDiv' >
                            <el-button style="margin-top:15px;margin-left:15px"  type='primary' @click="ywrAdd()">义务人添加</el-button>
                        </div> 
                    <template slot="title" >
                        <div   style="background-color:#0078D7">
                            <i class="iconfont icon-fangwu" style="margin-left:5px"></i>
                            <strong>
                                <span  style="font-size:18px;color:#ffffff">义务人</span>
                            </strong>
                        </div>
                    </template>
                     <obligee v-bind:obligeeInfo="ywrInfo"></obligee>

                </el-collapse-item>


             <el-collapse-item name="3" style="margin-bottom:5px">
                    <template slot="title" >
                        <div   style="background-color:#0078D7">
                            <i class="iconfont icon-fangwu" style="margin-left:5px"></i>
                            <strong>
                                <span  style="font-size:18px;color:#ffffff">通知人信息</span>
                            </strong>
                        </div>
                    </template>
                    <el-form :inline="true" style="margin-top:15px;margin-left:15px" :model="otherData" class="demo-form-inline">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="受 理 科 室 :">
                                        <el-input v-model="sldw"></el-input>
                                    </el-form-item>
                                </el-col>    
                                <el-col :span="12">
                                <el-form-item label="受 理 人 员 :">
                                    <el-input v-model="slry"></el-input>
                                </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="通知人姓名:">
                                        <el-input v-model="obligeeInfo.length==0?'':obligeeInfo[0].qlrmc"></el-input>
                                    </el-form-item>
                                </el-col>    
                                <el-col :span="12">
                                <el-form-item label="通 知 电 话 :">
                                    <el-input  v-model="tzrdh" ></el-input>
                                </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="收件备注:">
                                        <el-input type="textarea"  style="width:550px" v-model="sjbz"  :rows=7  placeholder="请输入收件备注" ></el-input>
                                    </el-form-item>

                                  
                                </el-col>    
                            
                            </el-row>
                            </el-form>


                </el-collapse-item>


                <el-collapse-item name="4" style="margin-bottom:5px">
                    <template slot="title" >
                        <div   style="background-color:#0078D7">
                            <i class="iconfont icon-fangwu" style="margin-left:5px"></i>
                            <strong>
                                <span  style="font-size:18px;color:#ffffff">录入图像信息</span>
                            </strong>
                        </div>
                    </template>
                    <div v-for="item in data" style="margin:15px">
                        <span style="margin-bottom:15px">{{item.title}}</span>
                        <input type="file" class="blueButton"  multiple="multiple"></input>
                        <div v-for="i in item.name">
                        <div>{{i}}</div>
                        </div>
                    </div>

                </el-collapse-item>

              
           </el-collapse> 
            
            <el-button type="primary" style="margin-left:47%" @click="submitBiz()">业务提交</el-button>

    </div>
</template>

<script>
import moment from "moment";
import Obligee from '@/views/dyyw/components/queried/Obligee';//导入权利人组件
export default {
    components:{
        Obligee
    },
     data(){
        return {
            sjbz:'',//收件备注
            tzrdh:'',//通知人电话
            sldw:'铜山区不动产交易服务中心',//受理单位
            slry:'Administrator',//受理人员
            zl:'',//坐落
            htqy:'',//房屋所在区域
            mortgagorDialogVisible:false,//控制Dialog的开关
            mortgagorInfo:[],//录入人信息
            activeNames: ['1','2','3','4'],//控制展开折叠面板
            sjdData:{},
            xgzh:[],//相关证号
            obligeeInfo:[],//权利人数据
            ywrInfo:[],//义务人添加
            otherData:{},//其他信息
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
            
        }},
    methods:{
        //根据合同号获取相关信息
        loadData(){
            this.zhAdd();
            this.ywrAdd();
            this.loadZj();
        },
      ywrAdd(){
          let ywr = {"qlrmc":"李晓","zjlx":"身份证","zjhm":"320323199012267715","gyfs":"单独所有","gyfe":""}
          this.ywrInfo.push(ywr)
      },
      loadZj(){
        let qlr = {"qlrmc":"张峰","zjlx":"身份证","zjhm":"320313199012287726","gyfs":"单独所有","gyfe":""}
            this.obligeeInfo.push(qlr)

      },
      zhAdd(){
          let xgzhData ={index:1,xgzh:"铜山不动产0123号",xgzlx:"房屋不动产证",qlrmc:"张虎",zl:"铜山区幸福里小区18-2-2012"}
          this.xgzh.push(xgzhData)
      },
      deleteXgzh(){
          this.xgzh=[]
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
    },
    created() {//初始化加载数据 
     this.sjdData.sjsj = moment().format('YYYY-MM-DD HH:mm:ss');
    },
     
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
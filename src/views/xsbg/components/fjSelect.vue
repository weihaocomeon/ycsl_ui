<template>
    <div>
        <el-row> 
             <el-col :span="22">
                    <!-- 跳转到询问笔录打印页面 -->
                    <el-button  type="text" @click="tochangeview(false,false,true,false)"><<<i class="el-icon-printer"></i>打印询问笔录</el-button>
             </el-col>
             <el-col :span="1">
                    <!-- 完成协税 -->
                    <el-button type="text" @click="submitBiz(false,false,true)">提交业务<i class="el-icon-upload"></i>>></el-button>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8"><div class="grid-content bg-purple" style="margin-left:10px;margin-right: 10px">
                    <el-card class="box-card" >
                    <div slot="header" class="clearfix" >
                        <div style="margin:-18px -20px; padding:18px 20px; background: antiquewhite;"><span>档案图像信息</span></div>
                    </div>
                    <div>
                       
                        <el-tree
                        class="filter-tree"
                        node-key="id"
                        :data="data4"  
                        :props="defaultProps" 
                        default-expand-all
                        :expand-on-click-node="false"
                        ref="dictTypeTree"
                        @node-click="getNodeData"
                        highlight-current
                        :render-content="renderContent">
                        </el-tree>
                    </div>
                    </el-card>

                     <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <div style="margin:-18px -20px; padding:18px 20px; background: antiquewhite;"><span>交易信息附件</span></div>
                    </div>
                    <div>
                       
                        <el-tree
                        class="filter-tree"
                        node-key="id"
                        :data="data5"  
                        :props="defaultProps" 
                        default-expand-all
                        :expand-on-click-node="false"
                        ref="dictTypeTree"
                        @node-click="getNodeData"
                        highlight-current
                        :render-content="renderContent">
                        </el-tree>
                    </div>
                    </el-card>

                </div>
            </el-col>  
            <el-col :span="8">
                <div class="grid-content bg-purple" style="margin-right: 10px">
                    <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <div style="margin:-18px -20px; padding:18px 20px; background: cadetblue;"><span>图像信息预览  {{imageTitle}}</span></div>
                    </div>
                    <img v-bind:src="imageTemp" style="box-shadow:0 0 20px 0 #000000;width:100%"/>
                    </el-card>
                   </div>    

            </el-col> 
             
              <el-col :span="8">
                  <div class="grid-content bg-purple" style="margin-right: 10px">
                    <el-card class="box-card">
                    <div slot="header" class="clearfix">
                          <div style="margin:-18px -20px; padding:18px 20px; background: darkseagreen;"><span>已选择推送至地税附件列表</span></div>
                        
                    </div>
                    <template  >
                        <div v-for="(item,index) in dsFjs"  :key='item.id'>
                           <span class="overSpan" @click="getNodeData(item)"> {{index+1}}、{{item.label}}</span>
                            <el-button size="mini" type="danger" style="margin-top:18px" icon="el-icon-delete" circle @click="deleteBtn(index,item)"></el-button>
                        </div>
                         
                    </template>    

                    </el-card>
                </div>
            </el-col>             

          </el-row>
    </div>
</template>

<script>
let id = 1000;
export default {

    data() {
      const data = [{
        id: 1,
        label: '档案附件',
        children: [{
          id: 2,
          label: '不动产登记审批表',
          children: [{
            id: 3,
            label: '不动产登记审批表',
            image:"../../src/views/xsbg/components/image/不动产登记审批表.png"
          }]
        }, {
        id: 4,
        label: '不动产登记发件清单',
        children: [{
          id: 5,
          label: '不动产登记发件清单',
          image:"../../src/views/xsbg/components/image/发件清单.png"
        }]
      }, {
        id: 6,
        label: '不动产登记申请书',
        children: [{
          id: 7,
          label: '不动产登记申请书',
          image:"../../src/views/xsbg/components/image/登记申请书.png"
        }]
      },
      {
        id: 8,
        label: '配图',
        children: [{
          id: 9,
          label: '房屋内业配图表',
          image:"../../src/views/xsbg/components/image/房屋业内配图表.png"
        },
        {
          id: 10,
          label: '宗地图',
          image:"../../src/views/xsbg/components/image/宗地图.png"
        }
        ]
      },
      {
        id: 11,
        label: '产权证明',
        children: [{
          id: 12,
          label: '国有土地使用证',
          image:"../../src/views/xsbg/components/image/土地证.png"
        },
        {
          id: 13,
          label: '房屋所有权证',
          image:"../../src/views/xsbg/components/image/房产证.png"
        }
        ]
      },
       {
        id: 15,
        label: '契税发票',
        children: [{
          id: 16,
          label: '契税发票',
          image:"../../src/views/xsbg/components/image/契税发票.png"
        }
        ]
      }
      
      ]
      }];
      const dataJy =[{
        id: 111,
        label: '交易附件',
        children: [
            {
                id: 112,
                label: '身份证复印件',
                children:[
                    {
                        id: 113,
                        label: '买方身份证复印件',
                        image:"../../src/views/xsbg/components/image/买方身份证.png"
                    },{
                        id: 114,
                        label: '卖方身份证复印件',
                        image:"../../src/views/xsbg/components/image/卖方身份证.png"
                    }
                ]
            } ,  
            {
                id: 115,
                label: '结婚证复印件',
                children:[
                    {
                        id:116,
                        label: '买方结婚证复印件',
                        image:"../../src/views/xsbg/components/image/买方结婚证.png"
                    },{
                        id: 117,
                        label: '卖方结婚证复印件',
                        image:"../../src/views/xsbg/components/image/买方结婚证.png"
                    }
                ]
            } ,  
            {
                id: 118,
                label: '户口本复印件',
                children:[
                    {
                        id: 119,
                        label: '买方户口本复印件',
                        image:"../../src/views/xsbg/components/image/买方户口本.png"
                    }
                ]
            } ,  
        ]
      }]
      return {
          dsFjs:[],//地税附件列表
          imageTitle:'',
          imageTemp:'',//图片临时变量
          defaultProps: {
            children: "children",
            label: "label"
        },
        data4: JSON.parse(JSON.stringify(data)),
        data5: JSON.parse(JSON.stringify(dataJy))
      }
    },
    methods:{
        //业务提交
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
        },
        //附件列表中删除
        deleteBtn(index,data){
            console.log(data)
            data.isSelect = false
            this.dsFjs.splice(index,1)
        },
        append(node,data){
            // console.log(node)
            // console.log(data)
            this.dsFjs.push(data)
                this.$set(data,'isSelect', true)
        },
        getNodeData(data){
            //console.log(data)
            if(data.image!=null){
                //console.log(data.image)
                //赋值给图片预览
                this.imageTemp = data.image
                this.imageTitle = data.label
            }
        },
          renderContent(h, { node, data }) {
      return (
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
            <span>{node.label}</span>
          </span>
          <span> 
           {data.image&&(data.isSelect!=true) ? (
              <el-button
                style="font-size: 12px;"
                type="text"
                on-click={() => this.append(node, data)}
              >
                <i class="el-icon-circle-plus-outline" />
              </el-button>
             ) : (
              <span />
            )}
            {this.dictTypeManager_btn_edit ? (
              <el-button
                style="font-size: 12px;"
                type="text"
                
              >
                <i class="el-icon-edit" />
              </el-button>
            ) : (
              <span />
            )}
           
            {this.dictTypeManager_btn_del ? (
              <el-button
                style="font-size: 12px;"
                type="text"
                
              >
                <i class="el-icon-delete" />
              </el-button>
            ) : (
              <span />
            )}
            {data.dicnote ? (
              <el-button
                style="font-size: 12px;"
                type="text"
              >
                <el-tooltip class="item" effect="dark"  placement="right">
                   <span slot="content">{data.dicnote}</span>
                  <i class="el-icon-document" />
                </el-tooltip>
              </el-button>
            ) : (
              <span />
            )}
          </span>
        </span>
      );
    },

        //询问笔录页面跳转
        tochangeview(isJyInfoShow,isXwblInfoShow,isFjSelectShow){
            this.$emit('tochangeview',isJyInfoShow,isXwblInfoShow,isFjSelectShow)
        }
    }
}
</script>
<style lang="scss" scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .overSpan{
      cursor:pointer
  }
</style>


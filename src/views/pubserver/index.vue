<template>
   <div class="app-container calendar-list-container">
    <el-row>
  <el-col :span="8"><div class="grid-content bg-purple" style="margin-right: 10px">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>字典目录</span>
      </div>
      <div>
        <el-input
          placeholder="输入关键字进行查找"
          v-model="filterText">
        </el-input>
        <el-tree
          class="filter-tree"
          node-key="id"
          :data="dictTypeData"  
          :props="defaultProps" 
          default-expand-all
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          ref="dictTypeTree"
          @node-click="getNodeData"
          highlight-current
          :render-content="renderContent">
        </el-tree>
      </div>
    </el-card>
</div></el-col>
  <el-col :span="16" style="height:100%"><div class="grid-content bg-purple-light">
   <!-- 展示自定义菜单的盒子 -->
   <el-card class="box-card"  v-if="!editDictTypeFlag&&!fomeData_is_show&&todo_item_show">
        <el-button-group style="margin-bottom :10px">
          <el-button type="primary" @click="addModule()" icon="el-icon-add">新增</el-button>
          <el-button type="primary" @click="editModule()" icon="el-icon-edit">修改</el-button>
          <el-button type="primary" @click="delModule()" icon="el-icon-delete">删除</el-button>
        </el-button-group>
        <!-- 我们试试引入的组件树效果 -->  
        <zk-table
          ref="tablezdy"
          sum-text="sum"
          index-text="#"
          :columns="todoColumns"
          :data="todoData"
          :stripe="props.stripe"
          :border="props.border"
          :show-header="props.showHeader"
          :show-summary="props.showSummary"
          :show-row-hover="props.showRowHover"
          :show-index="props.showIndex"
          :tree-type="props.treeType"
          :is-fold="props.isFold"
          :expand-type="props.expandType"
          :selection-type="props.selectionType">
    </zk-table>



    </el-card>

    <!-- 不在编辑状态下可以展示 -->
    <div></div>
        <el-card class="box-card"  v-if="!editDictTypeFlag&&fomeData_is_show">
      <div slot="header" class="clearfix">
        <span>{{currentDicItem.label}}</span>
      </div>
      <div >
        <div class="filter-container">
          <el-input @keyup.enter.native="handleDictValueFilter" style="width: 200px;" class="filter-item" placeholder="标签或code" v-model="listDictValueQuery.labelDefault"> </el-input>
          <el-button class="filter-item" type="primary" icon="el-icon-search" round  @click="handleDictValueFilter">搜索</el-button>
          <el-button class="filter-item" style="margin-left: 10px;" icon="el-icon-circle-plus-outline" @click="handleDictValueCreate" type="primary" round v-if="this.dictValueManager_btn_add">添加</el-button>
        </div>
      <el-table  :default-sort = "{prop: 'xh', order: 'ascending'}" :data="dictValueTableData" border max-height="200px"  highlight-current-row style="width: 100%">
        <el-table-column
          label="操作"
          width="80px">
          <template  slot-scope="scope">
            <el-button  type="text" size="small" @click="handleClick(scope.row)" v-if="dictValueManager_btn_edit"><i class="el-icon-edit"></i></el-button>
            <el-button size="small" type="text" @click="handleDelete(scope.row)" style="color: red" v-if="dictValueManager_btn_del"><i class="el-icon-delete"></i></el-button>
          </template>
        </el-table-column>
            <el-table-column width="60px" :sortable="true" align="center" label="序号" prop="xh">
          <template  slot-scope="scope">
            <span>{{scope.row.itemorder}}</span>
          </template>
        </el-table-column>
        <el-table-column width="150px"  align="center" label="名称" >
          <template  slot-scope="scope">
            <span>{{scope.row.itemname}}</span>
          </template>
        </el-table-column>
            <el-table-column width="500px" align="center" label="值">
          <template  slot-scope="scope">
            <span>{{scope.row.itemval}}</span>
          </template>
        </el-table-column>
        <el-table-column width="200px" align="center" label="描述">
          <template  slot-scope="scope">
            <span>{{scope.row.itemnote}}</span>
          </template>
        </el-table-column> 
        
      </el-table>
      </div></el-card>
  <el-card class="box-card" v-if="editDictTypeFlag">
  <div slot="header" class="clearfix">
     <span>{{dictDialogTitle}}</span>
  </div>
  <div>
     <!-- 表单提交 -->
     <el-form :model="dictTypeForm" status-icon :rules="dictTypeFormRules" ref="dictTypeForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="目录名称" prop="label">
        <el-input v-model="dictTypeForm.label" placeholder="请输入目录名称">
           
        </el-input>
      </el-form-item>

            <el-form-item label="目录类型" prop="dictype">
           <el-select v-model="dictTypeForm.dictype"  :disabled="dictDialogTitle=='字典目录修改'">
              <el-option value="目录">目录</el-option> 
              <el-option value="通用字典">通用字典</el-option> 
          </el-select>
      </el-form-item>

      <el-form-item label="目录说明" prop="dicnote">
        <el-input v-model="dictTypeForm.dicnote" placeholder="请输入目录说明">
        </el-input>
      </el-form-item>

      <el-form-item>


        <el-button type="primary" @click="handlerDictTypeForm('dictTypeForm')" v-if="this.dictTypeManager_btn_edit">提交</el-button>
        <el-button @click="handleDictTypeCancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div></el-card>
    </div></el-col>
</el-row>

    <!--以下是编辑的弹出框 title="dictValueDialogInfo" -->
  <el-dialog
    :visible.sync="dictValueDialogVisible"
    width="30%"
    center>
    <span slot="title">{{dictValueDialogInfo}}</span>  
    <!-- 表单提交 因为之前 dictValueForm已经被赋值了 所以这里能拿到值-->
    <el-form :model="dictValueForm" :rules="dictValueFormRules" ref="dictValueForm" label-width="100px">
        <!-- 下表中必须存在itemorder属性 否则验证规则将不起作用 -->
        </el-form-item>
            <el-form-item label="序号" prop="itemorder">
            <el-input v-model="dictValueForm.itemorder" type="number" placeholder="请输入序号"></el-input>
        </el-form-item>
        
        <el-form-item label="显示名称"  prop="itemname">
          <el-input v-model="dictValueForm.itemname" placeholder="请输入显示名称"></el-input>
        </el-form-item>
        
        <el-form-item label="值" prop="itemval">
          <el-input v-model="dictValueForm.itemval" placeholder="请输入值"></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="itemnote">
          <el-input v-model="dictValueForm.itemnote" placeholder="请输入描述信息"></el-input>
        </el-form-item>
    </el-form>
    
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDictValueCancel">取 消</el-button>
        <el-button type="primary" @click="handleDictValueSave('dictValueForm')">确 定</el-button>
      </span>

  </el-dialog>



   <!--自定义字典的弹出框 title="dictValueDialogInfo" -->
  <el-dialog
    :before-close='handleDictZdyCancel'
    :visible.sync="dictZdyVisible"
    width="30%"
    center>
    <span slot="title">{{dictValueDialogInfo}}</span>  
    <!-- 表单提交 因为之前 dictValueForm已经被赋值了 所以这里能拿到值 :model="todoColumnszdy"-->
    <el-form  ref="zdyDict" label-width="100px">
        <!-- 下表中必须存在itemorder属性 否则验证规则将不起作用 -->
        <!-- </el-form-item  > -->
            <el-form-item v-for="item in todoColumnszdy" :key="item.label"  :label="item.label"  :prop="item.prop">
               <el-input v-model="item.dicvalue"  :placeholder="item.label"></el-input>
            </el-form-item>
    </el-form>
    
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDictZdyCancel">取 消</el-button>
        <el-button type="primary" @click="handleDictZdySave">确 定</el-button>
      </span>

  </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import uuid from 'node-uuid';
import {
  getTree,
  updateDicType,
  addDicType,
  deleteDicType
} from "@/api/pubserver/dicMain/index";
import { getModlue,getZdyDict,putZdyDict,addZdyDict,delZdyDict } from "@/api/pubserver/dicUsrDefValue/index";
import { getDicListWithP,putObj,addObj,delObj } from "@/api/pubserver/dicItem/index";
import {getByDicCode} from "@/api/pubserver/dicUsrDefField/index";
import {
  page,
  addValueObj,
  delValueObj
} from "@/api/dict/dictValue/index";
import { mapGetters } from "vuex";
export default {
  watch: {
    filterText(val) {
      this.$refs.dictTypeTree.filter(val);
    }
  },
//组件对应的方法
  methods: {
    //删除自定义字典 
    delModule(){
      this.zdyDictValue={};
       var checked=this.$refs.tablezdy.getCheckedProp("id")[0];
          if(checked==null){ //新增
         this.$notify({
            title: "提示信息",
            message: "请选择一条节点信息进行操作。",
            type: "info",
            duration: 2000
          });
      }else{
        //判断当前节点下是否有子菜单 
        if(this.$refs.tablezdy.getCheckedProp().length>1){
           this.$notify({
            title: "提示信息",
            message: "不允许多选操作或该节点下存在子节点，如需删除，请取消多选或删除子节点后操作!",
            type: "error",
            duration: 2000
          });
        }else{
          //进行删除操作
          this.$confirm("此操作将删除字典值, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
                   delZdyDict(checked).then(response=>{
            if(response.status==200){
              this.$notify({
                        title: "成功",
                        message: "删除字典成功",
                        type: "success",
                        duration: 2000
                      });
              //刷新自定义树形字典
             this.getZdyTree({dicCode: this.$refs.tablezdy.data[0].diccode});  
            }else{
              this.$notify({
                        title: "失败",
                        message: "删除字典失败",
                        type: "error",
                        duration: 2000
                      });
            }
          })

          })
     
        }
      }
    },
    //新增自定义字典目录
    addModule(){
      this.zdyDictValue={};
        //啥也不选则是在根节点上进行增加 
        //选中则在节点下进行新增 
        var checked=this.$refs.tablezdy.getCheckedProp("id")[0];
      if(checked==null){ //新增
         this.$notify({
            title: "提示信息",
            message: "未选择节点信息，将在根节点上增加字典值。",
            type: "info",
            duration: 2000
          });
          //diccode为任意一个节点的diccode
          this.zdyDictValue.pid= this.$refs.tablezdy.data[0].diccode
         
          //console.log(this.zdyDictValue.pid+this.zdyDictValue.diccode) 
      }else{
        this.zdyDictValue.pid=checked
      }
      //统一赋值
      this.zdyDictValue.diccode= this.$refs.tablezdy.data[0].diccode
      this.dictValueDialogInfo ="新增字典值";
              //自定义字典的转移 
      this.todoColumnszdy  = JSON.parse(JSON.stringify(this.todoColumns));
      this.dictZdyVisible=true;

    },
    editModule(){//修改自定菜单
     this.zdyDictValue={};
      var checked=this.$refs.tablezdy.getCheckedProp("id")[0];
      if(checked==null){
         this.$notify({
            title: "提示信息",
            message: "请选择一行后操作",
            type: "error",
            duration: 2000
          });
      }else{
           //加载改行的所有数据 并和 修改框的属性进行对应
        //1. 加载该条记录  
        //console.log(checked)
        getZdyDict(checked).then((response) => {
            //this.zdyDict= response.data;
            //展示修改的表格
            this.dictValueDialogInfo ="修改字典值";
              //自定义字典的转移 
            this.todoColumnszdy  = JSON.parse(JSON.stringify(this.todoColumns));
            this.dictZdyVisible=true;
            this.zdyDictValue = response.data;
            this.todoColumnszdy.forEach(element => {
              const vulueColum = element.prop
              element.dicvalue = response.data[vulueColum]
            });
            
            //this.todoColumnszdy = JSON.stringify(this.todoColumnszdy)
            //console.log(this.todoColumnszdy);
        })
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleClick(row) { //编辑传统菜单值
      this.dictValueDialogInfo ="修改字典值";
      this.dictValueDialogVisible = true; //打开修改页面
      const { ...obj } = row; //不定参数
      this.dictValueForm = obj; //绑定通过不定参数进行解绑 让编辑页面的表单数据独立 不污染整个数据结构
      //this.dictValueForm = row 我们一定不能采用这种方式去写 因为在修改页面中如果直接绑定row 那么编辑页面上字段的修改会同步渲染表单数据造成污染 
    },
    handleDelete(row) {
      this.$confirm("此操作将删除字典值, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delObj(row.itemid).then(() => {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 2000
          });
           //删除后没有刷新表格 而是剔除了改行数据（假刷新）
          const index = this.dictValueTableData.indexOf(row);//查找对象所在的索引位置
          this.dictValueTableData.splice(index, 1);//删除下标所在的对象 完成假刷新
        });
      });
    },
    // 这个方法用来搜索 实际上是用来刷新表格
    handleDictValueFilter() {
      this.listDictValueQuery.typeId = this.currentDictTypeId;
       const query = {
              dicCode: this.currentDictTypeId
            };
      getDicListWithP(query).then(response => {
              // this.fomeData_is_show = true; //展示详情
              // this.todo_item_show= false;//隐藏自定义card
              this.dictValueTableData = response.data; //获取到的数据详情 赋值给显示的表单数据对象
            });
    },
    handleDictValueSave(formName) { //保存和更新都是进的这一个方法
      //传入的升级上是编辑的refs 名称 为了方便通过该名称拿到对象
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          //判断是不是没有主键 如果有主键 说明是更新操作 
          if (this.dictValueForm.itemid !== undefined) {  //更新
            //调用更新的方法
            putObj('no_use_sbt', this.dictValueForm).then(() => {
              //遇到异常会被捕捉 所以方法体内直接使用处理成功的逻辑就好
              this.editDictTypeFlag = false;
              this.handleDictValueFilter();
              this.$notify({
                title: "成功",
                message: "修改字典值成功",
                type: "success",
                duration: 2000
              });
              this.dictValueDialogVisible = false;//关闭修改页面
            });
          } else { //如果没有 调用的是新增保存
          //console.log(this.dictValueForm)
           //填充diccode属性 就是当前的currentDictTypeId
             this.dictValueForm.diccode = this.currentDictTypeId;
             this.dictValueForm.itemid = uuid()
            addObj(this.dictValueForm).then(() => {
              this.editDictTypeFlag = false;
              this.handleDictValueFilter();
              this.$notify({
                title: "成功",
                message: "添加字典成功",
                type: "success",
                duration: 2000
              });
              this.dictValueDialogVisible = false;
            });
          }
        } else {//验证失败 返回false 验证框架会自动标注所有验证失败的原因
          return false;
        }
      });
    },
    handleDictValueCreate() {
      if (this.currentDictTypeId === undefined) {
        this.$notify({
          title: "失败",
          message: "请先选择字典目录",
          type: "warning",
          duration: 2000
        });
      } else {
        this.dictValueDialogInfo ="新建字典";
        this.dictValueDialogVisible = true;
        this.resetDictValueForm();//弹出空数据编辑表格
      }
    },

    handleDictZdyCancel() { //取消保存后 
      //alert('点击了关闭')
      this.dictZdyVisible= false; //重置表格数据,虽然用户在点击编辑后 form会被重新赋值 ，但为了保险 我们还是清空下值比较好
      this.todoColumnszdy=[];//清空todo列表
      this.zdyDictValue={};//清空当前值列表
    },
    handleDictZdySave(){
      //判断是否有主键  如果有说明是更新 如果无 说明是新增
      if(this.zdyDictValue.id!=null){ //更新
        
         //更新
         //for循环将zdyDictValue进行重新赋值 
        this.todoColumnszdy.forEach(element => {
                const vulueColum = element.prop
                this.zdyDictValue[vulueColum] = element.dicvalue;
              });
        //console.log(this.zdyDictValue)     
        putZdyDict(this.zdyDictValue.id,this.zdyDictValue).then(response=>{
            if(response.status==200){
              this.$notify({
                        title: "成功",
                        message: "修改成功",
                        type: "success",
                        duration: 2000
                      });
              //刷新自定义树形字典
             this.getZdyTree({dicCode:this.zdyDictValue.diccode});  
            }else{
              this.$notify({
                        title: "失败",
                        message: "修改失败",
                        type: "error",
                        duration: 2000
                      });
            }

            //关闭dialog
            this.dictZdyVisible=false
            
        })
      }else{
        //新增  
        //构造新增的参数 
        this.zdyDictValue.id=uuid(),
        this.todoColumnszdy.forEach(element => {
                const vulueColum = element.prop
                this.zdyDictValue[vulueColum] = element.dicvalue;
              });
        //console.log(this.zdyDictValue)    
        addZdyDict(this.zdyDictValue).then(response=>{
          if(response.status==200){
              this.$notify({
                        title: "成功",
                        message: "新增成功",
                        type: "success",
                        duration: 2000
                      });
              //刷新自定义树形字典
             this.getZdyTree({dicCode:this.zdyDictValue.diccode});  
            }else{
              this.$notify({
                        title: "失败",
                        message: "新增失败",
                        type: "error",
                        duration: 2000
                      });
            }

            //关闭dialog
            this.dictZdyVisible=false
        })
      }      
     
    },

    handleDictValueCancel() { //取消保存后 
      this.dictValueDialogVisible = false;//关闭弹出框
      //console.log(this.dictValueForm)
      this.resetDictValueForm(); //重置表格数据,虽然用户在点击编辑后 form会被重新赋值 ，但为了保险 我们还是清空下值比较好
      //console.log(this.dictValueForm)
    },
    handleDictTypeCancel(){//目录取消保存后
      this.editDictTypeFlag = false;//关闭
      this.resetDictTypeForm();//重置字典修改详情
    },
    handlerDictTypeForm(formName) {   //验证
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          //console.log(this.dictTypeForm)
          if(this.dictTypeForm.id!== undefined){//更新
          this.dictTypeForm.diccode=this.dictTypeForm.id;
                    this.dictTypeForm.dicname=this.dictTypeForm.label;
                    updateDicType(this.dictTypeForm.id, this.dictTypeForm).then(() => {
                      this.editDictTypeFlag = false;
                      this.initTreeData();
                      this.$notify({
                        title: "成功",
                        message: "修改成功",
                        type: "success",
                        duration: 2000
                      });
                    });
          }else{
            //构造保存参数  
            const query = {
              diccode:uuid(),
              dicname:this.dictTypeForm.label,
              dicnote:this.dictTypeForm.dicnote,
              dicstate:'启用',
              dictype:this.dictTypeForm.dictype,
              pid:this.dictTypeForm.parentId,
              tablename:'DIC_ITEM'
            }
           // console.log(query)
            addDicType(query).then(() => {
                this.editDictTypeFlag = false;
                      this.initTreeData();
                      this.$notify({
                        title: "成功",
                        message: "新增目录成功",
                        type: "success",
                        duration: 2000
                });
            })

          }
         
        
        } else {
          return false;
        }
      });
    },
    append(node, data) {
      const { ...obj } = data; //不定参数
      this.dictTypeForm = obj;
      this.dictDialogTitle="新增菜单目录"//设置标题
      //console.log(this.dictTypeForm)
      //this.resetDictTypeForm();//重置表单内容
      this.dictTypeForm.parentId=this.dictTypeForm.id;//父类id转移（仅用于新增）
      this.dictTypeForm.id=undefined;
      this.dictTypeForm.dictype="";
      this.dictTypeForm.label="";
      this.dictTypeForm.dicnote="";
      this.editDictTypeFlag = true;//打开flag页面
      // console.log(this.dictTypeForm)
     },
    remove(node, data) {
      if (data.children.length > 0) {
        this.$notify({
          title: "失败",
          message: "删除失败，请删除该目录子节点后删除",
          type: "warning",
          duration: 2000
        });
        return;
      }
      //查询是否有子节点 这里部分是否为自定义 两个一起查 
     // console.log(data);
        if (data.tablename == "DIC_USRDEF_VALUE") {
           const query = {
             dicCode: data.id,
          };
          getModlue(query).then(response => {
            if(response.data!=null&&response.data.length>0){
                this.$notify({
                  title: "失败",
                  message: "删除失败，该项有字典值！",
                  type: "error",
                  duration: 2000
                });
                return;
            }else{
              this.removeDo(node, data);
            }
          })
        }else{
          //console.log(data.id)
          const query = {
              dicCode: data.id
            };
            getDicListWithP(query).then(response=>{
             // console.log(response)
              if(response.data!=null&&response.data.length>0){
                              this.$notify({
                                title: "失败",
                                message: "删除失败，该项有字典值！",
                                type: "error",
                                duration: 2000
                              });
                              return;
                          }else{
              this.removeDo(node, data);
            }
          })
        }
    },

    removeDo(bode,data){
      this.$confirm("此操作将删除该字典目录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteDicType(data.id).then(response=>{
        this.$notify({
            title: "成功",
            message: "删除字典目录成功！",
            type: "success",
            duration: 2000
          });
        this.initTreeData();
        this.dictValueDialogVisible=false;
      })
      });
      
    },

    edit(node, data) {//修改目录字典
      this.editDictTypeFlag = true; //字典修改的详情页
      //设置标题 
      this.dictDialogTitle="字典目录修改"
       const { ...obj } = data; //不定参数
      this.dictTypeForm = obj;
    },
    resetDictTypeForm() {
      this.dictTypeForm = {   
      };
    },
    resetDictValueForm() { //清空表单数据
      this.dictValueForm = {
       
      };
    },
    //树形结构中的节点菜单
    renderContent(h, { node, data }) {
      return (
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
            <span>{node.label}</span>
          </span>
          <span> 
          {this.dictTypeManager_btn_add &&data.dictype=="目录"? (
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
                on-click={() => this.edit(node, data)}
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
                on-click={() => this.remove(node, data)}
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
    initTreeData() {
      //加载数据
      getTree().then(data => {
        this.dictTypeData = data.data;
      });
    },

    //获取自定义的字典树
    getZdyTree(query){
            function getModlue_f(){
          return getModlue(query)
        } 
        function getByDicCode_f(){
          return getByDicCode(query)
        } 
        axios.all([getModlue_f(), getByDicCode_f()]).then(axios.spread((T,R)=>{ //一定要加大括号代表多行执行
       
            this.todoColumns=[];
            for (var field of R.data) {
              //拿出属性给数组赋值
              var row = {label:field.fieldname,prop:field.columnval, minWidth: '200px',sortnum:field.sortnum}
              this.todoColumns.push(row);
            }
           //排序后返回
           this.todoColumns.sort((a,b)=>{ return a.sortnum-b.sortnum});
            this.todoData = T.data
        }

        ));
    },
    getNodeData(data) {
      //alert("aa")
      //点击字典目录的时候 给当前行进行赋值 

      //this.dictTypeForm.label= data.label
      //自己的逻辑
      this.currentDictTypeId = data.id//当前字典所在的目录节点的diccode
      this.currentDicItem = data;
      //if (this.currentDicItem.children.length == 0) {
        //如果是0 则发送拿数据的请求
      if (data.dictype!= "目录") {
        
        //1.情况一 不需要到item中拿数据 可能是去DIC_USRDEF_VALUE表中拿数据
        if (this.currentDicItem.tablename == "DIC_USRDEF_VALUE") {
          // 发送请求获取菜单树的数据  

          
          
          const query = {
             dicCode: this.currentDictTypeId
          };
          
        
          // getModlue(query).then(response=>{
          //   this.todoData = response.data;
          // })
          // //获取字典值  
          // getByDicCode(query)

        this.getZdyTree(query);
        
  
           this.fomeData_is_show = false; //传统card不展示
           this.todo_item_show= true;//自定义card展示
        }else{
          //  2.情况二 需要在item中拿数据
            const query = {
              dicCode: this.currentDictTypeId
            };
            // 返回值
            getDicListWithP(query).then(response => {
              this.fomeData_is_show = true; //展示详情
              this.todo_item_show= false;//隐藏自定义card
              this.dictValueTableData = response.data; //获取到的数据详情 赋值给显示的表单数据对象
            });
        }
      } else {
        this.fomeData_is_show = false; //不展示右侧详情
        this.todo_item_show= false;//自定义card也不展示
      }
    }
  },
  created() {
    this.initTreeData(); //这个钩子用于组件初始化的时候加载组件
    // 加载树  从全局对象中查看是否有以下该类按钮的权限
    this.dictTypeManager_btn_edit = this.elements["dictTypeManager:btn_edit"];
    this.dictTypeManager_btn_del = this.elements["dictTypeManager:btn_del"];
    this.dictTypeManager_btn_add = this.elements["dictTypeManager:btn_add"];
    this.dictValueManager_btn_edit = this.elements["dictValueManager:btn_edit"];
    this.dictValueManager_btn_del = this.elements["dictValueManager:btn_del"];
    this.dictValueManager_btn_add = this.elements["dictValueManager:btn_add"];
  },
  computed: {
    ...mapGetters(["elements"])
  },
  data() {
    return {
      zdyDictValue:{},//自定义菜单的保存类
      todoColumnszdy:[],//自定义字典值
      dictZdyVisible:false,//自定义菜单详情界面（修改增加等）是否展示
      //下面是各种资源类型 用来控制是否显示相应的按钮(颗粒度的控制)
      dictValueManager_btn_edit: false,
      dictValueManager_btn_del: false,
      dictValueManager_btn_add: false,
      dictTypeManager_btn_edit: false,
      dictTypeManager_btn_del: false,
      dictTypeManager_btn_add: false,
      dictDialogTitle:'',//修改字典值的title
      dicnote:'',//字典的note介绍
      filterText: "",
      dictValueDialogVisible: false, //编辑菜单弹出框是否可见
      dictValueDialogInfo:'',//编辑菜单的弹出框提示信息
      editDictTypeFlag: false,
      currentDictType: {}, //废弃 用于保存item数据的数组
      currentDictTypeId: undefined, //my main表中的diccode 代表当前所在的目录id
      currentDicItem: {}, //my item数据的数组
      fomeData_is_show: false, //用于控制右上侧的默认表格是否展示
      todo_item_show: false,//自定义item的kard 默认不展示
      dictTypeForm: {  //目录的表单数据
        dictype:"",//目录类型
        dicnote: "",
        id:"",//目录id对应diccode
        label:""//目录名称
      },
      listDictValueQuery: {
        labelDefault: undefined,
        typeId: undefined
      },
      dictValueForm: {  //字典值的form表单数据
       itemname : undefined,    //字典名称     
       itemval : undefined,     //字典值
       itemorder : undefined    //字典排序
      },
      dictValueFormRules: {
        itemorder: [
            {
              required: true,
              message: '请输入序号',
              trigger: 'blur',
            },
           
          ] ,  
          itemname: [
              {
                required: true,
                message: '请输入显示名称',
                trigger: 'blur'
              },
              {
                min: 3,
                max: 20,
                message: '长度在 3 到 20 个字符',
                trigger: 'blur'
              }
            ],
          itemval: [
              {
                required: true,
                message: '请输入实际值',
                trigger: 'blur'
              }
            ],   itemnote: [
              {
                required: true,
                message: '请输入描述',
                trigger: 'blur'
              }
            ], 
      },
      dictTypeFormRules: {
        
        label: [
          {
            required: true,
            message: "请输入目录名称",
            trigger: "blur"
          }
        ],
         dictype: [
          {
            required: true,
            message: "请选择目录类型",
            trigger: "blur"
          }
        ],
         dicnote:[
          {
            required: false,
            message: "建议输入字典说明",
            trigger: "blur"
          }
        ],
      },
      dictTypeData: [], //用来存放树形节点的数据  
      todoData: [], //用来存放自定义菜单树的数据
      todoTreedefaultProps: {
        children: "children",
        label: "value1"
      },
      defaultProps: {
        children: "children",
        label: "label"
      },
      dictValueTableData: [], //表单数据详情
      // 组件树表格的详情配置
      props: {
          stripe: false,
          border: false,
          showHeader: true,
          showSummary: false,
          showRowHover: true,//高亮显示
          showIndex: false,
          treeType: true,
          isFold: true,
          expandType: false,
          selectionType: true,
        },
        
      // 组件树的colum详情  
      todoColumns:
      [
          {
            label: '', //展示的值
            prop: 'value1', // 对应的数据值
            width: '200px',
          },
          {
            label: '',
            prop: 'value2',
          },
          {
            label: '',
            prop: 'value3',
          },
          {
            label: '',
            prop: 'value4',
            minWidth: '200px',
          },
          {
            label: '',
            prop: 'value5',
            minWidth: '200px',
          },
          {
            label: '',
            prop: 'value6',
            minWidth: '200px',
          },
          {
            label: '',
            prop: 'value7',
            minWidth: '200px',
          },
           {
            label: '',
            prop: 'value8',
            minWidth: '200px',
          },
           {
            label: '',
            prop: 'value9',
            minWidth: '200px',
          },
          {
            label: '',
            prop: '',
            minWidth: '200px',
          },
        ],  
    };
  }
};
</script>

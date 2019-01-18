<template>
  <div>
    <div>
      <el-row>
        <el-col :span="24">
          <el-button-group>
            <div align="right">
            </div>
          </el-button-group>
        </el-col>
        <el-col :span="24">
          <div class='app-container'>
            <el-form :inline='true' ref='form2' :model='listQuery' label-width='100px'>
              <el-form-item label="受理编号">
                <el-input v-model="listQuery.slbh" placeholder="受理编号"></el-input>
              </el-form-item>
              <el-form-item label="业务类型">
                <el-select v-model='listQuery.ywlx' filterable placeholder='业务类型'>
                  <el-option v-for='(item,index) in contentlist' :value='item.typeName' :key='index'>{{item.typeName}}</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="不动产证号">
                <el-input v-model="listQuery.bdczh" placeholder="不动产证号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-tooltip class="item" effect="dark" content="清空" placement="top-start">
                  <el-button class="filter-item" type="info" icon="el-icon-tickets" @click="cleanFilter">清空</el-button>
                </el-tooltip>
              </el-form-item>
              <el-form-item>
                <el-tooltip class="item" effect="dark" content="搜索" placement="top-start">
                  <el-button icon="el-icon-search" @click='fetchData' type="primary"></el-button>
                </el-tooltip>
              </el-form-item>
              <el-form-item>
                <el-tooltip class="item" effect="dark" content="收件" placement="top-start">
                  <el-button type="primary" icon="plus" @click="dialogSJDVisible = true">收件</el-button>
                </el-tooltip>
              </el-form-item>
            </el-form>
            <el-table :data='sjList' v-loading.body='listLoading' width='100%' element-loading-text='Loading' border fit highlight-current-row>
              <el-table-column align='center' label='受理编号'>
                <template slot-scope='scope'>
                  <span>{{scope.row.docId}}</span>
                </template>
              </el-table-column>
              <el-table-column align='center' label='业务类型'>
                <template slot-scope='scope'>
                  <span>{{scope.row.businessTypeName}}</span>
                </template>
              </el-table-column>
              <el-table-column align='center' label='不动产证号'>
                <template slot-scope='scope'>
                  {{scope.row.immovableNum}}
                </template>
              </el-table-column>
              <el-table-column align='center' label='接收时间'>
                <template slot-scope='scope'>
                  {{scope.row.crtTime}}
                </template>
              </el-table-column>
            </el-table>
            <el-pagination align='center' @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='nextPage' :page-sizes='[5, 10, 15, 20]' :page-size='listQuery.limit' layout='total, sizes, prev, pager, next, jumper' :total='total'>
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>

    <div>
      <el-dialog title="收件" :visible.sync="dialogSJDVisible" width="80%" center append-to-body>
        <el-steps :active='active' finish-status='success'>
          <el-step title='收件' @click.native='Steps()'></el-step>
          <el-step title='附件' @click.native='Steps2()'></el-step>
          <el-step title='打印/预览' @click.native='Steps3()'></el-step>
        </el-steps>
        <div v-if="dialogSJVisible">
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" labelWidth="20px" class="demo-dynamic">
            <el-form-item>
              <el-form :inline="true" class="demo-form-inline" style="width: 100%">
                <el-form-item label="业务类型">
                  <el-select v-model="ywlx" placeholder="请选择" filterable >
                    <el-option v-for='(item,index) in contentlist' :value='item.typeName' :key='index'>{{item.typeName}}</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="坐落">
                  <el-input v-model="zl" placeholder="不动产坐落"></el-input>
                </el-form-item>
                <el-form-item label="不动产证号">
                  <el-input v-model="bdczh" placeholder="不动产证号"></el-input>
                </el-form-item>
                <el-form-item>
                  <div align="right" style="padding-right: 200px">
                    <el-button type="text" @click="">扫描</el-button>
                  </div>
                </el-form-item>
              </el-form>
            </el-form-item>
            <hr>
            <el-form-item>
              <label>权利人信息</label>
            </el-form-item>
            <el-form-item v-for="(qlr, index) in dynamicValidateForm.qlrs" :key="qlr.key">
              <el-form :inline="true" :model="qlr" class="demo-form-inline" style="width: 100%">
                <el-form-item label="权利人名称">
                  <el-input v-model="qlr.qlrmc" placeholder="权利人名称"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                  <el-input v-model="qlr.qlrsfzh" placeholder="身份证号"></el-input>
                </el-form-item>
                <el-form-item label="证件类型">
                  <el-select v-model="qlr.qlrzjlx" placeholder="请选择" filterable >
                    <el-option v-for="item in zjlx" :key="item.orderNo" :label="item.cardTypeName" :value="item.orderNo"></el-option>
                  </el-select>
                  <!--<el-input v-model="qlr.qlrzjlx" placeholder="证件类型"></el-input>-->
                </el-form-item>
                <el-form-item>
                  <el-button @click.prevent="removeQlr(qlr)">删除</el-button>
                  <el-button  type="primary" @click="insertQLR(qlr,index)">扫证</el-button>
                  <el-button @click="addQlr">增加</el-button>
                </el-form-item>
              </el-form>
            </el-form-item>
            <hr>
            <el-form-item>
              <label>权利人代理人信息</label>
            </el-form-item>
            <el-form-item v-for="(qlrdlr, index) in dynamicValidateForm.qlrdlrs" :key="qlrdlr.key" >
              <el-form :inline="true" :model="qlrdlr" class="demo-form-inline">
                <el-form-item label="代理人名称">
                  <el-input v-model="qlrdlr.qlrdlrmc" placeholder="权利人代理人名称"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                  <el-input v-model="qlrdlr.qlrdlrsfzh" placeholder="权利人代理人身份证号"></el-input>
                </el-form-item>
                <el-form-item label="证件类型">
                  <el-select v-model="qlrdlr.qlrdlrzjlx" placeholder="请选择" filterable >
                    <el-option v-for="item in zjlx" :key="item.orderNo" :label="item.cardTypeName" :value="item.orderNo"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button @click.prevent="removeQlrdlr(qlrdlr)">删除</el-button>
                  <el-button  type="primary" @click="insertQLRDLR(qlrdlr,index)" >扫证</el-button>
                  <el-button @click="addQlrdlr">增加</el-button>
                </el-form-item>
              </el-form>
            </el-form-item>
            <hr>
            <el-form-item>
              <label>义务人信息</label>
            </el-form-item>
            <el-form-item v-for="(ywr, index) in dynamicValidateForm.ywrs" :key="ywr.key" >
              <el-form :inline="true" :model="ywr" class="demo-form-inline">
                <el-form-item label="义务人名称">
                  <el-input v-model="ywr.ywrmc" placeholder="义务人名称"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                  <el-input v-model="ywr.ywrsfzh" placeholder="身份证号"></el-input>
                </el-form-item>
                <el-form-item label="证件类型">
                  <el-select v-model="ywr.ywrzjlx" placeholder="请选择" filterable >
                    <el-option v-for="item in zjlx" :key="item.orderNo" :label="item.cardTypeName" :value="item.orderNo"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button @click.prevent="removeYwr(ywr)">删除</el-button>
                  <el-button type="primary" @click="insertYWR(ywr,index)">扫证</el-button>
                  <el-button @click="addYwr">增加</el-button>
                </el-form-item>
              </el-form>
            </el-form-item>
            <hr>
            <el-form-item>
              <label>义务人代理人信息</label>
            </el-form-item>
            <el-form-item v-for="(ywrdlr, index) in dynamicValidateForm.ywrdlrs" :key="ywrdlr.key" >
              <el-form :inline="true" :model="ywrdlr" class="demo-form-inline">
                <el-form-item label="代理人名称">
                  <el-input v-model="ywrdlr.ywrdlrmc" placeholder="义务人代理人名称"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                  <el-input v-model="ywrdlr.ywrdlrsfzh" placeholder="义务人代理人身份证号"></el-input>
                </el-form-item>
                <el-form-item label="证件类型">
                  <el-select v-model="ywrdlr.ywrdlrzjlx" placeholder="请选择" filterable >
                    <el-option v-for="item in zjlx" :key="item.orderNo" :label="item.cardTypeName" :value="item.orderNo"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button @click.prevent="removeYwrdlr(ywrdlr)">删除</el-button>
                  <el-button type="primary" @click="insertYWRDLR(ywrdlr,index)">扫证</el-button>
                  <el-button @click="addYwrdlr">增加</el-button>
                </el-form-item>
              </el-form>
            </el-form-item>
          </el-form>

          <hr>
          <el-form>
            <el-form-item>
              <label>通知人信息</label>
            </el-form-item>
            <el-form-item>
              <el-form :inline="true" :model="inform" class="demo-form-in;line" style="padding-left: 50px">
                <el-form-item label="(权利人指定)姓名">
                  <el-input v-model="inform.name" placeholder="姓名" style="width: 450px"></el-input>
                </el-form-item>
                <el-form-item label="电话号码">
                  <el-input v-model="inform.tel" placeholder="电话号码" style="width: 450px"></el-input>
                </el-form-item>
              </el-form>
              <el-form :inline="true" :model="inform" class="demo-form-in;line" style="padding-left: 50px">
                <el-form-item label="(义务人指定)姓名">
                  <el-input v-model="inform.ywrName" placeholder="姓名" style="width: 450px"></el-input>
                </el-form-item>
                <el-form-item label="电话号码">
                  <el-input v-model="inform.ywrTel" placeholder="电话号码" style="width: 450px"></el-input>
                </el-form-item>
              </el-form>
            </el-form-item>
          </el-form>
          <div align="right">
            <el-button type="primary" style="margin-top: 12px;" @click="nextStep">下一步</el-button>
          </div>
        </div>
        <div v-if="dialogFJVisible">
          <div style='padding-left: 200px;padding-right: 200px' align='center'>
            <el-tree :data="lcfj" node-key="id" default-expand-all :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span @click="nodeClick(data)">{{ node.label }}</span>
              <el-popover placement="right" trigger="click">
                <span v-if="data.sign > '20'" slot="reference"><i class="el-icon-picture"></i></span>
                <img :src='data.picture' append-to-body/>
              </el-popover>
              <span>
                <el-button type="text" @click="() => append(data)" v-if="data.sign < '21'">扫描</el-button>
                <el-button type="danger" icon="el-icon-delete" circle @click="() => remove(node, data)" v-if="data.sign > '20'">删除</el-button>
              </span>
            </span>
            </el-tree>
          </div>
          <div align="right">
            <el-button type="primary" style="margin-top: 12px;" @click="nextStep">下一步</el-button>
          </div>
        </div>
        <div v-if="dialogPrintVisible" style="margin-top: 30px">
          <div align="right">
            <!--<el-button type='primary' @click="previewT">预览</el-button>-->
            <el-button type='primary' @click="printContent">打印</el-button>
            <el-button type="primary" style="margin-top: 12px;" @click="previewSubmit">提交</el-button>
          </div>
          <div v-if="previewTable">
            <div style="padding-top: 20px" id="previewPrint">
              <table border="0" align="center" width="100%">
                <tr>
                  <td align="center"><img id="barcode"/></td>
                  <td rowspan="2"><div id="qrcode" ref="qrcode"></div></td>
                </tr>
                <tr>
                  <td align="center"><h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;宿迁市不动产登记收件依据（存根）</h3></td>
                </tr>
              </table>
              <h4>业务编号:{{sjdh}}</h4>
              <table width="100%" class="previewTable" style="border-collapse:collapse;" border="1" align="center">
                <tr style="height: 30px;">
                  <td width="10%" colspan="2" align="center"><span>不动产权证书</span></td>
                  <td width="50%" colspan="2"><span>{{previewXgzh}}</span></td>
                </tr>
                <tr style="height: 30px">
                  <td width="10%" colspan="2" align="center"><span>权利人</span></td>
                  <td colspan="2"><span>{{previewQlr}}</span></td>
                </tr>
                <tr style="height: 30px">
                  <td width="10%" align="center"><span>通知人</span></td>
                  <td><span>{{inform.name}}</span></td>
                  <td width="15%" align="center"><span>联系电话</span></td>
                  <td><span>{{inform.tel}}</span></td>
                </tr>
                <tr style="height: 30px">
                  <td width="10%" colspan="2" align="center"><span>义务人</span></td>
                  <td colspan="2"><span>{{previewYwr}}</span></td>
                </tr>
                <tr style="height: 30px">
                  <td width="10%" align="center"><span>通知人</span></td>
                  <td><span>{{inform.ywrName}}</span></td>
                  <td width="15%" align="center"><span>联系电话</span></td>
                  <td><span>{{inform.ywrTel}}</span></td>
                </tr>
                <tr style="height: 100px">
                  <td width="10%" align="center"><span>提供的材料</span></td>
                  <td colspan="3"><span>{{ previewFJ }}</span></td>
                </tr>
              </table>
              <br>
              <span>收件人：</span><span>{{sjr}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>收件日期：</span><span>{{sjrq}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>承诺日期：</span>&nbsp;<span>自收件之日起三个工作日内办结</span>
              <br>
              <br>
              <hr>
              <br>
              <table border="0" align="center" width="100%">
                <tr>
                  <td align="center"><img id="barcode2"/></td>
                  <td rowspan="2"><div id="qrcode2" ref="qrcode2" ></div></td>
                </tr>
                <tr>
                  <td align="center"><h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;宿迁市不动产登记收件依据（领证凭据）</h3></td>
                </tr>
              </table>

              <h4>业务编号:{{sjdh}}</h4>
              <table width="100%" class="previewTable" style="border-collapse:collapse;" border="1" align="center">
                <tr style="height: 30px;">
                  <td width="10%" colspan="2" align="center"><span>不动产权证书</span></td>
                  <td width="50%" colspan="2"><span>{{previewXgzh}}</span></td>
                </tr>
                <tr style="height: 30px">
                  <td width="10%" colspan="2" align="center"><span>权利人</span></td>
                  <td colspan="2"><span>{{previewQlr}}</span></td>
                </tr>
                <tr style="height: 30px">
                  <td width="10%" align="center"><span>通知人</span></td>
                  <td><span>{{inform.name}}</span></td>
                  <td width="15%" align="center"><span>联系电话</span></td>
                  <td><span>{{inform.tel}}</span></td>
                </tr>
                <tr style="height: 30px">
                  <td width="10%" colspan="2" align="center"><span>义务人</span></td>
                  <td colspan="2"><span>{{previewYwr}}</span></td>
                </tr>
                <tr style="height: 30px">
                  <td width="10%" align="center"><span>通知人</span></td>
                  <td><span>{{inform.ywrName}}</span></td>
                  <td width="15%" align="center"><span>联系电话</span></td>
                  <td><span>{{inform.ywrTel}}</span></td>
                </tr>
                <tr style="height: 100px">
                  <td width="10%" align="center"><span>提供的材料</span></td>
                  <td colspan="3"><span>{{ previewFJ }}</span></td>
                </tr>
              </table>
              <br>
              <span>收件人：</span><span>{{sjr}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>收件日期：</span><span>{{sjrq}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>承诺日期：</span>&nbsp;<span>自收件之日起三个工作日内办结</span>
            </div>
          </div>
        </div>
      </el-dialog>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%" append-to-body>
        <span>确认提交?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sjSubmit">确 定</el-button>
        </span>
      </el-dialog>

    </div>
  </div>

</template>

<script>
  import ElFormItem from 'element-ui/packages/form/src/form-item.vue';
  import ElButton from 'element-ui/packages/button/src/button.vue';
  import ElRow from 'element-ui/packages/row/src/row';
  import ElForm from 'element-ui/packages/form/src/form.vue';
  import ElDialog from "element-ui/packages/dialog/src/component.vue";
  import ElCol from "element-ui/packages/col/src/col";
  import QRCode from 'qrcodejs2'

  let sign = 1000;
  let pictureId = 1;

  export default {
    name: 'file',
    components: {
      QRCode,
      ElCol,
      ElDialog,
      ElForm,
      ElRow,
      ElButton,
      ElFormItem},
    data(){
      return{
        active: 0,
        total: 0,
        submitTabble: false,
        printTable: false,
        previewTable: false,
        dialogVisible: false,
        dialogSJDVisible: false,
        dialogSJVisible: true,
        dialogFJVisible: false,
        dialogPrintVisible: false,
        pictureVisible: false,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 5,
          slbh:'',
          ywlx:'',
          bdczh:''
        },
        sjList: [],
        ywlx: '',
        zl:'',
        bdczh:'',
        contentlist: [],
        dynamicValidateForm: {
          qlrs: [{
            qlrmc: '',
            qlrsfzh: '',
            qlrzjlx: ''
          }],
          qlrdlrs: [{
            qlrdlrmc: '',
            qlrdlrsfzh: '',
            qlrdlrzjlx: ''
          }],
          ywrs: [{
            ywrmc: '',
            ywrsfzh: '',
            ywrzjlx: ''
          }],
          ywrdlrs: [{
            ywrdlrmc: '',
            ywrdlrsfzh: '',
            ywrdlrzjlx: ''
          }]
        },
        zjlx: [],
        inform: {
          name: '',
          tel: '',
          ywrName: '',
          ywrTel: ''
        },
        lcfj: [],


        certificate: [],
        fjs: [],
        pictureBase: '',
        attachmentsPathBase: '',
        tableData3: [],
        multipleSelection: [],
        sjr: '',
        sjrq: null,
        previewQlr: '',
        previewYwr: '',
        previewXgzh: '',
        previewZl: '',
        previewFJ: '',
        nextPage: 1,
        pageSize: 5
      }
    },
    created() {
      this.getYWLX();
      this.getZJLX();
      this.fetchData();
    },

    methods: {
      //获取所有收件记录&查询收件记录
      fetchData() {
        this.$http.post('http://localhost:8081/api/receiptDoc/getReceiptDocByPage'
            ,{page:this.nextPage,limit:this.pageSize,docId:this.listQuery.slbh,businessTypeName:this.listQuery.ywlx,immovableNum:this.listQuery.bdczh}
            ,{emulateJSON:true}).then( response => {
              if(response.body.status == 200){
                const data = response.body.data;
                this.sjList = data.rows;
                this.total = data.total;
                this.listLoading = false;
              }else {
                const message = response.body.message;
                this.$notify.error({
                  title: '提示',
                  message: message
                });
              }
        });
      },
      //清空搜索条件
      cleanFilter(){
        this.listQuery= {
          page: 1,
          limit: 5,
          slbh:'',
          ywlx:'',
          bdczh:''
        }
      },
      //获取业务类型
      getYWLX() {
        this.$http.get('http://localhost:8081/api/businessType/getAllBusinessType').then(response => {
          if(response.body.status == 200){
            this.contentlist = response.body.data.rows;
          }else {
            const message = '证件类型获取失败';
            this.$notify.error({
              title: '提示',
              message: message
            });
          }
        })
      },
      //获取证件类型
      getZJLX(){
        this.$http.get('http://localhost:8081/api/cardType/getCardTypeList').then(response => {
          if(response.body.status == 200){
            this.zjlx = response.body.data.rows;
          }else {
            const message = '证件类型获取失败';
            this.$notify.error({
              title: '提示',
              message: message
            });
          }
        })
      },
      //删除权利人
      removeQlr(item) {
        const index = this.dynamicValidateForm.qlrs.indexOf(item)
        if (index !== -1 && index >= 1) {
          this.dynamicValidateForm.qlrs.splice(index, 1)
        }
      },
      //添加权利人表单
      addQlr() {
        this.dynamicValidateForm.qlrs.push({
          qlrmc: '',
          qlrsfzh: '',
          key: Date.now()
        });
      },
      //读证填入权利人表单
      insertQLR(qlr, index) {
        this.$http.jsonp('http://localhost/ReadCard/ReadIDCard')
          .then(resp => {
            const response = resp.body
            //console.log("response:"+response)
            const res = response.toString().substr(1,response.length-2).replace(/\\/g,"")
            //console.log("res:"+res)
            const re = JSON.parse(res)
            //console.log(re)
            qlr.qlrmc = re.Name;
            qlr.qlrsfzh = re.IDCardNo;
            qlr.qlrzjlx = '1';
          });
      },
      //删除权利人代理人
      removeQlrdlr(item) {
        const index = this.dynamicValidateForm.qlrdlrs.indexOf(item)
        if (index !== -1 && index >= 1) {
          this.dynamicValidateForm.qlrdlrs.splice(index, 1)
        }
      },
      //添加权利人代理人表单
      addQlrdlr() {
        this.dynamicValidateForm.qlrdlrs.push({
          qlrdlrmc: '',
          qlrdlrsfzh: '',
          key: Date.now()
        });
      },
      //读证填入权利人代理人表单
      insertQLRDLR(qlrdlr, index) {
        this.$http.jsonp('http://localhost/ReadCard/ReadIDCard')
          .then(resp => {
            const response = resp.body
            //console.log("response:"+response)
            const res = response.toString().substr(1,response.length-2).replace(/\\/g,"")
            //console.log("res:"+res)
            const re = JSON.parse(res)
            //console.log(re)
            qlrdlr.qlrdlrmc = re.Name;
            qlrdlr.qlrdlrsfzh = re.IDCardNo;
            qlrdlr.qlrdlrzjlx = '1';
          });
      },
      //删除义务人
      removeYwr(item) {
        const index = this.dynamicValidateForm.ywrs.indexOf(item)
        if (index !== -1 && index >= 1) {
          this.dynamicValidateForm.ywrs.splice(index, 1)
        }
      },
      //添加义务人表单
      addYwr() {
        this.dynamicValidateForm.ywrs.push({
          ywrmc: '',
          ywrsfzh: '',
          key: Date.now()
        });
      },
      //读证填入义务人表单
      insertYWR(ywr, index) {
        this.$http.jsonp('http://localhost/ReadCard/ReadIDCard')
          .then(resp => {
            const response = resp.body
            //console.log("response:"+response)
            const res = response.toString().substr(1,response.length-2).replace(/\\/g,"")
            //console.log("res:"+res)
            const re = JSON.parse(res)
            //console.log(re)
            ywr.ywrmc = re.Name;
            ywr.ywrsfzh = re.IDCardNo;
            ywr.ywrzjlx = '1';
          });
      },
      //删除义务人代理人
      removeYwrdlr(item) {
        const index = this.dynamicValidateForm.ywrdlrs.indexOf(item)
        if (index !== -1 && index >= 1) {
          this.dynamicValidateForm.ywrdlrs.splice(index, 1)
        }
      },
      //添加义务人代理人表单
      addYwrdlr() {
        this.dynamicValidateForm.ywrdlrs.push({
          ywrdlrmc: '',
          ywrdlrsfzh: '',
          key: Date.now()
        });
      },
      //读证填入义务人代理人表单
      insertYWRDLR(ywrdlr, index) {
        this.$http.jsonp('http://localhost/ReadCard/ReadIDCard')
          .then(resp => {
            const response = resp.body
            //console.log("response:"+response)
            const res = response.toString().substr(1,response.length-2).replace(/\\/g,"")
            //console.log("res:"+res)
            const re = JSON.parse(res)
            //console.log(re)
            ywrdlr.ywrdlrmc = re.Name;
            ywrdlr.ywrdlrsfzh = re.IDCardNo;
            ywrdlr.ywrdlrzjlx = '1';
          });
      },
      //获取附件类型
      getFJLX(){
        console.log(this.contentlist)
        this.$http.get('http://localhost:8081/api/attachmentType/getAttachmentTypeListByBusinessID?businessTypeID='+this.contentlist[2].typeId).then(response => {
          if(response.body.status == 200){
            let data = response.body.data.rows;
            this.lcfj = [];
            let sigin = 1;
            for(var index in data){
              let item = data[index];
              this.lcfj.push({lable:item.attachmentName,fileId:item.fileId,sign:sign++,picture:'',attachmentsPath:'',children:[]})
            }
          }else {
            const message = '证件类型获取失败';
            this.$notify.error({
              title: '提示',
              message: message
            });
          }
        })
      },


      handleSizeChange(val) {
        this.pageSize = val;
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.nextPage = val;
        this.fetchData()
      },
      formatDate (date, fmt) {
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        let o = {
          'M+': date.getMonth() + 1,
          'd+': date.getDate(),
          'h+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds()
        };
        for (let k in o) {
          if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
          }
        }
        return fmt;
      },
      padLeftZero (str) {
        return ('00' + str).substr(str.length);
      },
      append(data) {
        console.log(sign)
        this.$http.jsonp('http://localhost/ScanService/Scan?slbh='+this.sjdh)
          .then(resp => {
            //console.log(resp)
            const response = resp.body
            const res = response.substr(1,response.length-2).replace(/\\/g,"")
            //console.log(res)
            const re = JSON.parse(res)
            this.pictureBase = "data:image/jpg;base64,"+re.imgBase64;
            this.attachmentsPathBase = re.ftpPath;
            console.log(this.pictureBase)
            console.log(this.attachmentsPathBase)
            const newChild = { sign: sign++, label: "图片"+pictureId++, picture: this.pictureBase, attachmentsPath: this.attachmentsPathBase };
            if (!data.children) {
              this.$set(data, 'children', []);
            }
            data.children.push(newChild);
          });
      },
      nodeClick(data) {
        console.log("data:"+data)
        console.log("picture:"+data.picture)
        if (data.picture != null && data.picture != ''){
          this.pictureVisible = true;
          console.log(data.picture);
        }
      },
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.sign === data.sign);
        children.splice(index, 1);
      },
      tableRowClassName({row, rowIndex}) {
        if (row.fwzt == '1') {
          return 'DYColour';
        } else if (row.fwzt == '2') {
          return 'CFColour';
        } else if (row.fwzt == '3') {
          return 'YYColour';
        } else if (row.fwzt == '4') {
          return 'DYYColour';
        } else if (row.fwzt == '5') {
          return 'DYACFColour';
        }
        return '';
      },

      handleNodeClick(data) {
        console.log(data);
      },
      getFJ(index, row) {
        row.upload = 'fujianxinxi';
        console.log(row.value+'  '+ row.upload);
        console.log(this.lcfj);
      },
      previewT() {
        var i = 0
        /*for(i=0;i< this.certificate.length;i++) {
          if(this.certificate[i].xgzlx == '1' || this.certificate[i].xgzlx == '2') {
            this.previewXgzh = this.certificate[i].xgzh
            this.previewZl = this.certificate[i].zl
          }
        }*/
        this.previewXgzh = this.bdczh
        console.log(this.lcfj)
        for(i=0;i< this.lcfj.length;i++) {
          if(this.lcfj[i].children.length > 0) {
            console.log(this.lcfj[i])
            this.previewFJ = this.previewFJ+','+ this.lcfj[i].label+'('+this.lcfj[i].children.length+')'
          }
        }
        const fj = this.previewFJ.toString()
        this.previewFJ = fj.substr(1,fj.length-1)
        for(i=0;i< this.dynamicValidateForm.qlrs.length;i++){
          this.previewQlr = this.previewQlr + ',' + this.dynamicValidateForm.qlrs[i].qlrmc
        }
        const qlrmc = this.previewQlr.toString()
        this.previewQlr = qlrmc.substr(1,qlrmc.length-1)
        for(i=0;i< this.dynamicValidateForm.ywrs.length;i++){
          this.previewYwr = this.previewYwr + ',' + this.dynamicValidateForm.ywrs[i].ywrmc
        }
        const ywr = this.previewYwr.toString()
        this.previewYwr = ywr.substr(1,ywr.length-1)
        this.previewTable = true;
        this.printTable = true;
        this.createQrcode();
        this.createQrcode2();
        this.barcode();
        this.barcode2();
      },
      previewSubmit() {
        if(this.submitTabble) {
          this.dialogVisible = true
        }else {
          this.submitTabble = false;
          this.$notify.error({
            title: '提示',
            message: '先打印，再提交'
          });
        }
      },
      validateForm() {
        if(this.sjdh == null || this.sjdh == ''){
          this.$message.error('系统异常请联系管理员');
          return false;
        }

        let qlrs = this.dynamicValidateForm.qlrs
        let qlrdlrs = this.dynamicValidateForm.qlrdlrs
        let ywrs = this.dynamicValidateForm.ywrs
        let ywrdlrs = this.dynamicValidateForm.ywrdlrs
        let i = 0;
        for( i = 0;i<qlrs.length ; i++) {
          if(qlrs[i].qlrmc == null ||qlrs[i].qlrmc == ''){
            this.$message.error('请读证或者输入权利人名称');
            return false;
          }
          if(qlrs[i].qlrsfzh == null || qlrs[i].qlrsfzh == ''){
            this.$message.error('请读证或者输入权利人证件号码');
            return false;
          }else if(qlrs[i].qlrzjlx == '1'){
            let zjhm = qlrs[i].qlrsfzh;
            let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if(!reg.test(zjhm)){
              this.$message.error('权利人身份证号码输入有误');
              return false;
            }
          }
          if(qlrs[i].qlrzjlx == null || qlrs[i].qlrzjlx == ''){
            this.$message.error('请读证或者输入权利人证件类型');
            return false;
          }
        }
        console.log(qlrdlrs.length)


        if((qlrdlrs[0].qlrdlrmc == null ||qlrdlrs[0].qlrdlrmc == '')
          &&(qlrdlrs[0].qlrdlrsfzh == null || qlrdlrs[0].qlrdlrsfzh == '')
          &&(qlrdlrs[0].qlrdlrzjlx == null || qlrdlrs[0].qlrdlrzjlx == '')){

        }else {
          for( i = 0;i<qlrdlrs.length ; i++) {
            if(qlrdlrs[i].qlrdlrmc == null ||qlrdlrs[i].qlrdlrmc == ''){
              this.$message.error('请读证或者输入权利人代理人名称');
              return false;
            }
            if(qlrdlrs[i].qlrdlrsfzh == null || qlrdlrs[i].qlrdlrsfzh == ''){
              this.$message.error('请读证或者输入权利人代理人证件号码');
              return false;
            }else if(qlrdlrs[i].qlrdlrzjlx == '1'){
              let zjhm = qlrdlrs[i].qlrdlrsfzh;
              let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
              if(!reg.test(zjhm)){
                this.$message.error('权利人代理人身份证号码输入有误');
                return false;
              }
            }
            if(qlrdlrs[i].qlrdlrzjlx == null || qlrdlrs[i].qlrdlrzjlx == ''){
              this.$message.error('请读证或者输入权利人代理人证件类型');
              return false;
            }
          }
        }

        for( i = 0;i<ywrs.length ; i++) {
          if(ywrs[i].ywrmc == null || ywrs[i].ywrmc == ''){
            this.$message.error('请读证或者输入义务人名称');
            return false;
          }
          if(ywrs[i].ywrsfzh == null || ywrs[i].ywrsfzh == ''){
            this.$message.error('请读证或者输入义务人证件号码');
            return false;
          }else if(ywrs[i].ywrzjlx == '1'){
            let zjhm = ywrs[i].ywrsfzh;
            let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if(!reg.test(zjhm)){
              this.$message.error('义务人身份证号码输入有误');
              return false;
            }
          }
          if(ywrs[i].ywrzjlx == null || ywrs[i].ywrzjlx == ''){
            this.$message.error('请读证或者输入义务人证件类型');
            return false;
          }
        }

        if((ywrdlrs[0].ywrdlrmc == null || ywrdlrs[0].ywrdlrmc == '')
          &&(ywrdlrs[0].ywrdlrsfzh == null || ywrdlrs[0].ywrdlrsfzh == '')
          &&(ywrdlrs[0].ywrdlrzjlx == null || ywrdlrs[0].ywrdlrzjlx == '')){

        }else {
          for( i = 0;i<ywrdlrs.length ; i++) {
            if(ywrdlrs[i].ywrdlrmc == null || ywrdlrs[i].ywrdlrmc == ''){
              this.$message.error('请读证或者输入义务人代理人名称');
              return false;
            }
            if(ywrdlrs[i].ywrdlrsfzh == null || ywrdlrs[i].ywrdlrsfzh == ''){
              this.$message.error('请读证或者输入义务人代理人证件号码');
              return false;
            }else if(ywrdlrs[i].ywrdlrzjlx == '1'){
              let zjhm = ywrdlrs[i].ywrdlrsfzh;
              let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
              if(!reg.test(zjhm)){
                this.$message.error('义务人代理人身份证号码输入有误');
                return false;
              }
            }
            if(ywrdlrs[i].ywrdlrzjlx == null || ywrdlrs[i].ywrdlrzjlx == ''){
              this.$message.error('请读证或者输入义务人代理人证件类型');
              return false;
            }
          }
        }

        if(this.certificate.length < 1){
          this.$message.error('请搜索证书/证明相关信息');
          return false;
        }

        if(this.inform.name == null || this.inform.name == ''){
          this.$message.error('请输入通知人姓名');
          return false;
        }

        if(this.inform.tel == null || this.inform.tel == ''){
          this.$message.error('请输入通知人联系电话');
          return false;
        } else {
          let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
          if (!myreg.test(this.inform.tel)) {
            this.$message.error('请输入11位联系电话');
            return false;
          }
        }

        return true;
      },
      validateFJ(){
        let i = 0
        let flag = false;
        console.log(this.lcfj.length)
        for(i = 0;i< this.lcfj.length;i++ ){
          console.log(this.lcfj[i].children.length)
          if(this.lcfj[i].children.length > 0){
            flag = true;
          }
        }

        if(!flag){
          this.$message.error('请添加附件');
          return false;
        }else {
          return true;
        }

      },
      sjSubmit(){
        const json = {};
        json.sjdh = this.sjdh;
        json.form = this.dynamicValidateForm;
        json.inform = this.inform;
        json.certificate = this.certificate;
        this.handleCertificate(this.lcfj)
        json.fj = this.fjs;
        this.sjr = this.$store.state.user.name;
        json.sjr = this.sjr;
        const date = new Date();
        json.sjsj = this.formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        this.sjrq = this.formatDate(date, 'yyyy年MM月dd日');

        var jsonObject = JSON.stringify(json)
        //http://10.3.2.222:9090/window/business/sjd
        //http://localhost:8099/getSJString
        this.$http.post('http://10.13.0.101:8888/window/business/sjd',{SJDRquestJson: jsonObject},{emulateJSON:true})
          .then(response => {
            this.multipleSelection = [];
            this.dialogVisible = false;
            if(response.status == '200'){
              this.printTable = false;
              this.sjdh = ''
              this.dynamicValidateForm = {
                qlrs: [{
                  qlrmc: '',
                  qlrsfzh: '',
                  qlrzjlx: ''
                }],
                qlrdlrs: [{
                  qlrdlrmc: '',
                  qlrdlrsfzh: '',
                  qlrdlrzjlx: ''
                }],
                ywrs: [{
                  ywrmc: '',
                  ywrsfzh: '',
                  ywrzjlx: ''
                }],
                ywrdlrs: [{
                  ywrdlrmc: '',
                  ywrdlrsfzh: '',
                  ywrdlrzjlx: ''
                }]
              };
              this.inform = {
                name: '',
                tel: '',
                ywrName: '',
                ywrTel: ''
              };
              this.certificate = [];
              this.lcfj =  [];
              this.fjs = [];
              this.sjr = '';
              this.dialogSJDVisible = false;
              this.dialogSJVisible = true;
              this.dialogFJVisible = false;
              this.dialogPrintVisible = false,

              this.$notify.success({
                title: '提示',
                message: '提交成功'
              });
              this.fetchData();
            } else {
              this.printTable = false;
              this.$notify.error({
                title: '提示',
                message: '提交失败'
              });
            }
          });
      },
      handleCertificate(val) {
        var i = 0;
        var j = 0;
        for(i = 0;i<val.length; i++) {
          const fj = {};
          fj.label = val[i].label;
          fj.sign = val[i].sign;
          fj.picture = val[i].attachmentsPath;
          fj.children = [];
          if(val[i].children.length > 0){
            for(j = 0;j<val[i].children.length; j++) {
              console.log("val children")
              console.log(val[i].children[j])
              var children = {};
              children.label = val[i].children[j].label;
              children.sign = val[i].children[j].sign;
              children.picture = val[i].children[j].attachmentsPath;
              console.log("children")
              console.log(children)
              console.log("children2")
              fj.children.push(children)
            }
          }
          this.fjs.push(fj)
        }
      },
      /*printContent(e) {
        if (this.printTable) {
          let subOutputRankPrint = document.getElementById('previewPrint');
          let newContent = subOutputRankPrint.innerHTML;
          let oldContent = document.body.innerHTML;
          //console.log(newContent);
          //console.log(oldContent);
          document.body.innerHTML = newContent;
          window.print();
          //window.location.reload();
          document.body.innerHTML = oldContent;
          this.submitTabble = true;
          return false;
        } else {
          this.printTable = false;
          this.$notify.error({
            title: '错误',
            message: '先预览，再打印'
          });
        }
      },*/
      printContent(e) {
        if (this.printTable) {
          let subOutputRankPrint = document.getElementById('previewPrint');
          let newContent = subOutputRankPrint.innerHTML;
          const myWindow = window.open('_blank');
          myWindow.document.write(newContent);
          myWindow.document.close();     //关闭document的输出流, 显示选定的数据
          myWindow.print();   //打印当前窗口
          myWindow.close();
          this.submitTabble = true;
          return true;
        } else {
          this.printTable = false;
          this.$notify.error({
            title: '提示',
            message: '先预览，再打印'
          });
        }
      },
      qrcode() {
        let qrcode = new QRCode('qrcode', {
          width: 100,
          height: 100, // 高度
          text: this.sjdh // 二维码内容
          // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
          // background: '#f0f'
          // foreground: '#ff0'
        })
      },
      createQrcode() {
        this.$nextTick (res => {
            this.qrcode();
        }
        )
      },
      qrcode2() {
        let qrcode2 = new QRCode('qrcode2', {
          width: 100,
          height: 100, // 高度
          text: this.sjdh // 二维码内容
          // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
          // background: '#f0f'
          // foreground: '#ff0'
        })
      },
      createQrcode2() {
        this.$nextTick (res => {
            this.qrcode2();
          }
        )
      },
      barcode() {
        this.$nextTick (res => {
          JsBarcode("#barcode", this.sjdh, {
            width: 2,
            height: 40,
            displayValue: false
          });
          }
        )
      },
      barcode2() {
        this.$nextTick (res => {
            JsBarcode("#barcode2", this.sjdh, {
              width: 2,
              height: 40,
              displayValue: false
            });
          }
        )
      },
      Steps() {
        this.active = 0;
        this.dialogSJVisible = true;
        this.dialogPrintVisible = false;
        this.dialogFJVisible = false;
      },
      Steps2() {
        if(this.validateForm()){
          this.active = 1;
          this.dialogSJVisible = false;
          this.dialogPrintVisible = false;
          this.dialogFJVisible = true;
        }
      },
      Steps3() {
        if(this.validateFJ()){
          this.active = 2;
          this.dialogSJVisible = false;
          this.dialogPrintVisible = true;
          this.dialogFJVisible = false;
          this.previewT()
        }
      },
      nextStep() {
        if (this.active === 2){
          this.active = 0;
          this.dialogSJVisible = true;
          this.dialogPrintVisible = false;
          this.dialogFJVisible = false;
        }else if(this.active === 0){
          //if(this.validateForm()){
          this.active = 1;
          this.dialogSJVisible = false;
          this.dialogPrintVisible = false;
          this.dialogFJVisible = true;
          this.getFJLX();
          //}
        }else if(this.active === 1){
          //if(this.validateFJ()){
          this.active = 2;
          this.dialogSJVisible = false;
          this.dialogPrintVisible = true;
          this.dialogFJVisible = false;
          this.previewT()
          //}
        }
      }

    }
  }
</script>

<style>
  .el-table .DYColour{
    background: #ff8000;
  }

  .el-table .CFColour{
    background: #ff0000;
  }

  .el-table .YYColour{
    background: #80ffff;
  }

  .el-table .DYYColour{
    background: #ff00ff;
  }

  .el-table .DYACFColour{
    background: #808080;
  }

  .inner {
    width: 220px;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 1px;
    /*outline: medium;*/
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 8px;
  }

</style>

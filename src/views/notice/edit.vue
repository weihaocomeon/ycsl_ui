<template>
  <div style="margin-top: 40px; margin-left: 50px">

    <!-- 发布公告提示条 -->

    <template>
  <el-carousel :interval="10000" type="card" height="400px" >
      <el-carousel-item>
       <a href="http://www.365editor.com/?f=b" target="_blank"><img width="100%" src="http://or316jtnw.bkt.clouddn.com//18-7-27/57952527.jpg"></a>
      </el-carousel-item>

      <el-carousel-item>
       <img width="100%" src="http://or316jtnw.bkt.clouddn.com//18-7-27/61756248.jpg">
      </el-carousel-item>

      <el-carousel-item>
       <img width="100%" src="http://or316jtnw.bkt.clouddn.com//18-7-27/59836010.jpg">
      </el-carousel-item>

      <el-carousel-item>
       <img width="100%" src="http://or316jtnw.bkt.clouddn.com//18-7-27/90438099.jpg">
      </el-carousel-item>

      <el-carousel-item>
       <img width="100%" src="http://or316jtnw.bkt.clouddn.com//18-7-27/81903942.jpg">
      </el-carousel-item>
  </el-carousel>
  </template>

  





    <el-form :model="noticeForm" status-icon :rules="editRules" ref="noticeForm" label-width="130px" labelPosition="left" class="demo-ruleForm">
      <el-form-item label='公告名称' prop='name'>
        <el-input v-model='noticeForm.name' placeholder='请输入公告名称'></el-input>
      </el-form-item>
      <el-form-item label='公告类型' prop='type'>
        <el-select v-model='noticeForm.type' filterable placeholder='请选择公告类型'>
          <el-option v-for='(item,index) in typeList' :value='item.itemname' :key='index'>{{item.itemname}}</el-option>
          <el-option :value='typevalue'>无类型</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='公告内容类型' prop='contenttype'>
        <el-select v-model='noticeForm.contenttype' placeholder='请选择公告内容类型' v-on:change='checkNoticeType()'>
          <el-option v-for='item in options' :key='item.value' :label = 'item.label' :value='item.value'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='公告内容' v-if='showinput' prop='noticecontent'>
        <el-input v-model='noticeForm.noticecontent' placeholder='请输入链接地址'></el-input>
      </el-form-item>
      <el-form-item label='公告内容' v-if='showquill' prop='noticecontent'>
        <el-input type="textarea" v-model='noticeForm.noticecontent' :rows='20'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('noticeForm')">提交</el-button>
        <el-button @click="resetForm('noticeForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import ElFormItem from '../../../node_modules/element-ui/packages/form/src/form-item.vue';
  import {  noticeContent, getType } from '@/api/notice/table'
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";
  export default {
    data() {
      return {
        typeList: null,
        noticeForm: {
          name: '',
          issuer: '',
          type: '',
          childtype: '',
          contenttype: '',
          noticecontent: '',
        },
        typevalue: '无',
        showinput: false,
        showquill: false,

        editorOption: {

        },
        options: [{
          value: '1',
          label: '自编辑内容'
        }, {
          value: '2',
          label: '引用链接网址'
        }],
        editRules: {
          name: [
            {
              required: true,
              message: '请输入公告名称',
              trigger: 'blur'
            }
          ],
          type: [
            {
              required: true,
              message: '请选择公告类型',
              trigger: 'blur'
            }
          ],
          contenttype:[
            {
              required: true,
              message: '请选择公告内容类型',
              trigger: 'blur'
            }
          ],
          noticecontent:[
            {
              required: true,
              message: '请选择输入公告内容',
              trigger: 'blur'
            }
          ]
        },
      };
    },
    created() {
      this.getNoticeType();
    },
    methods: {
      getNoticeType() {
        getType(this.typeList).then(response => {
          this.typeList = response.data
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.noticeForm.type == null || this.noticeForm.type === '') {
              this.noticeForm.type = '无';
            }
            if (this.noticeForm.childtype == null || this.noticeForm.childtype === '') {
              this.noticeForm.childtype = '无';
            }
            const content = this.noticeForm.noticecontent
            const formData = new FormData()
            formData.append('name', this.noticeForm.name)
            this.noticeForm.issuer = this.$store.state.user.name
            formData.append('issuer', this.noticeForm.issuer)
            formData.append('type', this.noticeForm.type)
            formData.append('childtype', this.noticeForm.childtype)
            formData.append('content', content)
            formData.append('noticetype', this.noticeForm.contenttype)
            noticeContent(formData).then(response => {
              this.noticeForm.name = ""
              this.noticeForm.type = ""
              this.noticeForm.noticecontent = null
              this.$message({
                message: '添加成功',
                type: 'success'
              });
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      checkNoticeType() {
        if ('1' === this.noticeForm.contenttype) {
          this.showinput = false
          this.showquill = true
        } else {
          this.showinput = true
          this.showquill = false
        }
      }

    }
  }
</script>


<style rel="stylesheet/scss" lang="scss">
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
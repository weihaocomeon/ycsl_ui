<template>
<div>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

    <breadcrumb class="breadcrumb-container"></breadcrumb>

    <div class="right-menu">
      <error-log class="errLog-container right-menu-item"></error-log>

      <el-tooltip effect="dark" :content="$t('navbar.screenfull')" placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip>

      <lang-select class="international right-menu-item"></lang-select>

      <el-tooltip effect="dark" :content="$t('navbar.theme')" placement="bottom">
        <theme-picker class="theme-switch right-menu-item"></theme-picker>
      </el-tooltip>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'"> -->
          <!-- <el-tag  type="info">{{name}}</el-tag> -->
          {{name}}
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{$t('navbar.dashboard')}}
            </el-dropdown-item>
          </router-link>

          <el-dropdown-item divided v-if="canEditPassWord">
            <span @click="changePsw" style="display:block;">密码修改</span>
          </el-dropdown-item>

          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>

   <el-dialog :before-close='exit' title="用户密码修改"  :visible.sync="dialogFormVisible">
       <el-form ref="form" :model="pswForm" :rules="formRules" label-width="100px">
          <el-form-item label="新密码" prop="password">
          <el-input :type="passwordType" v-model="pswForm.password" placeholder="请输入新密码"/><span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
        </el-form-item>
          <el-form-item label="确认新密码" prop="repassword">
          <el-input  :type="passwordType" v-model="pswForm.repassword" placeholder="请确认新密码"/><span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
          </span>
        </el-form-item>
            </el-form>
        <div slot="footer" class="dialog-footer">
        <el-button style="margin-left: 500px" type="primary" @click="editPwd('form')">确认修改</el-button>
        <el-button style="margin-left: 10px" type="primary" @click="exit()">取消</el-button>
        </div>
   

   </el-dialog>

       
     </div>   
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import {putObj} from '@/api/admin/user/index'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    LangSelect,
    ThemePicker
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.pswForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      canEditPassWord:false,
      passwordType: 'password',
      dialogFormVisible: false,
      pswForm:{},
      formRules:{
        password: [
          {
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 20,
            message: '长度在 5 到 20 个字符',
            trigger: 'blur'
          }
        ],
        repassword: [
          {
            required: true,
            message: '请再次输入密码',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 20,
            message: '长度在 5 到 20 个字符',
            trigger: 'blur'
          }
          ,{
            validator: validatePass2, trigger: 'blur'
          }
        ]
      }
    }
    },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'id',
      'elements'
    ])
  },
    created() {
       this.canEditPassWord = this.elements['user'];
    },
  methods: {
    editPwd(formName){
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          const query = {
              id: this.$store.state.user.id,
              password: this.pswForm.password
          }
          this.openFullScreen()
          putObj(this.$store.state.user.id,query)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '修改密码成功',
                type: 'success',
                duration: 2000
              });
              this.exit()
              this.closeFullScreen()
            })
         
          
        } else {
          return false;
        }
      });
    },
    openFullScreen() {
      const loading = this.$loading({
        lock: true,
        text: '正在处理中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
        })
      },
      closeFullScreen(){
          this.$loading().close()
      },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    exit(){
    this.pswForm={},
       this.dialogFormVisible=false
       this.passwordType = 'password'
    },
    changePsw() {
      this.dialogFormVisible=true
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: brown;
    cursor: pointer;
    user-select: none;
  }
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
   
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

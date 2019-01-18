<template>
  <div class="dashboard-editor-container">
    <!-- <div class=" clearfix">
      <pan-thumb style="float: left" :image="avatar"> Your roles:
        <span class="pan-info-roles" :key='item' v-for="item in roles">{{item}}</span>
      </pan-thumb>
      <div class="info-container">
        <span class="display_name">{{name}}</span>
        <span style="font-size:20px;padding-top:20px;display:inline-block;">editor : dashboard</span>
      </div>
    </div> -->  

		  <el-row :gutter="8">
      <el-col :xs="{span: 12}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 5}">
        <todo-list></todo-list>
      </el-col>
      <el-col :xs="{span: 12}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 5}">
        <box-card></box-card>
      </el-col>
    </el-row> 
		<el-row>
			<!-- <el-col >
			<vue-event-calendar :title="title" :events="demoEvents" @month-changed="monthChange" @day-changed="dayChange">
       
      </vue-event-calendar>
    </el-col> -->

		</el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import TodoList from '../admin/components/TodoList'
import BoxCard from '../admin/components/BoxCard'

export default {
  name: 'dashboard-editor',
  components: { PanThumb, TodoList, BoxCard },
  data() {
    return {
      title: '事件查看器',
			// demoEvents: [{
      //   date: '2018/05/11', // 必填
      //   title: '给宿迁写接口文档' // 必填
			// },
      // {
      //   date: '2018/05/11', // 必填
      //   title: '测试5月11日的事件'
			// },
      // {
      //   date: '2018/05/11', // 必填
      //   title: '给宿迁写接口文档'
			// },
      // {
      //   date: '2018/05/11', // 必填
      //   title: '测试5月11日的事件'
			// },{
      //   date: '2018/05/11', // 必填
      //   title: '给宿迁写接口文档'
			// },
      // {
      //   date: '2018/05/11', // 必填
      //   title: '测试5月11日的事件'
			// },
			// {
      //   date: '2018/05/10',
      //   title: '有一个事件'
      //   // customClass: 'disabled highlight' // 自定义日历单元格的Class，会加到对应的日历单元格上
      // }]
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
	},
	methods: {
    monthChange(month) {
      console.log(month)
    },
    dayChange(day) {
      this.title = day.date
      console.log(day)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

	.dashboard-editor-container {
		background-color: #e3e3e3;
		min-height: 100vh;
		margin-top: -50px;
		padding: 100px 60px 0px;
		.pan-info-roles {
			font-size: 12px;
			font-weight: 700;
			color: #333;
			display: block;
		}
		.info-container {
			position: relative;
			margin-left: 190px;
			height: 150px;
			line-height: 200px;
			.display_name {
				font-size: 48px;
				line-height: 48px;
				color: #212121;
				position: absolute;
				top: 25px;
			}
		}
	}
</style>

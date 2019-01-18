<template>
  <div class="tab-container">
    <el-tabs style='margin-top:15px;' v-model="activeName">
      <el-tab-pane v-for="item in tabMapOptions" :label="item.name" :key='item.id' :name="item.code">
        <keep-alive>
          <tab-pane v-if='activeName==item.code' :type='item.id'></tab-pane>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script> 
import tabPane from './components/AcceptanceDetial';
export default {
  name: 'group',
  components: { 
      tabPane
  },
  data() {
    return {
      tabMapOptions: 
      [{id: "AdvanceRegister", code: "AdvanceRegister", name: "网签和预告",
       description: "房产网签、登记做预告", updTime: "2018-01-22 12:59:12",updUser:1},
       {id: "SecondHandHouse", code: "SecondHandHouse", name: "二手房",
       description: "二手房转移", updTime: "2018-01-22 12:59:12",updUser:1}
      ],
      activeName: 'AdvanceRegister'
    }
  },
  created() {
    //this.fetchData();
  },
  methods: {
     
  }
}
</script>

<style scoped>
.tab-container {
  margin: 30px;
}
</style>

//因为申请详情页面必须单起一个页面 所以要保存当前的申请编号
const sqxq = {
    state: {
      sqbh: '', //申请详情
      ywlx: '',//登记类型
      blwd:'',//办理网点
    },
//突变
mutations: {
    SET_SQBH: (state, sqbh) => {
        state.sqbh = sqbh
      },
    SET_YWLX: (state, ywlx) => {
        state.ywlx = ywlx
    },
    SET_BLWD: (state, blwd) => {
        state.blwd = blwd
    }
},
actions: {
    saveSqbh({ commit }, sqbh){
        commit('SET_SQBH', sqbh)
    },
    saveYwlx({ commit }, ywlx){
        commit('SET_YWLX', ywlx)
    },
    saveBlwd({ commit }, blwd){
        commit('SET_BLWD', blwd)
    }
}



}

export default sqxq
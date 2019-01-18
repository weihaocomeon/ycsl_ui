//因为申请详情页面必须单起一个页面 所以要保存当前的申请编号
const smfw = {
    state: {
      sqbh_smfw: '', //申请详情

    },
//突变
mutations: {
    SET_SQXQ_SMFW: (state, sqbh_smfw) => {
        state.sqbh_smfw = sqbh_smfw
      },
},
actions: {
    saveSqbh_Smfw({ commit }, sqbh_smfw){
        commit('SET_SQXQ_SMFW', sqbh_smfw)
    },
}



}

export default smfw
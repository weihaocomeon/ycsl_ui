const xsbg = {
    state: {
      xsywbh: '',
    },
    mutations: {
        SET_XSYWBH: (state, xsywbh) => {
            state.xsywbh = xsywbh
          },
    },
    actions: {
        saveXsywbh({ commit }, xsywbh){
            commit('SET_XSYWBH', xsywbh)
        },
    }
  }
  
  export default xsbg
  
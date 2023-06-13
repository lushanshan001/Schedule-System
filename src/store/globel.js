export default {
  state() {
    return {
      //全局变量中的success
      success: 200,
      token: "",
    };
  },
  //修改字段
  mutations: {
    //设置token
    setToken(state, val) {
      state.token = val;
    },
  },
};

export default {
    state: {
        taskList:[]
    },
    //修改字段
    mutations: {
        changeTaskList(state,val){
            state.taskList = val;
        }
    },
  };
  
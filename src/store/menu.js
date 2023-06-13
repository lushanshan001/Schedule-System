export default {
  state: {
    // 动态菜单
    menuData: [],
  },
  //修改字段
  mutations: {
    //设置菜单的数据
    setMenu(state, val) {
      state.menuData = val;
    },
    //动态注册路由
    addMenu(state, router) {
      // 处理动态路由的数据
      const menuData = JSON.parse(JSON.stringify(state.menuData));
      const menuArray = [];
      menuData.forEach((item) => {
        if (item.children && item.children.length >= 1) {
          menuArray.push(...item.children);
        } else {
          menuArray.push(item);
        }
      });
      // console.log(menuArray, "menuArray");
      // 路由的动态添加
      if (menuArray[0] !== "") {
        menuArray.forEach((item) => {
          router.addRoute("main", { path: `${item.path}`,component: () => import(`@/views${item.path}.vue`) });
        });
      }
    },
  },
};

import { menuList } from "@/api/menu.js";
import HomeMenu from "@/components/menu/HomeMenu.vue";

export default {
  components: {
    HomeMenu,
  },
  data() {
    return {
      defaultActive: "0",
      menuData: [],
    };
  },
  mounted() {
    //获得菜单
    this.getMenu();
    this.handleSelect(this.$route.path);
  },
  watch: {
    $route(e) {
      this.handleSelect(e.path);
    },
  },
  methods: {
    handleSelect(e) {
      this.defaultActive = e;
    },

    async getMenu() {
      const res = await menuList();
      if (res.data.code === this.$store.state.globel.success) {
        //获得菜单导航数据
        this.menuData = res.data.data;
        //获取菜单的数据，存入store中
        this.$store.commit("setMenu", this.menuData);
        //动态生成路由
        this.$store.commit("addMenu", this.$router);
      } else {
        //没有获得菜单数据
      }
    },
  },
};

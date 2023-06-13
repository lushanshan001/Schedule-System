<template>
  <div class="home-menu">
    <template v-for="item in menuData" :key="item">
      <el-menu-item @click="clickMenu(item)" :index="item.path">
        <template #title>
          <div class="title">
            <div class="item">
              <el-icon><component :is="item.icon" /></el-icon>
              <label>{{ item.menuName }}</label>
            </div>
          </div>
        </template>
      </el-menu-item>
    </template>
  </div>
</template>
<script>
import { Location } from "@element-plus/icons";

export default {
  name: "home-menu",
  props: ["menuData"],
  components: { Location },
  methods: {
    //点击菜单
    clickMenu(item) {
      //当前路由与跳转路由不一致时跳转
      if (
        this.$route.path !== item.path &&
        !(this.$route.path === "/Home" && item.path === "/")
      ) {
        this.$router.push(item.path);
      }
    },
  },
};
</script>
<style src="@/assets/css/common/home/home-menu.css">
</style> 


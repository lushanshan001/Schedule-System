<template>
  <el-row class="header-container">
       <el-col class="l-content" :span="2"></el-col>
    <el-col class="r-content" :span="1">
      <el-dropdown @click="handleClick">
        <div>
          <img class="pic" src="@/assets/imges/personal.png" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    //修改菜单的状态
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    //退出
    exit() {
      //消除token
      sessionStorage.clear();
      window.open("/", "_self");
    },
  },
};
</script>

<style src="@/assets/css/common/common-header.css">
</style>
<template>
  <div class="common-aside">
    <div class="top">
      <img class="pic" src="@/assets/imges/logo.png"/>
    </div>
    <div class="middle">
      <el-menu
        class="el-menu-vertical-demo"
        :default-active="defaultActive"
        @open="handleOpen"
        @close="handleClose"
      >
        <home-menu :menuData="menuData"></home-menu>
      </el-menu>
    </div>
  </div>
</template>
<script src="@/assets/js/common/common-aside">
</script>
<style src="@/assets/css/common/common-aside.css" scoped>
</style>
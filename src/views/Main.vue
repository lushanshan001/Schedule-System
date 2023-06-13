<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="160px">
        <common-aside />
      </el-aside>
      <el-container>
        <el-header><common-header /></el-header>
        <el-main>
          <div class="middle"><router-view /></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import CommonAside from "@/components/common/CommonAside.vue";
import CommonHeader from "@/components/common/CommonHeader.vue";
</script>
<style src="@/assets/css/main.css" scoped></style>
  
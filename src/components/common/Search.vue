<template>
  <div>
    <!-- form搜索区 -->
    <el-form :inline="true">
      <el-form-item>
        <el-input placeholder="请输入搜索内容" v-model="msg"></el-input>
      </el-form-item>
      <el-select id="select" class="select-search" v-model="value">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-form-item>
        <el-button type="primary" @click="submit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: ["options"],
  data() {
    return {
      searchNews: [],
      msg: "",
      value: "",
    };
  },
  mounted() {
    this.choose();
  },
  methods: {
    submit() {
      this.searchNews.msg = this.msg;
      this.searchNews.data = this.value;
      this.$emit("getSearchNews", this.searchNews);
    },
    //把选择项设置为options的第一个的value
    choose() {
      if (this.options[0] !== null && this.options[0] !== undefined) {
        this.value = this.options[0].value;
      }
    },
  },
};
</script>
<style src="@/assets/css/common/search/search.css">
</style>
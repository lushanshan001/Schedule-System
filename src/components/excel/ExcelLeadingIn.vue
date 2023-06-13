<template>
  <el-upload
    ref="upload"
    class="upload-demo"
    action
    accept=".xlsx,.xls"
    :show-file-list="false"
    :on-exceed="handleExceed"
    :auto-upload="false"
    :on-change="handle"
  >
    <template #trigger>
      <el-button type="primary">选择excel文件新增</el-button>
    </template>
    <template #tip>
      <div class="el-upload__tip text-red">限制1个文件，新文件将覆盖旧文件</div>
    </template>
  </el-upload>                                         
</template>
<script>
//excel文件的处理
import { excelLeadingIn,readFile } from "@/assets/utils/excel/excelLeadingIn";

export default {
  props:["character"],
  data() {
    return {
      addData: [],
    };
  },
  methods: {
    //采集excel数据
    async handle(ev) {
      //这个是上传的文件
      const file = ev.raw;
      if (!file) {
        this.addData = null;
      } else {
        // console.log(file)
        //读取file中的数据
        let data = await readFile(file);
        this.addData = excelLeadingIn(data,this.character);
      }
      this.$emit("getAddData", this.addData);
    },
  },
};
</script>
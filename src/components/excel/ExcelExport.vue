<template>
  <div id="excel-exprot">
    <div><el-button type="success" @click="outExcel">{{ excelList.show }}</el-button></div>
  </div>
</template>
   
  <script>
import { xlsx } from "@/assets/utils/excel/excelExport";

export default {
  props:["excelList"],
  data() {
    return {
    };
  },
  methods: {
    outExcel() {
      // jsonData是要导出的数据内容（表格里的内容），
      // listHander对应要导出内容的表头
      //excelName是导出的表格的名字
      xlsx(this.excelList.jsonData, this.excelList.listHander, this.excelList.excelName);
    },
  },
};
</script>
<style>
#excel-export{
  max-width: 150px;
  padding: 0;
}
</style>
  
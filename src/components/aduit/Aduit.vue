<template>
  <div class="small-div">
    <div class="small-div-header">
        <h3>客流量预测</h3>
    </div>
    <div class="content">
      <div class="header">
        <div class="add">
          <excel-export class="add-excel" :excel-list="newExcelList"></excel-export>
          <excel-leading-in
            class="add-excel"
            :character="aduitCharacter"
            @getAddData="getAddData"
          ></excel-leading-in>
        </div>
        <div class="search">
          <div class="date-picker">
            <el-date-picker
              v-model="searchTime"
              type="date"
              placeholder="选择日期"
              :disabled-date="disabledDate"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
              @change="changeTime()"
            ></el-date-picker>
          </div><el-switch v-model="switchValue" size="large" active-text="表格" inactive-text="图示" @change="switchReceiveStatus()"/>
        </div>
      </div>
      <div v-if="switchValue === true">
        <el-row class="table">
          <el-table
            @selection-change="selectChange"
            :data="aduitData"
            border
            style="min-width: 1000px"
          >
            <el-table-column prop="shopName" label="门店姓名" />
            <el-table-column prop="date" label="日期" />
            <el-table-column prop="startTime" label="开始时间" />
            <el-table-column prop="endTime" label="结束时间" />
            <el-table-column prop="aduit" label="预测顾客流量" />
          </el-table>
        </el-row>
      </div>
      <div class="aduit-graph" v-if="switchValue === false">
        <div id="aduit" style="width: 100%; height: 480px" ref="aduit"/>
      </div>
    </div>
  </div>
</template>
<script src="@/assets/js/aduit.js">
</script>
  <style src="@/assets/css/header/add-header.css" scoped>
</style>
<style src="@/assets/css/aduit.css" scoped>
</style>
    
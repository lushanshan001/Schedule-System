<template>
  <div class="header">
    <el-icon><Stamp /></el-icon>
    <div class="header-text">欢迎回来！xxx</div>
  </div>
  <div class="home">
    <div class="left" v-if="type === '公司'">
      <div class="distribution">
        <div class="small-div-header">
          <h3>店铺分布</h3>
        </div>
        <div class="content">
          <div id="shop" style="width: 100%; height: 400px"></div>
        </div>
      </div>
      <div class="increase">
        <div class="small-div-header">
          <h3>员工增长</h3>
        </div>
        <div class="content">
          <div id="staff" style="width: 100%; height: 400px"></div>
        </div>
      </div>
    </div>
    <div class="left" v-if="type === '门店经理'">
      <div class="week">
        <div class="small-div-header">
          <h3>最近一周员工总工时</h3>
        </div>
        <div class="content">
          <div id="week" style="width: 100%; height: 400px"></div>
        </div>
      </div>
      <div class="arrange">
        <div class="small-div-header">
          <h3>人员安排分析</h3>
        </div>
        <div class="alert">
          <el-icon><QuestionFilled /></el-icon>
          标黄色的行代表平均工作时长过长，而标蓝色的行则代表平均工作时长过短。请在查看数据时多加留意这些行。
        </div>
        <div class="content">
          <div class="left-content">
            <el-table :header-cell-style="{background:'#eef1f6',color:'#606266'}" height="400"
              :data="employeeWorkData" style="width: 85%" border :row-class-name="employeeWorkTableRow">
              <el-table-column prop="staffName" label="姓名" width="100"></el-table-column>
              <el-table-column prop="phone" label="电话号码" width="120"></el-table-column>
              <el-table-column prop="positionName" label="职位"></el-table-column>
              <el-table-column prop="workTime" label="平均工时" width="160"></el-table-column>
            </el-table>
          </div>
          <div class="right-content">
              <el-table :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                :data="positionAverageData" style="width: 100%" border :row-class-name="positionAverageTableRow">
                <el-table-column prop="positionName" label="职位"></el-table-column>
                <el-table-column prop="averageWork" label="平均工时"></el-table-column>
              </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right-header">
      </div>
      <div class="right-middle">
        <div class="small-div-header">
          <h3>快捷管理入口</h3>
        </div>
        <div class="content">
          <div class="out">
            <div class="in">
              <img class="in_img" src="@/assets/imges/in.png"/>
              <span>批量导入员工数据</span>
            </div>
            <div class="in">
              <img class="in_img" src="@/assets/imges/employee.png"/>
              <span>核心人事</span>
            </div>
          </div>
        </div>
      </div>
      <div class="right-middle ">
        <div class="small-div-header">
          <h3>基础数据</h3>
        </div>
        <div class="content">
          <div class="left" id="sex" style="width: 0px; height: 400px">
          </div>
          <div class="right" id="position" style="width: 0px; height: 400px">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import { weekWorkHour } from "@/api/employee";
import { getShopDistribution } from "@/api/shop";
import { staffIncrease } from "@/api/employee"
import { ElMessage } from "element-plus";
import { getShopDistributionChartOptions } from '@/assets/js/echarts/shop-distribute'
import { getPositionPercentageOptions } from '@/assets/js/echarts/position-percentage'
import { getStaffIncreaseOptions } from '@/assets/js/echarts/staff-increase'
import { getWeekWorkHourOptions } from '@/assets/js/echarts/week-work-hour'
import { getEmployeeGenderChartOptions } from '@/assets/js/echarts/position-percentage'
import * as echarts from "echarts";
import china from 'echarts/map/json/china.json'
echarts.registerMap('china', china)
import { useStore } from 'vuex';
const store = useStore(); // 获取 store 实例
let type = ref('');
let shopDistributionData = reactive([]);
let employeeWorkData = reactive([]);
let positionAverageData = reactive([]);
let employeeGenderData = reactive([]);
let staffIncreaseData = reactive([]);
let positionPercentageData = reactive([]);
const employeeWorkTableRow = (row, rowIndex) => {
  if(row.workTime > 7) {
    return "warning-row"
  }else if(row.workTime < 5) {
    return "success-row"
  }
  return "";   // 返回值为空
}
const positionAverageTableRow = ({row, rowIndex}) => {
  if(row.averageWork > 7) {
    return "warning-row"
  }else if(row.averageWork < 5) {
    return "success-row"
  }
  return "";   // 返回值为空
}
const getWeekWorkHour = () => {
  weekWorkHour("1643602322133131266").then(res =>{
    if(res.data.code === store.state.globel.success){
      employeeWorkData = res.data.data;
    }
  });
}
const shopDistribution = () => {
  var staffs = [2,9,1,0,12,3,0,0,1,4,1,1];
  getShopDistribution("1643301658781827073").then(res =>{
    if(res.data.code === store.state.globel.success){
      shopDistributionData = res.data.data;
    }
  });
}
const getStaffIncrease = () => {
  var staffs = [2,9,1,0,12,3,0,0,1,4,1,1];
  staffIncrease("1643301658781827073").then(res =>{
    if(res.data.code === store.state.globel.success){
      staffIncreaseData = res.data.data;
    }
  });
}
const drawLine = () => {
  if(type === '公司'){
    //公司在全国的分布
    var shopChart = echarts.init(document.getElementById("shop"));
    window.addEventListener("resize", function () {
      shopChart.resize();
    });
    shopChart.setOption(getShopDistributionChartOptions(shopDistributionData));

    //员工数量的增减
    var staffChart = echarts.init(document.getElementById("staff"));
    window.addEventListener("resize", function () {
      staffChart.resize();
    });
    staffChart.setOption(getStaffIncreaseOptions(staffIncreaseData));
  }else{

    //最近一周员工上班时间
    var weekChart = echarts.init(document.getElementById("week"));
    window.addEventListener("resize", function () {
      weekChart.resize();
    });
    var weekData = [
    { staffName: '杜莉', id: 1001, positionName: '店长', workTime: 6.3,},
    { staffName: '沈磊', id: 1002, positionName: '库房', workTime: 5.1, },
    { staffName: '许磊', id: 1003, positionName: '经理', workTime: 5.6, },
    { staffName: '赖刚', id: 1004, positionName: '保洁', workTime: 7.1, },
    { staffName: '康佳', id: 1006, positionName: '收营员', workTime: 5.2, },
    { staffName: '宋丽', id: 1005, positionName: '导购', workTime: 7.6, },
    { staffName: '谭洋', id: 1007, positionName: '库房', workTime: 4.3, },
    { staffName: '郝静', id: 1009, positionName: '导购', workTime: 6.8, },
    { staffName: '叶娜', id: 1010, positionName: '保洁', workTime: 6.9, },
    { staffName: '曹刚', id: 1011, positionName: '导购', workTime: 5.8, },
    { staffName: '黎敏', id: 1012, positionName: '收营员', workTime: 5.5, },
    { staffName: '曾美', id: 1015, positionName: '导购', workTime: 7.1, },
    ];
    weekChart.setOption(getWeekWorkHourOptions(employeeWorkData));
  }
  //员工性别比例
  var sexChart = echarts.init(document.getElementById("sex"));
  window.addEventListener("resize", function () {
    sexChart.resize();
  });
  sexChart.setOption(getEmployeeGenderChartOptions(employeeGenderData));

  //职位分布比例
  var positionChart = echarts.init(document.getElementById("position"));
  window.addEventListener("resize", function () {
    positionChart.resize();
  });
  positionChart.setOption(getPositionPercentageOptions(positionPercentageData));
}
onMounted (() => {
  type.value = sessionStorage.getItem("user");
  getWeekWorkHour();
  getShopDistribution();
  staffIncrease();
  weekWorkHour();
  // drawLine();
});
</script>
<style src="@/assets/css/home.css" scoped></style>
<style>
.el-table .warning-row {
  background: rgb(241, 215, 166);
}

.el-table .success-row {
  background: #96b9ee;
}
</style>
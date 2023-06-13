<template>
  <div class="day">
    <el-row>
      <el-col class="swith-date" :span="8">
        <div>
          <div class="swith-date-div">
            <div class="checked-view">按日查看</div>
            <div style="width: auto">|</div>
            <div @click="checkViewNew('周')">按周查看</div>
          </div>
          <div class="swith-date-select" style="display: flex;">
            <el-select
              @change="checkChooseForDeatil"
              v-model="chooseItemValue"
            >
              <el-option value="按职位查找">按职位查找</el-option>
              <el-option value="按技能查找">按技能查找</el-option>
              <el-option value="按员工分组查找">按员工分组查找</el-option>
            </el-select>
            <div id="showChooseDetail" style="visibility: hidden"> 
              <el-select
              v-model="chooseItemDetail"
              placeholder="请选择"
              @change="chooseDetailForSchedule"
            >
              <el-option
                v-for="(item, index) in detailList"
                :key="index"
                :value="item"
                :label="item"
              />
            </el-select>
            </div>
          </div>
        </div>
      </el-col>
      <el-col class="week-top" :span="8">
        <!-- 展示周的信息 -->
        <div @click="getLastDay" class="pageSelect">&lt;</div>
        <span class="w-today-date"> {{ todayDate }}</span>
        <div @click="getNextDay" class="pageSelect">></div>
      </el-col>
    </el-row>
    <div class="date">
      <FullCalendar
        ref="calendar"
        class="demo-app-calendar"
        :options="calendarOptions"
      >
      </FullCalendar>
    </div>
  </div>
</template>

<script src="@/assets/js/schedule/day">
</script>
<style src="@/assets/css/common/calendar.css" scoped></style>
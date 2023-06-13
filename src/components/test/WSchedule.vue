<template>
  <div class="course-week">
    <el-row>
      <el-col class="swith-date" :span="8">
        <div>
          <div class="swith-date-div">
            <div @click="checkViewNew('日')">按日查看</div>
            <div style="width: auto">|</div>
            <div @click="checkViewNew('周')" class="checked-view">按周查看</div>
          </div>
          <div class="swith-date-select" style="display: flex">
            <el-select @change="checkChooseForDeatil" v-model="chooseItemValue">
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
        <div @click="getLastWeek" class="pageSelect">&lt;</div>
        <span class="w-today-date"> {{ todayDate }}</span>
        <div @click="getNextWeek" class="pageSelect">></div>
      </el-col>
    </el-row>
    <div class="week-table">
      <div class="table-header">
        <!-- 展示具体的周的日期 星期... -->
        <div class="table-week">
          <template v-for="(item, index) of weeks" :key="index">
            <span>{{ item }}</span>
          </template>
        </div>
        <div class="w-table-date">
          <!-- 展示几月几号 -->
          <template v-for="(item, index) of months" :key="index">
            <!-- 判断一下日期是不是今天（给今天做一个标记） -->
            <span
              v-if="index !== 0"
              class="w-day-item"
              :class="{ 'w-isCurDate': item && item.isCurDate }"
            >
              {{
                `${
                  item && item.isCurDate
                    ? (item && item.showDate) || ""
                    : (item && item.showDate) || ""
                }`
              }}
            </span>
          </template>
        </div>
      </div>
      <!-- 展示具体的事件 -->
      <div class="w-time-period-list">
        <ul class="w-time-period-row">
          <!--循环时段，看时段有多少个-->
          <template v-if="planList.length > 0">
            <li
              class="w-time-period-col"
              v-for="(period, p_index) in planList"
              :key="p_index"
            >
              <!-- 后面显示周一到周日的计划-->
              <div class="w-row-day">
                <!-- 循环显示每周的日期-->
                <template v-for="(month, m_index) of months">
                  <!-- v-if="month" 去除数据处理的时候移除数组第一个为empty的问题-->
                  <div
                    v-if="month"
                    :key="`month${m_index}`"
                    class="w-things"
                    @click="handleCardDetail(month, period)"
                  >
                    <!-- 循环每个时间段的计划-->
                    <template
                      v-for="(card, t_index) of period.schedule"
                      :key="t_index"
                    >
                      <template v-for="(single, sIndex) in card[month.date]">
                        <template v-if="!card.isExpend">
                          <div
                            v-if="single.date === month.date && sIndex < 2"
                            :key="`thing${sIndex}`"
                            class="w-thing-item"
                            @click="handleDetail(single)"
                            :style="{
                              background: cardStatus[single.status].color,
                            }"
                          >
                            <slot name="thing" :row="single"></slot>
                          </div>
                        </template>
                        <template v-if="card.isExpend">
                          <div
                            v-if="single.date === month.date"
                            :key="`thing${sIndex}`"
                            class="w-thing-item"
                            @click="handleDetail(single)"
                            :style="{
                              background: cardStatus[single.status].color,
                            }"
                          >
                            <slot name="thing" :row="single"></slot>
                          </div>
                        </template>
                        <div
                          class="w_expand"
                          v-if="
                            card[month.date].length > 5 &&
                            card[month.date].length - 1 === sIndex &&
                            !card.isExpend &&
                            single.date === month.date
                          "
                          :key="single"
                          @click="handleExpand(card)"
                        >
                          展开
                        </div>
                        <div
                          class="w_shrink"
                          v-if="
                            card[month.date].length > 5 &&
                            card[month.date].length - 1 === sIndex &&
                            card.isExpend &&
                            single.date === month.date
                          "
                          :key="single"
                          @click="handleExpand(card)"
                        >
                          收缩
                        </div>
                      </template>
                    </template>
                  </div>
                </template>
              </div>
            </li>
          </template>
          <div class="w-noMore" v-else><span>暂无数据</span></div>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate, getCurDay } from "@/assets/utils/Mytools.js";

//接口
import { getSkill, getPosts } from "@/api/posts";

export default {
  name: "WSchedule",
  props: {
    planList: {
      type: Array,
      default: [],
    },
    cardStatus: {
      type: Object,
      default: () => {
        return {
          0: {
            color: " #ddd",
          },
          1: {
            title: "已过期",
            color: "RGB(164,144,234)",
          },
          2: {
            title: "进行中",
            color: "RGB(118,190,254)",
          },
          3: {
            title: "未开始",
            color: "RGB(254,188,96)",
          },
        };
      },
    },
    isFirstDayOfMondayOrSunday: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      weeks: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      todayDate: "",
      months: [],
      curDate: "",
      nowDate: new Date(),
      chooseItemValue: "请选择查找条件",
      detailList: [],
      chooseItemDetail: "请选择",
      choose: {
        positionName: null,
        skill: null,
      },
    };
  },
  watch: {
    // 设置展示的第一个是星期几
    isFirstDayOfMondayOrSunday: {
      handler(val) {
        if (val > 1) {
          let arr = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
          const arr1 = arr.slice(val - 1);
          const arr2 = arr.slice(0, val - 1);
          this.weeks = ["时段", ...arr1, ...arr2];
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.getCurWeek();
  },
  methods: {
    //展开与缩放操作
    handleExpand(row) {
      row.isExpend = !row.isExpend;
    },
    /**
     * 获取 时间
     * @param time
     */
    getWeek(time) {
      this.curDate = new Date(time);
      //当前是周几
      const whichDay = time.getDay();
      let num = 0;
      if (this.isFirstDayOfMondayOrSunday <= whichDay) {
        num = this.isFirstDayOfMondayOrSunday;
      } else {
        num = this.isFirstDayOfMondayOrSunday - 7;
      }
      const weekDay = time.getDay() - num;
      time = this.addDate(time, weekDay * -1);
      for (let i = 0; i < 7; i++) {
        const { year, month, day } = formatDate(
          i === 0 ? time : this.addDate(time, 1)
        );
        this.months.push({
          date: `${year}-${month}-${day}`,
          showDate: `${month}-${day}`,
          timestamp: new Date(`${year}-${month}-${day}`).getTime(),
        });
      }
      this.months.sort((a, b) => a.timestamp - b.timestamp);
      delete this.months[0];
      this.todayDate = `${this.months[1].date} ~ ${
        this.months[this.months.length - 1].date
      }`;
    },
    /**
     * 处理日期
     * @param date
     * @param n
     * @returns {*}
     */
    addDate(date, n) {
      date.setDate(date.getDate() + n);
      return date;
    },
    /**
     * 上周
     */
    getLastWeek() {
      const date = this.addDate(this.curDate, -7),
        { year, month, day } = formatDate(date),
        dateObj = {
          date: `${year}-${month}-${day}`,
          timestamp: new Date(`${year}-${month}-${day}`).getTime(),
        };
      this.dealDate(date);
      this.$emit("changeWeek", dateObj);
    },
    /**
     * 本周
     */
    getCurWeek() {
      const { year, month, day } = formatDate(new Date()),
        dateObj = {
          date: `${year}-${month}-${day}`,
          timestamp: new Date(`${year}-${month}-${day}`).getTime(),
        };
      this.dealDate(new Date());
      this.$emit("changeWeek", dateObj);
    },
    /**
     * 下周
     */
    getNextWeek() {
      const date = this.addDate(this.curDate, 7),
        { year, month, day } = formatDate(date),
        dateObj = {
          date: `${year}-${month}-${day}`,
          timestamp: new Date(`${year}-${month}-${day}`).getTime(),
        };
      this.dealDate(date);
      this.$emit("changeWeek", dateObj);
    },
    /**
     * 显示当天日期状态
     * @param date
     */
    dealDate(date) {
      this.months = [""];
      this.getWeek(date);
      const curDate = getCurDay();
      this.months.forEach((item) => {
        item.isCurDate = item.date === curDate;
      });
    },
    /**
     * 点击卡片子内容查看详情
     * @param row
     */
    handleDetail(row) {
      this.$emit("handleDetail", row);
    },
    /**
     * 点击卡片查看全部内容
     * @param month
     * @param period
     */
    handleCardDetail(month, period) {
      this.$emit("handleCardDetail", { ...month, ...period });
    },
    /**
     * 更换要展示的界面
     * @param {} date
     */
    checkViewNew(data) {
      this.$emit("checkViewNew", data);
    },
    //选择查看
    async checkChooseForDeatil() {
      var detailSelect = document.getElementById("showChooseDetail");
      this.detailList = [];
      this.chooseItemDetail = "请选择";
      this.choose.positionName = null;
      this.choose.skill = null;
      detailSelect.style.visibility = "visible";
      var res;
      if (this.chooseItemValue === "按职位查找") {
        res = await getPosts();
        const list = res.data.data;
        list.forEach((element) => {
          this.detailList.push(element.positionName);
        });
      } else if (this.chooseItemValue === "按技能查找") {
        res = await getSkill();
        this.detailList = res.data.data;
      } else if (this.chooseItemValue === "按员工分组查找") {
        res = null;
      }
    },
    chooseDetailForSchedule() {
      if (this.chooseItemValue === "按职位查找") {
        this.choose.positionName = this.chooseItemDetail;
      } else if (this.chooseItemValue === "按技能查找") {
        this.choose.skill = this.chooseItemDetail;
      }
      //给父组件传递参数
      this.$emit("getChoose",this.choose);
    },
  },
};
</script>
 <style scoped>
ul {
  list-style: none;
}

ul,
li {
  margin: 0;
  padding: 0;
}

.course-week {
  width: 100%;
  padding: 1%;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
}

.week-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  padding: 0 1% 10px;
  box-sizing: border-box;
  margin-left: 40px;
}

/* 按鈕 */
.week-top .week-btn-wrap {
  width: 200px;
  display: flex;
  justify-content: space-around;
  color: #006699;
  font-size: 25px;
}

.week-top .week-btn-wrap span {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
}

.w-today-date {
  font-weight: bold;
  font-size: 20px;
  cursor: none;
}

.w-choose-status {
  display: flex;
  justify-content: flex-end;
  width: 200px;
}

.w-choose-status > div {
  width: 100%;
  flex: 1;
  display: flex;
  padding: 0 2%;
  white-space: nowrap;
  line-height: 20px;
  box-sizing: border-box;
}

.w-choose-status > div .square {
  display: flex;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  box-sizing: border-box;
}

.w-choose-status > div .title {
  display: flex;
  align-items: center;
  line-height: 16px;
  padding-left: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.week-table {
  display: flex;
  flex-direction: column;
}

.week-table .table-header {
  width: 100%;
  height: 80px;
  background:RGB(64,158,255);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

.table-header{
  border: 1px solid RGB(204,204,204);
}
.table-week span,.w-table-date span{
  border-left:1px solid RGB(204,204,204);
}
.table-header .w-table-date,
.table-week {
  width: 100%;
  height: 40px;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-header .w-table-date > span,
.table-week > span {
  flex: 1;
  color: #000;
  height: 100%;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.w-table-date .w-day-item,
.table-week .w-day-item {
  color: #000;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.week-table .w-time-period-list {
  width: 100%;
}

.w-time-period-list .w-time-period-row {
  width: 100%;
  min-height: 60px;
}

.w-time-period-col {
  width: 100%;
  min-height: 60px;
  display: flex;
}

.w-time-period-col .w-time-period {
  width: 12.5%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid;
  border-bottom: 1px solid;
  box-sizing: border-box;
}

.w-time-period-col .w-row-day {
  width: 100%;
  display: flex;
  justify-content: center;
}

.w-row-day .w-things {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  box-sizing: border-box;
}

.w-row-day .w-things:last-child {
  border-right: 1px solid #cccccc;
}

.w-things .w-thing-item {
  display: flex;
  width: 80%;
  font-size: 14px;
  flex-direction: column;
  justify-content: space-around;
  min-height: 70px;
  border-radius: 10px;
  margin: 2% 1%;
  padding: 1% 2%;
  cursor: pointer;
  color: RGBA(0, 0, 0, 0.8);
  background: #ff6200;
  box-sizing: border-box;
  transition: all 1s linear 0.5s;
}

.w-isCurDate {
  color: #fff !important;
}

.w-noMore {
  min-height: 200px;
  padding: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #9cadadb7;
  color: #9cadadb7;
  box-sizing: border-box;
}

.w_expand,
.w_shrink {
  color: #0a98d5;
  cursor: pointer;
  width: 100%;
  padding: 2% 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pageSelect {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 36px;
  height: 36px;
  background-color: #fff;
  color: #3951b3;
  border: none;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid rgb(153, 204, 255);
  border-radius: 50px;
  margin: 0px 10px;
}

.pageSelect:hover {
  color: #fff;
  background-color: rgb(153, 204, 255);
}

.pointer {
  cursor: pointer;
}

.view-date {
  text-align: left;
  color: #737d86;
  font-size: 14px;
  cursor: none;
}

.swith-date {
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.swith-date-div {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 180px;
  border: 2px solid #737d86;
  height: auto;
  text-align: center;
  padding: 8px 16px;
}

.swith-date-div div {
  text-align: center;
  height: auto;
  width: auto;
  font-size: 14px;
}

.swith-date-select {
  margin: 10px 0px;
}

.swith-date-div div:hover {
  color: rgb(78, 110, 242);
  cursor: pointer;
}
.week-choose-select {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
.week-choose-select el-select {
  border: 1px sol;
}
.el-select {
  border: 1px solid black !important;
  border-radius: 5px;
  width: 150px;
  margin-right: 20px;
}
.checked-view {
  color: rgb(78, 110, 242);
}
/* 配色 */
.w-noMore,.w-things{
  background-color: #EEF0F5;
}
</style>
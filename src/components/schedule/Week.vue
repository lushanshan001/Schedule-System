<template>
  <div class="week">
    <div id="app" v-if="this.value === '周'">
      <WSchedule
        ref="WSchedule"
        :planList="timePeriodList"
        :isFirstDayOfMondayOrSunday="1"
        :hasNumExpend="3"
        @checkViewNew="checkViewNew"
        @changeWeek="changeWeek"
        @getChoose="getChoose"
      >
        <template v-slot:thing="{ row }">
          <div @click="changeSchedule(row)">
            <div class="time-show">{{ row.timePeriod }}</div>
            <div class="user-show" v-if="row.staffName !== null">
              {{ row.staffName }}：{{ row.positionName }}
            </div>
            <div class="user-show"  v-else-if="row.staffName === null">开放班次</div>
          </div>
        </template>
      </WSchedule>
    </div>
    <div class="form">
      <el-dialog
        title="提示"
        v-model="dialogVisible"
        :before-close="handleClose"
        width="50%"
      >
        <!-- 表单消息 -->
        <el-form
          class="show"
          ref="form"
          :rules="rules"
          :inline="true"
          :model="form"
          label-width="auto"
        >
          <el-form-item label="姓名" prop="staffName">
            <el-select v-model="this.change.people" placeholder="请输入">
              <el-option
                v-for="item in peopleList"
                :key="item"
                :value="item"
                :label="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职位" prop="positionName">
            <div v-if="this.form.staffName !== null">
              <el-input v-model="form.positionName" disabled="true"></el-input>
            </div>
            <div v-else>
              <el-select
                v-model="this.change.position"
                @change="changePosition"
                placeholder="请输入"
              >
                <el-option
                  v-for="(item, index) in positionList"
                  :key="index"
                  :value="item"
                  :label="item"
                />
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="开始时间" prop="startTime">
            <el-input v-model="form.startTime" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="结束时间" prop="endTime">
            <el-input v-model="form.endTime" disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="changeForSchedule"
              >确 定</el-button
            >
          </span>
        </template>
      </el-dialog>
    </div>
    <div id="day" v-if="this.value === '日'" class="date">
      <day ref="data" @checkViewNew="checkViewNew"></day>
    </div>
  </div>
</template>
 
<script>
import { ElMessage } from "element-plus";
//界面
import WSchedule from "@/components/test/WSchedule.vue";
import Day from "./Day.vue";
//接口
import {
  getSchedule,
  getWeekSchedule,
  getOnePositionAllPeople,
  changeSchedule,
} from "@/api/schedule/schedule";
import { formatDate } from "@/assets/utils/utils";
import { getPosts } from "@/api/posts";

export default {
  props: ["taskRuleLists"],
  components: {
    WSchedule,
    Day,
  },
  data() {
    return {
      value: "周",
      timePeriodList: [],
      num: 0,
      choose: {
        positionName: null,
        skill: null,
      },
      date: new Date(),
      dialogVisible: false,
      form: {
        staffId: "",
        scheduleId: "",
        date: "",
        endTime: "",
        startTime: "",
        staffName: "",
        positionName: "",
      },
      change: {
        people: "",
        position: "",
      },
      positionList: [],
      peopleList: [],
    };
  },
  created() {
    this.date = formatDate(this.date).substring(0, 10);
    this.getChoose(this.choose);
  },
  methods: {
    /**
     * 获得排班表的数据
     */
    async getTimePeriodListData(date) {
      if (
        this.taskRuleLists === "" ||
        this.taskRuleLists === undefined ||
        this.taskRuleLists.length < 5
      ) {
        ElMessage.error("最少选择一个自己制定的规则");
      } else {
        this.timePeriodList = [];
        this.date = date;
        const data = {
          date: date,
          ruleIds: this.taskRuleLists,
        };
        console.log(this.choose);
        //生成一周的排班表
        const res = await getSchedule(data);
        if (res.data.code === this.$store.state.globel.success) {
          const data = res.data.data;
          const schedule = [];
          data.forEach((list) => {
            schedule.push(list);
          });
          this.timePeriodList.push({ schedule: schedule });
          console.log(this.timePeriodList, "数据");
        } else {
          ElMessage.error(res.data.msg);
        }
        // this.getChoose(this.choose);
      }
    },
    /**
     * 得到搜索的值
     */
    async getChoose(data) {
      this.choose = data;
      this.timePeriodList = [];
      console.log(this.date);
      var item = {
        date: this.date,
        skill: data.skill,
        positionName: data.positionName,
      };
      const resp = await getWeekSchedule(item);
      const List = resp.data.data;
      const schedule = [];
      List.forEach((list) => {
        schedule.push(list);
      });
      this.timePeriodList.push({ schedule: schedule });
      console.log(this.timePeriodList, "数据");
    },
    /**
     * 点击详情
     * @param row
     */
    handleDetail(row) {
      console.log(row, "点击详情");
    },
    /**
     * 点击卡片查看全部内容
     */
    handleCardDetail(row) {
      console.log(row, "卡片内容");
    },
    /**
     * 切换周
     * @param date
     */
    changeWeek(date) {
      const dateTime = date.date;
      this.date = dateTime;
      if (this.num !== 0) {
        this.getChoose(this.choose);
      } else {
        this.num = 1;
      }
    },
    /**
     * 切换展示界面
     */
    checkViewNew(data) {
      console.log(data);
      this.value = data;
    },
    /**
     * 修改班次信息
     */
    async changeSchedule(item) {
      this.dialogVisible = true;
      this.form = item;
      this.form.startTime = item.timePeriod.substring(
        0,
        item.timePeriod.indexOf("~")
      );
      this.form.endTime = item.timePeriod.substring(
        item.timePeriod.indexOf("~") + 1
      );
      if (this.form.staffName === null) {
        const list = await getPosts();
        list.data.data.forEach((item) => {
          this.positionList.push(item.positionName);
        });
      } else {
        this.peopleList = [];
        this.change.people = this.form.staffName;
        const res = await getOnePositionAllPeople(item.positionName);
        res.data.data.forEach((item) => {
          this.peopleList.push(item.staffName);
        });
      }
      console.log(this.form);
    },
    /**
     * 修改职位
     */
    async changePosition() {
      this.peopleList = [];
      const res = await getOnePositionAllPeople(this.change.position);
      res.data.data.forEach((item) => {
        this.peopleList.push(item.staffName);
      });
    },

    /**
     *修改班次
     */
    async changeForSchedule() {
      this.form.staffName = this.change.people;
      this.form.positionName = this.change.position;
      console.log(this.form);
      const res = await changeSchedule(this.form);
      if (res.data.code === this.$store.state.globel.success) {
        ElMessage.success("修改成功");
      } else {
        ElMessage.success("修改失败");
      }
      this.getChoose(this.choose);
      this.cancel();
    },
    cancel() {
      this.dialogVisible = false;
      this.$refs.form.resetFields();
    },
  },
};
</script>
<style scoped>
.week{
  width: 100%;
}
.time-show{
  display: flex;
  justify-content: center;
  color: #696969;
  font-size: medium;
}
.user-show{
  display: flex;
  justify-content: center;
  font-size: 17px;
}
</style>